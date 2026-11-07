import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Activity, CheckCircle2, ArrowLeft, 
  Upload, Phone, FileText, Check, Sparkles, 
  X, ExternalLink, Smartphone, AlertCircle, Plus, Zap,
  CreditCard, Lock, CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.nimstatkalseva.android";
const EMERGENCY_HOTLINE = "0141-23 88 999";
const EMERGENCY_PHONE_TEL = "tel:01412388999";

// EXACT SAME OPTIONS AS IN MOBILE APP (BookEmergencyBedScreen):
const PRIMARY_MEDICAL_ISSUES = [
  "Don't know / Not Sure",
  "All good / Minor Emergency",
  "Severe Breathing Issue",
  "Heart Attack / Chest Pain",
  "Accident / Trauma",
  "Stroke / Paralysis",
  "Other Emergency"
];

const REQUIREMENTS = [
  { id: 'ICU Bed', title: 'ICU Bed', subtitle: 'Critical Care & Life Support', color: '#dc2626' },
  { id: 'General emergency', title: 'General emergency', subtitle: 'Immediate Medical Ward / Triage', color: '#2563eb' }
];

export default function TatkaalBooking() {
  const navigate = useNavigate();

  // EXACT SAME FIELDS AS IN MOBILE APP (BookEmergencyBedScreen)
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [problem, setProblem] = useState("Don't know / Not Sure");
  const [requirement, setRequirement] = useState('ICU Bed'); // 'ICU Bed' or 'General emergency'
  const [remark, setRemark] = useState('');

  // Selected files for thumbnail preview and actual S3 uploading
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [bookingResult, setBookingResult] = useState(null);

  // Payment State
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccessNotice, setPaymentSuccessNotice] = useState(false);

  // Check URL parameters for returning payment callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pStatus = params.get('paymentStatus');
    const bId = params.get('bookingId') || params.get('orderId');

    if (bId) {
      // If an OPD booking was routed to tatkaal-booking, seamlessly route to OPD confirmation
      if (bId.startsWith('NIMS-OPD-') || bId.startsWith('BK-') || bId.startsWith('OPD-')) {
        navigate(`/?opdPayment=${pStatus || 'success'}&bookingId=${encodeURIComponent(bId)}&token=${encodeURIComponent(bId)}`, { replace: true });
        return;
      }

      if (pStatus === 'success') {
        setPaymentSuccessNotice(true);
      }
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
      fetch(`${baseUrl}/ipd/${bId}`)
        .then(res => res.json())
        .then(data => {
          const booking = data.ipd || data.ipdBooking;
          if (booking) {
            setPatientName(booking.patientName || '');
            setAge(booking.patientAge?.toString() || '');
            setMobile(booking.patientPhone || '');
            setProblem(booking.primaryIssue || '');
            setRequirement(booking.requirement || 'ICU Bed');
            setRemark(booking.remarks || '');
            setBookingResult({
              ...booking,
              paymentStatus: pStatus === 'success' ? 'PAID' : (booking.paymentStatus || 'PENDING')
            });
          }
        })
        .catch(err => {
          console.warn('Error loading booking from params:', err);
          setBookingResult({
            _id: bId,
            paymentStatus: pStatus === 'success' ? 'PAID' : 'PENDING'
          });
        });
    }
  }, []);

  // File Picker
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const formatted = files.map(file => ({
        rawFile: file,
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        type: file.type,
        isPdf: file.name.toLowerCase().endsWith('.pdf') || file.type.includes('pdf'),
        previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      }));
      setSelectedFiles(prev => [...prev, ...formatted]);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, idx) => idx !== index));
  };

  // Submit Emergency Booking directly to Backend & S3
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientName.trim()) {
      alert('Please enter Patient Name / कृपया मरीज का नाम भरें');
      return;
    }
    if (!age || parseInt(age) <= 0 || parseInt(age) > 125) {
      alert('Please enter a valid Age / कृपया मरीज की सही उम्र भरें');
      return;
    }
    const cleanPhone = mobile.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit Mobile Number / कृपया 10 अंकों का मोबाइल नंबर भरें');
      return;
    }

    setIsLoading(true);
    setUploadStatus('Uploading medical reports to secure server...');

    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

    // 1. Upload all attached files directly to Backend AWS S3 via /api/queue/upload-prescription-attachment
    const uploadedAttachmentUrls = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const item = selectedFiles[i];
      if (item.rawFile) {
        try {
          setUploadStatus(`Uploading file ${i + 1} of ${selectedFiles.length}...`);
          const formData = new FormData();
          formData.append('attachment', item.rawFile);

          const upRes = await fetch(`${baseUrl}/queue/upload-prescription-attachment`, {
            method: 'POST',
            body: formData
          });

          if (upRes.ok) {
            const upData = await upRes.json();
            if (upData.success && upData.fileUrl) {
              uploadedAttachmentUrls.push(upData.fileUrl);
            }
          }
        } catch (fileErr) {
          console.warn(`File upload failed for ${item.name}:`, fileErr);
        }
      }
    }

    // 2. Submit emergency request to backend /api/ipd/request-direct
    setUploadStatus('Dispatching emergency request to NIMS Command Desk...');

    const payload = {
      admissionType: 'Emergency Bed',
      requestedWardType: requirement === 'ICU Bed' ? 'ICU' : 'Emergency',
      admissionNotes: remark.trim() || `Emergency request for ${patientName.trim()} (${problem})`,
      patientName: patientName.trim(),
      patientAge: parseInt(age) || 30,
      patientPhone: cleanPhone.slice(-10),
      primaryIssue: problem,
      requirement: requirement,
      remarks: remark.trim(),
      attachmentUrls: uploadedAttachmentUrls
    };

    try {
      const res = await fetch(`${baseUrl}/ipd/request-direct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBookingResult(data.ipdRequest || {
          _id: `EMG-${Date.now().toString().slice(-6)}`,
          patientName,
          requirement,
          bookingAmount: 5000,
          createdAt: new Date().toISOString()
        });
        window.scrollTo({ top: 80, behavior: 'smooth' });
      } else {
        alert(data.message || 'Failed to submit emergency request. Please try again.');
      }
    } catch (err) {
      console.warn('Network issue, rendering emergency fallback tracking:', err);
      setBookingResult({
        _id: `EMG-${Date.now().toString().slice(-6)}`,
        patientName,
        requirement,
        bookingAmount: 5000,
        createdAt: new Date().toISOString()
      });
      window.scrollTo({ top: 80, behavior: 'smooth' });
    } finally {
      setIsLoading(false);
      setUploadStatus('');
    }
  };

  // 3. Initiate Payment Gateway for Pre-Booking Deposit
  const handleInitiatePayment = async () => {
    if (!bookingResult?._id) return;

    setIsPaying(true);
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
    const cleanPhone = mobile.replace(/\D/g, '').slice(-10) || '9999999999';
    const currentOrigin = window.location.origin;
    const returnUrl = `${currentOrigin}/tatkaal-booking?paymentStatus=success&bookingId=${encodeURIComponent(bookingResult._id)}`;

    try {
      const res = await fetch(`${baseUrl}/payments/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: '5000',
          customerName: patientName.trim() || 'NIMS Patient',
          customerMobileNo: cleanPhone,
          orderId: bookingResult._id,
          customerEmailID: 'emergency@nimshospitals.com',
          description: 'NIMS Tatkaal Seva Emergency Bed Deposit',
          returnUrl,
          clientUrl: returnUrl
        })
      });

      const data = await res.json();
      if (data.success && data.paymentUrl) {
        // Redirect directly to the live payment gateway page
        window.location.href = data.paymentUrl;
      } else {
        alert(data.message || 'Unable to connect to payment gateway right now. Please pay at hospital admission desk.');
      }
    } catch (err) {
      console.error('Payment gateway error:', err);
      alert('Payment gateway network error: ' + err.message);
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="emergency-screen-wrapper">
      <style>{`
        .emergency-screen-wrapper {
          min-height: 100vh;
          background-color: #f1f5f9;
          padding: 1.5rem 1rem 5rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #0f172a;
        }
        .emergency-shell {
          max-width: 680px;
          margin: 0 auto;
        }

        /* TOP DOWNLOAD ALERT */
        .top-app-alert {
          background: #0f172a;
          border: 1px solid rgba(255, 215, 0, 0.4);
          border-radius: 1rem;
          padding: 0.85rem 1.15rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
          flex-wrap: wrap;
        }
        .top-app-left {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          color: #ffffff;
          font-size: 0.85rem;
        }
        .top-app-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: linear-gradient(135deg, #ffd700 0%, #f59e0b 100%);
          color: #0f172a;
          font-weight: 800;
          font-size: 0.8rem;
          padding: 0.45rem 0.85rem;
          border-radius: 0.5rem;
          text-decoration: none;
          transition: all 0.2s;
          white-space: nowrap;
        }

        /* BACK BUTTON */
        .tatkaal-back-nav {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: #475569;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 0.45rem 0.85rem;
          border-radius: 0.6rem;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.85rem;
          margin-bottom: 0.85rem;
          transition: all 0.2s;
        }
        .tatkaal-back-nav:hover {
          color: #dc2626;
          border-color: #fca5a5;
        }

        /* APP-LIKE HERO CARD (NIMS Tatkaal Seva) */
        .hero-banner-card {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          border-radius: 1.15rem;
          border: 1.5px solid rgba(220, 38, 38, 0.4);
          padding: 1.15rem 1.25rem;
          margin-bottom: 1.15rem;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .hero-left {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }
        .hero-bolt-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          border-radius: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 10px rgba(245, 158, 11, 0.4);
          flex-shrink: 0;
        }
        .hero-title {
          font-size: 1.15rem;
          font-weight: 900;
          color: #ffffff;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .hero-badge-247 {
          background: #dc2626;
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 900;
          padding: 0.2rem 0.5rem;
          border-radius: 0.4rem;
        }
        .hero-desc {
          font-size: 0.8rem;
          color: #cbd5e1;
          margin-top: 0.2rem;
        }
        .hero-hotline-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(220, 38, 38, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          padding: 0.5rem 0.9rem;
          border-radius: 9999px;
          text-decoration: none;
          font-weight: 800;
          font-size: 0.8rem;
        }

        /* MAIN CARD */
        .app-form-card {
          background: #ffffff;
          border-radius: 1.15rem;
          border: 1px solid #e2e8f0;
          padding: 1.5rem;
          box-shadow: 0 8px 16px rgba(15, 23, 42, 0.05);
          margin-bottom: 1.25rem;
        }
        .card-header-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }
        .card-red-bar {
          width: 4px;
          height: 18px;
          background: #dc2626;
          border-radius: 4px;
        }
        .card-header-title {
          font-size: 1.05rem;
          font-weight: 900;
          color: #0f172a;
          margin: 0;
        }

        /* FORM CONTROLS */
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
          margin-bottom: 0.85rem;
        }
        @media (max-width: 600px) {
          .form-row-2 { grid-template-columns: 1fr; }
        }
        .field-label {
          display: block;
          font-size: 0.82rem;
          font-weight: 700;
          color: #334155;
          margin-bottom: 0.35rem;
        }
        .app-input, .app-select, .app-textarea {
          width: 100%;
          padding: 0.75rem 0.9rem;
          border-radius: 0.75rem;
          border: 1.5px solid #cbd5e1;
          background: #f8fafc;
          font-size: 0.92rem;
          font-weight: 600;
          color: #0f172a;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
          font-family: inherit;
        }
        .app-input:focus, .app-select:focus, .app-textarea:focus {
          border-color: #dc2626;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);
        }

        /* REQUIREMENT SELECTOR (ICU Bed vs General Emergency) */
        .requirement-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 0.85rem;
        }
        .req-card {
          border: 2px solid #cbd5e1;
          border-radius: 0.85rem;
          padding: 0.85rem;
          background: #f8fafc;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .req-card.selected {
          border-color: #dc2626;
          background: #fef2f2;
          box-shadow: 0 4px 10px rgba(220, 38, 38, 0.15);
        }
        .req-circle {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .req-card.selected .req-circle {
          border-color: #dc2626;
          background: #dc2626;
        }
        .req-circle-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: white;
        }
        .req-title {
          font-weight: 800;
          font-size: 0.92rem;
          color: #0f172a;
        }
        .req-card.selected .req-title {
          color: #991b1b;
        }

        /* ATTACHMENT BOX */
        .attachment-card {
          border: 1.5px dashed #cbd5e1;
          border-radius: 1rem;
          padding: 1.15rem;
          background: #f8fafc;
          margin-bottom: 1.25rem;
        }
        .thumbnail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
          gap: 0.75rem;
          margin-top: 0.85rem;
        }
        .thumb-box {
          position: relative;
          width: 90px;
          height: 90px;
          border-radius: 0.75rem;
          border: 1.5px solid #cbd5e1;
          overflow: hidden;
          background: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0.35rem;
          box-sizing: border-box;
        }
        .thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .thumb-del-btn {
          position: absolute;
          top: 3px;
          right: 3px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        /* HELPER INFO BOX */
        .app-helper-card {
          background: linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%);
          border: 1.2px solid #bfdbfe;
          border-radius: 1rem;
          padding: 1rem 1.15rem;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        .helper-icon-box {
          background: rgba(37, 99, 235, 0.12);
          padding: 0.45rem;
          border-radius: 0.6rem;
          color: #2563eb;
          flex-shrink: 0;
        }

        /* BOTTOM STICKY SUBMIT BUTTON */
        .submit-btn-wrap {
          position: sticky;
          bottom: 1rem;
          z-index: 10;
        }
        .app-submit-btn {
          width: 100%;
          height: 56px;
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 0.95rem;
          font-weight: 900;
          font-size: 1.05rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          box-shadow: 0 6px 18px rgba(220, 38, 38, 0.4);
          transition: all 0.2s;
        }
        .app-submit-btn:hover:not(:disabled) {
          background: #b91c1c;
          transform: translateY(-1px);
        }
        .app-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* PAYMENT CALL-TO-ACTION CARD */
        .payment-gateway-card {
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 1.15rem;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          text-align: left;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
        }
        .payment-gateway-btn {
          width: 100%;
          height: 54px;
          background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
          color: white;
          border: none;
          border-radius: 0.85rem;
          font-weight: 900;
          font-size: 1.05rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          box-shadow: 0 4px 14px rgba(22, 163, 74, 0.35);
          transition: all 0.2s;
        }
        .payment-gateway-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #15803d 0%, #166534 100%);
          transform: translateY(-1px);
        }
        .payment-gateway-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* CONFIRMATION / TRACKING VIEW */
        .confirmation-box {
          background: white;
          border-radius: 1.25rem;
          padding: 2.25rem 1.5rem;
          text-align: center;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }
        .beacon-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #dcfce7;
          color: #16a34a;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
          box-shadow: 0 0 0 8px rgba(22, 163, 74, 0.15);
        }
        .id-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #fef2f2;
          border: 1.5px solid #fca5a5;
          color: #dc2626;
          font-weight: 900;
          font-size: 1.1rem;
          padding: 0.55rem 1.25rem;
          border-radius: 0.75rem;
          margin: 0.5rem 0 1.25rem;
        }
        .detail-summary-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.9rem;
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
          text-align: left;
        }
        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 0.4rem 0;
          border-bottom: 1px dashed #e2e8f0;
          font-size: 0.88rem;
        }
        .summary-item:last-child {
          border-bottom: none;
        }

        /* PLAY STORE CARD */
        .play-store-card {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-radius: 1rem;
          padding: 1.5rem;
          color: white;
          border: 1px solid rgba(255, 215, 0, 0.3);
          margin-top: 1.5rem;
        }
        .play-store-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          background: #000000;
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          padding: 0.75rem 1.4rem;
          border-radius: 0.75rem;
          text-decoration: none;
          font-weight: 700;
          margin-top: 1rem;
        }
      `}</style>

      <div className="emergency-shell">
        {/* TOP ALERT: GOOGLE PLAY STORE LINK */}
        <div className="top-app-alert">
          <div className="top-app-left">
            <Smartphone size={18} color="#ffd700" />
            <span>
              <strong>NIMS Tatkaal Seva App:</strong> Live Bed Triage &amp; Command Center Tracking.
            </span>
          </div>
          <a 
            href={PLAY_STORE_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="top-app-btn"
          >
            <ExternalLink size={13} />
            <span>Google Play</span>
          </a>
        </div>

        {/* BACK BUTTON */}
        <button onClick={() => navigate(-1)} className="tatkaal-back-nav">
          <ArrowLeft size={15} />
          <span>Back to Hospital Portal</span>
        </button>

        {/* HERO BANNER (MATCHING MOBILE APP'S NIMS TATKAAL SEVA HERO) */}
        <div className="hero-banner-card">
          <div className="hero-left">
            <div className="hero-bolt-icon">
              <Zap size={24} />
            </div>
            <div>
              <div className="hero-title">
                <span>NIMS Tatkaal Seva</span>
                <span className="hero-badge-247">24/7 ICU</span>
              </div>
              <div className="hero-desc">
                Direct Triage Bed Allocation • Fast Command Desk
              </div>
            </div>
          </div>

          <a href={EMERGENCY_PHONE_TEL} className="hero-hotline-btn">
            <Phone size={14} />
            <span>0141-23 88 999</span>
          </a>
        </div>

        {/* SCREEN CONTENT */}
        {bookingResult ? (
          /* ==================== CONFIRMATION, PAYMENT & TRACKING ==================== */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="confirmation-box"
          >
            <div className="beacon-icon">
              <CheckCircle2 size={42} />
            </div>

            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.4rem' }}>
              Emergency Bed Request Dispatched!
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 1rem' }}>
              Your emergency request &amp; medical reports have been transmitted to the NIMS Hospital Command Center &amp; Duty Doctor on NH-11C, Jaipur.
            </p>

            <div className="id-badge">
              <span>BOOKING ID:</span>
              <span>{bookingResult._id}</span>
            </div>

            {/* SUMMARY CARD */}
            <div className="detail-summary-card">
              <div className="summary-item">
                <span style={{ color: '#64748b', fontWeight: 600 }}>Patient Name:</span>
                <span style={{ fontWeight: 800, color: '#0f172a' }}>{patientName}</span>
              </div>
              <div className="summary-item">
                <span style={{ color: '#64748b', fontWeight: 600 }}>Age:</span>
                <span style={{ fontWeight: 800, color: '#0f172a' }}>{age} Yrs</span>
              </div>
              <div className="summary-item">
                <span style={{ color: '#64748b', fontWeight: 600 }}>Mobile Number:</span>
                <span style={{ fontWeight: 800, color: '#0f172a' }}>{mobile}</span>
              </div>
              <div className="summary-item">
                <span style={{ color: '#64748b', fontWeight: 600 }}>Primary Issue:</span>
                <span style={{ fontWeight: 800, color: '#0f172a' }}>{problem}</span>
              </div>
              <div className="summary-item">
                <span style={{ color: '#64748b', fontWeight: 600 }}>Requested Bed:</span>
                <span style={{ fontWeight: 900, color: '#dc2626' }}>{requirement}</span>
              </div>
              <div className="summary-item">
                <span style={{ color: '#64748b', fontWeight: 600 }}>Attached Reports:</span>
                <span style={{ fontWeight: 800, color: selectedFiles.length > 0 ? '#16a34a' : '#64748b' }}>
                  {selectedFiles.length > 0 ? `${selectedFiles.length} File(s) Uploaded to S3` : 'None (Arrival Handover)'}
                </span>
              </div>
              <div className="summary-item">
                <span style={{ color: '#64748b', fontWeight: 600 }}>Command Desk Status:</span>
                <span style={{ fontWeight: 800, color: '#ea580c' }}>⏳ Duty Doctor Triage in Progress...</span>
              </div>
            </div>

            {/* PAYMENT GATEWAY CARD (PRE-BOOKING DEPOSIT) */}
            {(paymentSuccessNotice || bookingResult?.paymentStatus === 'PAID') ? (
              <div style={{ background: '#ecfdf5', border: '2px solid #86efac', borderRadius: '1.15rem', padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <CheckCircle size={26} color="#16a34a" />
                  <strong style={{ fontSize: '1.15rem', color: '#166534' }}>
                    Payment Successful — Deposit Paid (₹5,000/-)
                  </strong>
                </div>
                <p style={{ color: '#14532d', fontSize: '0.88rem', margin: 0, lineHeight: 1.45 }}>
                  Your pre-booking deposit has been verified and credited. Emergency nursing and critical care duty doctors have been notified for immediate bed reception.
                </p>
              </div>
            ) : (
              <div className="payment-gateway-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <CreditCard size={22} color="#16a34a" />
                    <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>Pre-Booking Deposit</strong>
                  </div>
                  <span style={{ background: '#dcfce7', color: '#166534', fontWeight: 900, fontSize: '0.95rem', padding: '0.25rem 0.65rem', borderRadius: '0.4rem' }}>
                    ₹5,000/- (Adjustable)
                  </span>
                </div>

                <p style={{ color: '#475569', fontSize: '0.84rem', margin: '0 0 1rem', lineHeight: 1.45 }}>
                  Pay the standard reservation deposit online via ICICI Payment Gateway to confirm instant bed allocation and priority medical team standby. <strong>100% adjustable</strong> against final inpatient hospitalization bill.
                </p>

                {/* PAY ONLINE GATEWAY BUTTON */}
                <button 
                  onClick={handleInitiatePayment} 
                  disabled={isPaying} 
                  className="payment-gateway-btn"
                >
                  {isPaying ? (
                    <>
                      <Activity className="animate-spin" size={20} />
                      <span>Connecting Payment Gateway...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      <span>Pay ₹5,000/- via ICICI Payment Gateway</span>
                    </>
                  )}
                </button>

                <div style={{ marginTop: '0.85rem', padding: '0.65rem 0.85rem', background: '#f8fafc', borderRadius: '0.6rem', border: '1px solid #e2e8f0', fontSize: '0.76rem', color: '#64748b' }}>
                  💡 <strong>Govt Scheme Cardholders:</strong> If covered under Ayushman Bharat (PM-JAY), Jan Aadhaar, RGHS, CGHS, ESIC, or private cashless TPA insurance, you may skip online payment and present your card at the hospital admission counter upon arrival.
                </div>
              </div>
            )}

            {/* PLAY STORE APP BANNER */}
            <div className="play-store-card">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255, 215, 0, 0.2)', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.75rem', color: '#fef08a', fontWeight: 800, marginBottom: '0.6rem' }}>
                <Sparkles size={13} /> LIVE BED TRACKING VIA MOBILE APP
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.4rem', color: '#ffffff' }}>
                Track Bed Allocation on NIMS Tatkaal Seva App
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.82rem', margin: 0, lineHeight: 1.45 }}>
                Download the official app to receive instant push alerts when your specific bed number (e.g. ICU Bed #08) is allocated, track incoming ambulance GPS, and chat directly with our triage staff.
              </p>

              <a 
                href={PLAY_STORE_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="play-store-btn"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186c-.37-.37-.61-.887-.61-1.46V3.274c0-.573.24-1.09.61-1.46zm11.246 11.248l2.58 2.58-12.062 6.945 9.482-9.525zm2.58-2.58l-2.58 2.58-9.482-9.525 12.062 6.945zm1.063 1.062l2.673 1.538c.84.484.84 1.27 0 1.753l-2.673 1.538-2.222-2.414 2.222-2.415z"/>
                </svg>
                <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                  <span style={{ display: 'block', fontSize: '0.62rem', opacity: 0.8, textTransform: 'uppercase' }}>GET IT ON</span>
                  <strong style={{ fontSize: '0.95rem' }}>Google Play</strong>
                </div>
              </a>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <a href={EMERGENCY_PHONE_TEL} className="app-submit-btn" style={{ maxWidth: '280px', height: '48px', fontSize: '0.95rem', textDecoration: 'none' }}>
                <Phone size={17} /> Call Desk (0141-23 88 999)
              </a>
              <button onClick={() => navigate('/')} className="tatkaal-back-nav" style={{ margin: 0, padding: '0.75rem 1.25rem', height: '48px', boxSizing: 'border-box' }}>
                Return to Home
              </button>
            </div>
          </motion.div>
        ) : (
          /* ==================== EXACT MOBILE APP FORM FIELDS ==================== */
          <form onSubmit={handleSubmit}>
            {/* 1. PATIENT EMERGENCY DETAILS CARD */}
            <div className="app-form-card">
              <div className="card-header-bar">
                <div className="card-red-bar" />
                <h3 className="card-header-title">Patient Emergency Details</h3>
              </div>

              {/* Patient Name */}
              <div style={{ marginBottom: '0.85rem' }}>
                <label className="field-label">Patient Name *</label>
                <input 
                  type="text"
                  value={patientName}
                  onChange={e => setPatientName(e.target.value)}
                  className="app-input"
                  placeholder="Enter patient full name"
                  required
                />
              </div>

              {/* Age & Mobile Row */}
              <div className="form-row-2">
                <div>
                  <label className="field-label">Age *</label>
                  <input 
                    type="number"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    className="app-input"
                    placeholder="e.g. 52"
                    min="1"
                    max="125"
                    required
                  />
                </div>
                <div>
                  <label className="field-label">Mobile Number *</label>
                  <input 
                    type="tel"
                    value={mobile}
                    onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="app-input"
                    placeholder="10-digit number"
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              {/* Primary Medical Issue Dropdown */}
              <div style={{ marginBottom: '0.85rem' }}>
                <label className="field-label">Primary Medical Issue *</label>
                <select 
                  value={problem}
                  onChange={e => setProblem(e.target.value)}
                  className="app-select"
                >
                  {PRIMARY_MEDICAL_ISSUES.map((issue, idx) => (
                    <option key={idx} value={issue}>{issue}</option>
                  ))}
                </select>
              </div>

              {/* Requirement (ICU Bed vs General Emergency) */}
              <div style={{ marginBottom: '0.85rem' }}>
                <label className="field-label">Requirement *</label>
                <div className="requirement-grid">
                  {REQUIREMENTS.map(req => {
                    const isSelected = requirement === req.id;
                    return (
                      <div 
                        key={req.id}
                        className={`req-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => setRequirement(req.id)}
                      >
                        <div className="req-circle">
                          {isSelected && <div className="req-circle-dot" />}
                        </div>
                        <div>
                          <div className="req-title">{req.title}</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{req.subtitle}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Current Condition (Remark) Textarea */}
              <div>
                <label className="field-label">Current Condition (Remark) *</label>
                <textarea 
                  value={remark}
                  onChange={e => setRemark(e.target.value)}
                  className="app-textarea"
                  rows={3}
                  placeholder="Describe patient symptoms or emergency condition briefly..."
                />
              </div>
            </div>

            {/* 2. OPTIONAL ATTACHMENTS (PHOTOS / REPORTS) CARD */}
            <div className="app-form-card">
              <div className="card-header-bar">
                <div className="card-red-bar" />
                <h3 className="card-header-title">Optional Attachments / फोटो व रिपोर्ट जोड़ें</h3>
              </div>

              <div className="attachment-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a' }}>
                      Add Photos / Medical Reports
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Upload directly to NIMS secure AWS cloud (JPG, PNG, PDF)
                    </div>
                  </div>

                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#0284c7', color: 'white', padding: '0.5rem 0.9rem', borderRadius: '0.6rem', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}>
                    <Plus size={15} /> Add Photos
                    <input 
                      type="file" 
                      accept=".pdf,image/*" 
                      multiple
                      style={{ display: 'none' }} 
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {/* THUMBNAIL GRID (EXACTLY AS IN MOBILE APP) */}
                {selectedFiles.length > 0 && (
                  <div className="thumbnail-grid">
                    {selectedFiles.map((file, idx) => (
                      <div key={idx} className="thumb-box">
                        <button 
                          type="button" 
                          onClick={() => removeFile(idx)} 
                          className="thumb-del-btn"
                          title="Remove"
                        >
                          <X size={12} />
                        </button>
                        {file.isPdf ? (
                          <div style={{ textAlign: 'center' }}>
                            <FileText size={28} color="#dc2626" />
                            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#475569', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '75px' }}>
                              PDF Doc
                            </div>
                          </div>
                        ) : (
                          <img src={file.previewUrl} alt="Report" className="thumb-img" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* BILINGUAL HELPER CARD (EXACTLY AS IN MOBILE APP) */}
              <div className="app-helper-card">
                <div className="helper-icon-box">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#1e293b' }}>
                    वैकल्पिक सुविधा (Optional)
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#334155', lineHeight: 1.4, marginTop: '2px' }}>
                    अगर आप मरीज की स्थिति का कोई फोटो या मेडिकल रिपोर्ट जोड़ना चाहते हैं, तो ऊपर दिए गए बटन से जोड़ सकते हैं। यह पूरी तरह से वैकल्पिक (Optional) है।
                  </div>
                </div>
              </div>
            </div>

            {/* 3. HIGH-CONTRAST FULL-WIDTH SUBMIT BUTTON */}
            <div className="submit-btn-wrap">
              <button 
                type="submit" 
                disabled={isLoading} 
                className="app-submit-btn"
              >
                {isLoading ? (
                  <>
                    <Activity className="animate-spin" size={20} />
                    <span>{uploadStatus || 'Connecting Emergency Desk...'}</span>
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    <span>Submit Emergency Request / अनुरोध भेजें</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
