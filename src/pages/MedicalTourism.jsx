import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe2,
  FileText,
  Stethoscope,
  Plane,
  Building2,
  HeartPulse,
  Award,
  Video,
  FileCheck,
  Car,
  Hotel,
  Users,
  Clock,
  CheckCircle2,
  PhoneCall,
  Mail,
  Send,
  MessageSquare,
  HelpCircle,
  MapPin,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Loader2,
  X,
  Activity,
  Heart,
  Droplets,
  Calendar,
  Utensils,
  Languages,
  Check,
  Compass,
  ArrowRight,
  UserCheck,
  BadgeCheck,
  Share2,
  CheckCircle
} from 'lucide-react';
import { MotionFadeIn, MotionStagger, MotionItem } from '../components/motion/MotionWrapper';
import { medicalTourismData } from '../data/medicalTourismData';
import './MedicalTourism.css';

export default function MedicalTourism({ onOpenBooking }) {
  // Safe Fallback for Lead Doctor in case of any data delay
  const head = medicalTourismData?.departmentHead || {
    name: 'Dr. Tasleem Jan',
    designation: 'Head, International Patient Care Department',
    institution: 'NIMS Hospital & NIMS University Rajasthan, Jaipur',
    phone: '+91 96222 11187',
    phoneRaw: '919622211187',
    email: 'tasleem.jan@hospital.nimsuniversity.org',
    role: 'Single Point of Contact (SPOC) for Global Patients',
    image: '/assets/international/dr-taslim-doctor-coat.jpg',
    message:
      'We understand the sensitivity and urgency of traveling abroad for specialized medical procedures. My team and I ensure personalized clinical coordination, official visa invitation letters within 24 to 48 hours, free airport reception, and constant bedside support throughout your stay in Jaipur.',
    badge: 'Official International Liaison & Desk In-charge'
  };

  // State for FAQ accordion
  const [openFaq, setOpenFaq] = useState(0);

  // State for image gallery modal
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // State for Inquiry Form
  const [form, setForm] = useState({
    name: '',
    email: '',
    country: '',
    countryCode: '+968',
    phone: '',
    specialty: 'Organ Transplantation',
    message: '',
    reportsAvailable: true,
    language: 'English'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const cleanName = form.name.trim();
    const cleanPhone = form.phone.replace(/\D/g, '');

    if (!cleanName) {
      setSubmitError('Please enter your full name.');
      return;
    }

    if (!form.country.trim()) {
      setSubmitError('Please enter your country of residence.');
      return;
    }

    if (cleanPhone.length < 6) {
      setSubmitError('Please enter a valid WhatsApp or phone number.');
      return;
    }

    if (!form.message.trim()) {
      setSubmitError('Please describe your medical condition or requirements.');
      return;
    }

    setIsSubmitting(true);
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
    const remoteUrl = 'https://api.nimshospitals.in/api';

    const fullPhone = `${form.countryCode} ${cleanPhone}`;
    const payload = {
      name: cleanName,
      country: form.country.trim(),
      countryCode: form.countryCode,
      phone: fullPhone,
      email: form.email.trim(),
      specialty: form.specialty,
      message: form.message.trim(),
      reportsAvailable: Boolean(form.reportsAvailable),
      language: form.language,
      source: 'WEBSITE_MEDICAL_TOURISM'
    };

    try {
      let res;
      try {
        res = await fetch(`${baseUrl}/international`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        try {
          res = await fetch(`${remoteUrl}/international`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        } catch (e) {
          res = await fetch(`${baseUrl}/callbacks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: cleanName,
              phone: fullPhone,
              email: form.email.trim(),
              department: form.specialty,
              country: form.country.trim(),
              countryCode: form.countryCode,
              language: form.language,
              reportsAvailable: Boolean(form.reportsAvailable),
              message: `[International Patient Inquiry for Dr. Tasleem Jan]\nCountry: ${form.country.trim()}\nPreferred Language: ${form.language}\nReports Available: ${form.reportsAvailable ? 'YES' : 'NO'}\n\nClinical Query:\n${form.message.trim()}`,
              source: 'MEDICAL_TOURISM_PAGE'
            })
          });
        }
      }

      if (res && (res.ok || res.status === 200 || res.status === 201)) {
        setSubmitSuccess(true);
      } else {
        const data = await res?.json().catch(() => ({}));
        setSubmitError(data?.message || 'Something went wrong. Please connect with Dr. Tasleem Jan on WhatsApp.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError('Unable to connect to the medical desk right now. Please click the WhatsApp button to chat directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById('international-enquiry-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getWhatsAppUrl = (customText) => {
    const defaultText = `Hello Dr. Tasleem Jan (NIMS International Care)! I am planning travel to India for treatment. Patient Name: ${form.name || 'International Patient'}, Country: ${form.country || 'International'}, Specialty: ${form.specialty}. Please guide me regarding medical evaluation, estimated cost, and medical visa invitation letter.`;
    const text = encodeURIComponent(customText || defaultText);
    return `https://wa.me/${head.phoneRaw || '919622211187'}?text=${text}`;
  };

  return (
    <div className="medical-tourism-page" style={{ background: '#f8fafc', color: 'var(--color-text-primary)' }}>
      {/* 1. HERO SECTION */}
      <section className="intl-hero-section">
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: 'min(600px, 90vw)',
            height: 'min(600px, 90vw)',
            background: 'radial-gradient(circle, rgba(189, 23, 28, 0.25) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '940px' }}>
            <MotionFadeIn>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.45rem 1.15rem',
                  borderRadius: '999px',
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(10px)',
                  marginBottom: '1.25rem'
                }}
              >
                <Globe2 size={18} style={{ color: 'var(--nims-gold)' }} />
                <span style={{ fontSize: 'clamp(0.75rem, 2vw, 0.9rem)', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#f8fafc' }}>
                  {medicalTourismData.hero.badge}
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#22c55e',
                    boxShadow: '0 0 10px #22c55e'
                  }}
                />
              </div>

              <h1
                style={{
                  fontSize: 'clamp(1.85rem, 4.2vw, 3.6rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  marginBottom: '1.25rem'
                }}
              >
                {medicalTourismData.hero.title}
              </h1>

              <p
                style={{
                  fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)',
                  lineHeight: 1.65,
                  color: '#e2e8f0',
                  marginBottom: '1.75rem',
                  maxWidth: '820px'
                }}
              >
                {medicalTourismData.hero.subtitle}
              </p>

              {/* Lead In-Charge Strip in Hero */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  background: 'rgba(0, 0, 0, 0.55)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(229, 182, 74, 0.4)',
                  padding: '0.6rem 1.15rem',
                  borderRadius: '16px',
                  marginBottom: '1.75rem',
                  maxWidth: '100%',
                  boxSizing: 'border-box'
                }}
              >
                <img
                  src={head.image || '/assets/international/dr-taslim-doctor-coat.jpg'}
                  alt={head.name}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    border: '2px solid var(--nims-gold)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    flexShrink: 0
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--nims-gold)' }}>
                    {head.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1', whiteSpace: 'normal' }}>
                    {head.designation} • Direct Helpline: <b style={{ color: '#ffffff' }}>{head.phone}</b>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="intl-hero-actions">
                <button
                  type="button"
                  onClick={scrollToForm}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: 'var(--nims-orange)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    padding: '0.9rem 1.8rem',
                    borderRadius: '50px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 25px rgba(189, 23, 28, 0.4)',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <FileText size={18} />
                  <span>{medicalTourismData.hero.actions.primary}</span>
                  <ChevronRight size={18} />
                </button>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: '#25D366',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.98rem',
                    padding: '0.9rem 1.7rem',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    boxShadow: '0 8px 20px rgba(37, 211, 102, 0.35)',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <MessageSquare size={18} />
                  <span>WhatsApp: {head.name}</span>
                </a>

                <a
                  href={`tel:${head.phone.replace(/\s+/g, '')}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    padding: '0.9rem 1.4rem',
                    borderRadius: '50px',
                    textDecoration: 'none'
                  }}
                >
                  <PhoneCall size={16} style={{ color: 'var(--nims-gold)' }} />
                  <span>{head.phone}</span>
                </a>
              </div>
            </MotionFadeIn>
          </div>
        </div>
      </section>

      {/* 2. STATS & ACCREDITATIONS BAR */}
      <section
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '1.75rem 0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          position: 'relative',
          zIndex: 3
        }}
      >
        <div className="container">
          <div className="intl-stats-grid">
            {medicalTourismData.stats.map((st, i) => (
              <div key={i} className="intl-stat-item">
                <div
                  style={{
                    fontSize: 'clamp(1.6rem, 2.3vw, 2.3rem)',
                    fontWeight: 800,
                    color: 'var(--nims-navy)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em'
                  }}
                >
                  {st.value}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--nims-orange)', marginTop: '0.2rem' }}>
                  {st.label}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.15rem' }}>{st.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DEDICATED INTERNATIONAL HEAD / SPOC SHOWCASE CARD */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0 0', background: '#ffffff' }}>
        <div className="container">
          <div className="intl-spoc-card">
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(229, 182, 74, 0.15)',
                  color: 'var(--nims-gold)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '1rem'
                }}
              >
                <BadgeCheck size={16} />
                <span>Single Point of Contact (SPOC) for Global Patients</span>
              </div>

              <h2 style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.3rem)', fontWeight: 800, margin: '0 0 0.3rem', color: '#ffffff' }}>
                {head.name}
              </h2>
              <div style={{ fontSize: '1.02rem', color: 'var(--nims-gold)', fontWeight: 700, marginBottom: '0.85rem' }}>
                {head.designation}
              </div>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                "{head.message}"
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <PhoneCall size={16} style={{ color: 'var(--nims-gold)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>
                    Direct Contact / WhatsApp:{' '}
                    <a href={`tel:${head.phone.replace(/\s+/g, '')}`} style={{ color: '#ffffff', fontWeight: 700, textDecoration: 'none' }}>
                      {head.phone}
                    </a>
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <Mail size={16} style={{ color: 'var(--nims-gold)', flexShrink: 0, marginTop: '0.2rem' }} />
                  <span style={{ fontSize: '0.9rem', color: '#e2e8f0' }} className="intl-break-word">
                    Official Email:{' '}
                    <a href={`mailto:${head.email}`} style={{ color: '#ffffff', fontWeight: 700, textDecoration: 'none' }} className="intl-break-word">
                      {head.email}
                    </a>
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <MapPin size={16} style={{ color: 'var(--nims-gold)', flexShrink: 0, marginTop: '0.2rem' }} />
                  <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                    International Patient Care Lounge, NIMS Hospital Campus, Jaipur
                  </span>
                </div>
              </div>

              <div className="intl-spoc-actions">
                <a
                  href={getWhatsAppUrl(`Hello ${head.name}! I would like to connect regarding international treatment at NIMS Hospital Jaipur.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: '#25D366',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '50px',
                    textDecoration: 'none'
                  }}
                >
                  <MessageSquare size={16} />
                  <span>Chat with {head.name}</span>
                </a>

                <a
                  href={`mailto:${head.email}?subject=International Patient Medical Inquiry - NIMS Hospital`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '50px',
                    textDecoration: 'none'
                  }}
                >
                  <Mail size={16} />
                  <span>Send Direct Email</span>
                </a>
              </div>
            </div>

            {/* Right Card with Real Photo */}
            <div
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(229, 182, 74, 0.35)',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.45)',
                background: 'linear-gradient(180deg, #0d2838 0%, #07151e 100%)'
              }}
            >
              {/* Floating Verified Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'rgba(7, 21, 30, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(229, 182, 74, 0.45)',
                  color: 'var(--nims-gold)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '50px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  zIndex: 2,
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)'
                }}
              >
                <BadgeCheck size={15} style={{ color: 'var(--nims-gold)' }} />
                <span>Department Head</span>
              </div>

              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={head.image || '/assets/international/dr-taslim-doctor-coat.jpg'}
                  alt="Dr. Tasleem Jan - Head, International Patient Care Department"
                  style={{
                    width: '100%',
                    height: '380px',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block'
                  }}
                />
              </div>

              <div
                style={{
                  background: 'linear-gradient(180deg, #0a171f 0%, #050e14 100%)',
                  padding: '1.15rem 1.4rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.35rem'
                  }}
                >
                  <div style={{ fontSize: '0.82rem', color: 'var(--nims-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Dr. Tasleem Jan
                  </div>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      background: 'rgba(37, 211, 102, 0.15)',
                      color: '#25D366',
                      padding: '0.18rem 0.6rem',
                      borderRadius: '12px',
                      fontWeight: 700
                    }}
                  >
                    ● Direct Liaison
                  </div>
                </div>
                <div style={{ fontSize: '0.92rem', color: '#ffffff', fontWeight: 600 }}>
                  Personalized Clinical Guidance for Every Overseas Case
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                  Single Point of Contact (SPOC) & 24×7 Bedside Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT US & TRUSTED HEALTHCARE PARTNER */}
      <section className="section" style={{ padding: 'clamp(3rem, 6vw, 5rem) 0', background: '#ffffff' }}>
        <div className="container">
          <div className="intl-about-top-grid">
            {/* Left Content */}
            <MotionFadeIn>
              <div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--nims-orange)',
                    background: 'var(--nims-orange-soft)',
                    padding: '0.35rem 0.9rem',
                    borderRadius: '20px',
                    marginBottom: '0.8rem'
                  }}
                >
                  <Globe2 size={14} />
                  <span>{medicalTourismData.about.badge}</span>
                </span>

                <h2
                  style={{
                    fontSize: 'clamp(1.75rem, 2.8vw, 2.4rem)',
                    fontWeight: 800,
                    color: 'var(--nims-navy)',
                    lineHeight: 1.25,
                    marginBottom: '1rem'
                  }}
                >
                  {medicalTourismData.about.heading}
                </h2>

                <p style={{ fontSize: '0.98rem', lineHeight: 1.65, color: '#334155', fontWeight: 500, marginBottom: '0.75rem' }}>
                  {medicalTourismData.about.lead}
                </p>

                {medicalTourismData.about.subtext && (
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#64748b', marginBottom: '1.25rem' }}>
                    {medicalTourismData.about.subtext}
                  </p>
                )}

                {medicalTourismData.about.paragraphs?.map((p, idx) => (
                  <p key={idx} style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#64748b', marginBottom: '1rem' }}>
                    {p}
                  </p>
                ))}

                <div className="intl-about-actions">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'var(--nims-navy)',
                      color: '#ffffff',
                      fontWeight: 600,
                      padding: '0.75rem 1.5rem',
                      borderRadius: '50px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(23, 42, 52, 0.15)',
                      transition: 'all 0.25s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                  >
                    <span>Connect with International Desk</span>
                    <ChevronRight size={16} />
                  </button>

                  <a
                    href={getWhatsAppUrl('Hello Dr. Tasleem Jan! I would like to inquire about international patient care at NIMS Hospital.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      background: '#25D366',
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      padding: '0.75rem 1.35rem',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      boxShadow: '0 4px 15px rgba(37, 211, 102, 0.22)',
                      transition: 'all 0.25s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                  >
                    <MessageSquare size={16} />
                    <span>WhatsApp Desk</span>
                  </a>
                </div>
              </div>
            </MotionFadeIn>

            {/* Right Visual Card with Real Authentic Photo */}
            <MotionFadeIn delay={0.15}>
              <div className="intl-about-img-card">
                <img
                  src="/assets/international/intl-safaa-family-discharge.jpeg"
                  alt="International Patient Recovery and Discharge at NIMS Hospital"
                  className="intl-about-img"
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(15, 35, 46, 0.95) 100%)',
                    color: '#ffffff',
                    padding: '2rem 1.5rem 1.25rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <Sparkles size={16} style={{ color: 'var(--nims-gold)' }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--nims-gold)' }}>
                      Warm Indian Hospitality
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.3rem 0', color: '#ffffff' }}>
                    Honoring Patients Like Family
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#e2e8f0', margin: 0, lineHeight: 1.45 }}>
                    International families warmly felicitated with traditional Rajasthani safas upon their successful recovery and discharge from NIMS Hospital.
                  </p>
                </div>
              </div>
            </MotionFadeIn>
          </div>

          {/* Bottom row: Feature Highlights below! ("jo bullet points hai unko neeche dedo") */}
          <MotionFadeIn delay={0.2}>
            <div style={{ marginTop: '2.75rem', paddingTop: '2.5rem', borderTop: '1px solid #e2e8f0' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--nims-orange)',
                      marginBottom: '0.2rem'
                    }}
                  >
                    Hospital Infrastructure & Care Highlights
                  </span>
                  <h3
                    style={{
                      fontSize: 'clamp(1.2rem, 2.2vw, 1.55rem)',
                      fontWeight: 800,
                      color: 'var(--nims-navy)',
                      margin: 0
                    }}
                  >
                    Why International Patients Choose NIMS Hospital
                  </h3>
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: '#f1f5f9',
                    color: '#475569',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    padding: '0.35rem 0.85rem',
                    borderRadius: '20px'
                  }}
                >
                  <ShieldCheck size={15} style={{ color: 'var(--nims-orange)' }} />
                  <span>NABH & NABL Accredited Standards</span>
                </div>
              </div>

              <div className="intl-features-grid">
                {medicalTourismData.about.features.map((feat, idx) => (
                  <div key={idx} className="intl-feature-card">
                    <div className="intl-feature-icon">
                      {feat.icon === 'UserCheck' && <UserCheck size={20} strokeWidth={2.3} />}
                      {feat.icon === 'ShieldCheck' && <ShieldCheck size={20} strokeWidth={2.3} />}
                      {feat.icon === 'Users' && <Users size={20} strokeWidth={2.3} />}
                      {feat.icon === 'Clock' && <Clock size={20} strokeWidth={2.3} />}
                      {feat.icon === 'Video' && <Video size={20} strokeWidth={2.3} />}
                      {!['UserCheck', 'ShieldCheck', 'Users', 'Clock', 'Video'].includes(feat.icon) && (
                        <Check size={20} strokeWidth={2.5} />
                      )}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: '0.94rem',
                          fontWeight: 700,
                          color: 'var(--nims-navy)',
                          marginBottom: '0.35rem',
                          lineHeight: 1.3
                        }}
                      >
                        {feat.title}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
                        {feat.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MotionFadeIn>
        </div>
      </section>

      {/* 5. YOUR MEDICAL JOURNEY WITH NIMS - COMPACT VERTICAL TIMELINE */}
      <section
        className="section"
        style={{
          padding: '3.75rem 0 4.25rem',
          background: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          position: 'relative'
        }}
      >
        <div className="container" style={{ maxWidth: '920px' }}>
          <MotionFadeIn>
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.75rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--nims-orange)',
                  background: 'var(--nims-orange-soft)',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '20px',
                  marginBottom: '0.65rem'
                }}
              >
                End-to-End Care Protocol
              </span>
              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  fontWeight: 800,
                  color: 'var(--nims-navy)',
                  lineHeight: 1.2,
                  marginBottom: '0.65rem'
                }}
              >
                Your Medical Journey with NIMS
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#64748b', lineHeight: 1.55, margin: 0 }}>
                Simple, transparent, and organized protocol from initial consultation to safe discharge.
              </p>
            </div>
          </MotionFadeIn>

          {/* VERTICAL ANIMATED TIMELINE CONTAINER */}
          <div style={{ position: 'relative', paddingLeft: 'clamp(0.5rem, 2vw, 1.5rem)' }}>
            {/* Continuous Connecting Line */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                bottom: '24px',
                left: 'clamp(1.35rem, 2vw, 2.35rem)',
                width: '2px',
                background: 'linear-gradient(180deg, var(--nims-orange) 0%, var(--nims-navy) 60%, #16a34a 100%)',
                opacity: 0.35,
                zIndex: 1
              }}
            />

            {/* Compact Step Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem', position: 'relative', zIndex: 2 }}>
              {medicalTourismData.journeySteps.map((stp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'clamp(0.75rem, 2vw, 1.25rem)'
                  }}
                >
                  {/* Compact Step Node */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: idx === 0 ? 'var(--nims-orange)' : idx === 6 ? '#16a34a' : 'var(--nims-navy)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      boxShadow: '0 4px 12px rgba(23, 42, 52, 0.18)',
                      border: '2px solid #ffffff',
                      position: 'relative',
                      zIndex: 3,
                      marginTop: '0.2rem'
                    }}
                  >
                    {stp.step}
                  </div>

                  {/* Compact Step Card */}
                  <div
                    style={{
                      flex: 1,
                      background: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      padding: '1.05rem 1.35rem',
                      boxShadow: '0 3px 12px rgba(23, 42, 52, 0.03)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--nims-orange)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(189, 23, 28, 0.07)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.boxShadow = '0 3px 12px rgba(23, 42, 52, 0.03)';
                    }}
                  >
                    {/* Header Row: Title & Turnaround Tag */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                        marginBottom: '0.4rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            color: 'var(--nims-orange)',
                            background: 'var(--nims-orange-soft)',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '4px'
                          }}
                        >
                          STEP {stp.step}
                        </span>
                        <h3
                          style={{
                            fontSize: '1.08rem',
                            fontWeight: 800,
                            color: 'var(--nims-navy)',
                            margin: 0
                          }}
                        >
                          {stp.title}
                        </h3>
                      </div>

                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#1e40af',
                          background: '#dbeafe',
                          padding: '0.15rem 0.55rem',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        ⚡ {stp.turnaround}
                      </span>
                    </div>

                    {/* Concise Details */}
                    <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: '0 0 0.75rem' }}>
                      {stp.details}
                    </p>

                    {/* Compact Action & Delivery Row */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                        background: '#f8fafc',
                        border: '1px solid #f1f5f9',
                        borderRadius: '10px',
                        padding: '0.55rem 0.85rem'
                      }}
                    >
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.82rem', color: '#334155' }}>
                        <span>
                          <b style={{ color: '#64748b' }}>Your Action:</b> {stp.patientAction}
                        </span>
                        <span style={{ color: '#cbd5e1' }}>•</span>
                        <span>
                          <b style={{ color: 'var(--nims-orange)' }}>NIMS Delivers:</b> {stp.nimsAction}
                        </span>
                      </div>

                      <a
                        href={getWhatsAppUrl(`Hello Dr. Tasleem Jan! I am inquiring about Step ${stp.step}: ${stp.title}. Please guide me.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          background: '#25D366',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '0.78rem',
                          padding: '0.35rem 0.8rem',
                          borderRadius: '50px',
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                          flexShrink: 0
                        }}
                      >
                        <MessageSquare size={13} />
                        <span>WhatsApp Dr. Tasleem Jan</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPREHENSIVE END-TO-END SERVICES (PILLARS A TO F) */}
      <section className="section" style={{ padding: '5.5rem 0', background: '#ffffff' }}>
        <div className="container">
          <MotionFadeIn>
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--nims-orange)',
                  background: 'var(--nims-orange-soft)',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '20px',
                  marginBottom: '0.8rem'
                }}
              >
                Comprehensive Facilitation
              </span>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.4vw, 2.7rem)',
                  fontWeight: 800,
                  color: 'var(--nims-navy)',
                  lineHeight: 1.2,
                  marginBottom: '1rem'
                }}
              >
                Our Services for International Patients
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.6 }}>
                We provide end-to-end medical assistance to international patients across six dedicated service divisions to ensure total peace of mind.
              </p>
            </div>
          </MotionFadeIn>

          <MotionStagger>
            <div className="intl-services-grid">
              {medicalTourismData.services.map((srv, idx) => {
                const iconMap = {
                  Video: <Video size={24} style={{ color: 'var(--nims-orange)' }} />,
                  FileCheck: <FileCheck size={24} style={{ color: 'var(--nims-orange)' }} />,
                  Car: <Car size={24} style={{ color: 'var(--nims-orange)' }} />,
                  Hotel: <Hotel size={24} style={{ color: 'var(--nims-orange)' }} />,
                  Users: <Users size={24} style={{ color: 'var(--nims-orange)' }} />,
                  Globe: <Globe2 size={24} style={{ color: 'var(--nims-orange)' }} />
                };

                return (
                  <MotionItem key={idx}>
                    <div
                      style={{
                        background: '#f8fafc',
                        borderRadius: '20px',
                        border: '1px solid #e2e8f0',
                        padding: '2.2rem 1.8rem',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.25s ease',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 12px 30px rgba(23, 42, 52, 0.08)';
                        e.currentTarget.style.borderColor = 'var(--nims-orange)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.03)';
                        e.currentTarget.style.borderColor = '#e2e8f0';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                        <div
                          style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '14px',
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.04)'
                          }}
                        >
                          {iconMap[srv.icon] || <CheckCircle2 size={24} style={{ color: 'var(--nims-orange)' }} />}
                        </div>

                        <span
                          style={{
                            fontSize: '0.85rem',
                            fontWeight: 800,
                            color: 'var(--nims-navy)',
                            background: '#e2e8f0',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '8px'
                          }}
                        >
                          SECTION {srv.code}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          color: 'var(--nims-navy)',
                          marginBottom: '0.65rem'
                        }}
                      >
                        {srv.title}
                      </h3>

                      <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                        {srv.description}
                      </p>

                      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                        {srv.points.map((pt, pIdx) => (
                          <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                            <CheckCircle2 size={15} style={{ color: '#16a34a', flexShrink: 0, marginTop: '0.2rem' }} />
                            <span style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 500 }}>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </MotionItem>
                );
              })}
            </div>
          </MotionStagger>
        </div>
      </section>

      {/* 7. OUR MEDICAL SPECIALTIES (CENTRES OF EXCELLENCE) */}
      <section className="section" style={{ padding: '5.5rem 0', background: '#f8fafc' }}>
        <div className="container">
          <MotionFadeIn>
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--nims-orange)',
                  background: 'var(--nims-orange-soft)',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '20px',
                  marginBottom: '0.8rem'
                }}
              >
                Clinical Excellence
              </span>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.4vw, 2.7rem)',
                  fontWeight: 800,
                  color: 'var(--nims-navy)',
                  lineHeight: 1.2,
                  marginBottom: '1rem'
                }}
              >
                Our Medical Specialties
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.6 }}>
                International patients primarily travel to NIMS Hospital for advanced surgical procedures, robotic interventions, and complex tertiary care.
              </p>
            </div>
          </MotionFadeIn>

          <MotionStagger>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '1.75rem'
              }}
            >
              {medicalTourismData.specialties.map((sp, idx) => (
                <MotionItem key={idx}>
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: '20px',
                      border: '1px solid #e2e8f0',
                      padding: '1.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      transition: 'all 0.25s ease',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(23, 42, 52, 0.08)';
                      e.currentTarget.style.borderColor = 'var(--nims-orange)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.02)';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: 'var(--nims-orange-soft)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.15rem'
                      }}
                    >
                      <Activity size={22} style={{ color: 'var(--nims-orange)' }} />
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nims-navy)', marginBottom: '0.4rem' }}>
                      {sp.title}
                    </h3>

                    <div
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--nims-orange)',
                        marginBottom: '0.75rem'
                      }}
                    >
                      {sp.procedures}
                    </div>

                    <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>
                      {sp.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                      <Link
                        to={sp.path}
                        style={{
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: 'var(--nims-navy)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          textDecoration: 'none'
                        }}
                      >
                        <span>Learn Details</span>
                        <ChevronRight size={15} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          setForm((prev) => ({ ...prev, specialty: sp.title }));
                          scrollToForm();
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--nims-orange)',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer'
                        }}
                      >
                        Enquire Now →
                      </button>
                    </div>
                  </div>
                </MotionItem>
              ))}
            </div>
          </MotionStagger>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ fontSize: '0.95rem', color: '#64748b' }}>
              Additional clinical disciplines, diagnostic services, and super-specialty surgeries are available across our 50+ departments.{' '}
              <Link to="/specialities" style={{ color: 'var(--nims-orange)', fontWeight: 700 }}>
                Explore All Specialties & Departments →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE NIMS HOSPITAL & JAIPUR ADVANTAGE */}
      <section
        className="section"
        style={{
          padding: '5.5rem 0',
          background: 'linear-gradient(180deg, var(--nims-navy) 0%, var(--nims-navy-deep) 100%)',
          color: '#ffffff'
        }}
      >
        <div className="container">
          <MotionFadeIn>
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--nims-gold)',
                  background: 'rgba(229, 182, 74, 0.15)',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '20px',
                  marginBottom: '0.8rem'
                }}
              >
                Your Health, Our Priority
              </span>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.4vw, 2.7rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.2,
                  marginBottom: '1rem'
                }}
              >
                Why International Patients Choose NIMS Hospital, Jaipur
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                Combining clinical excellence, high technology, and human empathy in Rajasthan's historic healthcare capital.
              </p>
            </div>
          </MotionFadeIn>

          {/* 8 Pillars Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: '1.75rem',
              marginBottom: '4rem'
            }}
          >
            {medicalTourismData.whyChooseNims.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '18px',
                  padding: '1.75rem',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.09)';
                  e.currentTarget.style.borderColor = 'var(--nims-gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: 'var(--nims-gold)',
                    marginBottom: '0.65rem'
                  }}
                >
                  {item.number}. {item.title}
                </div>
                <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.65, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Jaipur Advantage Banner */}
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '24px',
              padding: 'clamp(2rem, 4vw, 3rem)'
            }}
          >
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--nims-gold)', marginBottom: '0.5rem' }}>
                <Compass size={20} />
                <span style={{ fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Destination Jaipur, Rajasthan
                </span>
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                {medicalTourismData.jaipurAdvantage.title}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>{medicalTourismData.jaipurAdvantage.lead}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1.5rem' }}>
              {medicalTourismData.jaipurAdvantage.points.map((pt, idx) => (
                <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1.25rem', borderRadius: '16px' }}>
                  <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    {pt.title}
                  </h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.55, margin: 0 }}>
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. REAL INTERNATIONAL PATIENT STORIES & PHOTO GALLERY */}
      <section className="section" style={{ padding: '5.5rem 0', background: '#ffffff' }}>
        <div className="container">
          <MotionFadeIn>
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--nims-orange)',
                  background: 'var(--nims-orange-soft)',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '20px',
                  marginBottom: '0.8rem'
                }}
              >
                Real Stories & Global Trust
              </span>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.4vw, 2.7rem)',
                  fontWeight: 800,
                  color: 'var(--nims-navy)',
                  lineHeight: 1.2,
                  marginBottom: '1rem'
                }}
              >
                Moments of Care & Healing at NIMS
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.6 }}>
                Real moments with international patients from Africa, the Middle East, and Central Asia treated with dignity and clinical excellence at NIMS Hospital.
              </p>
            </div>
          </MotionFadeIn>

          {/* Photo Gallery Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1.5rem'
            }}
          >
            {medicalTourismData.galleryPhotos.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhoto(item)}
                style={{
                  position: 'relative',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
                  aspectRatio: '4/3',
                  background: '#f1f5f9'
                }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 50%, rgba(15, 35, 46, 0.9) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.25rem',
                    color: '#ffffff'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: 'var(--nims-gold)',
                      marginBottom: '0.2rem'
                    }}
                  >
                    {item.category}
                  </span>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery Modal / Lightbox */}
          <AnimatePresence>
            {selectedPhoto && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 9999,
                  background: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem'
                }}
                onClick={() => setSelectedPhoto(null)}
              >
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    maxWidth: '850px',
                    width: '100%',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(null)}
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'rgba(0, 0, 0, 0.65)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                  >
                    <X size={20} />
                  </button>

                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.title}
                    style={{
                      width: '100%',
                      maxHeight: '65vh',
                      objectFit: 'contain',
                      background: '#0a171f'
                    }}
                  />

                  <div style={{ padding: '1.5rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--nims-orange)',
                        background: 'var(--nims-orange-soft)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px'
                      }}
                    >
                      {selectedPhoto.category}
                    </span>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nims-navy)', margin: '0.5rem 0 0.4rem' }}>
                      {selectedPhoto.title}
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: '#64748b', margin: 0, lineHeight: 1.55 }}>
                      {selectedPhoto.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 10. DEDICATED INTERNATIONAL PATIENT INQUIRY FORM */}
      <section
        id="international-enquiry-form"
        className="section"
        style={{
          padding: '5.5rem 0',
          background: '#f1f5f9',
          borderTop: '1px solid #e2e8f0'
        }}
      >
        <div className="container">
          <div
            style={{
              maxWidth: '920px',
              margin: '0 auto',
              background: '#ffffff',
              borderRadius: '24px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 15px 45px rgba(23, 42, 52, 0.08)',
              overflow: 'hidden'
            }}
          >
            {/* Header Strip with Doctor Name */}
            <div
              style={{
                background: 'linear-gradient(135deg, var(--nims-navy) 0%, var(--nims-navy-light) 100%)',
                color: '#ffffff',
                padding: '2.5rem 2rem',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                  color: 'var(--nims-gold)'
                }}
              >
                <UserCheck size={16} />
                <span>Reviewed by {head.name} & Medical Board</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)', fontWeight: 800, margin: '0 0 0.5rem', color: '#ffffff' }}>
                Request Free Treatment Plan & Cost Estimate
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', margin: 0, maxWidth: '650px', marginLeft: 'auto', marginRight: 'auto' }}>
                Fill out the details below. Our International Care Team will evaluate your case with specialists and respond within 24 hours.
              </p>
            </div>

            {/* Form Body */}
            <div style={{ padding: 'clamp(1.5rem, 3.5vw, 3rem)' }}>
              {submitSuccess ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      background: '#dcfce7',
                      color: '#16a34a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.25rem'
                    }}
                  >
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--nims-navy)', marginBottom: '0.5rem' }}>
                    Thank You, {form.name}!
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '540px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
                    Your request has been forwarded directly to {head.name} and our International Patient Care Desk. We will reach out to you via WhatsApp / Phone ({form.countryCode} {form.phone}) shortly.
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <a
                      href={getWhatsAppUrl(`Hello ${head.name}! I just submitted my query on your website. Name: ${form.name}, Country: ${form.country}. Looking forward to your medical guidance.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: '#25D366',
                        color: '#ffffff',
                        fontWeight: 700,
                        padding: '0.85rem 1.6rem',
                        borderRadius: '50px',
                        textDecoration: 'none'
                      }}
                    >
                      <MessageSquare size={18} />
                      <span>WhatsApp {head.name} Directly</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitSuccess(false);
                        setForm({
                          name: '',
                          email: '',
                          country: '',
                          countryCode: '+968',
                          phone: '',
                          specialty: 'Organ Transplantation',
                          message: '',
                          reportsAvailable: true,
                          language: 'English'
                        });
                      }}
                      style={{
                        background: '#e2e8f0',
                        color: '#334155',
                        fontWeight: 600,
                        padding: '0.85rem 1.6rem',
                        borderRadius: '50px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Submit Another Query
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  {submitError && (
                    <div
                      style={{
                        background: '#fee2e2',
                        border: '1px solid #fca5a5',
                        color: '#991b1b',
                        padding: '0.85rem 1.25rem',
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem'
                      }}
                    >
                      <AlertCircle size={18} />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#334155', marginBottom: '0.4rem' }}>
                        Patient Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Ahmed Al-Balushi"
                        required
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          borderRadius: '12px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.95rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#334155', marginBottom: '0.4rem' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="e.g. ahmed@example.com"
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          borderRadius: '12px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.95rem'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#334155', marginBottom: '0.4rem' }}>
                        Country of Residence *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handleInputChange}
                        placeholder="e.g. Oman, Kenya, UAE, Bangladesh"
                        required
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          borderRadius: '12px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.95rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#334155', marginBottom: '0.4rem' }}>
                        WhatsApp / Phone Number *
                      </label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <select
                          name="countryCode"
                          value={form.countryCode}
                          onChange={handleInputChange}
                          style={{
                            padding: '0.8rem 0.5rem',
                            borderRadius: '12px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.85rem',
                            background: '#f8fafc',
                            maxWidth: '125px'
                          }}
                        >
                          {medicalTourismData.countryCodes.map((c, i) => (
                            <option key={i} value={c.code}>
                              {c.code} ({c.country.split(' ')[0]})
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleInputChange}
                          placeholder="Phone number"
                          required
                          style={{
                            flex: 1,
                            padding: '0.8rem 1rem',
                            borderRadius: '12px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.95rem'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#334155', marginBottom: '0.4rem' }}>
                        Medical Specialty Required *
                      </label>
                      <select
                        name="specialty"
                        value={form.specialty}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          borderRadius: '12px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.95rem',
                          background: '#ffffff'
                        }}
                      >
                        {medicalTourismData.specialties.map((s, idx) => (
                          <option key={idx} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="General Checkup & Diagnostics">General Health Checkup & Diagnostics</option>
                        <option value="Other Medical Service">Other Specialty / Second Opinion</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#334155', marginBottom: '0.4rem' }}>
                        Preferred Language for Communication
                      </label>
                      <select
                        name="language"
                        value={form.language}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          borderRadius: '12px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.95rem',
                          background: '#ffffff'
                        }}
                      >
                        <option value="English">English</option>
                        <option value="Arabic (العربية)">Arabic (العربية)</option>
                        <option value="French (Français)">French (Français)</option>
                        <option value="Russian (Русский)">Russian (Русский)</option>
                        <option value="Hindi / Urdu">Hindi / Urdu</option>
                        <option value="Other">Other Language</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#334155', marginBottom: '0.4rem' }}>
                      Describe Clinical Condition / Query *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleInputChange}
                      placeholder="Please share diagnosis, current symptoms, prior surgeries, or specific questions for the doctor..."
                      required
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.95rem',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.75rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        name="reportsAvailable"
                        checked={form.reportsAvailable}
                        onChange={handleInputChange}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--nims-orange)' }}
                      />
                      <span style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>
                        I have medical reports / MRI / CT scans available (Dr. Tasleem Jan's team will request them via WhatsApp/Email).
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      borderRadius: '50px',
                      background: 'var(--nims-orange)',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '1.05rem',
                      border: 'none',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.6rem',
                      boxShadow: '0 8px 25px rgba(189, 23, 28, 0.35)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Sending Request to Dr. Tasleem Jan...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Submit for Free Medical Evaluation & Cost Estimate</span>
                      </>
                    )}
                  </button>

                  <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      🔒 100% Medical Privacy Guaranteed. Directly reviewed by Dr. Tasleem Jan's desk.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 11. FREQUENTLY ASKED QUESTIONS (FAQS) */}
      <section className="section" style={{ padding: '5.5rem 0', background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <MotionFadeIn>
            <div style={{ textAlign: 'center', margin: '0 auto 3.5rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--nims-orange)',
                  background: 'var(--nims-orange-soft)',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '20px',
                  marginBottom: '0.8rem'
                }}
              >
                Clear Answers
              </span>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.4vw, 2.7rem)',
                  fontWeight: 800,
                  color: 'var(--nims-navy)',
                  lineHeight: 1.2,
                  marginBottom: '1rem'
                }}
              >
                Frequently Asked Questions
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.6 }}>
                Common questions from patients traveling from abroad to NIMS Hospital, Jaipur.
              </p>
            </div>
          </MotionFadeIn>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {medicalTourismData.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: isOpen ? '#f8fafc' : '#ffffff',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--nims-navy)' }}>
                      {faq.q}
                    </span>
                    <span
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: isOpen ? 'var(--nims-orange)' : '#f1f5f9',
                        color: isOpen ? '#ffffff' : '#334155',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginLeft: '1rem'
                      }}
                    >
                      <ChevronDown
                        size={16}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform 0.25s ease'
                        }}
                      />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div
                          style={{
                            padding: '0 1.5rem 1.25rem',
                            fontSize: '0.92rem',
                            color: '#475569',
                            lineHeight: 1.7,
                            borderTop: '1px solid #e2e8f0',
                            paddingTop: '0.85rem'
                          }}
                        >
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. 24x7 INTERNATIONAL HELP DESK WITH DR. TASLEEM JAN */}
      <section
        style={{
          background: 'var(--nims-navy)',
          color: '#ffffff',
          padding: '3rem 0',
          borderTop: '3px solid var(--nims-orange)'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem'
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--nims-gold)', marginBottom: '0.3rem' }}>
                <Clock size={16} />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  24×7 International Desk • {head.name}
                </span>
              </div>
              <h3 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                Planning your travel to India for treatment?
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: '0.25rem 0 0' }}>
                {head.name} & team assist with medical visas, second opinions, and priority admissions.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#25D366',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  padding: '0.8rem 1.4rem',
                  borderRadius: '50px',
                  textDecoration: 'none'
                }}
              >
                <MessageSquare size={16} />
                <span>WhatsApp ({head.phone})</span>
              </a>

              <a
                href={`tel:${head.phone.replace(/\s+/g, '')}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--nims-orange)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  padding: '0.8rem 1.4rem',
                  borderRadius: '50px',
                  textDecoration: 'none'
                }}
              >
                <PhoneCall size={16} />
                <span>{head.phone}</span>
              </a>

              <a
                href={`mailto:${head.email}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  padding: '0.8rem 1.4rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <Mail size={16} />
                <span>Email {head.name}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
