import React from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase
} from 'lucide-react';

export default function Topbar({ onOpenVacancies }) {
  const newsItems = [
    // --- Hindi Headlines ---
    {
      fullText: '⚡ NIMS तत्काल सेवा ऐप अभी डाउनलोड करें',
      color: '#facc15',
    },
    {
      fullText: '❤️ NIMS हॉस्पिटल, जयपुर — हर पल आपके साथ',
      color: '#ffffff',
    },
    {
      fullText: '🚨 24×7 ट्रॉमा और इमरजेंसी सेवाएँ',
      color: '#f87171',
    },
    {
      fullText: '🩺 ऑनलाइन OPD अपॉइंटमेंट',
      color: '#ffffff',
    },
    {
      fullText: '🚑 ऑनलाइन एम्बुलेंस बुकिंग',
      color: '#facc15',
    },
    {
      fullText: '🧪 घर से सैंपल कलेक्शन',
      color: '#ffffff',
    },
    {
      fullText: '📋 हेल्थ चेकअप पैकेज बुक करें',
      color: '#facc15',
    },
    {
      fullText: '🛏️ ऑनलाइन ICU बेड बुकिंग',
      color: '#ffffff',
    },
    {
      fullText: '💳 पात्र मरीजों के लिए सरकारी स्वास्थ्य योजनाओं के तहत कैशलेस इलाज',
      color: '#4ade80',
    },

    // --- English Headlines ---
    {
      fullText: '⚡ Download the NIMS Tatkal Seva App Today',
      color: '#facc15',
    },
    {
      fullText: '❤️ NIMS Hospital, Jaipur — With You Every Step of the Way',
      color: '#ffffff',
    },
    {
      fullText: '🚨 24×7 Trauma & Emergency Care',
      color: '#f87171',
    },
    {
      fullText: '🩺 Book OPD Appointments Online',
      color: '#ffffff',
    },
    {
      fullText: '🚑 Book an Ambulance Online',
      color: '#facc15',
    },
    {
      fullText: '🧪 Home Sample Collection',
      color: '#ffffff',
    },
    {
      fullText: '📋 Book a Health Checkup Package',
      color: '#facc15',
    },
    {
      fullText: '🛏️ Book an ICU Bed Online',
      color: '#ffffff',
    },
    {
      fullText: '💳 Cashless Treatment for Eligible Patients Under Government Health Schemes',
      color: '#4ade80',
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
                    fontSize: '0.74rem',
                    letterSpacing: '0.02em',
                    textTransform: 'none',
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
                    fontSize: '0.74rem',
                    letterSpacing: '0.02em',
                    textTransform: 'none',
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

        {/* Right Side: Fixed Action Link (Careers) */}
        <div className="topbar-right">
          <Link
            to="/careers"
            className="topbar-action"
            title="Hospital Careers & Job Openings at NIMS"
          >
            <Briefcase size={13} />
            <span>Careers</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
