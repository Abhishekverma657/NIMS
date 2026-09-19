import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, Clock, User, Phone, MapPin, CheckCircle2, 
  ShieldCheck, AlertCircle, Building2, Home, Sparkles, 
  FileText, ChevronDown, Check, ArrowRight, Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { packagesData } from '../../data/packagesData';

export default function PackageBookingModal({ isOpen, onClose, initialPackage }) {
  const [selectedPackageId, setSelectedPackageId] = useState('');
  const [collectionType, setCollectionType] = useState('hospital'); // 'hospital' | 'home'
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState('07:30 AM - 09:00 AM');
  const [patientData, setPatientData] = useState({
    fullName: '',
    phone: '',
    email: '',
    gender: 'Female',
    age: '',
    address: '',
    landmark: '',
    pincode: '',
    notes: ''
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [tokenNumber, setTokenNumber] = useState('');

  // Sync selected package when modal opens or initialPackage changes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (initialPackage && initialPackage.id) {
        setSelectedPackageId(initialPackage.id);
      } else if (packagesData.length > 0) {
        setSelectedPackageId(packagesData[1]?.id || packagesData[0]?.id); // Default to Whole Body Checkup if available
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialPackage]);

  if (!isOpen) return null;

  const currentPkg = packagesData.find(p => p.id === selectedPackageId) || initialPackage || packagesData[0];

  const morningSlots = [
    { time: '07:00 AM - 08:30 AM', badge: 'Best for Fasting' },
    { time: '08:30 AM - 10:00 AM', badge: 'Popular' },
    { time: '10:00 AM - 11:30 AM', badge: 'Standard' },
    { time: '11:30 AM - 01:00 PM', badge: 'Non-Fasting' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientData.fullName || !patientData.phone) {
      alert('Please enter patient name and mobile number.');
      return;
    }
    if (collectionType === 'home') {
      if (!patientData.address) {
        alert('Please provide your home address for sample collection.');
        return;
      }
      if (!patientData.pincode || patientData.pincode.trim().length < 6) {
        alert('Please enter a valid 6-digit PIN code for home sample collection.');
        return;
      }
    }
    const token = 'NIMS-PKG-' + Math.floor(100000 + Math.random() * 900000);
    setTokenNumber(token);
    setBookingConfirmed(true);
  };

  const handleReset = () => {
    setBookingConfirmed(false);
    onClose();
  };

  const handlePrintSlip = () => {
    const slipHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>NIMS Hospital - Appointment Slip (${tokenNumber})</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 10mm 14mm;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #0f172a;
            background: #ffffff;
            padding: 10px;
            font-size: 13px;
            line-height: 1.45;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .slip-wrapper {
            max-width: 720px;
            margin: 0 auto;
            border: 2px solid #0a2f5e;
            border-radius: 12px;
            overflow: hidden;
            background: #ffffff;
          }
          .header-banner {
            background: #0a2f5e !important;
            color: #ffffff !important;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 3.5px solid #f47521;
          }
          .hospital-brand {
            display: flex;
            align-items: center;
            gap: 14px;
          }
          .hospital-logo-box {
            background: #ffffff;
            padding: 6px 10px;
            border-radius: 6px;
            display: flex;
            align-items: center;
          }
          .hospital-logo-box img {
            height: 32px;
            width: auto;
          }
          .hospital-text h1 {
            font-size: 17px;
            font-weight: 800;
            letter-spacing: 0.3px;
            margin-bottom: 2px;
            color: #ffffff !important;
          }
          .hospital-text p {
            font-size: 10.5px;
            color: #cbd5e1 !important;
            margin: 0;
          }
          .header-badge {
            text-align: right;
          }
          .desk-pill {
            background: #f47521 !important;
            color: #ffffff !important;
            font-size: 9.5px;
            font-weight: 800;
            padding: 4px 9px;
            border-radius: 999px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-block;
          }
          .helpline-text {
            font-size: 10.5px;
            color: #f8fafc;
            margin-top: 4px;
            font-weight: 600;
          }
          .token-strip {
            background: #f1f5f9 !important;
            border-bottom: 1.5px solid #e2e8f0;
            padding: 12px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .token-pill-box {
            background: #ffffff;
            border: 2px dashed #0a2f5e;
            padding: 6px 14px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .token-label {
            font-size: 9.5px;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .token-val {
            font-size: 17px;
            font-weight: 900;
            color: #0a2f5e;
            letter-spacing: 1px;
          }
          .booking-date-stamp {
            font-size: 11px;
            color: #475569;
            text-align: right;
            font-weight: 600;
          }
          .slip-body {
            padding: 18px 20px;
          }
          .section-heading {
            font-size: 11.5px;
            font-weight: 800;
            color: #0a2f5e;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            border-bottom: 1.5px solid #0a2f5e;
            padding-bottom: 3px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
          }
          .grid-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 14px;
          }
          .info-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11.5px;
          }
          .info-table td {
            padding: 4.5px 2px;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: top;
          }
          .info-table td.lbl {
            color: #64748b;
            font-weight: 600;
            width: 38%;
          }
          .info-table td.val {
            color: #0f172a;
            font-weight: 700;
          }
          .package-highlight-box {
            background: #f8fafc !important;
            border: 1.5px solid #cbd5e1;
            border-radius: 10px;
            padding: 12px 16px;
            margin-bottom: 14px;
          }
          .pkg-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }
          .pkg-name-title {
            font-size: 15px;
            font-weight: 800;
            color: #0a2f5e;
          }
          .pkg-category-tag {
            font-size: 10px;
            font-weight: 700;
            color: #15803d;
            background: #dcfce7 !important;
            padding: 2px 7px;
            border-radius: 4px;
            display: inline-block;
            margin-top: 3px;
          }
          .pkg-price-tag {
            text-align: right;
          }
          .pkg-price-num {
            font-size: 18px;
            font-weight: 900;
            color: #15803d;
          }
          .pkg-price-note {
            font-size: 9.5px;
            color: #64748b;
          }
          .guidelines-card {
            background: #fffbeb !important;
            border: 1.5px solid #fef3c7;
            border-radius: 10px;
            padding: 10px 14px;
            font-size: 10.5px;
            color: #92400e;
            margin-bottom: 14px;
          }
          .guidelines-card strong {
            display: block;
            margin-bottom: 4px;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.3px;
          }
          .guidelines-card ol {
            padding-left: 18px;
            margin: 0;
          }
          .guidelines-card li {
            margin-bottom: 3px;
          }
          .slip-footer {
            background: #f8fafc !important;
            border-top: 1.5px solid #e2e8f0;
            padding: 10px 20px;
            font-size: 10px;
            color: #64748b;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .stamp-box {
            border: 1px dashed #94a3b8;
            padding: 4px 10px;
            border-radius: 4px;
            text-align: center;
            font-weight: 700;
            font-size: 9px;
            color: #0a2f5e;
          }
        </style>
      </head>
      <body>
        <div class="slip-wrapper">
          <!-- Hospital Header -->
          <div class="header-banner">
            <div class="hospital-brand">
              <div class="hospital-logo-box">
                <img src="/assets/images/nims-hospital-logo.svg" alt="NIMS Hospital" />
              </div>
              <div class="hospital-text">
                <h1>NIMS HOSPITAL & RESEARCH UNIVERSITY</h1>
                <p>National Highway 11C, Delhi-Jaipur Expressway, Jaipur, Rajasthan 303121</p>
                <p>NABH Accredited &bull; 1500+ Bed Super Speciality Hospital &bull; Medical College</p>
              </div>
            </div>
            <div class="header-badge">
              <span class="desk-pill">Diagnostic Lab Desk</span>
              <div class="helpline-text">&#9742; 0141-23 88 999</div>
            </div>
          </div>

          <!-- Token & Slip Title Strip -->
          <div class="token-strip">
            <div class="token-pill-box">
              <span class="token-label">Booking Token:</span>
              <span class="token-val">${tokenNumber}</span>
            </div>
            <div class="booking-date-stamp">
              <div><strong>APPOINTMENT REQUISITION SLIP</strong></div>
              <div>Generated: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} | ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          </div>

          <div class="slip-body">
            <!-- 2-Column Info Grid -->
            <div class="grid-info">
              <!-- Patient Details -->
              <div>
                <div class="section-heading">Patient Details</div>
                <table class="info-table">
                  <tr>
                    <td class="lbl">Patient Name:</td>
                    <td class="val">${patientData.fullName || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="lbl">Mobile / WhatsApp:</td>
                    <td class="val">+91 ${patientData.phone || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="lbl">Age / Gender:</td>
                    <td class="val">${patientData.age ? patientData.age + ' Yrs' : 'N/A'} / ${patientData.gender}</td>
                  </tr>
                  ${patientData.email ? `<tr><td class="lbl">Email:</td><td class="val">${patientData.email}</td></tr>` : ''}
                </table>
              </div>

              <!-- Appointment Schedule -->
              <div>
                <div class="section-heading">Schedule & Collection Mode</div>
                <table class="info-table">
                  <tr>
                    <td class="lbl">Collection Mode:</td>
                    <td class="val">${collectionType === 'hospital' ? '🏥 Hospital Diagnostic Center' : '🏠 Home Sample Collection'}</td>
                  </tr>
                  <tr>
                    <td class="lbl">Scheduled Date:</td>
                    <td class="val">${selectedDate}</td>
                  </tr>
                  <tr>
                    <td class="lbl">Time Slot:</td>
                    <td class="val">${selectedSlot}</td>
                  </tr>
                  ${collectionType === 'home' && patientData.address ? `
                  <tr>
                    <td class="lbl">Address:</td>
                    <td class="val">${patientData.address} ${patientData.landmark ? '(' + patientData.landmark + ')' : ''} &bull; <strong>PIN: ${patientData.pincode || 'N/A'}</strong></td>
                  </tr>
                  ` : `
                  <tr>
                    <td class="lbl">Venue:</td>
                    <td class="val">Main Diagnostic Wing (Ground Floor), NIMS Hospital</td>
                  </tr>
                  `}
                </table>
              </div>
            </div>

            <!-- Package Details Box -->
            <div class="package-highlight-box">
              <div class="pkg-row">
                <div>
                  <div class="pkg-name-title">${currentPkg?.name}</div>
                  <span class="pkg-category-tag">${currentPkg?.category || 'Preventive Care'} &bull; ${currentPkg?.testsCount || currentPkg?.tests?.length || 10}+ Clinical Parameters</span>
                  <div style="font-size: 10.5px; color: #64748b; margin-top: 5px;">
                    Key tests include: Complete Blood Count, Liver Function, Kidney Function, Lipid Profile, Sugar, Urine & Physician Review.
                  </div>
                </div>
                <div class="pkg-price-tag">
                  <div class="pkg-price-num">${currentPkg?.price}</div>
                  <div class="pkg-price-note">Payable on Visit / Collection</div>
                  <div style="font-size: 9px; color: #15803d; font-weight: 700; margin-top: 2px;">Cash / UPI / Card accepted</div>
                </div>
              </div>
            </div>

            <!-- Fasting & Sample Guidelines -->
            <div class="guidelines-card">
              <strong>Clinical Preparation & Fasting Guidelines:</strong>
              <ol>
                <li><strong>Fasting Notice:</strong> 10-12 hours overnight fasting is required before morning blood sample (drinking plain water is allowed).</li>
                <li><strong>Verification:</strong> Present this slip or Reference Token (<strong>${tokenNumber}</strong>) at the reception desk or show it to the home phlebotomist.</li>
                <li><strong>Home Sample Collection:</strong> Our certified technician will call you 30 minutes before arriving at your provided address.</li>
                <li><strong>Reports Delivery:</strong> Verified digital reports will be sent directly via WhatsApp and available on the NIMS Patient Portal within 12-24 hours.</li>
              </ol>
            </div>
          </div>

          <!-- Footer Stamp -->
          <div class="slip-footer">
            <div>
              <strong>Computer-Generated Hospital Acknowledgment</strong> &bull; Valid at NIMS Hospital Diagnostic Wing
            </div>
            <div class="stamp-box">
              VERIFIED BOOKING &bull; NIMS DIAGNOSTICS
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create an isolated hidden iframe for printing (guarantees exactly 1 clean page without background web elements)
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(slipHtml);
    doc.close();

    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 2000);
    }, 400);
  };

  return (
    <div className="health-modal-overlay">
      {/* Background click to dismiss */}
      <div 
        className="health-modal-backdrop" 
        onClick={onClose} 
      />

      {/* Main Modal Card */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="health-modal-dialog"
      >
        {/* Modern Modal Header */}
        <div className="health-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              background: '#ffffff',
              padding: '0.35rem 0.6rem',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <img
                src="/assets/images/nims-hospital-logo.svg"
                alt="NIMS Logo"
                style={{ height: '26px', width: 'auto' }}
                onError={(e) => {
                  e.currentTarget.src = "https://nimshospitals.in/assets/images/nims-hospital-logo.svg";
                }}
              />
            </div>
            <div>
              <div style={{ 
                fontSize: '0.74rem', 
                color: 'var(--nims-gold)', 
                fontWeight: 800, 
                textTransform: 'uppercase', 
                letterSpacing: '0.06em',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Sparkles size={12} />
                Preventive Diagnostics Desk
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', margin: 0, fontWeight: 800, letterSpacing: '-0.01em' }}>
                Book Health Package Checkup
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="close-btn"
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              transition: 'background 0.2s',
              flexShrink: 0
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="health-modal-body">
          {!bookingConfirmed ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              
              {/* Selected Package Banner / Card */}
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%)',
                border: '1.5px solid #cbd5e1',
                borderRadius: '16px',
                padding: '1.15rem 1.35rem',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: 'var(--nims-navy)',
                      background: '#ffffff',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid #cbd5e1'
                    }}>
                      {currentPkg?.category || 'Preventive Checkup'}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      color: '#15803d',
                      background: '#dcfce7',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid #bbf7d0'
                    }}>
                      {currentPkg?.discount || 'Subsidized'}
                    </span>
                  </div>

                  {/* Switch Package Quick Dropdown */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>Change:</span>
                    <select
                      value={selectedPackageId}
                      onChange={(e) => setSelectedPackageId(e.target.value)}
                      className="health-modal-select"
                      style={{
                        padding: '0.25rem 0.6rem',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: 'var(--nims-navy)',
                        borderRadius: '8px',
                        border: '1px solid #94a3b8',
                        background: '#ffffff',
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    >
                      {packagesData.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.price})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nims-navy)', margin: '0 0 0.25rem 0' }}>
                      {currentPkg?.name}
                    </h4>
                    <div style={{ fontSize: '0.82rem', color: 'var(--nims-orange)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>★</span> {currentPkg?.badge || 'Comprehensive Wellness'}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <span style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--nims-navy)', letterSpacing: '-0.02em' }}>
                        {currentPkg?.price}
                      </span>
                      {currentPkg?.originalPrice && (
                        <span style={{ fontSize: '0.9rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                          {currentPkg.originalPrice}
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.74rem', color: '#15803d', fontWeight: 700, background: '#ffffff', padding: '0.15rem 0.5rem', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
                      ✓ {currentPkg?.testsCount || currentPkg?.tests?.length || 10}+ Key Tests Included
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 1: Checkup Mode Selection (Hospital vs Home) */}
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--nims-navy)', display: 'block', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  1. Select Sample Collection Mode
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                  {/* Hospital Visit */}
                  <div
                    onClick={() => setCollectionType('hospital')}
                    style={{
                      border: `2px solid ${collectionType === 'hospital' ? 'var(--nims-navy)' : '#e2e8f0'}`,
                      background: collectionType === 'hospital' ? '#f0f7ff' : '#ffffff',
                      borderRadius: '14px',
                      padding: '0.95rem 1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: collectionType === 'hospital' ? 'var(--nims-navy)' : '#f1f5f9',
                      color: collectionType === 'hospital' ? '#ffffff' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Building2 size={20} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                        <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--nims-navy)' }}>
                          Hospital Diagnostic Center
                        </span>
                        {collectionType === 'hospital' && <Check size={16} color="var(--nims-orange)" strokeWidth={3} />}
                      </div>
                      <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0, lineHeight: 1.35 }}>
                        Visit NIMS Hospital Campus (NH-11C). Fast-track VIP registration & on-spot consultation.
                      </p>
                    </div>
                  </div>

                  {/* Home Sample Pickup */}
                  <div
                    onClick={() => setCollectionType('home')}
                    style={{
                      border: `2px solid ${collectionType === 'home' ? 'var(--nims-navy)' : '#e2e8f0'}`,
                      background: collectionType === 'home' ? '#fff9f5' : '#ffffff',
                      borderRadius: '14px',
                      padding: '0.95rem 1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: collectionType === 'home' ? 'var(--nims-orange)' : '#f1f5f9',
                      color: collectionType === 'home' ? '#ffffff' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Home size={20} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                        <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--nims-navy)' }}>
                          Home Sample Collection
                        </span>
                        {collectionType === 'home' && <Check size={16} color="var(--nims-orange)" strokeWidth={3} />}
                      </div>
                      <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0, lineHeight: 1.35 }}>
                        Certified NIMS Phlebotomist visits your doorstep in Jaipur & surrounding areas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Date & Slot Selection */}
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--nims-navy)', display: 'block', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  2. Choose Date & Morning Fasting Slot
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Preferred Date:</span>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="date"
                        value={selectedDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '10px',
                          border: '1.5px solid #cbd5e1',
                          fontSize: '0.88rem',
                          fontWeight: 700,
                          color: 'var(--nims-navy)',
                          outline: 'none',
                          background: '#f8fafc'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Morning Slots */}
                <div>
                  <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Time Slot (Morning Blood Work):</span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', gap: '0.5rem' }}>
                    {morningSlots.map((s) => (
                      <button
                        key={s.time}
                        type="button"
                        onClick={() => setSelectedSlot(s.time)}
                        style={{
                          padding: '0.55rem 0.5rem',
                          borderRadius: '10px',
                          border: `1.5px solid ${selectedSlot === s.time ? 'var(--nims-navy)' : '#e2e8f0'}`,
                          background: selectedSlot === s.time ? 'var(--nims-navy)' : '#ffffff',
                          color: selectedSlot === s.time ? '#ffffff' : 'var(--nims-text)',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '2px',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{s.time}</span>
                        <span style={{
                          fontSize: '0.65rem',
                          color: selectedSlot === s.time ? '#93c5fd' : '#15803d',
                          fontWeight: 800
                        }}>
                          {s.badge}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Patient Information Form */}
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--nims-navy)', display: 'block', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  3. Patient & Contact Information
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <input
                      type="text"
                      placeholder="Patient Full Name *"
                      required
                      value={patientData.fullName}
                      onChange={(e) => setPatientData({ ...patientData, fullName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="WhatsApp / Mobile Number *"
                      required
                      value={patientData.phone}
                      onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <input
                      type="number"
                      placeholder="Age (Years)"
                      min="1"
                      max="120"
                      value={patientData.age}
                      onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <select
                      value={patientData.gender}
                      onChange={(e) => setPatientData({ ...patientData, gender: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: 'var(--nims-text)',
                        outline: 'none',
                        background: '#ffffff'
                      }}
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email (For PDF Report)"
                      value={patientData.email}
                      onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* If Home Collection is chosen, ask for address */}
                {collectionType === 'home' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden', marginTop: '0.5rem' }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                      <input
                        type="text"
                        placeholder="Home Address (House/Flat, Street, Area) *"
                        required
                        value={patientData.address}
                        onChange={(e) => setPatientData({ ...patientData, address: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '10px',
                          border: '1.5px solid #cbd5e1',
                          fontSize: '0.88rem',
                          outline: 'none'
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Landmark / Area (e.g. Mansarovar, Jaipur)"
                        value={patientData.landmark}
                        onChange={(e) => setPatientData({ ...patientData, landmark: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '10px',
                          border: '1.5px solid #cbd5e1',
                          fontSize: '0.88rem',
                          outline: 'none'
                        }}
                      />
                      <input
                        type="text"
                        placeholder="PIN Code (6 Digits) *"
                        required
                        maxLength={6}
                        value={patientData.pincode}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setPatientData({ ...patientData, pincode: val });
                        }}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '10px',
                          border: '1.5px solid #cbd5e1',
                          fontSize: '0.88rem',
                          fontWeight: 700,
                          outline: 'none'
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Fasting & Clinical Guidelines Alert */}
              <div style={{
                background: '#fffbeb',
                border: '1px solid #fef3c7',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.65rem'
              }}>
                <AlertCircle size={18} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.78rem', color: '#92400e', lineHeight: 1.45 }}>
                  <strong>Important Fasting Guidelines:</strong> 10-12 hours overnight fasting is advised for accurate blood sugar, lipid, and liver enzymes (plain water allowed). Digital reports will be delivered directly on your WhatsApp and Patient Portal within 12-24 hours.
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ paddingTop: '0.5rem' }}>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.95rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(10, 47, 94, 0.2)'
                  }}
                >
                  <span>Confirm Package Booking ({currentPkg?.price})</span>
                  <ArrowRight size={18} />
                </motion.button>
                <div style={{ textAlign: 'center', marginTop: '0.65rem', fontSize: '0.74rem', color: '#64748b' }}>
                  🔒 No advance payment required online. Pay securely at lab or home collection via Cash / UPI / Card.
                </div>
              </div>
            </form>
          ) : (
            /* Confirmation State */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ textAlign: 'center', padding: '1.5rem 0.5rem' }}
            >
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: '#dcfce7',
                color: '#15803d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                border: '3px solid #bbf7d0',
                boxShadow: '0 8px 20px rgba(21, 128, 61, 0.15)'
              }}>
                <CheckCircle2 size={44} />
              </div>

              <span style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#15803d',
                background: '#dcfce7',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)'
              }}>
                Checkup Request Confirmed
              </span>

              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--nims-navy)', margin: '0.75rem 0 0.35rem' }}>
                Booking Token Generated!
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '460px', margin: '0 auto 1.5rem' }}>
                Thank you, <strong>{patientData.fullName}</strong>. Your health package slot has been allocated with NIMS Diagnostics.
              </p>

              {/* Token Display Box */}
              <div style={{
                background: 'linear-gradient(135deg, #0a2f5e 0%, #174276 100%)',
                color: '#ffffff',
                borderRadius: '16px',
                padding: '1.25rem',
                maxWidth: '440px',
                margin: '0 auto 1.75rem',
                boxShadow: '0 12px 30px rgba(10, 47, 94, 0.25)',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.65rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--nims-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Reference Token
                  </span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '0.04em', color: '#fff' }}>
                    {tokenNumber}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.84rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#cbd5e1' }}>Package:</span>
                    <strong style={{ color: '#fff' }}>{currentPkg?.name}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#cbd5e1' }}>Total Amount:</span>
                    <strong style={{ color: '#4ade80' }}>{currentPkg?.price} (Pay on visit)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#cbd5e1' }}>Mode:</span>
                    <strong style={{ color: '#fff' }}>
                      {collectionType === 'hospital' ? '🏥 Hospital Diagnostic Center' : '🏠 Home Sample Collection'}
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#cbd5e1' }}>Scheduled Slot:</span>
                    <strong style={{ color: '#fff' }}>{selectedDate} | {selectedSlot}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#cbd5e1' }}>Patient Contact:</span>
                    <strong style={{ color: '#fff' }}>+91 {patientData.phone}</strong>
                  </div>
                  {collectionType === 'home' && patientData.address && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#cbd5e1' }}>Pickup Address:</span>
                      <strong style={{ color: '#fff', textAlign: 'right', maxWidth: '62%' }}>
                        {patientData.address} {patientData.landmark ? `(${patientData.landmark})` : ''} - PIN {patientData.pincode}
                      </strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handlePrintSlip}
                  style={{
                    padding: '0.75rem 1.25rem',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    background: '#ffffff',
                    color: 'var(--nims-navy)',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Printer size={16} />
                  <span>Print Slip</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-primary"
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontSize: '0.88rem',
                    fontWeight: 700
                  }}
                >
                  Done
                </button>
              </div>

              <div style={{ marginTop: '1.5rem', fontSize: '0.78rem', color: '#64748b' }}>
                Need urgent assistance? Call 24x7 Diagnostic Helpline: <strong style={{ color: 'var(--nims-navy)' }}>0141-23 88 999</strong>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
