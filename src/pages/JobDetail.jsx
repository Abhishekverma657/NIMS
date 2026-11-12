import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  GraduationCap,
  Building2,
  Send,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  HeartPulse,
  Users,
  Sparkles,
  Share2,
  Check,
  ChevronRight,
  PhoneCall,
  Mail,
  FileText,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { generateJobSlug } from '../data/vacanciesData';
import VacanciesModal from '../components/vacancies/VacanciesModal';

export default function JobDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [allJobs, setAllJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fetch live active positions directly from backend API
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
    fetch(`${baseUrl}/hr/jobs?activeOnly=true`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.jobs)) {
          const apiJobs = data.jobs.map((j) => ({
            ...j,
            id: j._id || j.id,
            slug: generateJobSlug(j.title),
            openings: j.vacanciesCount || j.openings || 1
          }));
          setAllJobs(apiJobs);
          resolveJob(apiJobs);
        } else {
          setAllJobs([]);
          setCurrentJob(null);
        }
      })
      .catch((err) => {
        console.error('Failed to load live vacancies:', err);
        setAllJobs([]);
        setCurrentJob(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const resolveJob = (jobList) => {
    if (!slug) return;
    const cleanSlug = slug.toLowerCase().trim();
    const found = jobList.find((j) => {
      const jSlug = (j.slug || generateJobSlug(j.title)).toLowerCase();
      return jSlug === cleanSlug || String(j.id).toLowerCase() === cleanSlug || String(j._id || '').toLowerCase() === cleanSlug;
    });
    setCurrentJob(found || null);
    if (found) {
      const params = new URLSearchParams(window.location.search);
      if (params.get('apply') === 'true') {
        setIsApplyModalOpen(true);
      }
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentJob?.title} — Careers at NIMS Hospital Jaipur`,
          text: `Check out this verified opening for ${currentJob?.title} at NIMS Hospital, Jaipur!`,
          url: shareUrl
        });
        return;
      } catch (err) {
        // Fallback to clipboard copy if user dismissed or cancelled
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      // Fallback
      alert('Link copied to clipboard: ' + shareUrl);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center', color: '#64748b' }}>
          <div className="animate-spin" style={{ width: '36px', height: '36px', border: '3px solid #cbd5e1', borderTopColor: 'var(--nims-navy)', borderRadius: '50%', margin: '0 auto 1rem' }} />
          <p style={{ fontSize: '0.92rem', fontWeight: 600 }}>Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!currentJob) {
    return (
      <div style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '520px', textAlign: 'center', background: '#ffffff', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <AlertCircle size={44} color="var(--nims-orange)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--nims-navy)', marginBottom: '0.5rem' }}>
            Position Not Found or Expired
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            The career role you are looking for may have been filled or the link might be incorrect. Explore all active clinical and hospital openings below.
          </p>
          <Link to="/careers" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={16} />
            <span>Browse All Current Openings</span>
          </Link>
        </div>
      </div>
    );
  }

  // Related jobs for sidebar recommendation
  const otherJobs = allJobs.filter((j) => j.id !== currentJob.id).slice(0, 4);

  // Responsibilities: Only use if explicitly provided by the job (no static medical fallback for non-clinical jobs)
  const hasResponsibilities = Array.isArray(currentJob.responsibilities) && currentJob.responsibilities.length > 0;

  // Benefits
  const benefits =
    currentJob.benefits && currentJob.benefits.length > 0
      ? currentJob.benefits
      : [
        'High clinical case volume exposure in Rajasthan’s leading 2,400+ bed hospital',
        'Subsidized healthcare and diagnostic benefits for self and dependent family',
        'On-campus residential facilities & staff housing on Jaipur-Delhi Expressway (NH-11C)',
        'Continuous medical education (CME), academic advancement, and research ecosystem'
      ];

  return (
    <div className="job-detail-page-wrapper" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Dynamic Top Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--nims-navy) 0%, #1e1b1c 100%)',
          color: '#ffffff',
          padding: '2.5rem 0 2.2rem',
          borderBottom: '4px solid var(--nims-orange)',
          position: 'relative'
        }}
      >
        <div className="container">
          {/* Breadcrumbs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.82rem',
              color: '#cbd5e1',
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={13} />
            <Link to="/careers" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Careers</Link>
            <ChevronRight size={13} />
            <span style={{ color: 'var(--nims-orange)', fontWeight: 700 }}>{currentJob.title}</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}
          >
            <div style={{ maxWidth: '820px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    background: 'var(--nims-orange)',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '0.2rem 0.7rem',
                    borderRadius: '999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}
                >
                  {currentJob.department}
                </span>
                <span
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.65rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  {currentJob.type || 'Full-Time'}
                </span>
                <span
                  style={{
                    background: 'rgba(16, 185, 129, 0.2)',
                    color: '#4ade80',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '0.2rem 0.65rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(74, 222, 128, 0.3)'
                  }}
                >
                  ✓ Actively Hiring &bull; {currentJob.openings || currentJob.vacanciesCount || 1} Openings
                </span>
              </div>

              <h1
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(1.8rem, 3.8vw, 2.7rem)',
                  fontWeight: 800,
                  margin: '0 0 0.5rem',
                  lineHeight: 1.2
                }}
              >
                {currentJob.title}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#cbd5e1', fontSize: '0.88rem', flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Building2 size={15} color="var(--nims-orange)" />
                  <span>NIMS Hospital & Medical University</span>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <MapPin size={15} color="#38bdf8" />
                  <span>{currentJob.location || 'NH-11C, Jaipur Campus'}</span>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={15} color="#facc15" />
                  <span>{currentJob.experience}</span>
                </span>
              </div>
            </div>

            {/* Action buttons: Apply, Share & Back */}
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  background: 'linear-gradient(135deg, var(--nims-orange) 0%, #ea580c 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.6rem 1.45rem',
                  borderRadius: '999px',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(255, 107, 53, 0.45)',
                  transition: 'all 0.2s',
                  letterSpacing: '0.02em'
                }}
              >
                <Send size={15} />
                <span>Apply for this Role</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: copied ? '#15803d' : 'rgba(255,255,255,0.12)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.25)',
                  padding: '0.6rem 1.15rem',
                  borderRadius: '999px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                title="Copy shareable link for this job opening"
              >
                {copied ? <Check size={16} /> : <Share2 size={16} />}
                <span>{copied ? 'Link Copied!' : 'Share Position'}</span>
              </button>

              <Link
                to="/careers"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#cbd5e1',
                  border: '1px solid rgba(255,255,255,0.18)',
                  padding: '0.6rem 1.15rem',
                  borderRadius: '999px',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                <ArrowLeft size={15} />
                <span>All Openings</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout (2-Column Grid with Dedicated Top Spacing) */}
      <section className="job-detail-main-section" style={{ padding: '2.5rem 0 4.5rem', background: '#f8fafc' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) 340px',
              gap: '2.5rem',
              alignItems: 'start'
            }}
            className="job-detail-grid-layout"
          >
          {/* Left Column: Comprehensive Role Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* 4 Metric Cards */}
            <div className="job-metrics-grid">
              <div style={{ background: '#ffffff', padding: '1.15rem 1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--nims-navy)', fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
                  <Building2 size={15} color="var(--nims-navy)" />
                  <span>DEPARTMENT</span>
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>
                  {currentJob.department}
                </div>
              </div>

              <div style={{ background: '#ffffff', padding: '1.15rem 1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--nims-orange)', fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
                  <Clock size={15} color="var(--nims-orange)" />
                  <span>EXPERIENCE</span>
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>
                  {currentJob.experience}
                </div>
              </div>

              <div style={{ background: '#ffffff', padding: '1.15rem 1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
                  <Users size={15} color="#10b981" />
                  <span>OPENINGS</span>
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>
                  {currentJob.openings || currentJob.vacanciesCount || 1} Positions
                </div>
              </div>

              <div style={{ background: '#ffffff', padding: '1.15rem 1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0284c7', fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
                  <MapPin size={15} color="#0284c7" />
                  <span>LOCATION</span>
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>
                  {currentJob.location || 'Jaipur Campus'}
                </div>
              </div>
            </div>

            {/* Role Overview */}
            <div className="job-detail-card">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--nims-navy)', marginBottom: '0.75rem' }}>
                Role Overview & Clinical Scope
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
                {currentJob.description}
              </p>
            </div>

            {/* Minimum Qualifications Box (Only shown when qualification exists; council note only if requiresCouncilReg is true) */}
            {currentJob.qualification && (
              <div className="job-detail-eligibility-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1d4ed8', fontWeight: 800, fontSize: '0.86rem', marginBottom: '0.5rem' }}>
                  <GraduationCap size={18} />
                  <span>
                    MINIMUM ELIGIBILITY{currentJob.requiresCouncilReg ? ' & COUNCIL REGISTRATION' : ''}
                  </span>
                </div>
                <p style={{ fontSize: '1.02rem', fontWeight: 700, color: '#1e3a8a', margin: 0, lineHeight: 1.5 }}>
                  {currentJob.qualification}
                </p>
                {currentJob.requiresCouncilReg && (
                  <p style={{ fontSize: '0.82rem', color: '#3b82f6', margin: '6px 0 0' }}>
                    * Candidates with verified State / National medical council registration will be given priority consideration.
                  </p>
                )}
              </div>
            )}

            {/* Key Clinical & Operational Responsibilities (Only rendered if explicitly provided in job data) */}
            {hasResponsibilities && (
              <div className="job-detail-card">
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nims-navy)', marginBottom: '1rem' }}>
                  Key Responsibilities & Operational Scope
                </h3>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {currentJob.responsibilities.map((resp, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', color: '#334155', lineHeight: 1.6 }}>
                      <CheckCircle2 size={17} color="var(--nims-orange)" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Required Skills & Competencies */}
            {currentJob.skills && currentJob.skills.length > 0 && (
              <div className="job-detail-card">
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nims-navy)', marginBottom: '1rem' }}>
                  Required Skills & Key Competencies
                </h3>
                <div className="job-skills-grid">
                  {currentJob.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="job-skill-card">
                      <div className="job-skill-bullet">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="job-skill-text">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Why Work at NIMS Hospital (Campus Perks & Environment) */}
            <div style={{ background: '#f0fdf4', padding: '1.75rem 2rem', borderRadius: '20px', border: '1.5px solid #bbf7d0' }} className="job-detail-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 800, fontSize: '0.88rem', marginBottom: '0.75rem' }}>
                <ShieldCheck size={20} color="#166534" />
                <span>BENEFITS & CAMPUS LIFE AT NIMS HOSPITAL JAIPUR</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', marginTop: '1rem' }}>
                {benefits.map((b, bIdx) => (
                  <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: '#14532d', lineHeight: 1.5 }}>
                    <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontWeight: 600 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruitment Flow Timeline */}
            <div className="job-detail-card">
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--nims-navy)', margin: '0 0 1rem' }}>
                Selection & Recruitment Process
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', textAlign: 'center' }}>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--nims-orange)' }}>Step 1</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--nims-navy)', marginTop: '4px' }}>Online Application</div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>Submit profile & CV</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--nims-orange)' }}>Step 2</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--nims-navy)', marginTop: '4px' }}>Credential Review</div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>Medical HR screening</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--nims-orange)' }}>Step 3</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--nims-navy)', marginTop: '4px' }}>Panel Interview</div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>Clinical / Technical round</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#16a34a' }}>Step 4</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', marginTop: '4px' }}>Offer & Joining</div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>Campus onboarding</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Sticky Apply Card & Helpline */}
          <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Primary Apply Card */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '2rem 1.75rem',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 12px 36px rgba(35, 32, 33, 0.08)',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#dcfce7',
                  color: '#15803d',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                  marginBottom: '1rem'
                }}
              >
                <CheckCircle2 size={14} />
                <span>Immediate Opening Available</span>
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nims-navy)', margin: '0 0 0.35rem' }}>
                Interested in this Position?
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5, margin: '0 0 1.5rem' }}>
                Submit your CV & credentials directly to the Central Medical Recruitment Directorate.
              </p>

              {/* HERE IS THE CRITICAL APPLY BUTTON (Only on this detail page!) */}
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.95rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: 800,
                  borderRadius: '999px',
                  boxShadow: '0 8px 24px rgba(189, 23, 28, 0.3)',
                  marginBottom: '1rem'
                }}
              >
                <Send size={18} />
                <span>Apply for this Role</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={handleShare}
                style={{
                  width: '100%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '0.65rem 1rem',
                  borderRadius: '999px',
                  border: '1.5px solid #cbd5e1',
                  background: '#f8fafc',
                  color: 'var(--nims-navy)',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {copied ? <Check size={15} color="#16a34a" /> : <Share2 size={15} />}
                <span>{copied ? 'Direct Link Copied!' : 'Copy Shareable Link'}</span>
              </button>
            </div>

            {/* Central HR Recruitment Helpdesk */}
            <div
              style={{
                background: 'linear-gradient(135deg, #373435 0%, #071f3d 100%)',
                color: '#ffffff',
                borderRadius: '20px',
                padding: '1.5rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--nims-orange)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                <PhoneCall size={15} />
                <span>RECRUITMENT HELPDESK</span>
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.5rem' }}>
                Have Questions Regarding This Role?
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 1rem' }}>
                Directly connect with the hospital HR recruitment coordinators.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <a
                  href="tel:01412388999"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#ffffff',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <PhoneCall size={15} color="var(--nims-orange)" />
                  <span>0141-23 88 999</span>
                </a>
                <a
                  href="mailto:info@nimshospitals.in"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#ffffff',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <Mail size={15} color="#38bdf8" />
                  <span>info@nimshospitals.in</span>
                </a>
              </div>
            </div>

            {/* Other Open Positions Recommendations */}
            {otherJobs.length > 0 && (
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--nims-navy)', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
                  Other Open Roles at NIMS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {otherJobs.map((oj) => (
                    <Link
                      key={oj.id}
                      to={`/careers/${oj.slug || generateJobSlug(oj.title)}`}
                      style={{
                        display: 'block',
                        padding: '0.75rem',
                        borderRadius: '12px',
                        background: '#f8fafc',
                        border: '1px solid #edf2f7',
                        textDecoration: 'none',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--nims-orange)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#edf2f7'; }}
                    >
                      <div style={{ fontSize: '0.72rem', color: 'var(--nims-orange)', fontWeight: 800, textTransform: 'uppercase' }}>
                        {oj.department}
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--nims-navy)', marginTop: '2px' }}>
                        {oj.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                        {oj.experience} &bull; {oj.openings || 1} Openings
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </section>

      {/* Mobile Sticky Floating Apply Bar (Always pinned at bottom on mobile screens <= 992px) */}
      <div className="mobile-job-floating-bar">
        <div className="mobile-job-floating-info">
          <div className="mobile-job-floating-title">{currentJob.title}</div>
          <div className="mobile-job-floating-meta">
            <span>{currentJob.department}</span>
            <span className="dot-sep">&bull;</span>
            <span className="openings-tag">
              {currentJob.openings || currentJob.vacanciesCount || 1} Openings
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsApplyModalOpen(true)}
          className="mobile-job-floating-btn"
        >
          <Send size={15} />
          <span>Apply Now</span>
        </button>
      </div>

      {/* 3-Step Guided Vacancy Application Modal (Triggered by Apply Button) */}
      <VacanciesModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        initialJob={currentJob}
        vacanciesData={allJobs}
      />
    </div>
  );
}

