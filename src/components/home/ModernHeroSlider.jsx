import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Ambulance, 
  Stethoscope, 
  FlaskConical, 
  PhoneCall, 
  User, 
  Bed, 
  CalendarDays,
  Home as HomeIcon,
  Phone,
  Sparkles,
  Smartphone,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { healthcareSchemes } from '../../data/healthcareSchemesData';
import './ModernHeroSlider.css';

function AppStoreMark() {
  return (
    <svg className="store-brand-icon" viewBox="0 0 384 512" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.3 4 270.5c0 39.1 14.2 80.1 42.6 123.3 23.5 35.2 54.3 74.8 94.6 73.3 21 .5 35.8-14.9 63.2-14.9 26.6 0 40.3 14.9 62.7 14.9 40.7-.6 69.8-36.6 92.3-72.1 15.9-24.7 26.2-49.7 29.3-75-48.4-20.5-45.7-50.1-45.7-51.3zM252.6 96c18.1-21.5 16.5-41.1 16-48-16 1-34.5 10.9-45.1 23.1-11.7 13.1-18.6 29.3-17.1 48.2 17.3 1.3 33.8-7.6 46.2-23.3z" />
    </svg>
  );
}

function GooglePlayMark() {
  return (
    <svg className="store-brand-icon store-brand-icon--play" viewBox="0 0 512 512" aria-hidden="true" focusable="false">
      <path fill="#00A0FF" d="M50 32 286 256 50 480Z" />
      <path fill="#00D084" d="m50 32 280 162-44 62Z" />
      <path fill="#FFE14D" d="m286 256 44 62L50 480Z" />
      <path fill="#FF3D59" d="m330 194 132 62-132 62-44-62Z" />
    </svg>
  );
}

const insurancePartners = healthcareSchemes.map((s) => ({
  id: s.id,
  name: s.fullName,
  displayText: s.name,
  logo: s.logo,
  fallbackLogo: s.fallbackLogo,
  alt: s.alt || s.name
}));

