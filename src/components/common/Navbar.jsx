import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Specialities', path: '/specialities' },
    { name: 'About Us', path: '/about' },
    { name: 'Health Packages', path: '/health-packages' },
    { name: 'Photo Gallery', path: '/photo-gallery' },
    { name: 'Contact', path: '/contact-us' }
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: isScrolled ? 'rgba(255, 255, 255, 0.98)' : '#ffffff',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(10, 47, 94, 0.08)',
      boxShadow: isScrolled ? '0 8px 30px rgba(10, 47, 94, 0.06)' : '0 2px 8px rgba(0, 0, 0, 0.02)',
      transition: 'all 0.2s ease',
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: isScrolled ? '0.55rem' : '0.75rem',
        paddingBottom: isScrolled ? '0.55rem' : '0.75rem',
        gap: '0.75rem',
        width: '100%'
      }}>
        {/* Official NIMS Hospital Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            flexShrink: 0
          }}
          aria-label="NIMS Hospital Home"
        >
          <img
            src="/assets/images/nims-hospital-logo.svg"
            alt="NIMS Hospital"
            className="navbar-brand-logo"
            style={{
              height: '44px',
              width: 'auto',
              maxWidth: '190px',
              objectFit: 'contain',
              display: 'block'
            }}
            onError={(e) => {
              e.currentTarget.src = "https://nimshospitals.in/assets/images/nims-hospital-logo.svg";
            }}
          />
        </Link>

        {/* Desktop Nav Links (STRICTLY SINGLE LINE) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          flexWrap: 'nowrap'
        }} className="d-desktop-only">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-xl)',
                  fontSize: '0.94rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--nims-navy)' : 'var(--color-text-primary)',
                  background: isActive ? 'rgba(10, 47, 94, 0.08)' : 'transparent',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.color = 'var(--nims-orange)';
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.color = 'var(--color-text-primary)';
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right CTA Area: Desktop CTA button + Mobile Hamburger Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          {/* Desktop "Book Appointment" button - hidden on mobile */}
          <button
            onClick={onOpenBooking}
            className="btn btn-primary d-desktop-only"
            style={{
              padding: '0.65rem 1.35rem',
              fontSize: '0.92rem',
              background: 'var(--nims-navy)'
            }}
          >
            <Calendar size={16} />
            <span>Book Appointment</span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="d-mobile-menu-btn"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            style={{
              display: 'none',
              background: mobileMenuOpen ? 'rgba(10, 47, 94, 0.08)' : '#f8fafc',
              border: '1px solid rgba(10, 47, 94, 0.14)',
              borderRadius: '10px',
              cursor: 'pointer',
              color: 'var(--nims-navy)',
              padding: '0.45rem',
              width: '42px',
              height: '42px',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
              flexShrink: 0
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Slide-Down Animation) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: '#ffffff',
              borderTop: '1px solid var(--nims-border)',
              boxShadow: '0 16px 36px rgba(10, 47, 94, 0.12)',
              overflow: 'hidden'
            }}
            className="d-mobile-menu-content"
          >
            <div style={{
              padding: '1rem 1.1rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.45rem',
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto'
            }}>
              {/* Main Navigation Links */}
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      fontSize: '0.98rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--nims-orange)' : 'var(--nims-navy)',
                      background: isActive ? 'var(--nims-orange-soft)' : 'rgba(248, 250, 252, 0.75)',
                      border: `1px solid ${isActive ? 'rgba(244, 117, 33, 0.25)' : 'rgba(226, 232, 240, 0.8)'}`,
                      textDecoration: 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{link.name}</span>
                    <ChevronRight size={16} color={isActive ? 'var(--nims-orange)' : '#94a3b8'} />
                  </Link>
                );
              })}

              {/* Book Appointment CTA Button at Bottom */}
              <div style={{
                marginTop: '0.5rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--nims-border)'
              }}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    background: 'linear-gradient(135deg, var(--nims-orange) 0%, #e05e0c 100%)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.55rem',
                    boxShadow: '0 4px 16px rgba(244, 117, 33, 0.35)',
                    transition: 'transform 0.15s ease'
                  }}
                >
                  <Calendar size={18} />
                  <span>Book Appointment Online</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .d-desktop-only {
            display: none !important;
          }
          .d-mobile-menu-btn {
            display: flex !important;
          }
        }
        @media (max-width: 640px) {
          .navbar-brand-logo {
            height: 38px !important;
            max-width: 160px !important;
          }
        }
      `}</style>
    </nav>
  );
}
