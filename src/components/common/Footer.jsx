import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  ArrowUp,
  ShieldCheck,
  Award,
  Calendar,
  Heart,
  Globe2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer({ onOpenBooking, onOpenVacancies }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #09264c 0%, #041427 100%)',
      color: '#cbd5e1',
      borderTop: '4px solid var(--nims-orange)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Upper CTA Banner: 24x7 Emergency Contact Strip */}
      <div style={{
        background: 'rgba(4, 20, 39, 0.75)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '2.25rem 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--nims-orange)',
              fontWeight: 800,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.35rem'
            }}>
              <span className="pulse-dot pulse-dot-orange" />
              <span>Apex Emergency &amp; Trauma Center (Level-1 Active 24×7)</span>
            </div>
            <h3 style={{ color: '#ffffff', fontSize: 'clamp(1.25rem, 2.2vw, 1.6rem)', margin: 0, fontWeight: 800 }}>
              Every emergency answered. Every hour of every day.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0.3rem 0 0 0' }}>
              Direct ambulance dispatch &amp; 24×7 casualty admissions on Jaipur-Delhi Highway (NH-11C).
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <motion.a
              href="tel:0141-2388999"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                background: 'var(--nims-navy)',
                border: '1.5px solid var(--nims-orange)',
                color: '#ffffff',
                padding: '0.8rem 1.45rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 800,
                fontSize: '1rem',
                boxShadow: '0 4px 18px rgba(10, 47, 94, 0.4)',
                textDecoration: 'none'
              }}
            >
              <PhoneCall size={18} color="var(--nims-orange)" />
              <span>0141-23 88 999</span>
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenBooking}
              className="btn btn-orange"
              style={{ padding: '0.8rem 1.5rem', fontSize: '0.95rem' }}
            >
              <Calendar size={16} />
              <span>Book OPD Consultation</span>
            </motion.button>
          </div>
        </div>
      </div>



      {/* Main 4-Column Footer Content */}
      <div className="container" style={{ padding: '3.75rem 1.5rem 2.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.75rem',
          marginBottom: '3rem'
        }}>
          {/* Col 1: About Hospital & Accreditation */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <Link to="/" style={{ display: 'inline-block' }}>
                <div style={{
                  background: '#ffffff',
                  padding: '0.5rem 0.95rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'inline-block',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.25)'
                }}>
                  <img
                    src="/assets/images/nims-hospital-logo.svg"
                    alt="NIMS Hospital Logo"
                    style={{ height: '42px', width: 'auto', display: 'block' }}
                    onError={(e) => {
                      e.currentTarget.src = "https://nimshospitals.in/assets/images/nims-hospital-logo.svg";
                    }}
                  />
                </div>
              </Link>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              One of Northern India's largest 3,400-bed quaternary medical teaching hospitals. Bringing together renowned clinicians, organ transplantation, and advanced diagnostics on a single integrated campus.
            </p>

            {/* Quality Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.25rem' }}>
              <span style={{ background: 'rgba(255,255,255,0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc' }}>
                ✓ NABH Accredited
              </span>
              <span style={{ background: 'rgba(255,255,255,0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc' }}>
                ✓ NABL Diagnostics
              </span>
              <span style={{ background: 'rgba(244,117,33,0.18)', color: 'var(--nims-orange)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                ✓ 3,400 Beds
              </span>
            </div>

            {/* Government Schemes Supported */}
            <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5 }}>
              <b style={{ color: '#cbd5e1' }}>Government Empathies:</b><br />
              Ayushman Bharat (PM-JAY) • RGHS • Chiranjeevi • ECHS • CGHS Approved Cashless Care
            </div>
          </div>

          {/* Col 2: Quick Patient Links (100% Working Links) */}
          <div>
            <h4 style={{
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: 700,
              marginBottom: '1.25rem',
              letterSpacing: '0.02em',
              borderLeft: '3px solid var(--nims-orange)',
              paddingLeft: '0.65rem'
            }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0, margin: 0 }}>
              <li>
                <Link to="/about" style={{ color: '#94a3b8', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--nims-orange)'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  <ChevronRight size={14} color="var(--nims-orange)" />
                  <span>About NIMS Hospital</span>
                </Link>
              </li>
              <li>
                <Link to="/founder-and-chancellor" style={{ color: '#94a3b8', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--nims-orange)'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  <ChevronRight size={14} color="var(--nims-orange)" />
                  <span>Founder &amp; Chancellor Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/our-purpose" style={{ color: '#94a3b8', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--nims-orange)'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  <ChevronRight size={14} color="var(--nims-orange)" />
                  <span>Our Mission &amp; Purpose</span>
                </Link>
              </li>
              <li>
                <Link to="/specialities" style={{ color: '#94a3b8', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--nims-orange)'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  <ChevronRight size={14} color="var(--nims-orange)" />
                  <span>30+ Super Specialities Directory</span>
                </Link>
              </li>
              <li>
                <Link to="/health-packages" style={{ color: '#94a3b8', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--nims-orange)'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  <ChevronRight size={14} color="var(--nims-orange)" />
                  <span>Preventive Health Packages</span>
                </Link>
              </li>
              <li>
                <Link to="/patient-portal" style={{ color: '#94a3b8', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--nims-orange)'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  <ChevronRight size={14} color="var(--nims-orange)" />
                  <span>Patient Portal (UHID &amp; Reports)</span>
                </Link>
              </li>
              <li>
                <Link to="/vacancies" style={{ color: '#94a3b8', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--nims-orange)'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  <ChevronRight size={14} color="var(--nims-orange)" />
                  <span>Hospital Careers &amp; Vacancies</span>
                </Link>
              </li>
              <li>
                <Link to="/photo-gallery" style={{ color: '#94a3b8', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--nims-orange)'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  <ChevronRight size={14} color="var(--nims-orange)" />
                  <span>Campus Infrastructure Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/loyalty-card" style={{ color: '#94a3b8', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--nims-orange)'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  <ChevronRight size={14} color="var(--nims-orange)" />
                  <span>Government Healthcare Schemes</span>
                </Link>
              </li>
              <li>
                <Link to="/contact-us" style={{ color: '#94a3b8', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--nims-orange)'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  <ChevronRight size={14} color="var(--nims-orange)" />
                  <span>Contact Us &amp; Directions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Specialities (Direct Speciality Detail Links) */}
          <div>
            <h4 style={{
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: 700,
              marginBottom: '1.25rem',
              letterSpacing: '0.02em',
              borderLeft: '3px solid #38bdf8',
              paddingLeft: '0.65rem'
            }}>
              Centres of Excellence
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0, margin: 0 }}>
              <li>
                <Link to="/specialities/cardiology" style={{ color: '#94a3b8', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  • Cardiology &amp; 24×7 Cath Lab
                </Link>
              </li>
              <li>
                <Link to="/specialities/ctvs" style={{ color: '#94a3b8', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  • CTVS &amp; Open Heart Surgery
                </Link>
              </li>
              <li>
                <Link to="/specialities/orthopaedics" style={{ color: '#94a3b8', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  • Joint Replacement &amp; Orthopaedics
                </Link>
              </li>
              <li>
                <Link to="/specialities/neurosurgery" style={{ color: '#94a3b8', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  • Neurosurgery &amp; Spine Institute
                </Link>
              </li>
              <li>
                <Link to="/specialities/oncology" style={{ color: '#94a3b8', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  • Comprehensive Cancer Care
                </Link>
              </li>
              <li>
                <Link to="/specialities/nephrology" style={{ color: '#94a3b8', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  • Nephrology &amp; Kidney Dialysis
                </Link>
              </li>
              <li>
                <Link to="/specialities/gastroenterology" style={{ color: '#94a3b8', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  • Surgical Gastroenterology
                </Link>
              </li>
              <li>
                <Link to="/specialities/urology" style={{ color: '#94a3b8', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  • Urology &amp; Laser Stone Clinic
                </Link>
              </li>
              <li>
                <Link to="/specialities/gynaecology" style={{ color: '#94a3b8', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  • Obstetrics &amp; Gynaecology
                </Link>
              </li>
              <li>
                <Link to="/specialities/paediatrics" style={{ color: '#94a3b8', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  • Paediatrics &amp; Level-III NICU
                </Link>
              </li>
              <li style={{ paddingTop: '0.35rem' }}>
                <Link to="/specialities" style={{ color: 'var(--nims-orange)', fontSize: '0.88rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span>View All 30+ Super Specialities</span>
                  <span>&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Address & Direct Touchpoints */}
          <div>
            <h4 style={{
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: 700,
              marginBottom: '1.25rem',
              letterSpacing: '0.02em',
              borderLeft: '3px solid #10b981',
              paddingLeft: '0.65rem'
            }}>
              Campus &amp; Location
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem', fontSize: '0.88rem', color: '#94a3b8' }}>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <MapPin size={18} color="var(--nims-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  Jaipur-Delhi Highway (NH-11C), Dr. B.S. Tomar City, Jaipur - 303121, Rajasthan, INDIA
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <PhoneCall size={16} color="var(--nims-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <a href="tel:0141-2388999" style={{ color: '#ffffff', fontWeight: 700, textDecoration: 'none' }}>
                    0141-23 88 999
                  </a>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block' }}>24×7 Emergency &amp; Trauma Bay</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <PhoneCall size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <a href="tel:7412048766" style={{ color: '#ffffff', fontWeight: 700, textDecoration: 'none' }}>
                    +91 7412048766
                  </a>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block' }}>OPD Appointment Desk (9 AM - 5 PM)</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <Mail size={16} color="var(--nims-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <a href="mailto:info@nimsuniversity.org" style={{ color: '#cbd5e1', textDecoration: 'none' }}>
                  info@nimsuniversity.org
                </a>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <Clock size={16} color="#38bdf8" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Casualty / Triage: Open 24×7 • OPD: 09:00 AM - 05:00 PM</span>
              </div>

              {/* Direct Google Maps Route Button */}
              <div style={{ marginTop: '0.5rem' }}>
                <a
                  href="https://maps.google.com/?q=NIMS+Hospital+Jaipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    padding: '0.55rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--nims-orange)';
                    e.currentTarget.style.borderColor = 'var(--nims-orange)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                >
                  <MapPin size={14} />
                  <span>Navigate on Google Maps</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Government Schemes & Back to Top */}
        <div style={{
          paddingTop: '1.75rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
          fontSize: '0.82rem',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} NIMS Hospital (National Institute of Medical Sciences &amp; Research). All Rights Reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/contact-us" style={{ color: '#94a3b8', textDecoration: 'none' }}>
              Campus Map &amp; Directions
            </Link>
            <span>•</span>
            <Link to="/patient-portal" style={{ color: '#94a3b8', textDecoration: 'none' }}>
              Patient Portal
            </Link>
            <span>•</span>
            <Link to="/vacancies" style={{ color: '#94a3b8', textDecoration: 'none' }}>
              Careers
            </Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
