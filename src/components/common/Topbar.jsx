import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck
} from 'lucide-react';

export default function Topbar({ onOpenVacancies }) {
  const newsItems = [
    {
      fullText: '⚡ NIMS TATKAAL SEVA: 24/7 ONLINE ICU BED BOOKING (PRE-BOOKING ₹5,000/-)',
      color: '#facc15',
      bg: 'transparent',
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
        {/* Center: Continuous News Headline Marquee */}
        <div
          className="topbar-marquee-container"
          title="Hospital Live News Headlines (Hover to pause)"
        >
          <div className="marquee-track">
            {newsItems.map((item, idx) => (
              <div className="marquee-item" key={`orig-${idx}`}>
                <span
                  className="ticker-badge"
                  style={{
                    color: item.color,
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.72rem',
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    border: 'none',
                    background: 'transparent',
                    padding: 0
                  }}
                >
                  {item.fullText}
                </span>
                <span className="marquee-separator">•</span>
              </div>
            ))}

            {/* Duplicated sequence for seamless infinite scroll */}
            {newsItems.map((item, idx) => (
              <div className="marquee-item" key={`dup-${idx}`}>
                <span
                  className="ticker-badge"
                  style={{
                    color: item.color,
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.72rem',
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    border: 'none',
                    background: 'transparent',
                    padding: 0
                  }}
                >
                  {item.fullText}
                </span>
                <span className="marquee-separator">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Fixed Action Link (Health Schemes) */}
        <div className="topbar-right">
          <Link
            to="/loyalty-card"
            className="topbar-action"
            title="NIMS Empaneled Government Healthcare Benefit Schemes & TPA"
          >
            <ShieldCheck size={12} />
            <span>Health Schemes</span>
          </Link>
        </div>
      </div>

      {/* Mobile-Only Quickbar */}
      <div className="topbar-mobile-quickbar">
        <div className="mobile-quickbar-inner">
          <div className="mobile-actions-group" style={{ gridTemplateColumns: '1fr', width: 'auto', minWidth: '180px' }}>
            <Link to="/loyalty-card" className="mobile-quick-link">
              <ShieldCheck size={11} color="var(--nims-orange)" />
              <span>Health Schemes</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
