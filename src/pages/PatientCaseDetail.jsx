import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Heart, ShieldCheck, CheckCircle2, AlertCircle, ArrowLeft,
  Clock, IndianRupee, Users, Share2, Play, X, ArrowRight,
  Lock, Phone, Mail, User, Info, Sparkles, Printer, Check, Download,
  ChevronLeft, ChevronRight, ChevronDown, Calendar, Stethoscope, Building2, Eye, Copy,
  Maximize2, Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackMetaEvent } from '../utils/metaPixel';

// Helper to convert numeric amount to Indian currency words
function amountToWordsINR(amount) {
  const num = Math.floor(amount || 0);
  if (!num) return 'Zero Rupees';
  const a = [
    '', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ',
    'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '
  ];
  const b = ['', '', 'Twenty ', 'Thirty ', 'Forty ', 'Fifty ', 'Sixty ', 'Seventy ', 'Eighty ', 'Ninety '];

  function inWords(n) {
    if ((n = n.toString()).length > 9) return 'overflow';
    const n_arr = ('000000000' + n).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n_arr) return '';
    let str = '';
    str += (Number(n_arr[1]) !== 0) ? (a[Number(n_arr[1])] || b[Number(n_arr[1][0])] + a[Number(n_arr[1][1])]) + 'Crore ' : '';
    str += (Number(n_arr[2]) !== 0) ? (a[Number(n_arr[2])] || b[Number(n_arr[2][0])] + a[Number(n_arr[2][1])]) + 'Lakh ' : '';
    str += (Number(n_arr[3]) !== 0) ? (a[Number(n_arr[3])] || b[Number(n_arr[3][0])] + a[Number(n_arr[3][1])]) + 'Thousand ' : '';
    str += (Number(n_arr[4]) !== 0) ? (a[Number(n_arr[4])] || b[Number(n_arr[4][0])] + a[Number(n_arr[4][1])]) + 'Hundred ' : '';
    str += (Number(n_arr[5]) !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n_arr[5])] || b[Number(n_arr[5][0])] + a[Number(n_arr[5][1])]) : '';
    return str.trim();
  }

  return `Rupees ${inWords(num)} Only`;
}

