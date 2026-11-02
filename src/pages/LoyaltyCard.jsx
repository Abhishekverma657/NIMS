import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  PhoneCall,
  ChevronRight,
  Clock,
  HeartPulse,
  ArrowRight,
  FileText,
  Search,
  X,
  Sparkles,
  CheckCircle2,
  Building2,
  Info
} from 'lucide-react';
import { healthcareSchemes } from '../data/healthcareSchemesData';

export default function LoyaltyCard({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'govt' | 'insurance'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState(null);

  // Trust Bar stats from live nimshospitals.in/loyalty-card.php
  const trustStats = [
    {
      top: 'TRUSTED BY',
      bottom: '2,00,000+ PATIENTS',
      icon: <Users size={32} color="var(--nims-orange)" />
    },
    {
      top: 'RATED AS THE',
      bottom: 'BEST HOSPITAL IN JAIPUR',
      icon: <Award size={32} color="var(--nims-navy)" />
    },
    {
      top: 'PROVIDE 24/7',
      bottom: 'EMERGENCY CARE',
      icon: <Clock size={32} color="#10b981" />
    },
    {
      top: 'OFFERING',
      bottom: '30+ SPECIALITIES',
      icon: <HeartPulse size={32} color="var(--nims-orange)" />
    }
  ];

  // Auto-select or open scheme modal if navigated with hash (e.g. /loyalty-card#star-health)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash) {
        const hashId = window.location.hash.replace('#', '').toLowerCase();
        const found = healthcareSchemes.find((s) => s.id.toLowerCase() === hashId);
        if (found) {
          setSelectedScheme(found);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Filter schemes based on active category tab & search query
  const filteredSchemes = healthcareSchemes.filter((scheme) => {
    const matchesTab = activeTab === 'all' || scheme.type === activeTab;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      scheme.name.toLowerCase().includes(q) ||
      scheme.fullName.toLowerCase().includes(q) ||
      scheme.category.toLowerCase().includes(q) ||
      (scheme.description && scheme.description.toLowerCase().includes(q)) ||
      (scheme.coverage && scheme.coverage.toLowerCase().includes(q));
    return matchesTab && matchesSearch;
  });

  const govtCount = healthcareSchemes.filter((s) => s.type === 'govt').length;
  const insuranceCount = healthcareSchemes.filter((s) => s.type === 'insurance').length;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Dynamic Page Banner */}
      <section
        style={{
          background: '#757575',
          color: '#ffffff',
          padding: '3.75rem 0 3rem',
          borderBottom: '4px solid var(--nims-orange)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumbs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              color: '#f8fafc',
              marginBottom: '1.25rem'
            }}
          >
            <span>HOME</span>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--nims-gold)', fontWeight: 600 }}>HEALTHCARE BENEFIT SCHEMES</span>
          </div>

          <span
            style={{
              display: 'inline-block',
              background: 'var(--nims-orange)',
              color: '#ffffff',
              fontSize: '0.74rem',
              fontWeight: 700,
              padding: '0.25rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '0.85rem'
            }}
          >
            Government & Cashless Healthcare Schemes
          </span>

          <h1
            style={{
              color: '#ffffff',
              fontSize: 'clamp(2.1rem, 4vw, 3rem)',
              marginBottom: '0.75rem',
              fontWeight: 800,
              lineHeight: 1.2
            }}
          >
            Healthcare Benefit Schemes & Cashless Care
          </h1>

          <p style={{ color: '#f1f5f9', fontSize: '1.05rem', maxWidth: '720px', lineHeight: 1.6, margin: 0 }}>
            NIMS Hospital is linked with all central and state government healthcare schemes, leading private health insurance providers, and TPAs. We ensure our patients receive world-class quaternary care without financial hardship.
          </p>
        </div>
      </section>

      {/* Trust Bar (Exact from live nimshospitals.in/loyalty-card.php) */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid #edf2f7', padding: '1.75rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              alignItems: 'center'
            }}
          >
            {trustStats.map((item, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: 'center',
                  padding: '1rem',
                  borderRight: idx < trustStats.length - 1 ? '1px solid #edf2f7' : 'none'
                }}
              >
                <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
                  {item.icon}
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--nims-navy)', letterSpacing: '0.06em' }}>
                  {item.top}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--nims-orange)', marginTop: '2px' }}>
                  {item.bottom}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Hospital Section (Exact copy from live nimshospitals.in/loyalty-card.php) */}
      <section className="section" style={{ background: '#f8fafc', padding: '4rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(1.75rem, 4vw, 3.5rem)',
              alignItems: 'center'
            }}
          >
            <div>
              <span
                style={{
                  color: 'var(--nims-orange)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.5rem',
                  display: 'block'
                }}
              >
                About NIMS Hospital
              </span>
              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  color: 'var(--nims-navy)',
                  fontWeight: 800,
                  marginBottom: '1.25rem',
                  lineHeight: 1.25
                }}
              >
                Best Multispeciality Hospital in Jaipur
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                NIMS Hospital is a NABH Accredited, multi-super speciality hospital in Jaipur. We deliver all high-end, round-the-clock healthcare services to the patient. The hospital has 30+ departments that deliver treatment for diseases related to cardiology, neurology, urology, orthopedic, nephrology and many more.
              </p>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
                A team of 500+ expert and experienced doctors are always ready to offer advanced treatment for every disease. 2,400+ beds, advanced technology, expert healthcare staff, and on-time ambulance services make us the top hospital in Jaipur. We also offer various central and state healthcare schemes, ensuring that patients can receive the best treatments without financial worries.
              </p>

              <button
                onClick={onOpenBooking}
                className="btn btn-primary"
                style={{ padding: '0.85rem 2rem', fontSize: '0.98rem' }}
              >
                <span>Book OPD Consultation</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Visual Image */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(35, 32, 33, 0.12)',
                  border: '4px solid #ffffff'
                }}
              >
                <img
                  src="/assets/images/news/1.png"
                  alt="Best Multispeciality Hospital in Jaipur"
                  style={{ width: '100%', height: '390px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => {
                    e.currentTarget.src = "/assets/images/hospital-img.png";
                  }}
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-16px',
                  right: '24px',
                  background: 'var(--nims-navy)',
                  color: '#ffffff',
                  padding: '1rem 1.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--nims-orange)' }}>
                  NABH & NABL
                </div>
                <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>Accredited Quaternary Hospital</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose The Right Healthcare Benefit Scheme (Exact title from live page) */}
      <section className="section" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="container">
          <div className="section-header" style={{ maxWidth: '840px', marginBottom: '2.5rem' }}>
            <span className="section-subtitle">Cashless Treatment Tie-Ups</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', color: 'var(--nims-navy)', marginBottom: '0.85rem' }}>
              Choose The Right Healthcare Benefit Scheme<br />For Your Treatment
            </h2>
            <p style={{ fontSize: '1.02rem', color: '#64748b', lineHeight: 1.65 }}>
              NIMS Hospital is linked with all central and state government healthcare schemes, leading private health insurance providers, and TPAs. We ensure our patients receive the best possible care with zero out-of-pocket stress.
            </p>
          </div>

          {/* Filter Tabs & Quick Search Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2rem',
              padding: '0.5rem 0',
              borderBottom: '1px solid #edf2f7'
            }}
          >
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                style={{
                  padding: '0.6rem 1.35rem',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.25s ease',
                  background: activeTab === 'all' ? 'var(--nims-navy)' : '#f1f5f9',
                  color: activeTab === 'all' ? '#ffffff' : '#475569',
                  boxShadow: activeTab === 'all' ? '0 4px 12px rgba(7, 31, 61, 0.2)' : 'none'
                }}
              >
                All Tie-Ups ({healthcareSchemes.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('govt')}
                style={{
                  padding: '0.6rem 1.35rem',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.25s ease',
                  background: activeTab === 'govt' ? 'var(--nims-navy)' : '#f1f5f9',
                  color: activeTab === 'govt' ? '#ffffff' : '#475569',
                  boxShadow: activeTab === 'govt' ? '0 4px 12px rgba(7, 31, 61, 0.2)' : 'none'
                }}
              >
                Government Schemes ({govtCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('insurance')}
                style={{
                  padding: '0.6rem 1.35rem',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.25s ease',
                  background: activeTab === 'insurance' ? 'var(--nims-navy)' : '#f1f5f9',
                  color: activeTab === 'insurance' ? '#ffffff' : '#475569',
                  boxShadow: activeTab === 'insurance' ? '0 4px 12px rgba(7, 31, 61, 0.2)' : 'none'
                }}
              >
                Private Insurance & TPAs ({insuranceCount})
              </button>
            </div>

            {/* Search Input Box */}
            <div style={{ position: 'relative', minWidth: '270px', flex: '1', maxWidth: '340px' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8',
                  pointerEvents: 'none'
                }}
              />
              <input
                type="text"
                placeholder="Search scheme, insurer or TPA..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 2.2rem 0.6rem 2.4rem',
                  borderRadius: '999px',
                  border: '1.5px solid #e2e8f0',
                  fontSize: '0.88rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  background: '#ffffff'
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--nims-orange)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94a3b8',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px'
                  }}
                  title="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Scheme Cards Grid with Authentic Brand Logos (Displaying all 18 Empaneled Tie-Ups) */}
          {filteredSchemes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#f8fafc', borderRadius: '16px' }}>
              <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0 }}>
                No healthcare scheme or insurer matches your search for "<strong>{searchQuery}</strong>".
              </p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                className="btn btn-outline"
                style={{ marginTop: '1rem', padding: '0.5rem 1.25rem', fontSize: '0.88rem' }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="scheme-grid" style={{ marginBottom: '3.5rem' }}>
              {filteredSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  id={scheme.id}
                  className="scheme-card"
                  onClick={() => setSelectedScheme(scheme)}
                  style={{ cursor: 'pointer' }}
                  title={`Click to view coverage details for ${scheme.fullName}`}
                >
                  <div className="scheme-logo-wrap">
                    {scheme.logo ? (
                      <img
                        src={scheme.logo}
                        alt={scheme.alt || scheme.name}
                        loading="lazy"
                        onError={(e) => {
                          if (scheme.fallbackLogo && e.currentTarget.src !== scheme.fallbackLogo) {
                            e.currentTarget.src = scheme.fallbackLogo;
                            return;
                          }
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.parentElement.querySelector('.scheme-logo-fallback-text');
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className="scheme-logo-fallback-text"
                      style={{
                        display: scheme.logo ? 'none' : 'flex',
                        fontWeight: 800,
                        fontSize: '1.05rem',
                        color: 'var(--nims-navy)',
                        textAlign: 'center',
                        padding: '0.5rem',
                        lineHeight: 1.3
                      }}
                    >
                      {scheme.name}
                    </div>
                  </div>
                  <div className="scheme-name-bar">
                    <span>{scheme.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cashless TPA Helpdesk Information Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #373435 0%, #071f3d 100%)',
              color: '#ffffff',
              borderRadius: '24px',
              padding: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2rem',
              boxShadow: '0 12px 36px rgba(35, 32, 33, 0.18)'
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(189, 23, 28, 0.25)',
                  color: 'var(--nims-orange)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem'
                }}
              >
                <ShieldCheck size={15} />
                <span>24×7 Central Cashless TPA Desk</span>
              </div>
              <h3 style={{ fontSize: '1.55rem', color: '#ffffff', margin: '0 0 0.5rem 0', fontWeight: 800 }}>
                Need Assistance With Your Health Scheme or Cashless Pre-Auth?
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.96rem', margin: 0, maxWidth: '640px', lineHeight: 1.55 }}>
                Our on-campus TPA and Government Scheme Helpdesk is staffed 24×7 to assist with e-card verification, pre-authorizations, biometric validation, and zero-cash discharge.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="tel:01412388999"
                className="btn btn-orange"
                style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem' }}
              >
                <PhoneCall size={17} />
                <span>Call TPA Desk: 0141-23 88 999</span>
              </a>
              <button
                onClick={onOpenBooking}
                className="btn btn-outline"
                style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)', padding: '0.85rem 1.4rem' }}
              >
                <span>Book Cashless OPD</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Scheme Detail Modal */}
      {selectedScheme && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem'
          }}
          onClick={() => setSelectedScheme(null)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              maxWidth: '640px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '1.5rem 1.75rem',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                position: 'sticky',
                top: 0,
                background: '#ffffff',
                zIndex: 10
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '12px',
                    border: '1.5px solid #e2e8f0',
                    padding: '0.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#ffffff',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={selectedScheme.logo}
                    alt={selectedScheme.name}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    onError={(e) => {
                      if (selectedScheme.fallbackLogo && e.currentTarget.src !== selectedScheme.fallbackLogo) {
                        e.currentTarget.src = selectedScheme.fallbackLogo;
                      }
                    }}
                  />
                </div>
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      background: selectedScheme.type === 'govt' ? '#eff6ff' : '#fffbeb',
                      color: selectedScheme.type === 'govt' ? '#1d4ed8' : '#b45309',
                      border: `1px solid ${selectedScheme.type === 'govt' ? '#bfdbfe' : '#fde68a'}`,
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.65rem',
                      borderRadius: '999px',
                      marginBottom: '0.25rem'
                    }}
                  >
                    {selectedScheme.category}
                  </span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nims-navy)', margin: 0, lineHeight: 1.2 }}>
                    {selectedScheme.name}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '2px 0 0', lineHeight: 1.3 }}>
                    {selectedScheme.fullName}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedScheme(null)}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748b',
                  flexShrink: 0,
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#e2e8f0'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; }}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '1.75rem' }}>
              {/* Coverage & Eligibility Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#f8fafc', padding: '1rem 1.15rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--nims-orange)', fontWeight: 700, fontSize: '0.78rem', marginBottom: '0.35rem' }}>
                    <ShieldCheck size={16} />
                    <span>COVERAGE & BENEFITS</span>
                  </div>
                  <p style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e293b', margin: 0, lineHeight: 1.4 }}>
                    {selectedScheme.coverage}
                  </p>
                </div>

                <div style={{ background: '#f8fafc', padding: '1rem 1.15rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--nims-navy)', fontWeight: 700, fontSize: '0.78rem', marginBottom: '0.35rem' }}>
                    <Users size={16} />
                    <span>ELIGIBILITY CRITERIA</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#334155', margin: 0, lineHeight: 1.4 }}>
                    {selectedScheme.eligibility}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--nims-navy)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                  <Info size={16} color="var(--nims-navy)" />
                  <span>Scheme Details</span>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.65, margin: 0 }}>
                  {selectedScheme.description}
                </p>
              </div>

              {/* Mandatory Documents Checklist */}
              {selectedScheme.documents && selectedScheme.documents.length > 0 && (
                <div
                  style={{
                    marginBottom: '1.75rem',
                    background: '#f0fdf4',
                    padding: '1.25rem',
                    borderRadius: '16px',
                    border: '1px solid #bbf7d0'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#166534',
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      marginBottom: '0.65rem'
                    }}
                  >
                    <FileText size={16} />
                    <span>MANDATORY DOCUMENTS AT CASHLESS COUNTER</span>
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem'
                    }}
                  >
                    {selectedScheme.documents.map((doc, dIdx) => (
                      <li key={dIdx} style={{ fontSize: '0.86rem', color: '#14532d', fontWeight: 600 }}>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href="tel:01412388999"
                  className="btn btn-orange"
                  style={{ flex: 1, minWidth: '220px', justifyContent: 'center', padding: '0.85rem 1.25rem', fontSize: '0.92rem' }}
                >
                  <PhoneCall size={16} />
                  <span>Call TPA Desk: 0141-23 88 999</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedScheme(null);
                    if (onOpenBooking) onOpenBooking();
                  }}
                  className="btn btn-primary"
                  style={{ flex: 1, minWidth: '200px', justifyContent: 'center', padding: '0.85rem 1.25rem', fontSize: '0.92rem' }}
                >
                  <span>Book Cashless OPD</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
