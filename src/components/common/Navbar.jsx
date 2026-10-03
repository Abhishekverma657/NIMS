import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
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
    { name: 'About Us', path: '/about' },
    { name: 'Specialities', path: '/specialities' },
    { name: 'Health Packages', path: '/health-packages' },
    { name: 'Photo Gallery', path: '/photo-gallery' },
    { name: 'Careers', path: '/careers' },
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
      borderBottom: '1px solid rgba(35, 32, 33, 0.08)',
      boxShadow: isScrolled ? '0 8px 30px rgba(35, 32, 33, 0.06)' : '0 2px 8px rgba(0, 0, 0, 0.02)',
      transition: 'all 0.2s ease',
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: isScrolled ? '0.3rem' : '0.45rem',
        paddingBottom: isScrolled ? '0.3rem' : '0.45rem',
        paddingLeft: 'clamp(1rem, 3vw, 3rem)',
        paddingRight: 'clamp(1rem, 3vw, 3rem)',
        gap: '0.75rem',
        width: '100%'
      }}>
        {/* Official NIMS Hospital logo */}
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
            src="/assets/NIMS_Hospital_Logo_Website_Horizontal.svg"
            alt="NIMS Hospital"
            style={{
              width: 'clamp(118px, 9.5vw, 150px)',
              height: 'auto',
              maxHeight: '44px',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </Link>

        {/* Desktop navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.4rem',
          flexWrap: 'nowrap'
        }} className="d-desktop-only">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: '0.4rem 0',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: isActive ? '#bd171c' : '#334155',
                  textDecoration: 'none',
                  borderBottom: isActive ? '2px solid #bd171c' : '2px solid transparent',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.2px'
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#bd171c';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#334155';
                  }
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right CTA Area: Compact NIMS Tatkaal Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <Link
            to="/tatkaal-booking"
            className="btn btn-primary btn-tatkaal d-desktop-only"
            style={{
              padding: '0.38rem 0.9rem',
              fontSize: '0.78rem',
              background: 'linear-gradient(105deg, #d91620 0%, #b40710 58%, #85040b 100%)',
              color: 'white',
              borderRadius: '50px',
              fontWeight: 800,
              boxShadow: '0 6px 18px rgba(189, 23, 28, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.25s ease',
              textDecoration: 'none'
            }}
          >
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#ffffff',
              display: 'inline-block',
              boxShadow: '0 0 6px rgba(255,255,255,0.8)'
            }} />
            <span>Nims Tatkaal Seva (ICU Booking) ➔</span>
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="d-mobile-menu-btn"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            style={{
              display: 'none',
              background: mobileMenuOpen ? 'rgba(35, 32, 33, 0.08)' : '#f8fafc',
              border: '1px solid rgba(35, 32, 33, 0.14)',
              borderRadius: '10px',
              cursor: 'pointer',
              color: 'var(--nims-navy)',
              padding: '0.45rem',
              width: '40px',
              height: '40px',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
              flexShrink: 0
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
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
              boxShadow: '0 16px 36px rgba(35, 32, 33, 0.12)',
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
                      border: `1px solid ${isActive ? 'rgba(189, 23, 28, 0.25)' : 'rgba(226, 232, 240, 0.8)'}`,
                      textDecoration: 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{link.name}</span>
                    <ChevronRight size={16} color={isActive ? 'var(--nims-orange)' : '#94a3b8'} />
                  </Link>
                );
              })}

              <div style={{
                marginTop: '0.5rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--nims-border)'
              }}>
                <Link
                  to="/tatkaal-booking"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '50px',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    background: 'linear-gradient(to right, #bd171c, #9e1217, #791017)',
                    border: '1px solid rgba(248, 113, 113, 0.3)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.55rem',
                    boxShadow: '0 8px 20px rgba(189, 23, 28, 0.3)',
                    transition: 'transform 0.15s ease',
                    textDecoration: 'none'
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff', display: 'inline-block' }}></span>
                  <span>Nims Tatkaal Seva (ICU Booking) ➔</span>
                </Link>
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
            height: 36px !important;
            max-width: 140px !important;
          }
        }
      `}</style>
    </nav>
  );
}
