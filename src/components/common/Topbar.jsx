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
      badge: '24×7 EMERGENCY',
      badgeColor: '#10b981',
      text: 'Open 24 Hours • Comprehensive Emergency & Critical Trauma Care Unit'
    },
    {
      badge: 'ACCREDITED',
      badgeColor: '#f47521',
      text: 'NABH & NABL Accredited Multi-Super Speciality Quaternary Hospital in Jaipur'
    },
    {
      badge: 'AMBULANCE HELPLINE',
      badgeColor: '#38bdf8',
      text: '24×7 Rapid Ambulance & Emergency Response: 0141-2388999'
    },
    {
      badge: 'CASHLESS ACTIVE',
      badgeColor: '#22c55e',
      text: 'Empanelled: RGHS, Chiranjeevi/MAA, Ayushman Bharat, CGHS, ECHS & ESIC'
    },
    {
      badge: 'QUATERNARY CARE',
      badgeColor: '#f59e0b',
      text: '500+ Super Speciality Doctors & 3,400+ Advanced Hospital Beds at NH-11C, Jaipur'
    },
    {
      badge: 'OPD & IPD',
      badgeColor: '#a855f7',
      text: '30+ Clinical Disciplines & Modular State-of-the-Art Operation Theatres'
    }
  ];

  return (
    <div className="nims-topbar-wrapper">
      {/* Fluid full-width container utilizing left and right screen space */}
      <div className="topbar-fluid-container">
        {/* Left Side: Fixed Jaipur Address */}
        <div className="topbar-left">
          <MapPin size={13} color="var(--nims-orange)" style={{ flexShrink: 0 }} />
          <span className="location-text">Jaipur-Delhi Highway (NH-11C), Rajasthan</span>
        </div>

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
                    background: `${item.badgeColor}22`,
                    color: item.badgeColor,
                    borderColor: `${item.badgeColor}55`
                  }}
                >
                  {item.badge}
                </span>
                <span className="marquee-text">{item.text}</span>
                <span className="marquee-separator">•</span>
              </div>
            ))}

            {/* Duplicated sequence for seamless, continuous infinite scroll */}
            {newsItems.map((item, idx) => (
              <div className="marquee-item" key={`dup-${idx}`}>
                <span
                  className="ticker-badge"
                  style={{
                    background: `${item.badgeColor}22`,
                    color: item.badgeColor,
                    borderColor: `${item.badgeColor}55`
                  }}
                >
                  {item.badge}
                </span>
                <span className="marquee-text">{item.text}</span>
                <span className="marquee-separator">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Fixed Action Links (Careers, Loyalty Card, Patient Portal in uniform UI) */}
        <div className="topbar-right">
          <Link
            to="/vacancies"
            className="topbar-link"
            title="Careers and Open Positions at NIMS Hospital"
          >
            <Briefcase size={13} color="var(--nims-orange)" />
            <span>Careers / Vacancies</span>
          </Link>

          {/* Health Schemes rendered in identical link UI as Careers and Portal */}
          <Link
            to="/loyalty-card"
            className="topbar-link"
            title="NIMS Empaneled Government Healthcare Benefit Schemes & TPA"
          >
            <ShieldCheck size={13} color="var(--nims-orange)" />
            <span>Health Schemes</span>
          </Link>

          <Link
            to="/patient-portal"
            className="topbar-link"
            title="Patient Portal & Online Records"
          >
            <User size={13} color="var(--nims-orange)" />
            <span>Patient Portal</span>
          </Link>
        </div>
      </div>

      {/* Mobile-Only Responsive Quick Action Bar */}
      <div className="topbar-mobile-quickbar">
        <div className="mobile-quickbar-inner">
          <div className="mobile-loc-tag">
            <MapPin size={11} color="var(--nims-orange)" />
            <span>Jaipur NH-11C</span>
          </div>

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
