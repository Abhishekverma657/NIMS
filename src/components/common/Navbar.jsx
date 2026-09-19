import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Menu, X, ChevronRight, ShieldCheck } from 'lucide-react';

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
      transition: 'all 0.2s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: isScrolled ? '0.6rem' : '0.8rem',
        paddingBottom: isScrolled ? '0.6rem' : '0.8rem',
        gap: '1rem',
        flexWrap: 'nowrap'
      }}>
        {/* Official NIMS Hospital Logo (Exact from live site) */}
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
            style={{
              height: '46px',
              width: 'auto',
              display: 'block'
            }}
            onError={(e) => {
              // Fallback to high-res remote if local fails
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

        {/* Right CTA Button: Exact Navy Blue button from live site */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <button
            onClick={onOpenBooking}
            className="btn btn-primary"
            style={{
              padding: '0.65rem 1.35rem',
              fontSize: '0.92rem',
              background: 'var(--nims-navy)'
            }}
          >
            <Calendar size={16} />
            <span>Book Appointment</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--nims-navy)',
              padding: '0.4rem'
            }}
            className="d-mobile-menu-btn"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: '#ffffff',
          borderTop: '1px solid var(--nims-border)',
          padding: '1.25rem',
          boxShadow: '0 12px 30px rgba(0,0,0,0.1)'
        }} className="d-mobile-menu-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '1rem',
                  fontWeight: location.pathname === link.path ? 700 : 500,
                  color: location.pathname === link.path ? 'var(--nims-orange)' : 'var(--nims-navy)',
                  background: location.pathname === link.path ? 'var(--nims-orange-soft)' : 'transparent'
                }}
              >
                <span>{link.name}</span>
                <ChevronRight size={16} color="#94a3b8" />
              </Link>
            ))}

            {/* Mobile Dedicated Healthcare Schemes Link */}
            <Link
              to="/loyalty-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                marginTop: '0.5rem',
                borderRadius: '12px',
                fontSize: '0.96rem',
                fontWeight: 700,
                color: '#ffffff',
                background: 'linear-gradient(135deg, var(--nims-navy) 0%, #071f3d 100%)',
                border: '1px solid rgba(244, 117, 33, 0.3)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <ShieldCheck size={18} color="var(--nims-orange)" />
                <span>Healthcare Benefit Schemes</span>
              </div>
              <ChevronRight size={16} color="var(--nims-orange)" />
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .d-desktop-only {
            display: none !important;
          }
          .d-mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