export default function ModernHeroSlider({ slides, onOpenBooking, onOpenPackageBooking }) {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [callbackForm, setCallbackForm] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [callbackError, setCallbackError] = useState('');
  const [callbackSuccessMsg, setCallbackSuccessMsg] = useState('');

  // Dynamically synchronize header height for 100% pixel-perfect full-screen hero coverage
  useEffect(() => {
    const updateHeaderHeight = () => {
      const topbar = document.querySelector('.nims-topbar-wrapper');
      const nav = document.querySelector('nav');
      const topbarH = topbar ? topbar.getBoundingClientRect().height : 0;
      const navH = nav ? nav.getBoundingClientRect().height : 0;
      const totalHeader = topbarH + navH;
      if (totalHeader > 0) {
        document.documentElement.style.setProperty('--nims-header-actual-height', `${totalHeader}px`);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [autoplay, slides.length]);

  const nextSlide = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    setCallbackError('');

    const cleanName = (callbackForm.name || '').trim();
    const cleanPhone = (callbackForm.phone || '').trim().replace(/[^0-9+]/g, '');

    if (!cleanName) {
      setCallbackError('Please enter your full name');
      return;
    }
    if (cleanPhone.length < 10) {
      setCallbackError('Please enter a valid 10-digit phone number');
      return;
    }

    setIsSubmitting(true);
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.nimshospitals.net/api';
    const localFallbackUrl = 'http://localhost:5001/api';

    try {
      let res;
      try {
        res = await fetch(`${baseUrl}/callbacks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: cleanName,
            phone: cleanPhone,
            source: 'WEBSITE_HERO'
          })
        });
      } catch (primaryErr) {
        // Fallback to local server if primary network call fails
        if (!baseUrl.includes('localhost:5001')) {
          res = await fetch(`${localFallbackUrl}/callbacks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: cleanName,
              phone: cleanPhone,
              source: 'WEBSITE_HERO'
            })
          });
        } else {
          throw primaryErr;
        }
      }

      const data = await res.json();
      if (res.ok && data.success) {
        setCallbackSubmitted(true);
        setCallbackSuccessMsg(data.message || 'We have received your call-back request.');
        setCallbackForm({ name: '', phone: '' });
        setTimeout(() => {
          setCallbackSubmitted(false);
          setCallbackSuccessMsg('');
        }, 5000);
      } else {
        setCallbackError(data.message || 'Failed to submit request. Please try again.');
      }
    } catch (err) {
      console.error('Call-back submit error:', err);
      setCallbackError('Connection error. Please call our 24/7 hotline directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="nims-hero-custom-container">
      {/* 1. BACKGROUND FULL HERO SLIDER */}
      <div className="nims-hero-bg-slider">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="nims-hero-bg-item"
          >
            <img 
              src={slides[current].image} 
              alt="NIMS Medical College & Hospital" 
              className="nims-hero-img" 
            />
            <div className="nims-hero-soft-vignette" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. HERO CONTENT WRAPPER */}
      <div className="container nims-hero-content-wrapper">
        {/* LEFT SIDE: ULTRA-TRANSPARENT CRYSTAL GLASS CALLBACK CARD */}
        <div className="hero-request-column-left">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-floating-callback-card glass-transparent-card"
          >
            <div className="callback-card-inner-header">
              <div className="callback-header-icon-circle">
                <PhoneCall size={20} color="#ffffff" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="pulse-dot-live-red" />
                  <h3>Request a Call-back</h3>
                </div>
                <p>Our team will get back to you soon.</p>
              </div>
            </div>

            {callbackSubmitted ? (
              <div className="callback-success-box">
                <Sparkles size={34} color="#10b981" />
                <h4>Thank You!</h4>
                <p>{callbackSuccessMsg || 'We have received your call-back request.'}</p>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="callback-form-inner">
                {callbackError && (
                  <p className="callback-error-msg">{callbackError}</p>
                )}
                <div className="callback-input-field">
                  <User size={18} className="input-field-icon" />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={callbackForm.name}
                    onChange={(e) => {
                      setCallbackForm({ ...callbackForm, name: e.target.value });
                      if (callbackError) setCallbackError('');
                    }}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div className="callback-input-field">
                  <Phone size={18} className="input-field-icon" />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    value={callbackForm.phone}
                    onChange={(e) => {
                      setCallbackForm({ ...callbackForm, phone: e.target.value });
                      if (callbackError) setCallbackError('');
                    }}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="callback-red-btn" 
                  disabled={isSubmitting}
                  style={{ opacity: isSubmitting ? 0.75 : 1, cursor: isSubmitting ? 'wait' : 'pointer' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={17} className="spinner" style={{ animation: 'spin 0.8s linear infinite' }} />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <PhoneCall size={17} />
                      <span>Request Call-back</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* APP STORE & GOOGLE PLAY DOWNLOAD BADGES */}
          <div className="hero-store-downloads-wrap">
            <div className="download-app-header-label">
              <span className="pulse-dot-live-gold" />
              <Smartphone size={14} color="#ffd700" />
              <span>DOWNLOAD NIMS TATKAL SEVA</span>
            </div>
            <div className="hero-store-downloads">
              <Link to="/tatkaal-booking" className="hero-store-badge">
                <AppStoreMark />
                <span><small>Download on the</small><strong>App Store</strong></span>
              </Link>
              <a 
                href="https://play.google.com/store/apps/details?id=com.nimstatkalseva.android" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-store-badge"
              >
                <GooglePlayMark />
                <span><small>Get it on</small><strong>Google Play</strong></span>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: OPEN HERO VIEW */}
        <div className="hero-right-open-view" />
      </div>

      {/* FLOATING NAV ARROWS (Only shown if multiple slides exist) */}
      {slides.length > 1 && (
        <>
          <button onClick={prevSlide} className="hero-nav-arrow arrow-prev" aria-label="Previous slide">
            <ChevronLeft size={22} />
          </button>
          <button onClick={nextSlide} className="hero-nav-arrow arrow-next" aria-label="Next slide">
            <ChevronRight size={22} />
          </button>

          {/* TOP RIGHT SLIDE DOTS */}
          <div className="hero-top-controls">
            <div className="hero-dots-wrap">
              {slides.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`hero-dot ${idx === current ? 'active' : ''}`}
                  onClick={() => {
                    setAutoplay(false);
                    setCurrent(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* 3. RED ORGANIC WAVE CONTAINER WITH 6 STATIC QUICK ACTION CARDS */}
      <div className="hero-bottom-wave-bar">
        <div className="bottom-wave-svg-overlay">
          <svg viewBox="0 0 1440 130" preserveAspectRatio="none" className="bottom-wave-svg">
            <defs>
              <linearGradient id="bottomBarRedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7a0000" />
                <stop offset="25%" stopColor="#c8102e" />
                <stop offset="65%" stopColor="#e51c38" />
                <stop offset="100%" stopColor="#9e1217" />
              </linearGradient>
              <linearGradient id="waveBorderHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.9)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
              </linearGradient>
            </defs>

            {/* Accent Highlight Line along wave curve top */}
            <path 
              d="M0,22 Q360,0 720,20 T1440,12 L1440,130 L0,130 Z" 
              fill="none" 
              stroke="url(#waveBorderHighlight)" 
              strokeWidth="3"
            />
            {/* Main Rich Crimson Red Wave Fill */}
            <path 
              d="M0,24 Q360,2 720,22 T1440,14 L1440,130 L0,130 Z" 
              fill="url(#bottomBarRedGrad)" 
            />
          </svg>
        </div>

        <div className="relative z-10 width-100">
          {/* INFINITE MARQUEE SLIDING TRACK (100% Full Screen Width) */}
          <div className="nims-hero-marquee-wrapper">
            <div className="nims-hero-marquee-track">
              {/* SET 1 */}
              {insurancePartners.map((item) => (
                <Link
                  key={`partner-set1-${item.id}`}
                  to={`/loyalty-card#${item.id}`}
                  className="insurance-logo-card"
                  title={`${item.name} — Cashless Care at NIMS Hospital`}
                >
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.alt}
                      className="insurance-logo-img"
                      loading="lazy"
                      onError={(e) => {
                        if (item.fallbackLogo && e.currentTarget.src !== item.fallbackLogo) {
                          e.currentTarget.src = item.fallbackLogo;
                          return;
                        }
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        const textSpan = parent.querySelector('.insurance-card-text-fallback');
                        if (textSpan) textSpan.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <span
                    className="insurance-card-text-fallback"
                    style={{ display: item.logo ? 'none' : 'block' }}
                  >
                    {item.displayText || item.name}
                  </span>
                </Link>
              ))}

              {/* SET 2 (DUPLICATE FOR CONTINUOUS INFINITE LOOP) */}
              {insurancePartners.map((item) => (
                <Link
                  key={`partner-set2-${item.id}`}
                  to={`/loyalty-card#${item.id}`}
                  className="insurance-logo-card"
                  title={`${item.name} — Cashless Care at NIMS Hospital`}
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.alt}
                      className="insurance-logo-img"
                      loading="lazy"
                      onError={(e) => {
                        if (item.fallbackLogo && e.currentTarget.src !== item.fallbackLogo) {
                          e.currentTarget.src = item.fallbackLogo;
                          return;
                        }
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        const textSpan = parent.querySelector('.insurance-card-text-fallback');
                        if (textSpan) textSpan.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <span
                    className="insurance-card-text-fallback"
                    style={{ display: item.logo ? 'none' : 'block' }}
                  >
                    {item.displayText || item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
