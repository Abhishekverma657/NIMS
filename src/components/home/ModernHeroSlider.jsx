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
  Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';
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

export default function ModernHeroSlider({ slides, onOpenBooking, onOpenPackageBooking }) {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [callbackForm, setCallbackForm] = useState({ name: '', phone: '' });

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

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    if (!callbackForm.phone) return;
    setCallbackSubmitted(true);
    setTimeout(() => {
      setCallbackSubmitted(false);
      setCallbackForm({ name: '', phone: '' });
    }, 4000);
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
                <p>We have received your call-back request.</p>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="callback-form-inner">
                <div className="callback-input-field">
                  <User size={18} className="input-field-icon" />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={callbackForm.name}
                    onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="callback-input-field">
                  <Phone size={18} className="input-field-icon" />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    value={callbackForm.phone}
                    onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="callback-red-btn">
                  <PhoneCall size={17} />
                  <span>Request Call-back</span>
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
              <Link to="/tatkaal-booking" className="hero-store-badge">
                <GooglePlayMark />
                <span><small>Get it on</small><strong>Google Play</strong></span>
              </Link>
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
          <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="bottom-wave-svg">
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
              d="M0,32 Q360,-12 720,28 T1440,16 L1440,140 L0,140 Z" 
              fill="none" 
              stroke="url(#waveBorderHighlight)" 
              strokeWidth="3"
            />
            {/* Main Rich Crimson Red Wave Fill */}
            <path 
              d="M0,35 Q360,-10 720,30 T1440,18 L1440,140 L0,140 Z" 
              fill="url(#bottomBarRedGrad)" 
            />
          </svg>
        </div>

        <div className="container relative z-10 width-100">
          {/* STATIC 6 SERVICE CARDS EVENLY DISTRIBUTED */}
          <div className="wave-bar-items">
            <div className="wave-item-card" onClick={() => onOpenBooking ? onOpenBooking() : null}>
              <div className="wave-icon-bubble">
                <Bed size={20} color="#c8102e" />
              </div>
              <span>ICU Bed<br/>Booking</span>
              <span className="card-live-badge-dot" />
            </div>

            <div className="wave-item-card" onClick={() => onOpenBooking ? onOpenBooking() : null}>
              <div className="wave-icon-bubble">
                <Stethoscope size={20} color="#c8102e" />
              </div>
              <span>OPD<br/>Booking</span>
            </div>

            <a href="tel:0141-2388999" className="wave-item-card">
              <div className="wave-icon-bubble">
                <Ambulance size={20} color="#c8102e" />
              </div>
              <span>Ambulance<br/>Booking</span>
              <span className="card-live-badge-dot" />
            </a>

            <div className="wave-item-card" onClick={() => onOpenBooking ? onOpenBooking() : null}>
              <div className="wave-icon-bubble">
                <CalendarDays size={20} color="#c8102e" />
              </div>
              <span>Online<br/>Appointment</span>
            </div>

            <div className="wave-item-card" onClick={() => onOpenPackageBooking ? onOpenPackageBooking() : null}>
              <div className="wave-icon-bubble">
                <FlaskConical size={20} color="#c8102e" />
              </div>
              <span>Health Checkup<br/>Packages</span>
            </div>

            <div className="wave-item-card" onClick={() => onOpenPackageBooking ? onOpenPackageBooking() : null}>
              <div className="wave-icon-bubble">
                <HomeIcon size={20} color="#c8102e" />
              </div>
              <span>Sample Collect<br/>From Home</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
