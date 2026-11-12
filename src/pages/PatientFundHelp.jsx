import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Heart, HeartHandshake, ShieldCheck, CheckCircle2, AlertCircle,
  Clock, IndianRupee, Users, Share2, Play, X, ArrowRight,
  Lock, Phone, Mail, User, Info, Sparkles, Printer, Check, Download,
  ChevronLeft, ChevronRight
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

// Interactive Patient Fund Card with Uncropped Ambient Image & Multi-Photo Slider
function PatientFundCard({ camp, onOpenDonate, onOpenVideo, onNavigate, onViewContributions }) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const target = camp.targetAmount || 1;
  const raised = camp.raisedAmount || 0;
  const percent = Math.min(100, Math.round((raised / target) * 100));
  const remaining = Math.max(0, target - raised);
  const images = (camp.images && camp.images.length > 0) ? camp.images : [];
  const hasImage = images.length > 0;
  const isCritical = camp.urgency === 'Critical';

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveImgIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveImgIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const currentImg = images[activeImgIdx] || '';

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(9, 86, 151, 0.12)' }}
      transition={{ duration: 0.2 }}
      onClick={() => onNavigate(camp._id)}
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        border: '1.5px solid #e2e8f0',
        borderLeft: `5px solid ${isCritical ? '#bd171c' : '#f47521'}`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.04)',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      <div>
        {/* Visual Viewport: Enhanced 1.85:1 Aspect Ratio - Taller, Richer Presence */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '1.85 / 1', background: '#0a0f1d', overflow: 'hidden' }}>
          {hasImage ? (
            <img
              src={currentImg}
              alt={camp.patientName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'left center',
                display: 'block'
              }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              <Heart size={36} />
              <span style={{ fontSize: '0.78rem', marginTop: '6px', fontWeight: 600 }}>NIMS Verified Case</span>
            </div>
          )}

          {/* Badges on Photo */}
          <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 3, display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{
              padding: '0.24rem 0.65rem',
              borderRadius: '999px',
              fontSize: '0.68rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              background: isCritical ? '#bd171c' : '#f47521',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              {camp.urgency} Care
            </span>

            <span style={{
              padding: '0.24rem 0.65rem',
              borderRadius: '999px',
              fontSize: '0.68rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(6px)',
              color: '#ffffff'
            }}>
              {camp.department}
            </span>
          </div>

          {/* Multiple Image Slider Controls */}
          {images.length > 1 && (
            <>
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                style={{
                  position: 'absolute',
                  left: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 4,
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  backdropFilter: 'blur(6px)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  transition: 'background 0.2s ease'
                }}
              >
                <ChevronLeft size={18} />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 4,
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  backdropFilter: 'blur(6px)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  transition: 'background 0.2s ease'
                }}
              >
                <ChevronRight size={18} />
              </button>

              {/* Dots + Counter Badge */}
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: 'rgba(0, 0, 0, 0.65)',
                  backdropFilter: 'blur(8px)',
                  padding: '3px 8px',
                  borderRadius: '999px'
                }}
              >
                {images.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImgIdx(dotIdx);
                    }}
                    style={{
                      width: activeImgIdx === dotIdx ? '16px' : '6px',
                      height: '6px',
                      borderRadius: '999px',
                      background: activeImgIdx === dotIdx ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  />
                ))}
                <span style={{ fontSize: '0.66rem', color: '#ffffff', fontWeight: 700, marginLeft: '4px' }}>
                  {activeImgIdx + 1}/{images.length}
                </span>
              </div>
            </>
          )}

          {/* Watch Story Video Button */}
          {camp.videoUrl && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenVideo(camp.videoUrl);
              }}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                zIndex: 3,
                background: 'rgba(230, 0, 10, 0.9)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '999px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.74rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              <Play size={12} fill="#ffffff" />
              <span>Watch Story</span>
            </button>
          )}

          {/* Floating Share Button on Card Image */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const title = camp.title || `Support ${camp.patientName}'s Medical Treatment`;
              const text = `Urgent Medical Appeal: Support ${camp.patientName} fighting ${camp.diagnosis} at NIMS Hospital Jaipur. Donate directly at:`;
              const url = `${window.location.origin}/help/${camp._id}`;
              if (navigator.share) {
                navigator.share({ title, text, url }).catch(() => {});
              } else {
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`, '_blank');
              }
            }}
            style={{
              position: 'absolute',
              top: '12px',
              right: camp.videoUrl ? '128px' : '12px',
              zIndex: 3,
              background: 'rgba(15, 23, 42, 0.8)',
              backdropFilter: 'blur(8px)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              borderRadius: '999px',
              padding: '0.35rem 0.7rem',
              fontSize: '0.72rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
              transition: 'all 0.15s ease'
            }}
            title="Share this patient appeal"
          >
            <Share2 size={12} color="#25D366" />
            <span>Share</span>
          </button>
        </div>

        {/* Content Area */}
        <div style={{ padding: '1.2rem 1.35rem' }}>
          {/* Patient Details: Name, Age, Gender, Doctor on separate lines with clear labels */}
          <div style={{ marginBottom: '0.85rem' }}>
            {/* 1. Patient Name - Full Dedicated Line */}
            <div style={{ marginBottom: '0.45rem' }}>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#64748b',
                display: 'block',
                marginBottom: '2px'
              }}>
                Patient Name
              </span>
              <h3 style={{
                fontSize: '1.12rem',
                fontWeight: 850,
                color: '#0f172a',
                margin: 0,
                lineHeight: 1.35,
                wordBreak: 'break-word'
              }}>
                {camp.patientName}
              </h3>
            </div>

            {/* 2. Age, Gender, Doctor & Diagnosis - Each on a separate line */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.28rem',
              marginBottom: '0.65rem'
            }}>
              {/* Age */}
              <div style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#64748b', fontWeight: 700, minWidth: '74px' }}>Age:</span>
                <strong style={{ color: '#0f172a', fontWeight: 750 }}>{camp.age} Yrs</strong>
              </div>

              {/* Gender */}
              <div style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#64748b', fontWeight: 700, minWidth: '74px' }}>Gender:</span>
                <strong style={{ color: '#0f172a', fontWeight: 750 }}>{camp.gender}</strong>
              </div>

              {/* Doctor */}
              {camp.doctorName && (
                <div style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#64748b', fontWeight: 700, minWidth: '74px' }}>Doctor:</span>
                  <strong style={{ color: '#0f172a', fontWeight: 750 }}>
                    {camp.doctorName.trim().match(/^dr\.?/i) ? camp.doctorName.trim() : `Dr. ${camp.doctorName.trim()}`}
                  </strong>
                </div>
              )}

              {/* Diagnosis */}
              <div style={{
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ color: '#bd171c', fontWeight: 700, minWidth: '74px' }}>Diagnosis:</span>
                <strong style={{ color: '#bd171c', fontWeight: 800 }}>{camp.diagnosis}</strong>
              </div>

              {/* Fund Needed For (Dynamic from Admin) */}
              <div style={{
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'baseline',
                gap: '6px'
              }}>
                <span style={{ color: '#059669', fontWeight: 750, whiteSpace: 'nowrap' }}>Fund Needed For:</span>
                <strong style={{ color: '#0f172a', fontWeight: 750 }}>
                  {camp.treatment || 'Direct Patient Clinical Care'}
                </strong>
              </div>
            </div>
          </div>

          <div
            style={{
              color: '#bd171c',
              fontWeight: 800,
              fontSize: '0.82rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              marginBottom: '1.15rem'
            }}
          >
            <span>Read Full Medical Case &amp; Summary</span>
            <ArrowRight size={13} />
          </div>

          {/* Dynamic Progress Bar */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #edf2f7',
            borderRadius: '14px',
            padding: '0.95rem 1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0f172a' }}>
                ₹{raised.toLocaleString('en-IN')}
                <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}> raised</span>
              </span>
              <span style={{ fontSize: '0.82rem', fontWeight: 850, color: percent >= 100 ? '#10b981' : '#bd171c' }}>
                {percent}% Funded
              </span>
            </div>

            <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{
                width: `${percent}%`,
                height: '100%',
                background: percent >= 100 ? '#10b981' : 'linear-gradient(90deg, #bd171c 0%, #f47521 100%)',
                borderRadius: '999px',
                transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>
              <span>Target: ₹{target.toLocaleString('en-IN')}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewContributions(camp);
                }}
                style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  color: '#1d4ed8',
                  padding: '0.22rem 0.6rem',
                  borderRadius: '8px',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                title="Click to view donors who supported this appeal"
              >
                <Users size={12} color="#2563eb" />
                <span>{camp.donorsCount || 0} Contributions</span>
                <ArrowRight size={11} color="#2563eb" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Footer with Compact Remaining Badge & Sleek Donate Button */}
      <div style={{
        padding: '0.75rem 1.25rem',
        background: '#f8fafc',
        borderTop: '1px solid #edf2f7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.65rem'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #fff1f2 0%, #fee2e2 100%)',
          border: '1px solid #fecaca',
          padding: '0.22rem 0.65rem',
          borderRadius: '8px',
          boxShadow: '0 1px 4px rgba(225, 29, 72, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Clock size={10} color="#e11d48" />
            <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#be123c', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Still Needed
            </span>
          </div>
          <span style={{ fontSize: '0.92rem', fontWeight: 900, color: '#9f1239', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            ₹{remaining.toLocaleString('en-IN')}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDonate(camp);
          }}
          style={{
            background: 'linear-gradient(135deg, #bd171c 0%, #e02424 50%, #f47521 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '999px',
            padding: '0.42rem 1.15rem',
            fontSize: '0.8rem',
            fontWeight: 850,
            letterSpacing: '0.02em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(189, 23, 28, 0.35)',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <Heart size={13} fill="#ffffff" />
          <span>Donate Now</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function PatientFundHelp() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

  // Campaigns State
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selected Campaign for Donation Drawer
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Donation Form State (Name & Mobile mandatory, Email optional, Privacy toggle default false)
  const [donationAmount, setDonationAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorMobile, setDonorMobile] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Contributions List Modal State
  const [contributionsCampaign, setContributionsCampaign] = useState(null);
  const [contributionsList, setContributionsList] = useState([]);
  const [loadingContributions, setLoadingContributions] = useState(false);

  const handleOpenContributions = async (camp) => {
    setContributionsCampaign(camp);
    setLoadingContributions(true);
    try {
      const res = await fetch(`${baseUrl}/crowdfunding/campaigns/${camp._id}/contributions`);
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

  // Video Player Modal
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

  // Story & Details Modal
  const [detailsCampaign, setDetailsCampaign] = useState(null);

  // Payment Success State
  const [successDonation, setSuccessDonation] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState('');
  const [customEmailInput, setCustomEmailInput] = useState('');

  // Preset quick donation amounts
  const presetAmounts = [500, 1000, 2500, 5000];

  // Fetch active campaigns on mount
  useEffect(() => {
    fetchActiveCampaigns();
  }, []);

  // Check URL params for payment return
  useEffect(() => {
    const donationStatus = searchParams.get('donationStatus');
    const orderId = searchParams.get('orderId');

    if (donationStatus === 'success' && orderId) {
      verifyAndShowSuccess(orderId);
    }
  }, [searchParams]);

  const fetchActiveCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${baseUrl}/crowdfunding/campaigns`);
      const data = await res.json();
      if (data && data.success) {
        setCampaigns(data.data || []);
      } else {
        setError(data.message || 'Failed to load relief campaigns');
      }
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setError('Unable to connect to NIMS hospital relief server.');
    } finally {
      setLoading(false);
    }
  };

  const verifyAndShowSuccess = async (orderId) => {
    try {
      const res = await fetch(`${baseUrl}/crowdfunding/donations/status/${encodeURIComponent(orderId)}`);
      const json = await res.json();
      if (json && json.success && json.data) {
        setSuccessDonation(json.data);
        setShowSuccessModal(true);

        // Fire Meta Pixel Standard Donate Conversion Event
        trackMetaEvent('Donate', {
          value: json.data.amount,
          currency: 'INR',
          content_name: json.data.patientName || 'NIMS Patient Relief Fund',
          order_id: json.data.orderId
        });
      }
    } catch (err) {
      console.error('Error verifying donation:', err);
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

  const handleOpenDonateDrawer = (camp) => {
    setSelectedCampaign(camp);
    setDonationAmount(1000);
    setCustomAmount('');
    setFormError('');
    setDrawerOpen(true);

    // Fire Meta Pixel Custom Donate Click Event
    trackMetaEvent('Donate_Click', {
      patient_name: camp.patientName,
      campaign_id: camp._id,
      department: camp.department,
      target_amount: camp.targetAmount
    }, true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setFormError('');
  };

  const handleProceedToPayment = async (e) => {
    e.preventDefault();

    const finalAmount = customAmount ? parseFloat(customAmount) : donationAmount;

    // Validations
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

    try {
      setSubmitting(true);
      setFormError('');

      // Fire Meta Pixel InitiateCheckout Event
      trackMetaEvent('InitiateCheckout', {
        value: finalAmount,
        currency: 'INR',
        content_name: selectedCampaign?.patientName || 'Patient Relief',
        num_items: 1
      });

      const currentOrigin = window.location.origin;
      const returnUrl = `${currentOrigin}/help?donationStatus=success`;

      const payload = {
        campaignId: selectedCampaign._id,
        amount: finalAmount,
        donorName: donorName.trim(),
        donorMobile: cleanMobile,
        donorEmail: donorEmail.trim(),
        isPrivate: isPrivate,
        returnUrl
      };

      const res = await fetch(`${baseUrl}/crowdfunding/donate/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (result && result.success && result.paymentUrl) {
        // Redirect directly to ICICI Payment Gateway
        window.location.href = result.paymentUrl;
      } else {
        setFormError(result?.message || 'Payment initiation failed. Please try again.');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setFormError('Network error while connecting to payment gateway.');
    } finally {
      setSubmitting(false);
    }
  };

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    try {
      if (url.includes('youtube.com/watch?v=')) {
        const videoId = url.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      }
      if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      }
      return url;
    } catch (_) {
      return url;
    }
  };

  const isDirectVideoUrl = (url) => {
    if (!url) return false;
    return !!(
      url.match(/\.(mp4|webm|mov|m4v|ogg)($|\?)/i) ||
      url.includes('s3.') ||
      url.includes('amazonaws.com')
    );
  };

  return (
    <div className="patient-fund-page" style={{ background: '#f8fafc', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      
      {/* ── 1. Hero & Trust Banner with Natural Hospital Background Image & Sleek Compact Height ── */}
      <section style={{
        background: "linear-gradient(rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.38)), url('/images/crowdfunding-hero-bg.jpg') center/cover no-repeat",
        color: '#ffffff',
        padding: 'clamp(2.2rem, 4vw, 3.25rem) 1rem 2.25rem',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '3px solid #f47521'
      }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            padding: '0.35rem 1rem',
            borderRadius: '999px',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '1.15rem',
            color: '#ffffff',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
          }}>
            <Sparkles size={14} color="#fef08a" />
            <span>NIMS Patient Relief Fund &bull; 100% Hospital Directed</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.85rem, 4.2vw, 3rem)',
            fontWeight: 900,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            margin: '0 auto 1rem',
            maxWidth: '850px',
            color: '#ffffff',
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.35)'
          }}>
            Save a Life Today. <span style={{ color: '#fef08a', textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)' }}>Direct Medical Relief</span> for Critical Patients.
          </h1>

          <p style={{
            fontSize: 'clamp(0.92rem, 1.8vw, 1.12rem)',
            color: '#fef2f2',
            lineHeight: 1.6,
            maxWidth: '720px',
            margin: '0 auto'
          }}>
            100% of your donation is directly credited to the patient's hospital medical treatment at NIMS Hospital Jaipur.
            Zero administrative deductions, verified by our medical faculty.
          </p>
        </div>
      </section>

      {/* ── 2. Live Patient Cases Grid ── */}
      <section style={{ padding: '2.5rem 1rem 4rem' }}>
        <div className="container" style={{ maxWidth: '1180px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#bd171c', display: 'block', marginBottom: '4px' }}>
                Active Hospital Appeals
              </span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.95rem)', fontWeight: 850, color: '#0f172a', margin: 0 }}>
                Patients Needing Your Urgent Support
              </h2>
            </div>

            <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>
              Live hospital relief ledger &bull; Updated in real-time
            </div>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div className="animate-spin" style={{ width: '38px', height: '38px', border: '3px solid #cbd5e1', borderTopColor: '#bd171c', borderRadius: '50%', margin: '0 auto 1rem' }} />
              <p style={{ fontSize: '0.92rem', fontWeight: 600, color: '#64748b' }}>Connecting to verified patient cases...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '16px', padding: '2rem', textAlign: 'center', color: '#b91c1c' }}>
              <AlertCircle size={32} style={{ margin: '0 auto 0.5rem' }} />
              <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 800 }}>Unable to Load Cases</h4>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>{error}</p>
              <button
                type="button"
                onClick={fetchActiveCampaigns}
                style={{ marginTop: '1rem', padding: '0.5rem 1.25rem', background: '#b91c1c', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                Retry
              </button>
            </div>
          )}

          {/* Clean Reassuring Empty State (No Dummy Data) */}
          {!loading && !error && campaigns.length === 0 && (
            <div style={{
              background: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '24px',
              padding: '4rem 1.5rem',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
            }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 850, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                All Admitted Relief Cases are Currently Funded!
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                Thanks to compassionate donors like you, every active emergency and ICU patient relief appeal has reached its goal.
                New verified cases are posted as needed by the NIMS Hospital Social Service Department.
              </p>
              <Link
                to="/contact-us"
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>Contact Hospital Social Helpdesk</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          )}

          {/* Active Campaigns Cards Grid */}
          {!loading && !error && campaigns.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
              gap: '1.75rem',
              width: '100%'
            }}>
              {campaigns.map((camp) => (
                <PatientFundCard
                  key={camp._id}
                  camp={camp}
                  onOpenDonate={handleOpenDonateDrawer}
                  onOpenVideo={(url) => setActiveVideoUrl(url)}
                  onNavigate={(id) => navigate(`/help/${id}`)}
                  onViewContributions={handleOpenContributions}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 3. Quick Donation Drawer / Modal ── */}
      <AnimatePresence>
        {drawerOpen && selectedCampaign && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            background: 'rgba(15, 23, 42, 0.72)',
            backdropFilter: 'blur(5px)'
          }}>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              style={{
                background: '#ffffff',
                width: '100%',
                maxWidth: '540px',
                borderRadius: '24px 24px 0 0',
                maxHeight: '92vh',
                overflowY: 'auto',
                boxShadow: '0 -10px 40px rgba(0,0,0,0.2)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Drawer Header */}
              <div style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#ffffff',
                position: 'sticky',
                top: 0,
                zIndex: 10
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#fef2f2', color: '#bd171c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Heart size={20} fill="#bd171c" />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 850, color: '#0f172a' }}>
                      Support {selectedCampaign.patientName}
                    </h3>
                    <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                      {selectedCampaign.diagnosis} &bull; {selectedCampaign.department}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCloseDrawer}
                  style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Drawer Body Form */}
              <form onSubmit={handleProceedToPayment} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {formError && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '0.75rem 1rem', color: '#b91c1c', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={16} style={{ flexShrink: 0 }} />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Amount Selection */}
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '8px' }}>
                    Select Contribution Amount (₹)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '10px' }}>
                    {presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => { setDonationAmount(amt); setCustomAmount(''); }}
                        style={{
                          padding: '0.65rem 0.5rem',
                          borderRadius: '12px',
                          border: donationAmount === amt && !customAmount ? '2px solid #bd171c' : '1.5px solid #e2e8f0',
                          background: donationAmount === amt && !customAmount ? '#fef2f2' : '#ffffff',
                          color: donationAmount === amt && !customAmount ? '#bd171c' : '#0f172a',
                          fontWeight: 800,
                          fontSize: '0.92rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>

                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: '#64748b' }}>₹</span>
                    <input
                      type="number"
                      placeholder="Or enter custom amount (e.g. 15000)"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setDonationAmount(parseFloat(e.target.value) || 0);
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2rem',
                        borderRadius: '12px',
                        border: customAmount ? '2px solid #bd171c' : '1.5px solid #cbd5e1',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Mandatory Donor Name */}
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
                    Your Full Name <span style={{ color: '#bd171c' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.25rem',
                        borderRadius: '12px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Mandatory Mobile */}
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
                    Mobile Number <span style={{ color: '#bd171c' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={donorMobile}
                      onChange={(e) => setDonorMobile(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.25rem',
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>
                      Email Address <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>(Optional)</span>
                    </label>
                    <span style={{ fontSize: '0.72rem', color: '#bd171c', fontWeight: 600 }}>For digital receipt</span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                      type="email"
                      placeholder="e.g. rajesh@gmail.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.25rem',
                        borderRadius: '12px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Privacy Toggle (Keep My Details Private) */}
                <div style={{
                  background: '#f8fafc',
                  border: '1.5px solid #edf2f7',
                  borderRadius: '14px',
                  padding: '0.95rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  cursor: 'pointer'
                }} onClick={() => setIsPrivate(!isPrivate)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: isPrivate ? '#ecfdf5' : '#f1f5f9', color: isPrivate ? '#059669' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Lock size={16} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f172a', display: 'block' }}>
                        Keep my donation private
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        Your name will never be shown on public website.
                      </span>
                    </div>
                  </div>

                  {/* Toggle visual switch */}
                  <div style={{
                    width: '42px',
                    height: '24px',
                    borderRadius: '999px',
                    background: isPrivate ? '#10b981' : '#cbd5e1',
                    position: 'relative',
                    transition: 'background 0.2s ease',
                    flexShrink: 0
                  }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      position: 'absolute',
                      top: '3px',
                      left: isPrivate ? '21px' : '3px',
                      transition: 'left 0.2s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }} />
                  </div>
                </div>

                {/* Trust Footer Notice */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.74rem', color: '#64748b' }}>
                  <ShieldCheck size={16} color="#059669" style={{ flexShrink: 0 }} />
                  <span>Secured by ICICI Bank Payment Gateway &bull; 100% Direct Hospital Credit</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: 'linear-gradient(135deg, #bd171c 0%, #a01014 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '0.9rem',
                    fontSize: '0.95rem',
                    fontWeight: 850,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(189, 23, 28, 0.35)',
                    opacity: submitting ? 0.7 : 1
                  }}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin" style={{ width: '16px', height: '16px', border: '2px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%' }} />
                      <span>Opening ICICI Gateway...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={15} />
                      <span>Proceed to Pay ₹{(customAmount ? parseFloat(customAmount) || 0 : donationAmount).toLocaleString('en-IN')}</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 4. Video Player Modal ── */}
      {activeVideoUrl && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{ background: '#000000', borderRadius: '20px', width: '100%', maxWidth: '800px', overflow: 'hidden', position: 'relative' }}>
            <button
              type="button"
              onClick={() => setActiveVideoUrl(null)}
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
            {isDirectVideoUrl(activeVideoUrl) ? (
              <video
                src={activeVideoUrl}
                controls
                autoPlay
                playsInline
                style={{ width: '100%', maxHeight: '78vh', display: 'block', margin: '0 auto', background: '#000000' }}
              />
            ) : (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src={getYoutubeEmbedUrl(activeVideoUrl)}
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

      {/* ── 5. Full Case Details Modal ── */}
      {detailsCampaign && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              padding: '1.25rem 1.6rem',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              background: '#ffffff',
              zIndex: 2
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 850, color: '#0f172a' }}>
                  {detailsCampaign.patientName} &bull; Case Details
                </h3>
                <span style={{ fontSize: '0.76rem', color: '#bd171c', fontWeight: 800, textTransform: 'uppercase' }}>
                  {detailsCampaign.department} &bull; {detailsCampaign.diagnosis}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setDetailsCampaign(null)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '1.6rem', spaceY: '1.25rem' }}>
              {detailsCampaign.images && detailsCampaign.images.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', marginBottom: '1.25rem' }}>
                  {detailsCampaign.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="Clinical Documentation"
                      style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                    />
                  ))}
                </div>
              )}

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.82rem' }}>
                  <div><span style={{ color: '#64748b' }}>Age:</span> <b>{detailsCampaign.age} Yrs</b></div>
                  <div><span style={{ color: '#64748b' }}>Gender:</span> <b>{detailsCampaign.gender}</b></div>
                  <div><span style={{ color: '#64748b' }}>Doctor:</span> <b>{detailsCampaign.doctorName?.trim().match(/^dr\.?/i) ? detailsCampaign.doctorName.trim() : `Dr. ${detailsCampaign.doctorName?.trim() || 'Faculty Team'}`}</b></div>
                  <div><span style={{ color: '#64748b' }}>Diagnosis:</span> <b style={{ color: '#bd171c' }}>{detailsCampaign.diagnosis}</b></div>
                  <div><span style={{ color: '#64748b' }}>Fund Needed For:</span> <b style={{ color: '#059669' }}>{detailsCampaign.treatment || 'Direct Patient Clinical Care'}</b></div>
                  <div><span style={{ color: '#64748b' }}>Goal:</span> <b>₹{(detailsCampaign.targetAmount || 0).toLocaleString('en-IN')}</b></div>
                </div>
              </div>

              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>Case Summary &amp; Medical Appeal</h4>
              <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.75, margin: 0 }}>
                {(detailsCampaign.story || '')
                  .split(/\n\s*\n/)
                  .map((para, pIdx) => (
                    <p key={pIdx} style={{ margin: '0 0 0.85rem 0', whiteSpace: 'pre-line' }}>
                      {para.trim()}
                    </p>
                  ))}
              </div>
            </div>

            <div style={{ padding: '1.25rem 1.6rem', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <Link
                to={`/help/${detailsCampaign._id}`}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '12px',
                  background: '#111827',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.84rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Open Dedicated Case Page</span>
                <ArrowRight size={14} />
              </Link>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setDetailsCampaign(null)}
                  style={{ padding: '0.6rem 1.15rem', borderRadius: '12px', border: '1.5px solid #cbd5e1', background: '#ffffff', fontWeight: 700, fontSize: '0.84rem', cursor: 'pointer' }}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const c = detailsCampaign;
                    setDetailsCampaign(null);
                    handleOpenDonateDrawer(c);
                  }}
                  style={{
                    padding: '0.6rem 1.5rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #bd171c 0%, #e02424 50%, #f47521 100%)',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(189, 23, 28, 0.4)'
                  }}
                >
                  Donate for this Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 6. Payment Success Celebration & Official Receipt Modal ── */}
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
              {/* NIMS mini header */}
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

            {/* Action Buttons */}
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
                  fetchActiveCampaigns();
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

      {/* ── Public Contributions & Donors Modal ── */}
      <AnimatePresence>
        {contributionsCampaign && (
          <div
            onClick={() => setContributionsCampaign(null)}
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
                      For {contributionsCampaign.patientName} &bull; Case ID #{contributionsCampaign._id?.slice(-6)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setContributionsCampaign(null)}
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
                    ₹{(contributionsCampaign.raisedAmount || 0).toLocaleString('en-IN')}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                    Total Donors
                  </span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#1e293b' }}>
                    {contributionsCampaign.donorsCount || 0} Supporters
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
                gap: '0.65rem'
              }}>
                {loadingContributions ? (
                  <div style={{ padding: '2.5rem', textAlign: 'center', color: '#64748b' }}>
                    <div className="animate-spin" style={{ width: '28px', height: '28px', border: '3px solid #e2e8f0', borderTopColor: '#bd171c', borderRadius: '50%', margin: '0 auto 10px' }} />
                    <span style={{ fontSize: '0.84rem', fontWeight: 600 }}>Loading verified donations...</span>
                  </div>
                ) : contributionsList.length === 0 ? (
                  <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: '#64748b' }}>
                    <HeartHandshake size={42} color="#cbd5e1" style={{ margin: '0 auto 10px' }} />
                    <h4 style={{ margin: '0 0 4px', fontSize: '0.95rem', fontWeight: 800, color: '#334155' }}>
                      No Public Contributions Yet
                    </h4>
                    <p style={{ margin: '0 0 1rem', fontSize: '0.78rem', color: '#94a3b8' }}>
                      Be the very first compassionate supporter to fund this medical appeal!
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        const targetCamp = contributionsCampaign;
                        setContributionsCampaign(null);
                        handleOpenDonateDrawer(targetCamp);
                      }}
                      style={{
                        background: '#bd171c',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.55rem 1.25rem',
                        borderRadius: '999px',
                        fontSize: '0.84rem',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      Donate Now
                    </button>
                  </div>
                ) : (
                  contributionsList.map((c, idx) => (
                    <div
                      key={c._id || idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 0.9rem',
                        background: '#f8fafc',
                        border: '1px solid #edf2f7',
                        borderRadius: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: c.isAnonymous ? '#e2e8f0' : '#fee2e2',
                          color: c.isAnonymous ? '#64748b' : '#bd171c',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.85rem'
                        }}>
                          {c.isAnonymous ? <Lock size={15} /> : (c.donorName?.charAt(0)?.toUpperCase() || 'D')}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.25 }}>
                            {c.donorName}
                          </div>
                          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                            {c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent Contribution'}
                          </span>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.02rem', fontWeight: 900, color: '#059669' }}>
                          ₹{(c.amount || 0).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Modal Footer CTA */}
              <div style={{
                padding: '0.9rem 1.5rem',
                borderTop: '1px solid #edf2f7',
                background: '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <button
                  type="button"
                  onClick={() => setContributionsCampaign(null)}
                  style={{
                    background: 'transparent',
                    border: '1px solid #cbd5e1',
                    borderRadius: '10px',
                    padding: '0.55rem 1rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#64748b',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const targetCamp = contributionsCampaign;
                    setContributionsCampaign(null);
                    handleOpenDonateDrawer(targetCamp);
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #bd171c 0%, #e02424 50%, #f47521 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.55rem 1.35rem',
                    fontSize: '0.84rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(189, 23, 28, 0.35)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Heart size={14} fill="#ffffff" />
                  <span>Contribute Now</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 7. Official Printable Donation Receipt (Hidden on screen, Visible ONLY when printing / Save as PDF) ── */}
      {successDonation && (
        <div id="nims-official-receipt-print" className="official-receipt-printable-doc">
          <div className="receipt-border-outer">
            <div className="receipt-border-inner">
              
              {/* Header Section */}
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

              {/* Official Title Banner */}
              <div className="receipt-banner">
                <div className="receipt-banner-main">OFFICIAL DONATION &amp; PATIENT RELIEF RECEIPT</div>
                <div className="receipt-banner-sub">Direct Hospital Medical Credit &bull; 100% Hospital Directed Patient Care</div>
              </div>

              {/* Transaction Summary Strip */}
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

              {/* Two-Column Contributor & Beneficiary Details */}
              <div className="receipt-parties-grid">
                {/* Contributor */}
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

                {/* Beneficiary Patient */}
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

              {/* Itemized Financial Table */}
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

              {/* Amount in words */}
              <div className="receipt-words-box">
                <span className="words-lbl">Amount in Words:</span>
                <span className="words-val">{amountToWordsINR(successDonation.amount)}</span>
              </div>

              {/* Legal & Reassurance Notice */}
              <div className="receipt-legal-notice">
                <b>Hospital Declaration &amp; Certification:</b> This is an official system-generated electronic receipt issued by NIMS Hospital, Jaipur. 
                Certified that the amount stated above has been received and 100% credited directly into the hospital medical treatment of the aforementioned patient. 
                NIMS Hospital does not charge any administrative or intermediary platform commission on patient relief contributions.
              </div>

              {/* Signatures & Hospital Seals */}
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
