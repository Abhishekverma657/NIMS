import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Briefcase,
  CreditCard,
  User,
  ShieldCheck,
  Award,
  PhoneCall,
  Sparkles
} from 'lucide-react';

export default function Topbar({ onOpenVacancies }) {
  const newsItems = [
    {
      fullText: '⚡ NIMS TATKAAL SEVA: 24/7 ONLINE ICU BED BOOKING (PRE-BOOKING ₹5,000/-)',
      color: '#bd171c', // Text color inside yellow box
      bg: '#fde047',    // Yellow box
    },
    {
      fullText: '🔴 ADMISSIONS OPEN 2026 - 2027 FOR MBBS',
      color: '#e5b64a',
      bg: 'transparent',
    },
    {
      fullText: '🏥 DR. B. S. TOMAR INSTITUTE OF MEDICAL SCIENCES & RESEARCH',
      color: '#ffffff',
      bg: 'transparent',
    },
    {
      fullText: '🚨 24/7 ICU & EMERGENCY CARE AVAILABLE',
      color: '#facc15',
      bg: 'transparent',
    },
    {
      fullText: '📞 CALL EMERGENCY: +91 74120 77125',
      color: '#e5b64a',
      bg: 'transparent',
    }
  ];

  return (
    <div className="nims-topbar-wrapper">
      {/* Fluid full-width container utilizing left and right screen space */}
      <div className="topbar-fluid-container">


        {/* Center: Continuous News Headline Marquee (Right to Left Scrolling) */}
        <div
          className="topbar-marquee-container"
          title="Hospital Live News Headlines (Hover to pause)"
        >
          <div className="marquee-track">
            {/* First sequence of news headlines */}
            {newsItems.map((item, idx) => (
              <div className="marquee-item" key={`orig-${idx}`}>
                <span
                  className="ticker-badge"
                  style={{
                    background: item.bg,
                    color: item.color,
                    fontWeight: 900,
                    padding: item.bg !== 'transparent' ? '0.3rem 0.6rem' : '0.3rem 0',
                    border: 'none',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    height: '100%'
                  }}
                >
                  {item.fullText}
                </span>
                <span className="marquee-separator">•</span>
              </div>
            ))}

            {/* Duplicated sequence for seamless, continuous infinite scroll */}
            {newsItems.map((item, idx) => (
              <div className="marquee-item" key={`dup-${idx}`}>
                <span
                  className="ticker-badge"
                  style={{
                    background: item.bg,
                    color: item.color,
                    fontWeight: 900,
                    padding: item.bg !== 'transparent' ? '0.3rem 0.6rem' : '0.3rem 0',
                    border: 'none',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    height: '100%'
                  }}
                >
                  {item.fullText}
                </span>
                <span className="marquee-separator">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Fixed Action Links (Careers, Loyalty Card, Patient Portal in uniform UI) */}
        <div className="topbar-right" style={{ display: 'flex', gap: '0.75rem' }}>
          <Link
            to="/vacancies"
            className="topbar-btn"
            title="Careers and Open Positions at NIMS Hospital"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.3rem',
              padding: '0.35rem 0.75rem', borderRadius: '50px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#e2e8f0', textDecoration: 'none',
              fontWeight: 700, fontSize: '0.75rem', transition: 'all 0.2s'
            }}
          >
            <Briefcase size={13} color="var(--nims-orange)" />
            <span>Careers</span>
          </Link>

          <Link
            to="/loyalty-card"
            className="topbar-btn"
            title="NIMS Empaneled Government Healthcare Benefit Schemes & TPA"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.3rem',
              padding: '0.35rem 0.75rem', borderRadius: '50px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#e2e8f0', textDecoration: 'none',
              fontWeight: 700, fontSize: '0.75rem', transition: 'all 0.2s'
            }}
          >
            <ShieldCheck size={13} color="var(--nims-orange)" />
            <span>Health Schemes</span>
          </Link>

          <Link
            to="/patient-portal"
            className="topbar-btn-primary"
            title="Patient Portal & Online Records"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.3rem',
              padding: '0.35rem 0.85rem', borderRadius: '50px',
              border: '1px solid rgba(229, 182, 74, 0.5)',
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'var(--nims-gold)', textDecoration: 'none',
              fontWeight: 800, fontSize: '0.75rem', transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <User size={13} color="var(--nims-gold)" />
            <span>Patient Portal</span>
          </Link>
        </div>
      </div>

      {/* Mobile-Only Responsive Quick Action Bar */}
      <div className="topbar-mobile-quickbar">
        <div className="mobile-quickbar-inner">


          <div className="mobile-actions-group">
            <Link to="/loyalty-card" className="mobile-quick-link">
              <ShieldCheck size={11} color="var(--nims-orange)" />
              <span>Health Schemes</span>
            </Link>
            <Link to="/vacancies" className="mobile-quick-link">
              <Briefcase size={11} color="var(--nims-orange)" />
              <span>Careers</span>
            </Link>
            <Link to="/patient-portal" className="mobile-quick-link">
              <User size={11} color="var(--nims-orange)" />
              <span>Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
