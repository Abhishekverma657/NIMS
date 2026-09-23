import React from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  PhoneCall,
  ChevronRight,
  Clock,
  HeartPulse,
  ArrowRight
} from 'lucide-react';

export default function LoyaltyCard({ onOpenBooking }) {
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

  // The 8 Official Empaneled Schemes using exact images from public/assets/images/clients/
  const officialSchemes = [
    {
      id: 'rghs',
      name: 'RGHS',
      fullName: 'Rajasthan Government Health Scheme',
      logo: '/assets/images/clients/rghs.webp',
      category: 'State Government',
      coverage: 'Complete Cashless IPD, OPD & Diagnostics',
      eligibility: 'Serving Rajasthan government employees, MLAs, and pensioners',
      documents: ['RGHS E-Card / Jan Aadhaar', 'Government Employee ID', 'Aadhaar Card'],
      description: 'Comprehensive cashless medical facility covering outdoor patient consultations, medicines from empaneled pharmacies, and indoor hospital treatments with zero out-of-pocket expenses.'
    },
    {
      id: 'maa-yojana',
      name: 'MAA YOJANA',
      fullName: 'Mukhyamantri Ayushman Arogya Yojana',
      logo: '/assets/images/clients/Maa-yojana-CKS-2.png',
      category: 'Rajasthan Universal Scheme',
      coverage: 'Up to ₹25 Lakh Critical Health Protection',
      eligibility: 'All resident families of Rajasthan registered under Jan Aadhaar',
      documents: ['Jan Aadhaar Card', 'Ration Card', 'Patient Aadhaar Card'],
      description: 'Rajasthan government flagship universal healthcare scheme providing cashless coverage up to ₹25 lakhs per family per year for major tertiary surgeries, heart care, neurosurgery, and oncology.'
    },
    {
      id: 'ayushman-bharat',
      name: 'AYUSHMAN BHARAT',
      fullName: 'Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
      logo: '/assets/images/clients/Ayushman-Bharat-Logo.webp',
      category: 'Central Government',
      coverage: '₹5 Lakh Cashless Family Cover / Year',
      eligibility: 'Identified eligible families as per SECC census & PM-JAY cards',
      documents: ['Ayushman Golden Card / PM-JAY Letter', 'Aadhaar Card'],
      description: 'Worlds largest government-funded healthcare program offering up to ₹5,00,000 per family per year for secondary and tertiary care hospitalization across NIMS Super Specialities.'
    },
    {
      id: 'capf',
      name: 'CAPF',
      fullName: 'Central Armed Police Forces Healthcare',
      logo: '/assets/images/clients/capf-1_11zon-150x150.webp',
      category: 'Paramilitary Services',
      coverage: '100% Cashless Quaternary Treatment',
      eligibility: 'Serving & retired personnel of BSF, CRPF, CISF, ITBP, SSB, and dependents',
      documents: ['CAPF Health Card', 'Force Identity Card', 'Referral / Permission Slip'],
      description: 'Cashless medical treatment for central armed police personnel and their families across advanced surgical, orthopedic, cardiac, and trauma specialties at NIMS Hospital.'
    },
    {
      id: 'cghs',
      name: 'CGHS',
      fullName: 'Central Government Health Scheme',
      logo: '/assets/images/clients/5-1-1_11zon.webp',
      category: 'Central Government',
      coverage: 'Comprehensive Cashless Hospitalization',
      eligibility: 'Central government civil employees, pensioners, and eligible dependents',
      documents: ['CGHS Plastic Card', 'Permission / Referral Letter', 'Valid Photo ID'],
      description: 'Empaneled quaternary clinical care for Central Government employees and pensioners in accordance with official CGHS reimbursement rates and seamless cashless admissions.'
    },
    {
      id: 'indian-railways',
      name: 'INDIAN RAILWAYS',
      fullName: 'North Western Railway Empaneled Care',
      logo: '/assets/images/clients/indian-railways-logo.webp',
      category: 'Railways Medical Card',
      coverage: 'Emergency & Quaternary Surgeries',
      eligibility: 'Serving and retired Railway employees with UMID Card',
      documents: ['UMID Card (Unique Medical ID)', 'Railway Hospital Referral Letter', 'Service ID'],
      description: 'Tie-up with Indian Railways providing specialized surgical interventions, cardiac cath lab procedures, and multi-organ care for railway families on immediate referral.'
    },
    {
      id: 'esic',
      name: 'ESIC',
      fullName: "Employees' State Insurance Corporation",
      logo: '/assets/images/clients/esic-logo.webp',
      category: 'Social Security',
      coverage: 'Super Speciality Treatment (SST)',
      eligibility: 'Insured Persons (IP) and family members registered under ESIC',
      documents: ['ESIC Pehchan Card', 'Branch Office / Dispensary Referral', 'Aadhaar Card'],
      description: 'Advanced secondary and tertiary healthcare for industrial and corporate workforce covered under ESI Act, backed by computerized online eligibility verification.'
    },
    {
      id: 'echs',
      name: 'ECHS',
      fullName: 'Ex-Servicemen Contributory Health Scheme',
      logo: '/assets/images/clients/logo1-1_11zon.webp',
      category: 'Defense Veterans',
      coverage: 'Complete Cashless Defense Care',
      eligibility: 'Ex-Servicemen pensioners of Indian Army, Navy, Air Force and dependents',
      documents: ['ECHS Smart Card (64 KB)', 'Polyclinic Referral Slip', 'Discharge Book Copy'],
      description: 'Dedicated veteran healthcare desk ensuring prompt cashless inpatient treatments, ICU stays, and joint replacements for proud veterans of the Indian Armed Forces.'
    }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Dynamic Page Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--nims-navy) 0%, var(--nims-navy-dark) 100%)',
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
              color: '#94a3b8',
              marginBottom: '1.25rem'
            }}
          >
            <span>HOME</span>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--nims-orange)', fontWeight: 600 }}>HEALTHCARE BENEFIT SCHEMES</span>
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
            Government Healthcare Schemes
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

          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '720px', lineHeight: 1.6, margin: 0 }}>
            NIMS Hospital is linked with all central and state government healthcare schemes. We understand that financial concerns can add stress during treatment, and we ensure our patients receive the best care without financial hardship.
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
                  boxShadow: '0 20px 40px rgba(10, 47, 94, 0.12)',
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
          <div className="section-header" style={{ maxWidth: '820px' }}>
            <span className="section-subtitle">Cashless Treatment Tie-Ups</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', color: 'var(--nims-navy)' }}>
              Choose The Right Healthcare Benefit Scheme<br />For The Treatment
            </h2>
            <p style={{ fontSize: '1.02rem', color: '#64748b', lineHeight: 1.65 }}>
              NIMS Hospital is linked with all central and state government healthcare schemes. We understand that financial concerns can add stress during treatment and the burden of healthcare expenses. We ensure that our patients receive the best possible care without worrying about their financial state.
            </p>
          </div>

          {/* 8 Official Scheme Cards Grid with Authentic Client Logos (Matching nimshospitals.in/loyalty-card.php) */}
          <div className="scheme-grid" style={{ marginBottom: '3.5rem' }}>
            {officialSchemes.map((scheme) => (
              <div key={scheme.id} className="scheme-card">
                <div className="scheme-logo-wrap">
                  <img
                    src={scheme.logo}
                    alt={scheme.name}
                    loading="lazy"
                  />
                </div>
                <div className="scheme-name-bar">
                  <span>{scheme.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Cashless TPA Helpdesk Information Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0a2f5e 0%, #071f3d 100%)',
              color: '#ffffff',
              borderRadius: '24px',
              padding: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2rem',
              boxShadow: '0 12px 36px rgba(10, 47, 94, 0.18)'
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(244, 117, 33, 0.25)', color: 'var(--nims-orange)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                <ShieldCheck size={15} />
                <span>24×7 Central Cashless TPA Desk</span>
              </div>
              <h3 style={{ fontSize: '1.55rem', color: '#ffffff', margin: '0 0 0.5rem 0', fontWeight: 800 }}>
                Need Assistance With Your Health Scheme?
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

    </div>
  );
}
