import React, { useState, useEffect } from 'react';
import { 
  X, Briefcase, MapPin, Clock, Send, CheckCircle2, 
  Building2, GraduationCap, Upload, FileText, Sparkles, 
  Phone, Mail, User, ShieldCheck, ArrowRight, ArrowLeft, 
  Printer, Check, AlertCircle, Award, Stethoscope
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { vacanciesData } from '../../data/vacanciesData';

export default function VacanciesModal({ isOpen, onClose, initialJob }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [tokenNumber, setTokenNumber] = useState('');
  const [activeStep, setActiveStep] = useState(1); // 1: Personal, 2: Qualification & Council, 3: Experience & Resume

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (initialJob) {
        setSelectedJob(initialJob);
        setActiveStep(1);
        setFormSubmitted(false);
      }
    } else {
      document.body.style.overflow = 'unset';
      setSelectedJob(null);
      setFormSubmitted(false);
      setActiveStep(1);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialJob]);

  const [applicant, setApplicant] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    gender: 'Female',
    qualification: '',
    councilRegNo: '',
    university: '',
    passingYear: '2023',
    experience: '2 - 4 Years',
    lastOrg: '',
    currentDesignation: '',
    noticePeriod: 'Immediate Joiner',
    currentCtc: '',
    expectedCtc: '',
    coverNote: '',
    resumeName: '',
    resumeSize: ''
  });

  if (!isOpen) return null;

  const categories = ['All', 'Nursing', 'Doctors', 'Allied Health', 'Pharmacy', 'Administration'];

  const filteredJobs = vacanciesData.filter(job => {
    if (activeCategory === 'All') return true;
    return job.category === activeCategory || job.department.toLowerCase().includes(activeCategory.toLowerCase());
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      setApplicant(prev => ({
        ...prev,
        resumeName: file.name,
        resumeSize: `${sizeMb} MB`
      }));
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (activeStep === 1) {
      if (!applicant.name || !applicant.phone || !applicant.email) {
        alert('Please fill in your name, email, and mobile number.');
        return;
      }
      setActiveStep(2);
    } else if (activeStep === 2) {
      if (!applicant.qualification) {
        alert('Please specify your highest qualification.');
        return;
      }
      setActiveStep(3);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!applicant.name || !applicant.phone) {
      alert('Please fill in candidate name and mobile number.');
      return;
    }
    const token = 'NIMS-HR-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
    setTokenNumber(token);
    setFormSubmitted(true);
  };

  const handleCloseAll = () => {
    setSelectedJob(null);
    setFormSubmitted(false);
    setActiveStep(1);
    onClose();
  };

  const handlePrintSlip = () => {
    const slipHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>NIMS Hospital - Job Application Slip (${tokenNumber})</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 10mm 14mm;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #0f172a;
            background: #ffffff;
            padding: 10px;
            font-size: 13px;
            line-height: 1.45;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .slip-wrapper {
            max-width: 720px;
            margin: 0 auto;
            border: 2px solid #0a2f5e;
            border-radius: 12px;
            overflow: hidden;
            background: #ffffff;
          }
          .header-banner {
            background: #0a2f5e !important;
            color: #ffffff !important;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 3.5px solid #f47521;
          }
          .hospital-brand {
            display: flex;
            align-items: center;
            gap: 14px;
          }
          .hospital-logo-box {
            background: #ffffff;
            padding: 6px 10px;
            border-radius: 6px;
            display: flex;
            align-items: center;
          }
          .hospital-logo-box img {
            height: 32px;
            width: auto;
          }
          .hospital-text h1 {
            font-size: 17px;
            font-weight: 800;
            letter-spacing: 0.3px;
            margin-bottom: 2px;
            color: #ffffff !important;
          }
          .hospital-text p {
            font-size: 10.5px;
            color: #cbd5e1 !important;
            margin: 0;
          }
          .token-strip {
            background: #f1f5f9 !important;
            border-bottom: 1.5px solid #e2e8f0;
            padding: 12px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .token-pill-box {
            background: #ffffff;
            border: 2px dashed #0a2f5e;
            padding: 6px 14px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .token-label {
            font-size: 9.5px;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .token-val {
            font-size: 17px;
            font-weight: 900;
            color: #0a2f5e;
            letter-spacing: 1px;
          }
          .booking-date-stamp {
            font-size: 11px;
            color: #475569;
            text-align: right;
            font-weight: 600;
          }
          .slip-body {
            padding: 18px 20px;
          }
          .section-heading {
            font-size: 11.5px;
            font-weight: 800;
            color: #0a2f5e;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            border-bottom: 1.5px solid #0a2f5e;
            padding-bottom: 3px;
            margin-bottom: 10px;
          }
          .grid-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 14px;
          }
          .info-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11.5px;
          }
          .info-table td {
            padding: 4.5px 2px;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: top;
          }
          .info-table td.lbl {
            color: #64748b;
            font-weight: 600;
            width: 42%;
          }
          .info-table td.val {
            color: #0f172a;
            font-weight: 700;
          }
          .role-box {
            background: #f8fafc !important;
            border: 1.5px solid #cbd5e1;
            border-radius: 10px;
            padding: 12px 16px;
            margin-bottom: 14px;
          }
          .timeline-card {
            background: #f0fdf4 !important;
            border: 1.5px solid #bbf7d0;
            border-radius: 10px;
            padding: 12px 16px;
            font-size: 11px;
            color: #166534;
            margin-bottom: 14px;
          }
          .slip-footer {
            background: #f8fafc !important;
            border-top: 1.5px solid #e2e8f0;
            padding: 10px 20px;
            font-size: 10px;
            color: #64748b;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        </style>
      </head>
      <body>
        <div class="slip-wrapper">
          <div class="header-banner">
            <div class="hospital-brand">
              <div class="hospital-logo-box">
                <img src="/assets/NIMS_Hospital_Logo_Website_Horizontal.svg" alt="NIMS Hospital" />
              </div>
              <div class="hospital-text">
                <h1>NIMS HOSPITAL & MEDICAL UNIVERSITY</h1>
                <p>National Highway 11C, Delhi-Jaipur Expressway, Jaipur, Rajasthan 303121</p>
                <p>Medical Recruitment & HR Directorate &bull; 2,400 Bed Super Speciality Hospital</p>
              </div>
            </div>
          </div>

          <div class="token-strip">
            <div class="token-pill-box">
              <span class="token-label">Application Token:</span>
              <span class="token-val">${tokenNumber}</span>
            </div>
            <div class="booking-date-stamp">
              <div><strong>CAREER APPLICATION RECEIPT</strong></div>
              <div>Logged: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
            </div>
          </div>

          <div class="slip-body">
            <div class="role-box">
              <div style="font-size: 10px; color: #f47521; font-weight: 800; text-transform: uppercase;">APPLIED POSITION</div>
              <div style="font-size: 16px; font-weight: 800; color: #0a2f5e; margin: 2px 0;">${selectedJob?.title}</div>
              <div style="font-size: 11px; color: #64748b;">Department: <strong>${selectedJob?.department}</strong> &bull; Location: ${selectedJob?.location}</div>
            </div>

            <div class="grid-info">
              <div>
                <div class="section-heading">Candidate Information</div>
                <table class="info-table">
                  <tr><td class="lbl">Candidate Name:</td><td class="val">${applicant.name}</td></tr>
                  <tr><td class="lbl">Mobile / WhatsApp:</td><td class="val">+91 ${applicant.phone}</td></tr>
                  <tr><td class="lbl">Email Address:</td><td class="val">${applicant.email}</td></tr>
                  <tr><td class="lbl">Current City:</td><td class="val">${applicant.city || 'Jaipur, Rajasthan'}</td></tr>
                  <tr><td class="lbl">Gender:</td><td class="val">${applicant.gender}</td></tr>
                </table>
              </div>

              <div>
                <div class="section-heading">Qualifications & Experience</div>
                <table class="info-table">
                  <tr><td class="lbl">Highest Degree:</td><td class="val">${applicant.qualification}</td></tr>
                  <tr><td class="lbl">Council Reg. No:</td><td class="val">${applicant.councilRegNo || 'Submitted / Under Verification'}</td></tr>
                  <tr><td class="lbl">Total Experience:</td><td class="val">${applicant.experience}</td></tr>
                  <tr><td class="lbl">Last / Current Org:</td><td class="val">${applicant.lastOrg || 'N/A'}</td></tr>
                  <tr><td class="lbl">Notice Period:</td><td class="val">${applicant.noticePeriod}</td></tr>
                  ${applicant.resumeName ? `<tr><td class="lbl">Attached Resume:</td><td class="val">${applicant.resumeName}</td></tr>` : ''}
                </table>
              </div>
            </div>

            <div class="timeline-card">
              <strong style="display: block; margin-bottom: 4px; font-size: 11.5px; text-transform: uppercase;">Next Steps in NIMS Recruitment Process:</strong>
              <ol style="padding-left: 18px; margin: 0;">
                <li><strong>Credential Review:</strong> Profile submitted to Medical Superintendent & Departmental Head.</li>
                <li><strong>Interview Shortlisting:</strong> Shortlisted candidates are contacted within 3 business days for technical and clinical panel rounds.</li>
                <li><strong>Enquiry Contact:</strong> For recruitment inquiries, email <strong>hr@nimshospitals.in</strong> quoting your Application Token: <strong>${tokenNumber}</strong>.</li>
              </ol>
            </div>
          </div>

          <div class="slip-footer">
            <div><strong>NIMS Hospital HR Department</strong> &bull; Central Recruitment Board</div>
            <div>Helpline: 0141-23 88 999 (Ext: 3410)</div>
          </div>
        </div>
      </body>
      </html>
    `;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(slipHtml);
    doc.close();

    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 2000);
    }, 400);
  };

  return (
    <div className="vacancies-modal-overlay">
      <div 
        style={{ position: 'absolute', inset: 0 }} 
        onClick={handleCloseAll} 
      />

      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="vacancies-modal-dialog"
      >
        {/* Header */}
        <div className="vacancies-modal-header">
          <div className="vacancies-header-brand">
            <div className="vacancies-header-logo-box">
              <img
                src="/assets/NIMS_Hospital_Logo_Website_Horizontal.svg"
                alt="NIMS Logo"
                style={{ height: '26px', width: 'auto' }}
                onError={(e) => {
                  e.currentTarget.src = "/assets/NIMS_Hospital_Logo_Website_Horizontal.svg";
                }}
              />
            </div>
            <div className="vacancies-header-title-box">
              <div className="vacancies-header-kicker">
                NIMS Careers &bull; Central Recruitment
              </div>
              <h3 className="vacancies-header-title">
                {formSubmitted 
                  ? 'Application Acknowledgment'
                  : selectedJob 
                    ? `Apply: ${selectedJob.title}` 
                    : 'Current Clinical & Hospital Openings'}
              </h3>
            </div>
          </div>
          <button
            onClick={handleCloseAll}
            aria-label="Close"
            className="vacancies-header-close-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="vacancies-modal-body">
          {formSubmitted ? (
            /* Application Success & Slip View */
            <motion.div 
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ textAlign: 'center', padding: '1rem 0.5rem' }}
            >
              <div style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: '#dcfce7',
                color: '#15803d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.15rem',
                border: '3px solid #bbf7d0',
                boxShadow: '0 8px 20px rgba(21, 128, 61, 0.15)'
              }}>
                <CheckCircle2 size={42} />
              </div>

              <span style={{
                fontSize: '0.76rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#15803d',
                background: '#dcfce7',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)'
              }}>
                Application Successfully Logged
              </span>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--nims-navy)', margin: '0.75rem 0 0.35rem' }}>
                Application Token Generated!
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.45 }}>
                Thank you, <strong>{applicant.name}</strong>. Your application for <strong>{selectedJob?.title}</strong> has been received by the NIMS Hospital Central Medical Recruitment Board.
              </p>

              {/* Token Details Display */}
              <div style={{
                background: 'linear-gradient(135deg, #0a2f5e 0%, #164684 100%)',
                color: '#ffffff',
                borderRadius: '16px',
                padding: '1.25rem 1.5rem',
                maxWidth: '480px',
                margin: '0 auto 1.5rem',
                boxShadow: '0 12px 30px rgba(10, 47, 94, 0.25)',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.65rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--nims-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Application Tracking ID
                  </span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '0.04em', color: '#fff' }}>
                    {tokenNumber}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.84rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#cbd5e1' }}>Applied Position:</span>
                    <strong style={{ color: '#fff' }}>{selectedJob?.title}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#cbd5e1' }}>Department:</span>
                    <strong style={{ color: '#fff' }}>{selectedJob?.department}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#cbd5e1' }}>Candidate Contact:</span>
                    <strong style={{ color: '#fff' }}>+91 {applicant.phone}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#cbd5e1' }}>Highest Qualification:</span>
                    <strong style={{ color: '#fff' }}>{applicant.qualification}</strong>
                  </div>
                  {applicant.resumeName && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#cbd5e1' }}>Uploaded CV:</span>
                      <strong style={{ color: '#4ade80' }}>✓ {applicant.resumeName} ({applicant.resumeSize})</strong>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#cbd5e1' }}>Current Status:</span>
                    <strong style={{ color: '#38bdf8' }}>Under Medical HR Review</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="v-step-action-row" style={{ justifyContent: 'center', maxWidth: '480px', margin: '0 auto' }}>
                <button
                  type="button"
                  onClick={handlePrintSlip}
                  style={{
                    padding: '0.75rem 1.25rem',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    background: '#ffffff',
                    color: 'var(--nims-navy)',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Printer size={16} />
                  <span>Print Application Slip</span>
                </button>

                <button
                  type="button"
                  onClick={handleCloseAll}
                  className="btn btn-primary"
                  style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, justifyContent: 'center' }}
                >
                  Done
                </button>
              </div>

              <div style={{ marginTop: '1.5rem', fontSize: '0.78rem', color: '#64748b' }}>
                For recruitment queries, email <strong>hr@nimshospitals.in</strong> or call HR Desk: <strong>0141-23 88 999 (Ext: 3410)</strong>
              </div>
            </motion.div>
          ) : selectedJob ? (
            /* Multi-Step Application Form for Selected Job */
            <form onSubmit={activeStep === 3 ? handleSubmit : handleNextStep} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Selected Job Profile Banner */}
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%)',
                border: '1.5px solid #cbd5e1',
                borderRadius: '14px',
                padding: '0.85rem 1.15rem',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: 'var(--nims-navy)',
                      background: '#ffffff',
                      padding: '0.15rem 0.55rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid #cbd5e1'
                    }}>
                      {selectedJob.department}
                    </span>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: 'var(--nims-orange)',
                      background: '#fff7ed',
                      padding: '0.15rem 0.55rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid #fed7aa'
                    }}>
                      {selectedJob.openings} Openings
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setSelectedJob(null); setActiveStep(1); }}
                    style={{ fontSize: '0.76rem', color: 'var(--nims-navy)', fontWeight: 700, background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Change Position
                  </button>
                </div>

                <h4 style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--nims-navy)', margin: '0 0 0.35rem 0' }}>
                  {selectedJob.title}
                </h4>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.78rem', color: '#64748b' }}>
                  <span>📍 {selectedJob.location}</span>
                  <span>⏱️ Exp: {selectedJob.experience}</span>
                  <span>🎓 {selectedJob.qualification}</span>
                </div>
              </div>

              {/* 3-Step Guided Progress Tabs */}
              <div className="v-step-nav">
                <div 
                  onClick={() => setActiveStep(1)}
                  className="v-step-nav-item"
                  style={{
                    color: activeStep === 1 ? 'var(--nims-navy)' : activeStep > 1 ? '#15803d' : '#94a3b8'
                  }}
                >
                  <span style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: activeStep === 1 ? 'var(--nims-navy)' : activeStep > 1 ? '#dcfce7' : '#f1f5f9',
                    color: activeStep === 1 ? '#ffffff' : activeStep > 1 ? '#15803d' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    flexShrink: 0
                  }}>
                    {activeStep > 1 ? '✓' : '1'}
                  </span>
                  <span>1. Personal & Contact</span>
                </div>

                <div 
                  onClick={() => { if (applicant.name && applicant.phone) setActiveStep(2); }}
                  className="v-step-nav-item"
                  style={{
                    color: activeStep === 2 ? 'var(--nims-navy)' : activeStep > 2 ? '#15803d' : '#94a3b8'
                  }}
                >
                  <span style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: activeStep === 2 ? 'var(--nims-navy)' : activeStep > 2 ? '#dcfce7' : '#f1f5f9',
                    color: activeStep === 2 ? '#ffffff' : activeStep > 2 ? '#15803d' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    flexShrink: 0
                  }}>
                    {activeStep > 2 ? '✓' : '2'}
                  </span>
                  <span>2. Qualifications</span>
                </div>

                <div 
                  onClick={() => { if (applicant.name && applicant.qualification) setActiveStep(3); }}
                  className="v-step-nav-item"
                  style={{
                    color: activeStep === 3 ? 'var(--nims-navy)' : '#94a3b8'
                  }}
                >
                  <span style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: activeStep === 3 ? 'var(--nims-navy)' : '#f1f5f9',
                    color: activeStep === 3 ? '#ffffff' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    flexShrink: 0
                  }}>
                    3
                  </span>
                  <span>3. Experience & CV</span>
                </div>
              </div>

              {/* Step 1 Content */}
              {activeStep === 1 && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div className="v-form-grid-2">
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--nims-navy)', display: 'block', marginBottom: '4px' }}>
                        Candidate Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Aryan Sharma / Priya Patel"
                        value={applicant.name}
                        onChange={e => setApplicant({ ...applicant, name: e.target.value })}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--nims-navy)', display: 'block', marginBottom: '4px' }}>
                        WhatsApp / Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={applicant.phone}
                        onChange={e => setApplicant({ ...applicant, phone: e.target.value.replace(/\D/g, '') })}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div className="v-form-grid-3">
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--nims-navy)', display: 'block', marginBottom: '4px' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={applicant.email}
                        onChange={e => setApplicant({ ...applicant, email: e.target.value })}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--nims-navy)', display: 'block', marginBottom: '4px' }}>
                        Current City & State *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Jaipur, Rajasthan"
                        value={applicant.city}
                        onChange={e => setApplicant({ ...applicant, city: e.target.value })}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--nims-navy)', display: 'block', marginBottom: '4px' }}>
                        Gender
                      </label>
                      <select
                        value={applicant.gender}
                        onChange={e => setApplicant({ ...applicant, gender: e.target.value })}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', outline: 'none', background: '#fff' }}
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="v-step-action-row" style={{ justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn btn-primary"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.75rem 1.4rem' }}
                    >
                      <span>Proceed to Qualifications</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2 Content */}
              {activeStep === 2 && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div className="v-form-grid-2">
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--nims-navy)', display: 'block', marginBottom: '4px' }}>
                        Highest Academic / Clinical Degree *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. MBBS, MD, B.Sc Nursing, GNM, DMLT"
                        value={applicant.qualification}
                        onChange={e => setApplicant({ ...applicant, qualification: e.target.value })}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--nims-navy)', display: 'block', marginBottom: '4px' }}>
                        Medical / Nursing Council Reg. No.
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. RMC/NMC/RNC Registration No."
                        value={applicant.councilRegNo}
                        onChange={e => setApplicant({ ...applicant, councilRegNo: e.target.value })}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div className="v-form-grid-2">
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--nims-navy)', display: 'block', marginBottom: '4px' }}>
                        College / University Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. RUHS Jaipur, AIIMS, SMS Medical College"
                        value={applicant.university}
                        onChange={e => setApplicant({ ...applicant, university: e.target.value })}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--nims-navy)', display: 'block', marginBottom: '4px' }}>
                        Year of Passing
                      </label>
                      <input
                        type="number"
                        min="1980"
                        max="2026"
                        value={applicant.passingYear}
                        onChange={e => setApplicant({ ...applicant, passingYear: e.target.value })}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div className="v-step-action-row">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      style={{ padding: '0.75rem 1.2rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '0.84rem' }}
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn btn-primary"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.75rem 1.4rem' }}
                    >
                      <span>Proceed to Experience & CV</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3 Content */}
              {activeStep === 3 && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div className="v-form-grid-2">
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--nims-navy)', display: 'block', marginBottom: '4px' }}>
                        Total Relevant Clinical Experience *
                      </label>
                      <select
                        value={applicant.experience}
                        onChange={e => setApplicant({ ...applicant, experience: e.target.value })}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', outline: 'none', background: '#fff' }}
                      >
                        <option>0 - 1 Year (Fresher)</option>
                        <option>1 - 2 Years</option>
                        <option>2 - 4 Years</option>
                        <option>5 - 8 Years</option>
                        <option>8+ Years (Senior Specialist)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--nims-navy)', display: 'block', marginBottom: '4px' }}>
                        Current / Last Organization
                      </label>
                      <input
                        type="text"
                        placeholder="Current hospital or clinic name"
                        value={applicant.lastOrg}
                        onChange={e => setApplicant({ ...applicant, lastOrg: e.target.value })}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div className="v-form-grid-2">
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--nims-navy)', display: 'block', marginBottom: '4px' }}>
                        Notice Period
                      </label>
                      <select
                        value={applicant.noticePeriod}
                        onChange={e => setApplicant({ ...applicant, noticePeriod: e.target.value })}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', outline: 'none', background: '#fff' }}
                      >
                        <option>Immediate Joiner</option>
                        <option>15 Days</option>
                        <option>30 Days</option>
                        <option>45 - 60 Days</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--nims-navy)', display: 'block', marginBottom: '4px' }}>
                        Current & Expected CTC (LPA)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 5.5 LPA / As per NIMS Norms"
                        value={applicant.expectedCtc}
                        onChange={e => setApplicant({ ...applicant, expectedCtc: e.target.value })}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Interactive Resume Upload Dropzone */}
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--nims-navy)', display: 'block', marginBottom: '4px' }}>
                      Upload Resume / CV (.PDF, .DOC, .DOCX)
                    </label>
                    <div style={{
                      border: '2px dashed #94a3b8',
                      background: applicant.resumeName ? '#f0fdf4' : '#f8fafc',
                      borderRadius: '12px',
                      padding: '1rem',
                      textAlign: 'center',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
                      />
                      {applicant.resumeName ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                          <CheckCircle2 size={20} color="#15803d" />
                          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#166534' }}>
                            {applicant.resumeName} ({applicant.resumeSize})
                          </span>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          <Upload size={22} color="var(--nims-orange)" />
                          <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--nims-navy)' }}>
                            Click to upload your latest CV / Resume
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                            PDF or DOCX up to 5MB (Optional, can also email to hr@nimshospitals.in)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="v-step-action-row">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      style={{ padding: '0.75rem 1.2rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '0.84rem' }}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.75rem 1.6rem', fontSize: '0.95rem' }}
                    >
                      <Send size={16} />
                      <span>Submit Official Application</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          ) : (
            /* Open Positions Overview */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)',
                border: '1px solid #bae6fd',
                borderRadius: '12px',
                padding: '0.85rem 1.15rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <Sparkles size={20} color="var(--nims-navy)" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '0.84rem', color: '#0369a1', margin: 0, lineHeight: 1.4 }}>
                  Join Rajasthan's leading 2,400-bed university healthcare network. High clinical exposure, modern residential amenities, and competitive compensation.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="vacancies-cat-strip">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`vacancies-cat-pill ${activeCategory === cat ? 'active' : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Job Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="v-modal-card"
                  >
                    <div className="v-modal-card-info">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                        <h4 style={{ color: 'var(--nims-navy)', fontSize: '1.05rem', margin: 0, fontWeight: 800 }}>
                          {job.title}
                        </h4>
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#15803d', background: '#dcfce7', padding: '0.15rem 0.55rem', borderRadius: 'var(--radius-full)', flexShrink: 0 }}>
                          {job.openings} Openings
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', fontSize: '0.78rem', color: '#64748b', marginBottom: '0.45rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Building2 size={13} color="var(--nims-orange)" />
                          {job.department}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Clock size={13} />
                          {job.experience}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          <MapPin size={13} color="var(--nims-navy)" />
                          {job.location}
                        </span>
                      </div>

                      {/* Required Skills Chips */}
                      {job.skills && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                          {job.skills.map((skill, sIdx) => (
                            <span key={sIdx} style={{ fontSize: '0.68rem', color: '#475569', background: '#f1f5f9', padding: '0.12rem 0.45rem', borderRadius: '4px', fontWeight: 600 }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setActiveStep(1);
                      }}
                      className="btn btn-primary v-modal-card-btn"
                    >
                      <span>Apply Now</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
