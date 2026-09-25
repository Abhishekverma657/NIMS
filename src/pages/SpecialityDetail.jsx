import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  PhoneCall,
  Clock,
  Bed,
  UserCheck,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  MapPin,
  Building2,
  HeartPulse
} from 'lucide-react';
import { specialitiesData } from '../data/specialitiesData';
import { doctorsData } from '../data/doctorsData';
import DoctorCard from '../components/doctors/DoctorCard';

export default function SpecialityDetail({ onOpenBooking }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the current speciality by ID
  const speciality = specialitiesData.find((s) => s.id === id) || specialitiesData[0];

  // Find related doctors for this department
  const departmentDoctors = doctorsData.filter((doc) => {
    if (doc.isOpdAvailable === false) return false;
    if (!doc.specialityId && !doc.department) return false;
    return (
      (doc.specialityId && doc.specialityId.toLowerCase().includes(speciality.id.toLowerCase())) ||
      (doc.department && doc.department.toLowerCase().includes(speciality.name.toLowerCase())) ||
      (speciality.name.toLowerCase().includes(doc.department.toLowerCase()))
    );
  });

  // Other specialities for quick sidebar exploration
  const otherSpecialities = specialitiesData.filter((s) => s.id !== speciality.id).slice(0, 7);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Dynamic Hero Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--nims-navy) 0%, var(--nims-navy-dark) 100%)',
          color: '#ffffff',
          padding: '3.5rem 0 3rem',
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
              color: '#94a3b8',
              marginBottom: '1.5rem'
            }}
          >
            <Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <Link to="/specialities" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Specialities</Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--nims-orange)', fontWeight: 600 }}>{speciality.name}</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2rem'
            }}
          >
            {/* Left Identity with Official SVG Icon */}
            <div className="speciality-hero-identity">
              <div className="speciality-hero-icon">
                <img
                  src={speciality.svgIcon}
                  alt={speciality.name}
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.45rem', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      background: 'var(--nims-orange)',
                      color: '#ffffff',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      padding: '0.22rem 0.75rem',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    {speciality.category}
                  </span>
                  {speciality.emergency && (
                    <span
                      style={{
                        background: 'rgba(255, 255, 255, 0.16)',
                        color: '#ffffff',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        padding: '0.22rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span className="pulse-dot pulse-dot-orange" /> 24×7 Emergency &amp; Trauma Ready
                    </span>
                  )}
                </div>

                <h1
                  style={{
                    fontSize: 'clamp(1.75rem, 3.8vw, 3rem)',
                    fontWeight: 800,
                    color: '#ffffff',
                    margin: '0 0 0.5rem 0',
                    lineHeight: 1.15
                  }}
                >
                  Department of {speciality.name}
                </h1>

                <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: '#cbd5e1', margin: 0, lineHeight: 1.5, maxWidth: '640px' }}>
                  {speciality.headline}
                </p>
              </div>
            </div>

            {/* Top Action CTAs */}
            <div className="speciality-hero-ctas">
              <button
                onClick={() => onOpenBooking({ speciality: speciality.id })}
                className="btn btn-orange"
                style={{ padding: '0.85rem 1.6rem', fontSize: '0.98rem', fontWeight: 700 }}
              >
                <Calendar size={18} />
                <span>Book Appointment</span>
              </button>

              <a
                href="tel:0141260500"
                className="btn btn-outline"
                style={{
                  borderColor: 'rgba(255,255,255,0.4)',
                  color: '#ffffff',
                  padding: '0.8rem 1.4rem',
                  fontSize: '0.95rem'
                }}
              >
                <PhoneCall size={16} color="var(--nims-orange)" />
                <span>Call Helpline</span>
              </a>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="speciality-quick-metrics">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--nims-orange)'
                }}
              >
                <UserCheck size={22} />
              </div>
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                  {speciality.doctorsCount || 14}+
                </div>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Experienced Clinicians</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--nims-orange)'
                }}
              >
                <Bed size={22} />
              </div>
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                  {speciality.beds || 60}+
                </div>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Dedicated Inpatient Beds</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10b981'
                }}
              >
                <Clock size={22} />
              </div>
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#10b981' }}>
                  24×7
                </div>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Emergency & Critical Care</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38bdf8'
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                  NABH
                </div>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Accredited Safety Benchmarks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout (8 Cols Main + 4 Cols Sticky Sidebar) */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div className="speciality-detail-layout">
          {/* LEFT: Complete Department Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Overview Card */}
            <div className="speciality-card-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <Building2 size={22} color="var(--nims-orange)" />
                <h2 style={{ fontSize: '1.45rem', color: 'var(--nims-navy)', margin: 0, fontWeight: 700 }}>
                  Clinical Overview &amp; Capabilities
                </h2>
              </div>
              <p style={{ fontSize: '1.02rem', color: '#475569', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                {speciality.description}
              </p>
              <p style={{ fontSize: '0.96rem', color: '#64748b', lineHeight: 1.7, margin: 0 }}>
                At NIMS Hospital Jaipur, the Department of {speciality.name} combines multi-disciplinary clinical expertise with high-definition diagnostic modalities and modular operating suites. Our clinical protocols follow established international standards to deliver optimal therapeutic outcomes for both routine and complex tertiary cases.
              </p>
            </div>

            {/* Key Procedures & Surgeries */}
            <div className="speciality-card-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
                <HeartPulse size={22} color="var(--nims-orange)" />
                <h2 style={{ fontSize: '1.45rem', color: 'var(--nims-navy)', margin: 0, fontWeight: 700 }}>
                  Specialized Procedures &amp; Interventions
                </h2>
              </div>

              <div className="speciality-procedures-grid">
                {speciality.procedures.map((proc, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      background: '#f8fafc',
                      border: '1px solid #edf2f7',
                      borderRadius: '14px',
                      padding: '0.85rem 1rem',
                      transition: 'transform 0.2s ease, border-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--nims-orange)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#edf2f7';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    <CheckCircle2 size={18} color="var(--nims-orange)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--nims-navy)', wordBreak: 'break-word' }}>
                      {proc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Clinical Infrastructure */}
            <div className="speciality-card-box">
              <h2 style={{ fontSize: '1.45rem', color: 'var(--nims-navy)', marginBottom: '1.25rem', fontWeight: 700 }}>
                Technological &amp; Diagnostic Infrastructure
              </h2>
              <div className="speciality-tech-grid">
                <div style={{ padding: '1.15rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #edf2f7' }}>
                  <div style={{ fontWeight: 700, color: 'var(--nims-navy)', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                    Modular Surgical Suites
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                    Equipped with laminar airflow, HEPA filtration, and advanced anesthetic workstations.
                  </div>
                </div>

                <div style={{ padding: '1.15rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #edf2f7' }}>
                  <div style={{ fontWeight: 700, color: 'var(--nims-navy)', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                    Integrated Diagnostic Imaging
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                    Instant PACS connectivity to 3T MRI, 128-Slice CT, digital X-rays, and pathology labs.
                  </div>
                </div>

                <div style={{ padding: '1.15rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #edf2f7' }}>
                  <div style={{ fontWeight: 700, color: 'var(--nims-navy)', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                    Critical Care Backup
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                    Dedicated post-op recovery bays, round-the-clock intensive care intensivists, and ECMO readiness.
                  </div>
                </div>
              </div>
            </div>

            {/* Department Doctors */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.45rem', color: 'var(--nims-navy)', margin: 0, fontWeight: 700 }}>
                  Specialists in {speciality.name}
                </h2>
                <span style={{ fontSize: '0.86rem', color: '#64748b' }}>
                  {departmentDoctors.length > 0 ? `${departmentDoctors.length} Faculty Doctors Available` : 'Senior Specialists on Call'}
                </span>
              </div>

              {departmentDoctors.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                  {departmentDoctors.map((doc) => (
                    <DoctorCard
                      key={doc.id}
                      doctor={doc}
                      onBook={(d) => onOpenBooking({ doctor: d || doc, speciality: speciality.id })}
                    />
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    padding: '1.75rem',
                    border: '1px solid #edf2f7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <h4 style={{ color: 'var(--nims-navy)', margin: '0 0 0.35rem 0', fontSize: '1.1rem' }}>
                      Senior Clinicians Available Daily
                    </h4>
                    <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>
                      OPD consultations for {speciality.name} are available Monday through Saturday.
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenBooking({ speciality: speciality.id })}
                    className="btn btn-primary"
                    style={{ padding: '0.65rem 1.4rem' }}
                  >
                    Book Consultation
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Sticky Booking & Exploration Sidebar */}
          <div className="speciality-sidebar">
            {/* Quick Booking Card */}
            <div className="speciality-card-box">
              <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.5rem', fontWeight: 700 }}>
                Consult Our Specialists
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                Schedule a priority OPD consultation with senior faculty clinicians of {speciality.name}.
              </p>

              <button
                onClick={() => onOpenBooking({ speciality: speciality.id })}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', marginBottom: '0.75rem' }}
              >
                <Calendar size={16} />
                <span>Book OPD Consultation</span>
              </button>

              <a
                href="tel:0141260500"
                className="btn btn-outline"
                style={{ width: '100%', padding: '0.8rem', fontSize: '0.9rem', justifyContent: 'center' }}
              >
                <PhoneCall size={16} />
                <span>Call 0141-260500</span>
              </a>

              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid #f1f5f9',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  fontSize: '0.82rem',
                  color: '#475569'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} color="var(--nims-orange)" />
                  <span>OPD: Mon - Sat (08:00 AM - 04:00 PM)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="var(--nims-navy)" />
                  <span>NIMS Hospital Campus, Delhi-Jaipur Highway</span>
                </div>
              </div>
            </div>

            {/* Other Specialities Explorer */}
            <div className="speciality-card-box">
              <h4 style={{ fontSize: '1.05rem', color: 'var(--nims-navy)', marginBottom: '1rem', fontWeight: 700 }}>
                Explore Other Specialities
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {otherSpecialities.map((other) => (
                  <Link
                    key={other.id}
                    to={`/specialities/${other.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      color: 'var(--color-text-primary)',
                      background: '#f8fafc',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      transition: 'all 0.18s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(35, 32, 33, 0.06)';
                      e.currentTarget.style.color = 'var(--nims-orange)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.color = 'var(--color-text-primary)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img
                        src={other.svgIcon}
                        alt={other.name}
                        style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                      />
                      <span>{other.name}</span>
                    </div>
                    <ChevronRight size={15} color="#94a3b8" />
                  </Link>
                ))}
              </div>

              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <Link
                  to="/specialities"
                  style={{
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: 'var(--nims-orange)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>View All 30+ Specialities</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
