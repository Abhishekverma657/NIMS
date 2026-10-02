import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CalendarDays, Activity, ShieldPlus, ChevronRight, ChevronLeft, Ambulance, Stethoscope, FlaskConical, Home as HomeIcon, MapPin, ShieldCheck, HeartHandshake, Smartphone, Phone, User } from 'lucide-react';
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
        {/* ORGANIC CONCAVE SWOOSH DIVIDER */}
        <div className="hero-swoosh-container">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="hero-swoosh-main">
            <defs>
              <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8a0000" />
                <stop offset="50%" stopColor="#d10000" />
                <stop offset="100%" stopColor="#a70000" />
              </linearGradient>
            </defs>
            <path d="M0 0 L100 0 C60 25, 20 60, 85 100 L0 100 Z" fill="url(#redGradient)" />
          </svg>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="hero-swoosh-light">
            <path d="M0 0 L100 0 C60 25, 20 60, 85 100 L0 100 Z" fill="rgba(255, 255, 255, 0.08)" transform="translate(1, 0) scale(0.99, 1)" />
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
                <motion.div className="tatkal-pulse-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  <Activity size={18} className="pulse-icon" />
                  <span>Associated With NIMS Hospital</span>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h1 className="tatkal-text-logo">
                    <span className="nims-text">NIMS</span>
                    <span className="tatkal-text">TATKAL SEVA</span>
                  </h1>
                </motion.div>
                
                <motion.h2 className="tatkal-priority-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                  Your Health, Our Priority
                </motion.h2>
                
                <motion.p className="tatkal-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  {slides[current].subtitle}
                </motion.p>

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

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-4">
                  <Link to="/app" className="tatkal-app-btn">
                    <div className="app-btn-icon-real">
                      {/* CSS-based phone mockup mimicking the real photo */}
                      <div className="mock-phone">
                        <div className="mock-screen-top">
                          <svg viewBox="0 0 24 24" fill="white" width="14" height="14"><path d="M5.5 2.5L18.5 12L5.5 21.5V2.5Z"/></svg>
                        </div>
                        <div className="mock-screen-bottom">
                          <svg viewBox="0 0 24 24" fill="white" width="14" height="14"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                        </div>
                      </div>
                    </div>
                    <div className="app-btn-text">
                      <span className="t-main">Download Mobile App</span>
                      <span className="t-sub">Book • Track • Manage • Stay Healthy</span>
                    </div>
                    <div className="app-btn-arrow-circle"><ArrowRight size={18} /></div>
                  </Link>
                </motion.div>
              </div>
            ) : (
              <>
                <motion.div 
                  className="hero-badge"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <Activity size={16} />
                  <span>{slides[current].badge}</span>
                </motion.div>

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
          <div className="service-icon"><Ambulance size={20} /></div>
          <span>Book Ambulance<br/>Near Me</span>
        </div>
        <div className="service-divider"></div>
        <div className="service-item">
          <div className="service-icon"><Stethoscope size={20} /></div>
          <span>Book Health Checkup<br/>& Sample Collect</span>
        </div>
        <div className="service-divider"></div>
        <div className="service-item">
          <div className="service-icon"><CalendarDays size={20} /></div>
          <span>Online<br/>Appointment</span>
        </div>
        <div className="service-divider"></div>
        <div className="service-item">
          <div className="service-icon"><FlaskConical size={20} /></div>
          <span>Health Checkup<br/>Packages</span>
        </div>
        <div className="service-divider"></div>
        <div className="service-item">
          <div className="service-icon"><HomeIcon size={20} /></div>
          <span>Sample Collect<br/>From Home</span>
        </div>
      </div>
    </div>
  );
}