export default function PatientCaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

  // Campaign State
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gallery Active Photo & Media
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [activeMediaType, setActiveMediaType] = useState('photo'); // 'photo' | 'video'

  // Video Modal
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Share Feedback
  const [copiedLink, setCopiedLink] = useState(false);

  // Story expand/collapse
  const [isStoryExpanded, setIsStoryExpanded] = useState(false);

  // Contributions List Modal State
  const [showContributionsModal, setShowContributionsModal] = useState(false);
  const [contributionsList, setContributionsList] = useState([]);
  const [loadingContributions, setLoadingContributions] = useState(false);

  const handleOpenContributions = async () => {
    setShowContributionsModal(true);
    setLoadingContributions(true);
    try {
      const res = await fetch(`${baseUrl}/crowdfunding/campaigns/${campaign._id}/contributions`);
      const json = await res.json();
      if (json && json.success) {
        setContributionsList(json.data || []);
      } else {
        setContributionsList([]);
      }
    } catch (err) {
      console.error('Error fetching contributions:', err);
      setContributionsList([]);
    } finally {
      setLoadingContributions(false);
    }
  };

  // Donation Form State
  const [donationAmount, setDonationAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorMobile, setDonorMobile] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Payment Success State
  const [successDonation, setSuccessDonation] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState('');
  const [customEmailInput, setCustomEmailInput] = useState('');

  const presetAmounts = [500, 1000, 2500, 5000];

  // Fetch campaign by ID
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${baseUrl}/crowdfunding/campaigns/${encodeURIComponent(id)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.data) {
          setCampaign(data.data);
          setError(null);
        } else {
          setError(data.message || 'Patient case not found.');
        }
      })
      .catch((err) => {
        console.error('Error fetching patient case:', err);
        setError('Unable to load patient details at this time.');
      })
      .finally(() => setLoading(false));
  }, [id, baseUrl]);

  // Check URL params for return from gateway
  useEffect(() => {
    const donationStatus = searchParams.get('donationStatus');
    const orderId = searchParams.get('orderId');

    if (donationStatus === 'success' && orderId) {
      verifyAndShowSuccess(orderId);
    }
  }, [searchParams]);

  const verifyAndShowSuccess = async (orderId) => {
    try {
      const res = await fetch(`${baseUrl}/crowdfunding/donations/status/${encodeURIComponent(orderId)}`);
      const json = await res.json();
      if (json && json.success && json.data) {
        setSuccessDonation(json.data);
        setShowSuccessModal(true);

        // Fire Meta Pixel Standard Donate Conversion Event (Pixel ID: 1479647817384879)
        trackMetaEvent('Donate', {
          value: json.data.amount,
          currency: 'INR',
          content_name: json.data.patientName || 'NIMS Patient Relief Fund',
          order_id: json.data.orderId
        });
      }
    } catch (err) {
      console.error('Error verifying donation receipt:', err);
    }
  };

  const handleSendReceiptEmail = async (targetEmail) => {
    if (!targetEmail || !targetEmail.trim() || !targetEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    try {
      setEmailSending(true);
      setEmailSentSuccess('');
      const res = await fetch(`${baseUrl}/crowdfunding/donations/${encodeURIComponent(successDonation.orderId)}/resend-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail.trim() })
      });
      const data = await res.json();
      if (data && data.success) {
        setEmailSentSuccess(data.message || `Receipt dispatched to ${targetEmail}`);
        setSuccessDonation(prev => ({ ...prev, donorEmail: targetEmail.trim() }));
      } else {
        alert(data.message || 'Failed to dispatch email.');
      }
    } catch (err) {
      console.error('Error sending receipt email:', err);
      alert('Error connecting to email service.');
    } finally {
      setEmailSending(false);
    }
  };

  const handleCopyShare = () => {
    const url = window.location.href;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareClick = async () => {
    const title = campaign?.title || `Support ${campaign?.patientName}'s Medical Treatment`;
    const text = `Urgent Medical Appeal: Support ${campaign?.patientName} fighting ${campaign?.diagnosis} at NIMS Hospital Jaipur. Donate directly at:`;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url
        });
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`, '_blank');
        }
        return;
      }
    }

    // Fallback: WhatsApp share
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`, '_blank');
  };

  const handleProceedToPayment = async (e) => {
    e.preventDefault();

    const finalAmount = customAmount ? parseFloat(customAmount) : donationAmount;

    // Validation
    if (!finalAmount || isNaN(finalAmount) || finalAmount < 1) {
      setFormError('Please enter a valid donation amount (minimum ₹1).');
      return;
    }
    if (!donorName.trim()) {
      setFormError('Please enter your full name (Mandatory for transaction verification).');
      return;
    }
    const cleanMobile = donorMobile.trim().replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setFormError('');
    setSubmitting(true);

    // Track Meta Pixel InitiateCheckout (Pixel ID: 1479647817384879)
    trackMetaEvent('InitiateCheckout', {
      value: finalAmount,
      currency: 'INR',
      content_name: campaign.patientName,
      num_items: 1
    });

    try {
      const currentOrigin = window.location.origin;
      const returnUrl = `${currentOrigin}/help/${campaign._id}?donationStatus=success`;

      const response = await fetch(`${baseUrl}/crowdfunding/donate/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId: campaign._id,
          amount: finalAmount,
          donorName: donorName.trim(),
          donorMobile: cleanMobile,
          donorEmail: donorEmail.trim(),
          isPrivate,
          returnUrl
        })
      });

      const data = await response.json();

      if (data && data.success && data.paymentUrl) {
        // Redirect to Gateway (ICICI or simulated portal)
        window.location.href = data.paymentUrl;
      } else {
        setFormError(data.message || 'Unable to open payment gateway. Please try again.');
        setSubmitting(false);
      }
    } catch (err) {
      console.error('Error initiating donation:', err);
      setFormError('Network connection issue. Please check your internet and try again.');
      setSubmitting(false);
    }
  };

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return '';
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
      }
    } catch (_) { }
    return url;
  };

  const isDirectVideoUrl = (url) => {
    if (!url) return false;
    return !!(
      url.match(/\.(mp4|webm|mov|m4v|ogg)($|\?)/i) ||
      url.includes('s3.') ||
      url.includes('amazonaws.com')
    );
  };

  if (loading) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div className="animate-spin" style={{ width: '42px', height: '42px', border: '3.5px solid #cbd5e1', borderTopColor: '#bd171c', borderRadius: '50%', marginBottom: '1rem' }} />
        <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#475569' }}>Loading verified medical case details...</p>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', textAlign: 'center', background: '#f8fafc' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          <AlertCircle size={34} />
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 850, color: '#0f172a', margin: '0 0 0.5rem' }}>{error || 'Patient Appeal Not Found'}</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b', maxWidth: '460px', margin: '0 0 1.5rem', lineHeight: 1.6 }}>
          This appeal may have reached its full treatment goal or been closed by the hospital administration.
        </p>
        <Link
          to="/help"
          className="btn btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={16} />
          <span>View All Active Patient Appeals</span>
        </Link>
      </div>
    );
  }

  const target = campaign.targetAmount || 1;
  const raised = campaign.raisedAmount || 0;
  const percent = Math.min(100, Math.round((raised / target) * 100));
  const remaining = Math.max(0, target - raised);
  const images = (campaign.images && campaign.images.length > 0) ? campaign.images : ['/assets/images/hospital-img.png'];
  const isCritical = campaign.urgency === 'Critical';

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '5rem' }}>

      {/* ── 1. Top Breadcrumb & Return Bar ── */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '0.85rem 1rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>

          <nav aria-label="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>
            <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>HOME</Link>
            <ChevronRight size={13} />
            <Link to="/help" style={{ color: '#64748b', textDecoration: 'none' }}>PATIENT RELIEF</Link>
            <ChevronRight size={13} />
            <span style={{ color: '#bd171c', textTransform: 'uppercase' }}>{campaign.patientName}</span>
          </nav>

          <Link
            to="/help"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              fontWeight: 800,
              color: '#bd171c',
              textDecoration: 'none',
              padding: '0.35rem 0.85rem',
              borderRadius: '8px',
              background: '#fef2f2',
              border: '1px solid #fee2e2'
            }}
          >
            <ArrowLeft size={14} />
            <span>All Hospital Appeals</span>
          </Link>
        </div>
      </section>

      {/* ── 2. Patient Case Hero Header (Dynamic Custom Title & Caring Nurse/Patient Background) ── */}
      <section style={{
        background: "linear-gradient(to right, rgba(90, 14, 22, 0.92) 0%, rgba(110, 18, 28, 0.82) 40%, rgba(130, 20, 32, 0.6) 70%, rgba(0, 0, 0, 0.2) 100%), url('/images/case-detail-hero-bg.jpg') right center / cover no-repeat",
        color: '#ffffff',
        padding: '1.75rem 1rem 2.35rem',
        borderBottom: '3px solid #f47521',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 1rem', position: 'relative', zIndex: 2 }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
            <span style={{
              background: isCritical ? '#dc2626' : '#ea580c',
              color: '#ffffff',
              padding: '0.22rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.68rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 2px 10px rgba(220, 38, 38, 0.4)'
            }}>
              <span className="pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffffff', display: 'inline-block' }} />
              {campaign.urgency || 'Urgent'} Clinical Relief
            </span>

            <span style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              padding: '0.22rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.68rem',
              fontWeight: 800,
              textTransform: 'uppercase'
            }}>
              {campaign.department} Department
            </span>

            <span style={{
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              color: '#34d399',
              padding: '0.22rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.68rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <ShieldCheck size={13} />
              <span>100% Hospital Directed &bull; Zero Fees</span>
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.28rem, 2.3vw, 1.72rem)',
            fontWeight: 900,
            lineHeight: 1.25,
            margin: '0 0 0.5rem',
            color: '#ffffff',
            maxWidth: '850px',
            textShadow: '0 2px 10px rgba(0,0,0,0.35)'
          }}>
            {campaign.title ? campaign.title : (
              <>Support <span style={{ color: '#fb923c' }}>{campaign.patientName}</span>’s Critical Treatment</>
            )}
          </h1>

          <p style={{
            fontSize: 'clamp(0.78rem, 1.1vw, 0.88rem)',
            color: '#cbd5e1',
            maxWidth: '820px',
            lineHeight: 1.5,
            margin: 0
          }}>
            Diagnosis: <b style={{ color: '#ffffff' }}>{campaign.diagnosis}</b>{campaign.treatment ? <> &bull; Fund Needed For: <b style={{ color: '#ffffff' }}>{campaign.treatment}</b></> : null} &bull; Attending Consultant: <b style={{ color: '#ffffff' }}>{campaign.doctorName?.trim().match(/^dr\.?/i) ? campaign.doctorName.trim() : `Dr. ${campaign.doctorName?.trim() || 'Faculty Clinical Board'}`}</b> &bull; Admitted at NIMS Hospital, Jaipur.
          </p>
        </div>
      </section>

      {/* ── 3. Main Two-Column Layout (Expanded to 1440px to cover left/right empty gutters) ── */}
      <section style={{ maxWidth: '1440px', margin: '2rem auto 0', padding: '0 1.25rem', position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>

          {/* ════ LEFT COLUMN: Visuals, Medical Case & Narrative ════ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            {/* Media Gallery Card */}
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '1.5px solid #e2e8f0',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
            }}>
              {/* Media Switcher Header Bar with Outside Share Button */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 16px',
                background: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setActiveMediaType('photo')}
                    style={{
                      padding: '0.42rem 0.95rem',
                      borderRadius: '10px',
                      border: 'none',
                      background: activeMediaType === 'photo' ? '#0f172a' : '#e2e8f0',
                      color: activeMediaType === 'photo' ? '#ffffff' : '#475569',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Eye size={13} />
                    <span>Patient Photos ({images.length})</span>
                  </button>

                  {campaign.videoUrl && (
                    <button
                      type="button"
                      onClick={() => setActiveMediaType('video')}
                      style={{
                        padding: '0.42rem 0.95rem',
                        borderRadius: '10px',
                        border: 'none',
                        background: activeMediaType === 'video' ? '#bd171c' : '#e2e8f0',
                        color: activeMediaType === 'video' ? '#ffffff' : '#475569',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <Play size={12} fill={activeMediaType === 'video' ? '#ffffff' : '#475569'} />
                      <span>Video Appeal</span>
                    </button>
                  )}
                </div>

                {/* Share Button (Outside Photo Viewport) */}
                <button
                  type="button"
                  onClick={handleShareClick}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '10px',
                    padding: '0.38rem 0.85rem',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    cursor: 'pointer',
                    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.15s ease'
                  }}
                  title="Share this patient appeal"
                >
                  <Share2 size={13} color="#16a34a" />
                  <span>Share Appeal</span>
                </button>
              </div>

              {/* Primary Viewport (Photo or Inline Video Player) - 16:10 Aspect Ratio, No Cropping */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', maxHeight: '460px', background: '#0a0f1d', overflow: 'hidden' }}>

                {/* ── PHOTO VIEW (Clean Photo, Zero Play Overlay) ── */}
                {activeMediaType === 'photo' ? (
                  <>
                    <img
                      src={images[activePhotoIndex]}
                      alt={`${campaign.patientName} Medical Care`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 15%',
                        display: 'block'
                      }}
                    />

                    {/* Image Slider Controls (Left / Right Chevrons) */}
                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                          aria-label="Previous photo"
                          style={{
                            position: 'absolute',
                            left: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 4,
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'rgba(15, 23, 42, 0.8)',
                            backdropFilter: 'blur(8px)',
                            color: '#ffffff',
                            border: '1px solid rgba(255, 255, 255, 0.35)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
                            transition: 'transform 0.15s ease'
                          }}
                        >
                          <ChevronLeft size={22} />
                        </button>

                        <button
                          type="button"
                          onClick={() => setActivePhotoIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                          aria-label="Next photo"
                          style={{
                            position: 'absolute',
                            right: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 4,
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'rgba(15, 23, 42, 0.8)',
                            backdropFilter: 'blur(8px)',
                            color: '#ffffff',
                            border: '1px solid rgba(255, 255, 255, 0.35)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
                            transition: 'transform 0.15s ease'
                          }}
                        >
                          <ChevronRight size={22} />
                        </button>
                      </>
                    )}

                    {/* S3 Image Indicator Badge */}
                    <span style={{
                      position: 'absolute',
                      bottom: '14px',
                      left: '14px',
                      zIndex: 3,
                      background: 'rgba(15, 23, 42, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: '#ffffff',
                      fontSize: '0.74rem',
                      fontWeight: 750,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Eye size={13} />
                      <span>Verified Clinical Media ({activePhotoIndex + 1}/{images.length})</span>
                    </span>

                    {/* Dots indicator at bottom right if multiple images */}
                    {images.length > 1 && (
                      <div style={{
                        position: 'absolute',
                        bottom: '14px',
                        right: '14px',
                        zIndex: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: 'rgba(0, 0, 0, 0.65)',
                        backdropFilter: 'blur(8px)',
                        padding: '4px 10px',
                        borderRadius: '999px'
                      }}>
                        {images.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            type="button"
                            onClick={() => setActivePhotoIndex(dotIdx)}
                            style={{
                              width: activePhotoIndex === dotIdx ? '16px' : '6px',
                              height: '6px',
                              borderRadius: '999px',
                              background: activePhotoIndex === dotIdx ? '#ffffff' : 'rgba(255, 255, 255, 0.45)',
                              border: 'none',
                              padding: 0,
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  /* ── INLINE VIDEO PLAYER VIEW (Plays right here inside the card) ── */
                  <div style={{ width: '100%', height: '100%', position: 'relative', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isDirectVideoUrl(campaign.videoUrl) ? (
                      <video
                        src={campaign.videoUrl}
                        controls
                        autoPlay
                        playsInline
                        style={{
                          width: '100%',
                          height: '100%',
                          maxHeight: '420px',
                          objectFit: 'contain',
                          background: '#000000'
                        }}
                      />
                    ) : (
                      <iframe
                        src={getYoutubeEmbedUrl(campaign.videoUrl)}
                        title="Patient Video Appeal"
                        style={{
                          width: '100%',
                          height: '100%',
                          border: 'none',
                          background: '#000000'
                        }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}

                    {/* Expand Fullscreen Popup Button */}
                    <button
                      type="button"
                      onClick={() => setIsVideoOpen(true)}
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        zIndex: 5,
                        background: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(8px)',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.35)',
                        borderRadius: '999px',
                        padding: '0.42rem 0.9rem',
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
                        transition: 'all 0.15s ease'
                      }}
                      title="Expand Video in Popup Modal"
                    >
                      <Maximize2 size={13} />
                      <span>Expand Popup</span>
                    </button>

                    {/* Video Badge */}
                    <span style={{
                      position: 'absolute',
                      bottom: '14px',
                      left: '14px',
                      zIndex: 5,
                      background: 'rgba(15, 23, 42, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: '#ffffff',
                      fontSize: '0.74rem',
                      fontWeight: 750,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Video size={13} color="#f87171" />
                      <span>Verified Clinical Video Appeal</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails Strip (Photos + Video Thumbnail) */}
              {(images.length > 1 || campaign.videoUrl) && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  background: '#f8fafc',
                  overflowX: 'auto',
                  borderTop: '1px solid #e2e8f0'
                }}>
                  {images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActiveMediaType('photo');
                        setActivePhotoIndex(idx);
                      }}
                      style={{
                        width: '74px',
                        height: '56px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: activeMediaType === 'photo' && activePhotoIndex === idx ? '2.5px solid #bd171c' : '1.5px solid #cbd5e1',
                        padding: 0,
                        cursor: 'pointer',
                        flexShrink: 0,
                        opacity: activeMediaType === 'photo' && activePhotoIndex === idx ? 1 : 0.65,
                        transition: 'all 0.2s ease',
                        boxShadow: activeMediaType === 'photo' && activePhotoIndex === idx ? '0 2px 8px rgba(189, 23, 28, 0.3)' : 'none'
                      }}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}

                  {/* Video Thumbnail Button */}
                  {campaign.videoUrl && (
                    <button
                      type="button"
                      onClick={() => setActiveMediaType('video')}
                      style={{
                        width: '84px',
                        height: '56px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: activeMediaType === 'video' ? '2.5px solid #bd171c' : '1.5px solid #cbd5e1',
                        padding: '4px',
                        cursor: 'pointer',
                        flexShrink: 0,
                        background: '#0f172a',
                        color: '#ffffff',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '3px',
                        opacity: activeMediaType === 'video' ? 1 : 0.75,
                        transition: 'all 0.2s ease',
                        boxShadow: activeMediaType === 'video' ? '0 2px 8px rgba(189, 23, 28, 0.3)' : 'none'
                      }}
                      title="Watch Patient Video Appeal"
                    >
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#bd171c',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Play size={12} fill="#ffffff" style={{ marginLeft: '1px' }} />
                      </div>
                      <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                        Video
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Medical Summary Details Bar */}
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1.5px solid #e2e8f0',
              padding: '1.5rem',
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)'
            }}>
              <h3 style={{ fontSize: '1.08rem', fontWeight: 850, color: '#0f172a', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Stethoscope size={18} color="#bd171c" />
                <span>Hospital Admission &amp; Clinical Audit</span>
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                fontSize: '0.86rem'
              }}>
                <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #edf2f7' }}>
                  <span style={{ color: '#64748b', fontSize: '0.74rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Age</span>
                  <b style={{ color: '#0f172a' }}>{campaign.age} Yrs</b>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #edf2f7' }}>
                  <span style={{ color: '#64748b', fontSize: '0.74rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Gender</span>
                  <b style={{ color: '#0f172a' }}>{campaign.gender}</b>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #edf2f7' }}>
                  <span style={{ color: '#64748b', fontSize: '0.74rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Department</span>
                  <b style={{ color: '#bd171c' }}>{campaign.department}</b>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #edf2f7' }}>
                  <span style={{ color: '#64748b', fontSize: '0.74rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Attending Clinician</span>
                  <b style={{ color: '#0f172a' }}>{campaign.doctorName?.trim().match(/^dr\.?/i) ? campaign.doctorName.trim() : `Dr. ${campaign.doctorName?.trim() || 'Faculty Medical Board'}`}</b>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #edf2f7' }}>
                  <span style={{ color: '#64748b', fontSize: '0.74rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Fund Needed For</span>
                  <b style={{ color: '#059669' }}>{campaign.treatment || 'Direct Patient Clinical Care'}</b>
                </div>
              </div>
            </div>

            {/* Case Medical Summary Narrative */}
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '1.5px solid #e2e8f0',
              padding: '2rem 1.75rem',
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)'
            }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 850, color: '#0f172a', margin: '0 0 1rem 0' }}>
                Medical Summary &amp; Hospital Relief Appeal
              </h2>

              {/* Narrative Text with 4-5 Lines Truncation & Read More */}
              <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
                <div style={{
                  fontSize: '0.94rem',
                  color: '#334155',
                  lineHeight: 1.8,
                  maxHeight: isStoryExpanded ? 'none' : '135px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}>
                  {(campaign.story || 'Patient is admitted under intensive medical care at NIMS Hospital Jaipur. Urgent financial relief is requested to fund emergency surgical, ICU, and pharmacological care.')
                    .split(/\n\s*\n/)
                    .map((para, pIdx) => (
                      <p key={pIdx} style={{ margin: '0 0 1rem 0', whiteSpace: 'pre-line' }}>
                        {para.trim()}
                      </p>
                    ))}
                </div>

                {/* Fade gradient overlay when collapsed */}
                {!isStoryExpanded && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '60px',
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
                    pointerEvents: 'none'
                  }} />
                )}
              </div>

              {/* Read More / Show Less Button */}
              <button
                type="button"
                onClick={() => setIsStoryExpanded(prev => !prev)}
                style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  color: '#1d4ed8',
                  padding: '0.42rem 0.95rem',
                  borderRadius: '10px',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  marginBottom: '1.25rem',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{isStoryExpanded ? 'Show Less' : 'Read Full Story'}</span>
                <ChevronDown size={14} style={{ transform: isStoryExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
              </button>

              {/* Reassuring Hospital Notice */}
              <div style={{
                background: '#f0fdf4',
                border: '1.5px solid #bbf7d0',
                borderRadius: '16px',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <ShieldCheck size={24} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.84rem', color: '#166534', lineHeight: 1.55 }}>
                  <b>100% Direct Hospital Clinical Allocation:</b> Every rupee donated through this page is directly credited into {campaign.patientName}'s official hospital medical treatment at NIMS Hospital Jaipur. Zero administrative fees or commission is deducted.
                </div>
              </div>
            </div>

            {/* 24x7 Hospital Helpdesk & Case Verification Card */}
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '20px',
              border: '1.5px solid #e2e8f0',
              padding: '1.35rem 1.6rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: '#eff6ff',
                  border: '1.5px solid #bfdbfe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1d4ed8',
                  flexShrink: 0
                }}>
                  <Phone size={22} />
                </div>
                <div>
                  <span style={{ fontSize: '0.94rem', fontWeight: 850, color: '#0f172a', display: 'block', letterSpacing: '-0.01em' }}>
                    For Any Support, Case Verification or Info
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', marginTop: '2px' }}>
                    24×7 NIMS Hospital Patient Care & Medical Relief Desk
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href="tel:01412388999"
                  style={{
                    padding: '0.62rem 1.15rem',
                    borderRadius: '12px',
                    background: '#0f172a',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    boxShadow: '0 2px 10px rgba(15, 23, 42, 0.2)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Phone size={14} color="#f87171" />
                  <span>Call: 0141-23 88 999</span>
                </a>

                <a
                  href={`https://wa.me/911412388999?text=${encodeURIComponent(`Hello NIMS Hospital Support Desk, I need information / case verification regarding patient relief appeal: ${campaign.patientName} (${window.location.href})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.62rem 1.2rem',
                    borderRadius: '12px',
                    background: '#25D366',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    boxShadow: '0 2px 10px rgba(37, 211, 102, 0.25)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.584 1.777.893 2.791.893 3.18 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.779-5.767-5.779zm9.969 5.768c0 5.518-4.482 10-10 10-1.761 0-3.411-.458-4.851-1.258l-7.149 1.872 1.905-6.969c-.901-1.503-1.423-3.262-1.423-5.145 0-5.518 4.482-10 10-10s10 4.482 10 10z" />
                  </svg>
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

          </div>

          {/* ════ RIGHT COLUMN: High-Impact Glowing Sticky Donation Card ════ */}
          <div style={{ position: 'sticky', top: '90px' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '2px solid #bd171c',
              padding: '1.75rem',
              boxShadow: '0 12px 40px rgba(189, 23, 28, 0.12)',
              position: 'relative'
            }}>

              {/* Highlight Ribbon */}
              <div style={{
                position: 'absolute',
                top: '-13px',
                left: '24px',
                background: 'linear-gradient(135deg, #bd171c 0%, #f47521 100%)',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 900,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '0.24rem 0.85rem',
                borderRadius: '999px',
                boxShadow: '0 4px 12px rgba(189, 23, 28, 0.4)'
              }}>
                Direct Patient Medical Care
              </div>

              {/* Goal & Live Progress */}
              <div style={{ marginTop: '0.5rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '6px', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontSize: '1.65rem', fontWeight: 900, color: '#0f172a' }}>
                    ₹{raised.toLocaleString('en-IN')}
                    <span style={{ fontSize: '0.84rem', color: '#64748b', fontWeight: 600 }}> raised</span>
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.92rem', fontWeight: 900, color: percent >= 100 ? '#059669' : '#bd171c' }}>
                      {percent}% Funded
                    </span>
                    <span style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>&bull;</span>
                    <button
                      type="button"
                      onClick={handleOpenContributions}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        color: '#2563eb',
                        fontSize: '0.84rem',
                        fontWeight: 750,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        textUnderlineOffset: '2px'
                      }}
                      title="Click to view supporters"
                    >
                      <Users size={13} color="#2563eb" />
                      <span>{campaign.donorsCount || 0} Contributions</span>
                    </button>
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <div style={{
                    width: `${percent}%`,
                    height: '100%',
                    background: percent >= 100 ? '#10b981' : 'linear-gradient(90deg, #bd171c 0%, #f47521 100%)',
                    borderRadius: '999px',
                    transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  }} />
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '10px',
                  padding: '0.5rem 0.85rem',
                  background: '#fff1f2',
                  border: '1px solid #fecaca',
                  borderRadius: '10px'
                }}>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700 }}>
                    Target: <strong style={{ color: '#0f172a' }}>₹{target.toLocaleString('en-IN')}</strong>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#be123c', fontWeight: 850 }}>
                    ₹{remaining.toLocaleString('en-IN')} more needed
                  </div>
                </div>
              </div>

              {/* Donation Form */}
              <form onSubmit={handleProceedToPayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {formError && (
                  <div style={{
                    background: '#fee2e2',
                    border: '1.5px solid #fca5a5',
                    borderRadius: '12px',
                    padding: '0.75rem 1rem',
                    fontSize: '0.82rem',
                    color: '#991b1b',
                    fontWeight: 700
                  }}>
                    {formError}
                  </div>
                )}

                {/* Preset Amount Chips */}
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>
                    Select Contribution Amount:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                    {presetAmounts.map((amt) => {
                      const isSelected = !customAmount && donationAmount === amt;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setDonationAmount(amt);
                            setCustomAmount('');
                            setFormError('');
                            // Dynamic Meta Pixel Event Track
                            trackMetaEvent('Donate_Click', {
                              patient_name: campaign.patientName,
                              campaign_id: campaign._id,
                              amount: amt
                            }, true);
                          }}
                          style={{
                            padding: '0.65rem 0.2rem',
                            borderRadius: '12px',
                            border: isSelected ? '2px solid #bd171c' : '1.5px solid #cbd5e1',
                            background: isSelected ? '#fef2f2' : '#ffffff',
                            color: isSelected ? '#bd171c' : '#1e293b',
                            fontWeight: 850,
                            fontSize: '0.88rem',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          ₹{amt.toLocaleString('en-IN')}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Amount */}
                <div style={{ position: 'relative' }}>
                  <IndianRupee size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input
                    type="number"
                    min="1"
                    placeholder="Or enter custom amount in ₹..."
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setFormError('');
                    }}
                    style={{
                      width: '100%',
                      padding: '0.72rem 1rem 0.72rem 2.25rem',
                      borderRadius: '12px',
                      border: customAmount ? '2px solid #bd171c' : '1.5px solid #cbd5e1',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Mandatory Donor Name */}
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '0.35rem' }}>
                    Your Full Name <span style={{ color: '#bd171c' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '0.72rem 1rem 0.72rem 2.25rem',
                        borderRadius: '12px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Mandatory Mobile Number */}
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '0.35rem' }}>
                    Mobile Number <span style={{ color: '#bd171c' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={donorMobile}
                      onChange={(e) => setDonorMobile(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '0.72rem 1rem 0.72rem 2.25rem',
                        borderRadius: '12px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Optional Email */}
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem' }}>
                    Email Address <span style={{ color: '#94a3b8', fontWeight: 500 }}>(Optional for PDF receipt)</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                      type="email"
                      placeholder="e.g. ramesh@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.72rem 1rem 0.72rem 2.25rem',
                        borderRadius: '12px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Privacy Switch */}
                <div
                  onClick={() => setIsPrivate(!isPrivate)}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #edf2f7',
                    borderRadius: '12px',
                    padding: '0.75rem 0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Lock size={15} color={isPrivate ? '#059669' : '#64748b'} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 750, color: '#1e293b' }}>
                      Keep my donation private
                    </span>
                  </div>
                  <div style={{
                    width: '36px',
                    height: '20px',
                    borderRadius: '999px',
                    background: isPrivate ? '#10b981' : '#cbd5e1',
                    position: 'relative',
                    transition: 'background 0.2s ease',
                    flexShrink: 0
                  }}>
                    <div style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      position: 'absolute',
                      top: '3px',
                      left: isPrivate ? '19px' : '3px',
                      transition: 'left 0.2s ease',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                    }} />
                  </div>
                </div>

                {/* ════ HIGHLIGHTED HIGH-IMPACT DONATE BUTTON ════ */}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    padding: '1.1rem 1.25rem',
                    borderRadius: '16px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #bd171c 0%, #e02424 50%, #f47521 100%)',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '1.08rem',
                    letterSpacing: '0.02em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(189, 23, 28, 0.45)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: submitting ? 'none' : 'translateY(0)',
                    opacity: submitting ? 0.75 : 1
                  }}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin" style={{ width: '18px', height: '18px', border: '2.5px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%' }} />
                      <span>Opening ICICI Gateway...</span>
                    </>
                  ) : (
                    <>
                      <Heart size={20} fill="#ffffff" />
                      <span>Proceed to Donate ₹{(customAmount ? parseFloat(customAmount) || 0 : donationAmount).toLocaleString('en-IN')}</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                {/* Gateway Trust Marks */}
                <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <ShieldCheck size={14} color="#059669" />
                  <span>Secured by ICICI Bank PG &bull; 100% Direct Hospital Credit</span>
                </div>

              </form>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. Video Player Modal ── */}
      {isVideoOpen && campaign.videoUrl && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          background: 'rgba(0, 0, 0, 0.88)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{ background: '#000000', borderRadius: '20px', width: '100%', maxWidth: '850px', overflow: 'hidden', position: 'relative' }}>
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                zIndex: 2,
                background: 'rgba(255, 255, 255, 0.25)',
                border: 'none',
                color: '#ffffff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
            {isDirectVideoUrl(campaign.videoUrl) ? (
              <video
                src={campaign.videoUrl}
                controls
                autoPlay
                playsInline
                style={{ width: '100%', maxHeight: '78vh', display: 'block', margin: '0 auto', background: '#000000' }}
              />
            ) : (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src={getYoutubeEmbedUrl(campaign.videoUrl)}
                  title="Patient Story Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 5. Verified Contributions & Donors Modal ── */}
      <AnimatePresence>
        {showContributionsModal && (
          <div
            onClick={() => setShowContributionsModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(6px)'
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '480px',
                maxHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3)',
                border: '1.5px solid #e2e8f0'
              }}
            >
              {/* Modal Header */}
              <div style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid #edf2f7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#ffffff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#eff6ff',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Users size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 850, color: '#0f172a' }}>
                      Verified Contributions
                    </h3>
                    <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                      For {campaign.patientName} &bull; Case ID #{campaign._id?.slice(-6)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowContributionsModal(false)}
                  style={{
                    background: '#f1f5f9',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#64748b'
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Summary Stats Row */}
              <div style={{
                padding: '0.9rem 1.5rem',
                background: '#f8fafc',
                borderBottom: '1px solid #edf2f7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                    Total Raised
                  </span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#059669' }}>
                    ₹{(campaign.raisedAmount || 0).toLocaleString('en-IN')}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                    Total Donors
                  </span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#1e293b' }}>
                    {campaign.donorsCount || 0} Supporters
                  </div>
                </div>
              </div>

              {/* Scrollable Donors List */}
              <div style={{
                padding: '1rem 1.5rem',
                overflowY: 'auto',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                {loadingContributions ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0', color: '#64748b' }}>
                    <div className="animate-spin" style={{ width: '28px', height: '28px', border: '3px solid #cbd5e1', borderTopColor: '#bd171c', borderRadius: '50%', margin: '0 auto 0.75rem' }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Loading verified hospital ledger...</span>
                  </div>
                ) : contributionsList.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#64748b' }}>
                    <Heart size={36} color="#cbd5e1" style={{ margin: '0 auto 0.5rem' }} />
                    <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>No public contributions yet</p>
                    <p style={{ margin: '4px 0 0', fontSize: '0.78rem' }}>Be the first verified supporter to fund {campaign.patientName}'s treatment!</p>
                  </div>
                ) : (
                  contributionsList.map((item, idx) => (
                    <div
                      key={item._id || idx}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: '14px',
                        background: '#f8fafc',
                        border: '1px solid #edf2f7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: item.isPrivate ? '#f1f5f9' : '#fee2e2',
                          color: item.isPrivate ? '#64748b' : '#bd171c',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.85rem'
                        }}>
                          {item.isPrivate ? <Lock size={15} /> : (item.donorName ? item.donorName.charAt(0).toUpperCase() : 'S')}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
                            {item.isPrivate ? 'Anonymous Supporter' : (item.donorName || 'Hospital Supporter')}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent Contribution'}
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '1.02rem', fontWeight: 900, color: '#059669' }}>
                          ₹{(item.amount || 0).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Modal Footer Note */}
              <div style={{
                padding: '0.85rem 1.5rem',
                borderTop: '1px solid #edf2f7',
                background: '#f8fafc',
                fontSize: '0.74rem',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <ShieldCheck size={14} color="#059669" />
                <span>100% of these contributions are audited and credited directly into patient folio.</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 5. Payment Success & Official Receipt Modal ── */}
      {showSuccessModal && successDonation && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          overflowY: 'auto'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '540px',
            padding: '2rem 1.75rem',
            textAlign: 'center',
            boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
            animation: 'scaleUp 0.3s ease-out',
            margin: 'auto'
          }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <CheckCircle2 size={40} />
            </div>

            <span style={{ fontSize: '0.76rem', fontWeight: 850, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Payment Verified &bull; Direct Hospital Medical Care Credited
            </span>

            <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0f172a', margin: '0.35rem 0 0.4rem 0' }}>
              Thank You for Your Compassion!
            </h3>

            <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.5, margin: '0 0 1.25rem 0' }}>
              Your contribution of <b style={{ color: '#0f172a' }}>₹{(successDonation.amount || 0).toLocaleString('en-IN')}</b> has been successfully credited directly to the hospital medical treatment of <b style={{ color: '#bd171c' }}>{successDonation.patientName}</b>.
            </p>

            {/* Official Digital Receipt Ticket Card */}
            <div style={{
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderRadius: '16px',
              padding: '1.15rem',
              textAlign: 'left',
              marginBottom: '1.25rem',
              fontSize: '0.82rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.65rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src="/assets/images/nims-hospital-logo.svg" alt="NIMS Hospital" style={{ height: '24px', width: 'auto' }} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#bd171c' }}>OFFICIAL RECEIPT</span>
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                  PAID (ONLINE)
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Receipt No:</span>
                  <span style={{ fontWeight: 800, color: '#059669', fontSize: '0.86rem' }}>{successDonation.receiptNumber || 'NIMS-DON-RC-01'}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Order Ref:</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 750, fontSize: '0.78rem', color: '#1e293b' }}>{successDonation.orderId}</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Beneficiary Patient:</span>
                  <span style={{ fontWeight: 800, color: '#bd171c' }}>{successDonation.patientName}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Contributor / Donor:</span>
                  <span style={{ fontWeight: 750, color: '#0f172a' }}>{successDonation.donorName || 'Generous Supporter'}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #cbd5e1', paddingTop: '0.65rem', marginTop: '0.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>Date: {new Date(successDonation.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                  <span style={{ fontSize: '0.68rem', color: '#059669', fontWeight: 700 }}>&bull; Zero platform deductions &bull; 100% Care</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.68rem', color: '#64748b', display: 'block', textTransform: 'uppercase', fontWeight: 800 }}>Total Credited:</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#bd171c' }}>₹{(successDonation.amount || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Email Dispatch Notice & Resend Action */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '0.85rem 1rem',
              marginBottom: '1.25rem',
              textAlign: 'left',
              fontSize: '0.82rem'
            }}>
              {successDonation.donorEmail ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534' }}>
                    <Mail size={16} color="#16a34a" />
                    <span>Official receipt emailed to <b>{successDonation.donorEmail}</b></span>
                  </div>
                  <button
                    type="button"
                    disabled={emailSending}
                    onClick={() => handleSendReceiptEmail(successDonation.donorEmail)}
                    style={{
                      background: 'transparent',
                      border: '1px solid #cbd5e1',
                      color: '#475569',
                      padding: '3px 10px',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {emailSending ? 'Sending...' : 'Resend Email'}
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', marginBottom: '6px' }}>
                    <Mail size={15} />
                    <span>Get receipt delivered to your inbox:</span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="email"
                      value={customEmailInput}
                      onChange={(e) => setCustomEmailInput(e.target.value)}
                      placeholder="Enter your email address"
                      style={{
                        flex: 1,
                        padding: '6px 10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.8rem'
                      }}
                    />
                    <button
                      type="button"
                      disabled={emailSending}
                      onClick={() => handleSendReceiptEmail(customEmailInput)}
                      style={{
                        background: '#bd171c',
                        color: '#fff',
                        border: 'none',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {emailSending ? 'Sending...' : 'Send'}
                    </button>
                  </div>
                </div>
              )}
              {emailSentSuccess && (
                <div style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 700, marginTop: '6px' }}>
                  ✓ {emailSentSuccess}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  const url = `${baseUrl}/crowdfunding/donations/${encodeURIComponent(successDonation.orderId)}/receipt?autoPrint=true`;
                  window.open(url, '_blank');
                }}
                style={{
                  flex: 1.2,
                  minWidth: '180px',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #bd171c 0%, #85040b 100%)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(189, 23, 28, 0.35)'
                }}
              >
                <Download size={16} />
                <span>Download Receipt (PDF)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const url = `${baseUrl}/crowdfunding/donations/${encodeURIComponent(successDonation.orderId)}/receipt`;
                  window.open(url, '_blank');
                }}
                style={{
                  flex: 0.8,
                  minWidth: '130px',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  border: '1.5px solid #cbd5e1',
                  background: '#f8fafc',
                  color: '#0f172a',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <Printer size={16} />
                <span>Print Receipt</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  setSearchParams({});
                }}
                style={{
                  flex: 0.4,
                  minWidth: '70px',
                  padding: '0.85rem',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#64748b',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 6. Official Printable Donation Receipt Document (Print-Only) ── */}
      {successDonation && (
        <div id="nims-official-receipt-print" className="official-receipt-printable-doc">
          <div className="receipt-border-outer">
            <div className="receipt-border-inner">

              {/* Header */}
              <div className="receipt-header-row">
                <div className="receipt-logo-block">
                  <img src="/assets/images/nims-hospital-logo.svg" alt="NIMS Hospital" className="receipt-logo-img" />
                </div>
                <div className="receipt-header-text">
                  <h1 className="receipt-org-title">NIMS HOSPITAL</h1>
                  <div className="receipt-org-unit">A Unit of NIMS University Rajasthan</div>
                  <div className="receipt-org-accred">Apex NABH Accredited &bull; 2,400+ Bed Quaternary Care Hospital &bull; Medical College</div>
                  <div className="receipt-org-addr">NH-11C, Delhi-Jaipur Highway, Shobha Nagar, Jaipur, Rajasthan - 303121</div>
                  <div className="receipt-org-contact">Tel: 01426-235000 / 01426-512000 &bull; Email: patientcare@nimshospitals.in &bull; Web: www.nimshospitals.in</div>
                </div>
              </div>

              {/* Banner */}
              <div className="receipt-banner">
                <div className="receipt-banner-main">OFFICIAL DONATION &amp; PATIENT RELIEF RECEIPT</div>
                <div className="receipt-banner-sub">Direct Hospital Medical Credit &bull; 100% Hospital Directed Patient Care</div>
              </div>

              {/* Metadata */}
              <div className="receipt-meta-grid">
                <div className="receipt-meta-cell">
                  <span className="meta-lbl">RECEIPT NUMBER:</span>
                  <span className="meta-val highlight">{successDonation.receiptNumber || 'NIMS-DON-RC-01'}</span>
                </div>
                <div className="receipt-meta-cell">
                  <span className="meta-lbl">ORDER REFERENCE:</span>
                  <span className="meta-val mono">{successDonation.orderId}</span>
                </div>
                <div className="receipt-meta-cell">
                  <span className="meta-lbl">DATE &amp; TIME:</span>
                  <span className="meta-val">{new Date(successDonation.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                </div>
                <div className="receipt-meta-cell">
                  <span className="meta-lbl">PAYMENT MODE:</span>
                  <span className="meta-val verified">{successDonation.paymentMethod || 'Online (ICICI Bank PG)'}</span>
                </div>
              </div>

              {/* Parties */}
              <div className="receipt-parties-grid">
                <div className="receipt-party-box">
                  <div className="party-box-title">CONTRIBUTOR / DONOR DETAILS</div>
                  <table className="party-table">
                    <tbody>
                      <tr>
                        <td className="field-name">Received With Thanks From:</td>
                        <td className="field-val"><b>{successDonation.donorName || 'Generous Supporter'}</b></td>
                      </tr>
                      <tr>
                        <td className="field-name">Contact Mobile:</td>
                        <td className="field-val">{successDonation.donorMobile ? `+91 ${successDonation.donorMobile}` : 'Confidential'}</td>
                      </tr>
                      <tr>
                        <td className="field-name">Email ID:</td>
                        <td className="field-val">{successDonation.donorEmail || 'Not Provided (In-App Direct Contribution)'}</td>
                      </tr>
                      <tr>
                        <td className="field-name">Public Privacy Status:</td>
                        <td className="field-val">Protected (Private Ledger)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="receipt-party-box">
                  <div className="party-box-title">BENEFICIARY PATIENT ALLOCATION</div>
                  <table className="party-table">
                    <tbody>
                      <tr>
                        <td className="field-name">Beneficiary Patient:</td>
                        <td className="field-val"><b style={{ color: '#bd171c' }}>{successDonation.patientName}</b></td>
                      </tr>
                      <tr>
                        <td className="field-name">Treating Department:</td>
                        <td className="field-val">{successDonation.campaign?.department || 'Emergency & Quaternary Care'}</td>
                      </tr>
                      <tr>
                        <td className="field-name">Hospital Medical Account:</td>
                        <td className="field-val">Direct Patient IPD/OPD Clinical Care</td>
                      </tr>
                      <tr>
                        <td className="field-name">Clinical Audit &amp; Vetting:</td>
                        <td className="field-val">100% Verified by NIMS Medical Faculty</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Financial Table */}
              <table className="receipt-financial-table">
                <thead>
                  <tr>
                    <th style={{ width: '8%', textAlign: 'center' }}>S.No.</th>
                    <th style={{ width: '47%' }}>Description / Treatment Allocation Purpose</th>
                    <th style={{ width: '25%' }}>Medical Beneficiary</th>
                    <th style={{ width: '20%', textAlign: 'right' }}>Amount (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center' }}>1</td>
                    <td>
                      <b>Patient Emergency &amp; Life-Saving Healthcare Relief Contribution</b>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>
                        Directly allocated towards ICU hospitalization, surgeries, investigations &amp; pharmacy charges at NIMS Hospital. Zero administrative fee deducted.
                      </div>
                    </td>
                    <td>
                      <b>{successDonation.patientName}</b>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>
                        Dept: {successDonation.campaign?.department || 'Hospital Care'}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 800, fontSize: '15px' }}>
                      ₹{(successDonation.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr className="total-row">
                    <td colSpan="3" style={{ textAlign: 'right', fontWeight: 800 }}>TOTAL AMOUNT CREDITED:</td>
                    <td style={{ textAlign: 'right', fontWeight: 900, fontSize: '16px', color: '#bd171c' }}>
                      ₹{(successDonation.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Words */}
              <div className="receipt-words-box">
                <span className="words-lbl">Amount in Words:</span>
                <span className="words-val">{amountToWordsINR(successDonation.amount)}</span>
              </div>

              {/* Declaration */}
              <div className="receipt-legal-notice">
                <b>Hospital Declaration &amp; Certification:</b> This is an official system-generated electronic receipt issued by NIMS Hospital, Jaipur.
                Certified that the amount stated above has been received and 100% credited directly into the hospital medical treatment of the aforementioned patient.
                NIMS Hospital does not charge any administrative or intermediary platform commission on patient relief contributions.
              </div>

              {/* Signatures */}
              <div className="receipt-footer-row">
                <div className="receipt-seal-col">
                  <div className="receipt-qr-sim">
                    <div className="receipt-qr-code">
                      <svg width="60" height="60" viewBox="0 0 100 100" fill="#0f172a">
                        <rect x="0" y="0" width="30" height="30" fill="#bd171c" />
                        <rect x="5" y="5" width="20" height="20" fill="#ffffff" />
                        <rect x="9" y="9" width="12" height="12" fill="#bd171c" />
                        <rect x="70" y="0" width="30" height="30" fill="#0f172a" />
                        <rect x="75" y="5" width="20" height="20" fill="#ffffff" />
                        <rect x="79" y="9" width="12" height="12" fill="#0f172a" />
                        <rect x="0" y="70" width="30" height="30" fill="#0f172a" />
                        <rect x="5" y="75" width="20" height="20" fill="#ffffff" />
                        <rect x="9" y="79" width="12" height="12" fill="#0f172a" />
                        <rect x="40" y="10" width="20" height="10" />
                        <rect x="35" y="35" width="30" height="30" />
                        <rect x="75" y="75" width="25" height="25" />
                      </svg>
                    </div>
                    <div className="receipt-qr-text">
                      <span className="qr-title">DIGITALLY VERIFIED</span>
                      <span>HIS Auth: {successDonation.orderId?.slice(-8)}</span>
                      <span>Txn: {successDonation.gatewayTxnId || 'ICICI-ONLINE-OK'}</span>
                    </div>
                  </div>
                </div>

                <div className="receipt-auth-col">
                  <div className="receipt-stamp-badge">
                    <div className="stamp-circle">
                      <div className="stamp-text-arc">★ NIMS HOSPITAL ★</div>
                      <div className="stamp-center">PATIENT RELIEF<br />DESK</div>
                    </div>
                  </div>
                  <div className="receipt-sign-box">
                    <div className="sign-line" />
                    <div className="sign-title">Authorized Signatory</div>
                    <div className="sign-dept">Accounts &amp; Medical Relief Directorate</div>
                    <div className="sign-hosp">NIMS Hospital, Jaipur</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

