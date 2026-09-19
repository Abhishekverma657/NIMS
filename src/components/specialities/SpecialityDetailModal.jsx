import React, { useEffect } from 'react';
import { X, CheckCircle2, UserCheck, Bed, Clock, PhoneCall, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

export default function SpecialityDetailModal({ speciality, onClose, onBook }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!speciality) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(3, 16, 36, 0.72)',
        backdropFilter: 'blur(8px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px -15px rgba(10, 47, 94, 0.3)',
          border: '1px solid #e2e8f0',
          position: 'relative',
          animation: 'fadeInUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Blue Gradient & Department Identity */}
        <div
          style={{
            background: 'linear-gradient(135deg, var(--nims-navy) 0%, var(--nims-navy-dark) 100%)',
            padding: '2rem 2rem 1.75rem',
            color: '#ffffff',
            position: 'relative',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Circular Blue Icon */}
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3281d2 0%, #16569e 100%)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              <img
                src={speciality.svgIcon}
                alt={speciality.name}
                style={{
                  width: '36px',
                  height: '36px',
                  filter: 'brightness(0) invert(1)',
                  objectFit: 'contain'
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                <span
                  style={{
                    background: 'var(--nims-orange)',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '0.2rem 0.65rem',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  {speciality.category}
                </span>
                {speciality.emergency && (
                  <span
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '0.2rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <span className="pulse-dot pulse-dot-orange" /> 24×7 Emergency Ready
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: '1.6rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>
                {speciality.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '2rem' }}>
          {/* Headline & Overview */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h4
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--nims-navy)',
                marginBottom: '0.5rem'
              }}
            >
              {speciality.headline || `Expert ${speciality.name} at NIMS Hospital`}
            </h4>
            <p
              style={{
                fontSize: '0.96rem',
                color: '#475569',
                lineHeight: 1.65,
                margin: 0
              }}
            >
              {speciality.description}
            </p>
          </div>

          {/* Quick Metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
              marginBottom: '1.75rem',
              background: '#f8fafc',
              padding: '1.2rem',
              borderRadius: '16px',
              border: '1px solid #eef2f6'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(10, 47, 94, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--nims-navy)'
                }}
              >
                <UserCheck size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--nims-navy)' }}>
                  {speciality.doctorsCount || 12}+
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Senior Specialists</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(244, 117, 33, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--nims-orange)'
                }}
              >
                <Bed size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--nims-navy)' }}>
                  {speciality.beds || 50}+
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Dedicated Inpatient Beds</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10b981'
                }}
              >
                <Clock size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>
                  24×7
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Trauma & Critical Care</div>
              </div>
            </div>
          </div>

          {/* Key Procedures & Treatments */}
          {speciality.procedures && speciality.procedures.length > 0 && (
            <div style={{ marginBottom: '1.75rem' }}>
              <h4
                style={{
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: 700,
                  color: 'var(--nims-navy)',
                  marginBottom: '0.85rem'
                }}
              >
                Specialized Clinical Offerings & Procedures
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '0.65rem'
                }}
              >
                {speciality.procedures.map((proc, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.88rem',
                      color: 'var(--color-text-primary)'
                    }}
                  >
                    <CheckCircle2 size={16} color="var(--nims-orange)" style={{ flexShrink: 0 }} />
                    <span style={{ fontWeight: 500 }}>{proc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OPD Info Banner */}
          <div
            style={{
              padding: '0.85rem 1.15rem',
              background: 'rgba(10, 47, 94, 0.04)',
              borderLeft: '4px solid var(--nims-orange)',
              borderRadius: '8px',
              fontSize: '0.86rem',
              color: '#475569',
              marginBottom: '2rem',
              lineHeight: 1.5
            }}
          >
            <strong>OPD Consultation Hours:</strong> Mon – Sat: 8:00 AM – 4:00 PM | Emergency & Trauma admissions open 24×7 without prior appointment.
          </div>

          {/* Modal Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
            <button
              onClick={() => {
                onClose();
                if (onBook) onBook();
              }}
              className="btn btn-primary"
              style={{
                flex: 1,
                minWidth: '220px',
                padding: '0.8rem 1.5rem',
                fontSize: '0.95rem'
              }}
            >
              <Calendar size={17} />
              <span>Book Appointment with Specialist</span>
              <ArrowRight size={16} />
            </button>

            <a
              href="tel:0141260500"
              className="btn btn-outline"
              style={{
                padding: '0.8rem 1.25rem',
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <PhoneCall size={16} />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
