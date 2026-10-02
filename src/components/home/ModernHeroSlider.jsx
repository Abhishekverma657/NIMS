import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CalendarDays, Activity, ShieldPlus, ChevronRight, ChevronLeft, Ambulance, Stethoscope, FlaskConical, Home as HomeIcon, MapPin, ShieldCheck, HeartHandshake, Smartphone, Phone, User, Bed } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ModernHeroSlider.css';

export default function ModernHeroSlider({ slides }) {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
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

  return (
    <div className="modern-hero-container">
      {/* Removed mode="wait" so slides crossfade perfectly without a black flash */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="hero-slide-bg"
        >
          <img src={slides[current].image} alt="Hospital Slider" className="hero-bg-img" />
          <div className="hero-gradient-overlay" />
        </motion.div>
      </AnimatePresence>

      <div className="hero-content-wrapper">
        <div className="hero-swoosh-container">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="hero-swoosh-main">
            <defs>
              <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8a0000" />
                <stop offset="50%" stopColor="#d10000" />
                <stop offset="100%" stopColor="#a70000" />
              </linearGradient>
            </defs>
            {/* Deep shadow layer */}
            <path d="M0 0 L100 0 C60 25, 20 60, 85 100 L0 100 Z" fill="rgba(60, 0, 0, 0.5)" transform="translate(5, 0)" />
            {/* Light pinkish-white layer */}
            <path d="M0 0 L100 0 C60 25, 20 60, 85 100 L0 100 Z" fill="#ffeaea" transform="translate(4, 0)" />
            {/* Thick white layer */}
            <path d="M0 0 L100 0 C60 25, 20 60, 85 100 L0 100 Z" fill="#ffffff" transform="translate(2.5, 0)" />
            {/* Bright red accent layer */}
            <path d="M0 0 L100 0 C60 25, 20 60, 85 100 L0 100 Z" fill="#ff0a2e" transform="translate(1, 0)" />
            {/* Main deep red layer */}
            <path d="M0 0 L100 0 C60 25, 20 60, 85 100 L0 100 Z" fill="url(#redGradient)" />
          </svg>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={current}
            className={`hero-content-inner ${slides[current].isTatkalLayout ? 'tatkal-hero' : ''}`}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 30, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {slides[current].isTatkalLayout ? (
              <div className="tatkal-custom-layout">
                <motion.div className="tatkal-pulse-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ marginBottom: '0.2rem' }}>
                  <Activity size={18} className="pulse-icon" />
                  <span>24x7 Care, Just A Tap Away</span>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <img src="/assets/white logo.png" alt="NIMS Logo" style={{ maxWidth: '280px', height: 'auto', marginBottom: '0.8rem', marginTop: '0.2rem', display: 'block' }} />
                </motion.div>

                <motion.div className="tatkal-feature-blocks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                  <div className="t-block">
                    <div className="t-icon-glass"><ShieldCheck size={20} /></div>
                    <div className="t-block-text">
                      <strong>Fast</strong>
                      <span>Quick Response</span>
                    </div>
                  </div>
                  <div className="t-block">
                    <div className="t-icon-glass"><ShieldPlus size={20} /></div>
                    <div className="t-block-text">
                      <strong>Safe</strong>
                      <span>Trusted Care</span>
                    </div>
                  </div>
                  <div className="t-block">
                    <div className="t-icon-glass"><HeartHandshake size={20} /></div>
                    <div className="t-block-text">
                      <strong>Reliable</strong>
                      <span>Always With You</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                  <a href="#" style={{ display: 'inline-block', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on App Store" style={{ height: '46px', width: 'auto' }} />
                  </a>
                  <a href="#" style={{ display: 'inline-block', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" style={{ height: '46px', width: 'auto' }} />
                  </a>
                </motion.div>
              </div>
            ) : (
              <>

                <motion.h1 
                  className="hero-title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {slides[current].titlePart1}
                  <br />
                  <span className="hero-highlight">{slides[current].highlightWord}</span>
                  <br />
                  {slides[current].titlePart2}
                </motion.h1>

                <motion.p 
                  className="hero-subtitle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  {slides[current].subtitle}
                </motion.p>

                <motion.div 
                  className="hero-actions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <Link to="/contact" className="hero-btn primary-btn">
                    <CalendarDays size={20} />
                    {slides[current].primaryCta}
                  </Link>
                  <Link to={slides[current].secondaryLink} className="hero-btn secondary-btn">
                    {slides[current].secondaryCta}
                    <ArrowRight size={20} className="btn-icon" />
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* REQUEST CALLBACK FLOATING CARD (Right Side) */}
        <AnimatePresence>
          {slides[current].isTatkalLayout && (
            <motion.div 
              className="hero-callback-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
            >
              <div className="callback-header">
                <div className="callback-icon-circle">
                  <Phone size={22} color="#cc0000" fill="#cc0000" />
                </div>
                <div className="callback-header-text">
                  <h3>Request a Call-back</h3>
                  <p>Our team will get back to you soon.</p>
                </div>
              </div>
              <div className="callback-body">
                <div className="callback-input-group">
                  <User size={18} className="input-icon" />
                  <input type="text" placeholder="Full Name" />
                </div>
                <div className="callback-input-group">
                  <Phone size={18} className="input-icon" />
                  <input type="tel" placeholder="Phone Number" />
                </div>
                <button className="callback-submit-btn">
                  <Phone size={18} fill="white" />
                  Request Call-back
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FLOATING LEFT & RIGHT ARROWS */}
      <button onClick={prevSlide} className="nav-arrow floating-left"><ChevronLeft size={24} /></button>
      <button onClick={nextSlide} className="nav-arrow floating-right"><ChevronRight size={24} /></button>

      {/* BOTTOM RIGHT PROGRESS DOTS */}
      <div className="hero-navigation">
        <div className="progress-container">
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              className={`progress-dot ${idx === current ? 'active' : ''}`}
              onClick={() => {
                setAutoplay(false);
                setCurrent(idx);
              }}
            >
              {idx === current && (
                <motion.div 
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FIXED BOTTOM SERVICES BAR */}
      <div className="hero-bottom-services-bar">
        <div className="service-item">
          <div className="service-icon"><Bed size={20} /></div>
          <span>Book ICU<br/>Bed</span>
        </div>
        <div className="service-divider"></div>
        <div className="service-item">
          <div className="service-icon"><Stethoscope size={20} /></div>
          <span>Book<br/>OPD</span>
        </div>
        <div className="service-divider"></div>
        <div className="service-item">
          <div className="service-icon"><Ambulance size={20} /></div>
          <span>Book<br/>Ambulance</span>
        </div>
        <div className="service-divider"></div>
        <div className="service-item">
          <div className="service-icon"><FlaskConical size={20} /></div>
          <span>Book Health<br/>Package</span>
        </div>
        <div className="service-divider"></div>
        <div className="service-item">
          <div className="service-icon"><Smartphone size={20} /></div>
          <span>Download App<br/>Now</span>
        </div>
      </div>
    </div>
  );
}
