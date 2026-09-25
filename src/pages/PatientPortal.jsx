import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Calendar,
  Pill,
  Video,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  ArrowRight,
  Send
} from 'lucide-react';
import { MotionFadeIn, MotionStagger, MotionItem } from '../components/motion/MotionWrapper';

export default function PatientPortal() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNotify = (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;
    setSubscribed(true);
  };

  const portalFeatures = [
    {
      icon: <FileText size={24} color="var(--nims-orange)" />,
      title: 'Digital Lab & Radiology Reports',
      desc: 'Instant access to verified NABL diagnostic reports, blood tests, X-rays, and MRI scans in high-resolution PDF format.',
      badge: 'Fast Download'
    },
    {
      icon: <Pill size={24} color="var(--nims-orange)" />,
      title: 'E-Prescriptions & Vitals',
      desc: 'Never misplace a prescription. Review medication dosages, doctor instructions, and follow-up alerts on any device.',
      badge: 'Cloud Sync'
    },
    {
      icon: <Video size={24} color="var(--nims-orange)" />,
      title: 'Doctor Teleconsultations',
      desc: 'Direct encrypted HD video appointments with 500+ NIMS super specialists from the comfort of your home.',
      badge: 'Live Video'
    },
    {
      icon: <Calendar size={24} color="var(--nims-orange)" />,
      title: '1-Click OPD Rescheduling',
      desc: 'Skip hospital queues. Book, reschedule, or cancel OPD consultations with real-time doctor availability.',
      badge: 'Zero Waiting'
    },
    {
      icon: <CreditCard size={24} color="var(--nims-orange)" />,
      title: 'Transparent Billing & Insurance',
      desc: 'Track hospital bills, RGHS, Ayushman Bharat, Chiranjeevi, and private TPA cashless approval status in real-time.',
      badge: 'Cashless Track'
    },
    {
      icon: <ShieldCheck size={24} color="var(--nims-orange)" />,
      title: 'Secure UHID Universal Records',
      desc: 'Bank-grade 256-bit encrypted health records tied to your unique NIMS Hospital UHID patient identification.',
      badge: 'HIPAA Standard'
    }
  ];

  return (
    <div className="patient-portal-page">
      {/* Hero Section */}
      <section className="portal-hero-section">
        <div className="container">
          <MotionFadeIn>
            <div className="portal-hero-content">
              <div className="portal-badge-pill">
                <Sparkles size={14} color="var(--nims-orange)" />
                <span>NIMS Digital Health 2.0 • In Active Development</span>
              </div>

              <h1 className="portal-hero-title">
                Your Personal Health Vault <br />
                <span className="gradient-text">Arriving Very Soon</span>
              </h1>

              <p className="portal-hero-sub">
                We are finalizing the official NIMS Quaternary Hospital Patient Portal. Access all your medical reports,
                doctor teleconsultations, e-prescriptions, and cashless billing directly from your phone or desktop.
              </p>

              {/* Early Access Notification Form */}
              <div className="portal-notify-card">
                {subscribed ? (
                  <motion.div
                    className="portal-subscribed-state"
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  >
                    <CheckCircle2 size={24} color="#10b981" />
                    <div>
                      <h4>You're on the VIP Priority Access list!</h4>
                      <p>We will alert you via SMS / Email the moment the patient portal opens for beta patients.</p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleNotify} className="portal-notify-form">
                    <input
                      type="text"
                      placeholder="Enter your Mobile Number or Email..."
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      required
                      className="portal-input"
                    />
                    <motion.button
                      type="submit"
                      className="btn btn-primary portal-btn"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <Send size={15} />
                      <span>Notify Me on Launch</span>
                    </motion.button>
                  </form>
                )}
              </div>

              <div className="portal-trust-row">
                <span className="trust-item">
                  <CheckCircle2 size={13} color="#10b981" /> 100% Free for NIMS Patients
                </span>
                <span className="trust-item">
                  <CheckCircle2 size={13} color="#10b981" /> Tied to your NIMS UHID
                </span>
                <span className="trust-item">
                  <CheckCircle2 size={13} color="#10b981" /> Bank-Grade Privacy Protection
                </span>
              </div>
            </div>
          </MotionFadeIn>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <MotionFadeIn>
            <div className="section-header">
              <span className="section-subtitle">What to Expect</span>
              <h2>Connected Care at Your Fingertips</h2>
              <p>A unified digital suite designed to eliminate wait times and empower you with complete health record ownership.</p>
            </div>
          </MotionFadeIn>

          <MotionStagger className="portal-features-grid" staggerDelay={0.08}>
            {portalFeatures.map((feat, idx) => (
              <MotionItem key={idx}>
                <motion.div
                  className="portal-feature-card"
                  whileHover={{ y: -6, boxShadow: '0 20px 42px rgba(35, 32, 33, 0.12)' }}
                  transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                >
                  <div className="portal-feat-top">
                    <motion.div
                      className="portal-feat-icon"
                      whileHover={{ rotate: 8, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      {feat.icon}
                    </motion.div>
                    <span className="portal-feat-badge">{feat.badge}</span>
                  </div>
                  <h3 className="portal-feat-title">{feat.title}</h3>
                  <p className="portal-feat-desc">{feat.desc}</p>
                </motion.div>
              </MotionItem>
            ))}
          </MotionStagger>

          {/* Need Records Urgently MRD Bar */}
          <MotionFadeIn delay={0.15}>
            <div className="portal-urgent-banner">
              <div>
                <h4>Need Medical Records or Discharge Summaries Urgently?</h4>
                <p>Our Medical Records Department (MRD) counter is open 24×7 on Ground Floor, Hospital Block A.</p>
              </div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <a href="tel:0141-2388999" className="btn btn-primary urgent-call-btn">
                  <PhoneCall size={16} />
                  <span>Call MRD Desk: 0141-23 88 999</span>
                </a>
              </motion.div>
            </div>
          </MotionFadeIn>
        </div>
      </section>
    </div>
  );
}
