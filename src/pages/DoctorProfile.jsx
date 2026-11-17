import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, 
  Award, PhoneCall, Share2, Check, Stethoscope, 
  GraduationCap, ChevronRight, IndianRupee, Video, Sparkles,
  Building2, Globe, HeartPulse, Shield, HelpCircle,
  Linkedin, Youtube, Facebook, Instagram
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useDoctors } from '../context/DoctorContext';
import { getDoctorSlug } from '../utils/doctorSlug';

export default function DoctorProfile({ onOpenBooking }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctors, getDoctor, fetchDoctor } = useDoctors();
  const [profileDoctor, setProfileDoctor] = useState(() => getDoctor(id));
  const [isLoading, setIsLoading] = useState(!profileDoctor);
  const [copySuccess, setCopySuccess] = useState(false);

  const syncedSlugRef = useRef(null);

  // 1. Sync from context doctors cache as soon as doctors data loads or id changes
  useEffect(() => {
    const cached = getDoctor(id);
    if (cached) {
      setProfileDoctor(cached);
      setIsLoading(false);
    }
  }, [id, doctors, getDoctor]);

  // 2. Always fetch authoritative fresh profile from API
  useEffect(() => {
    let isMounted = true;

    fetchDoctor(id)
      .then((freshDoc) => {
        if (isMounted && freshDoc) {
          setProfileDoctor(freshDoc);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id, fetchDoctor]);

  // Sync URL slug cleanly once per doctor without causing scroll reset
  useEffect(() => {
    if (profileDoctor) {
      const canonicalSlug = getDoctorSlug(profileDoctor);
      if (canonicalSlug && id !== canonicalSlug && syncedSlugRef.current !== canonicalSlug) {
        syncedSlugRef.current = canonicalSlug;
        window.history.replaceState(null, '', `/doctor/${canonicalSlug}`);
      }
      document.title = `${profileDoctor.name} - ${profileDoctor.department || 'Specialist'} | NIMS Hospital Jaipur`;
    }
  }, [profileDoctor, id]);

  const doctor = profileDoctor;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${doctor?.name} | NIMS Hospital`,
        text: `Consult with ${doctor?.name} (${doctor?.title || doctor?.department}) at NIMS Super Speciality Hospital, Jaipur.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2400);
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '10rem 1rem', minHeight: '60vh', background: '#f8fafc' }}>
        <div 
          style={{ 
            width: '42px', 
            height: '42px', 
            margin: '0 auto 1.25rem', 
            border: '3px solid #e2e8f0', 
            borderTop: '3px solid var(--nims-orange, #bd171c)', 
            borderRadius: '50%', 
            animation: 'spin 0.8s linear infinite' 
          }} 
        />
        <p style={{ color: 'var(--nims-navy, #172a34)', fontSize: '1.05rem', fontWeight: 600 }}>
          Loading Doctor Profile...
        </p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div style={{ textAlign: 'center', padding: '8rem 1.5rem', minHeight: '60vh', background: '#f8fafc' }}>
        <h2 style={{ color: 'var(--nims-navy, #172a34)', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          Doctor Profile Not Found
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          We could not locate the doctor profile you are searching for.
        </p>
        <button 
          className="btn btn-primary" 
          onClick={() => navigate(-1)} 
          style={{ padding: '0.65rem 1.5rem' }}
        >
          Go Back
        </button>
      </div>
    );
  }

  // Doctor image resolution
  const isDummyImage = !doctor.image || 
    doctor.image.includes('unsplash') || 
    doctor.image.includes('male-doc') || 
    doctor.image.includes('female-doc');
  const imageSrc = isDummyImage ? '/assets/icons/doctor-placeholder.svg' : doctor.image;
  const isPlaceholder = imageSrc.includes('doctor-placeholder.svg');

  // Days order for weekly schedule display
  const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayFullNames = {
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday',
    Sun: 'Sunday'
  };

  const weeklySchedule = Array.isArray(doctor.weeklySchedule) && doctor.weeklySchedule.length > 0
    ? [...doctor.weeklySchedule].sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day))
    : null;

  const activeScheduleDays = weeklySchedule 
    ? weeklySchedule.filter(s => s.isAvailable)
    : [];

  const formattedActiveDays = activeScheduleDays.length > 0
    ? (() => {
        const days = activeScheduleDays.map(s => s.day);
        if (days.length === 6 && !days.includes('Sun')) return 'Monday to Saturday';
        if (days.length === 7) return 'All 7 Days (Mon - Sun)';
        if (days.length === 1) return dayFullNames[days[0]] || days[0];
        if (days.length === 2) return `${dayFullNames[days[0]] || days[0]} & ${dayFullNames[days[1]] || days[1]}`;
        const names = days.map(d => dayFullNames[d] || d);
        return `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}`;
      })()
    : (doctor.opdOfflineHours || doctor.opdSchedule || 'Monday to Saturday');

  // 1. Raw and parsed Education / Degrees from Admin
  const rawEducation = (doctor.education || doctor.qualification || doctor.heroQualification || doctor.rawBackendData?.education || '').trim();
  const parsedDegrees = rawEducation
    ? rawEducation.split(/[|;,\n]+/).map(d => d.trim()).filter(Boolean)
    : [];

  // 2. Bios from Admin
  const shortBioText = (doctor.shortBio || doctor.shortDescription || doctor.rawBackendData?.shortBio || doctor.rawBackendData?.shortDescription || '').trim();
  const longBioText = (doctor.longBio || doctor.longDescription || doctor.about || doctor.rawBackendData?.longBio || doctor.rawBackendData?.longDescription || '').trim();
  const displayBio = longBioText || `${doctor.name} serves as ${doctor.designation || 'Consultant Specialist'} in the Department of ${doctor.department || 'Clinical Medicine'} at NIMS Super Speciality Hospital, Jaipur. Available for in-person outpatient clinical evaluations and specialized patient consultations.`;

  // 3. Highlights & Bullet Points from Admin
  const rawHighlights = [
    ...(Array.isArray(doctor.highlights) ? doctor.highlights : []),
    ...(Array.isArray(doctor.bulletPoints) ? doctor.bulletPoints : []),
    ...(Array.isArray(doctor.rawBackendData?.highlights) ? doctor.rawBackendData.highlights : []),
    ...(Array.isArray(doctor.rawBackendData?.bulletPoints) ? doctor.rawBackendData.bulletPoints : []),
    doctor.rawBackendData?.bulletPoint1,
    doctor.rawBackendData?.bulletPoint2,
    doctor.rawBackendData?.bulletPoint3,
    doctor.rawBackendData?.bulletPoint4,
    doctor.rawBackendData?.bulletPoint5,
    doctor.rawBackendData?.bulletPoint6,
  ];
  const allHighlights = Array.from(new Set(rawHighlights.map(h => typeof h === 'string' ? h.trim() : '').filter(Boolean)));

  // 4. Specialization & Clinical Focus from Admin
  const rawSpec = (doctor.specialization || doctor.spec || doctor.rawBackendData?.specialization || doctor.rawBackendData?.spec || '').trim();
  const expertiseList = (Array.isArray(doctor.expertise) && doctor.expertise.length > 0)
    ? doctor.expertise
    : (rawSpec ? rawSpec.split(/[,;\n]+/).map(s => s.trim()).filter(Boolean) : []);

  // 5. Real Chamber / Room / Block / Floor from Admin
  const room = (doctor.room || doctor.roomNo || doctor.rawBackendData?.room || '').trim();
  const block = (doctor.block || doctor.rawBackendData?.block || '').trim();
  const floor = (doctor.floor || doctor.rawBackendData?.floor || '').trim();
  const sittingLocation = (doctor.sittingLocation || doctor.rawBackendData?.sittingLocation || '').trim();
  const locationString = sittingLocation || [room && `Cabin: ${room}`, floor, block].filter(Boolean).join(', ') || 'NIMS Super Speciality Hospital, Jaipur';

  // 6. Social Links from Admin
  const socialLinks = doctor.socialLinks || doctor.rawBackendData?.socialLinks || {};
  const hasSocial = Boolean(socialLinks.linkedin || socialLinks.youtube || socialLinks.facebook || socialLinks.instagram);

  // Active OPD days string from schedule or opdOfflineHours
  const opdDaysSummary = formattedActiveDays;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* =========================================================================
          HERO BANNER: EXECUTIVE HOSPITAL BRANDING (NAVY & GOLD ACCENTS)
         ========================================================================= */}
      <section 
        style={{ 
          background: 'linear-gradient(135deg, #0f232e 0%, #172a34 55%, #1f3d4e 100%)', 
          color: '#ffffff', 
          padding: '2.5rem 0 3.25rem',
          position: 'relative',
          borderBottom: '4px solid var(--nims-orange, #bd171c)'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          
          {/* Top Breadcrumbs & Utility Bar inside Hero */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
            
            {/* Breadcrumb pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.84rem', color: '#94a3b8' }}>
              <Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none' }} onMouseOver={e => e.target.style.color = '#ffffff'} onMouseOut={e => e.target.style.color = '#cbd5e1'}>
                Home
              </Link>
              <ChevronRight size={13} color="#64748b" />
              <Link to="/specialities" style={{ color: '#cbd5e1', textDecoration: 'none' }} onMouseOver={e => e.target.style.color = '#ffffff'} onMouseOut={e => e.target.style.color = '#cbd5e1'}>
                Doctors
              </Link>
              {doctor.department && (
                <>
                  <ChevronRight size={13} color="#64748b" />
                  <span style={{ color: '#cbd5e1' }}>{doctor.department}</span>
                </>
              )}
              <ChevronRight size={13} color="#64748b" />
              <span style={{ color: 'var(--nims-gold, #e5b64a)', fontWeight: 600 }}>
                {doctor.name}
              </span>
            </div>

            {/* Back, Share & Call Hotline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <button
                onClick={() => navigate(-1)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  padding: '0.35rem 0.8rem',
                  borderRadius: '6px'
                }}
              >
                <ArrowLeft size={14} /> Back
              </button>

              <button
                onClick={handleShare}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  padding: '0.35rem 0.8rem',
                  borderRadius: '6px'
                }}
              >
                {copySuccess ? <Check size={14} color="#4ade80" /> : <Share2 size={14} />}
                <span>{copySuccess ? 'Copied' : 'Share'}</span>
              </button>

              <a
                href="tel:0141-2388999"
                style={{
                  background: 'var(--nims-orange, #bd171c)',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  padding: '0.35rem 0.85rem',
                  borderRadius: '6px'
                }}
              >
                <PhoneCall size={14} />
                <span>0141-23 88 999</span>
              </a>
            </div>

          </div>

          {/* Hero Profile Identity Row */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'clamp(1.5rem, 3vw, 2.75rem)', 
              flexWrap: 'wrap' 
            }}
          >
            
            {/* Doctor Photo Card (Prominent Executive Portrait) */}
            <div 
              style={{ 
                position: 'relative', 
                width: 'clamp(235px, 25vw, 280px)', 
                height: 'clamp(285px, 30vw, 340px)', 
                borderRadius: '22px', 
                overflow: 'hidden', 
                background: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)', 
                border: '4px solid rgba(255, 255, 255, 0.95)',
                boxShadow: '0 24px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2)',
                flexShrink: 0
              }}
            >
              {/* Verified Specialist Tag (Compact Minimal Pill at top) */}
              <div 
                style={{ 
                  position: 'absolute', 
                  top: '8px', 
                  right: '8px', 
                  zIndex: 2,
                  background: 'rgba(15, 35, 46, 0.82)', 
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  border: '1px solid rgba(229, 182, 74, 0.35)', 
                  color: 'var(--nims-gold, #e5b64a)', 
                  padding: '2px 7px', 
                  borderRadius: '4px', 
                  fontSize: '0.62rem', 
                  fontWeight: 700, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '3px', 
                  letterSpacing: '0.02em' 
                }}
              >
                <ShieldCheck size={10} color="var(--nims-gold, #e5b64a)" /> Verified
              </div>

              <img 
                src={imageSrc} 
                alt={doctor.name} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: isPlaceholder ? 'contain' : 'cover', 
                  objectPosition: 'top center',
                  padding: isPlaceholder ? '32px 24px 0' : '0'
                }} 
                onError={(e) => {
                  e.currentTarget.src = "/assets/icons/doctor-placeholder.svg";
                  e.currentTarget.style.objectFit = 'contain';
                  e.currentTarget.style.padding = '32px 24px 0';
                }}
              />
            </div>

            {/* Doctor Name, Designation, and Key Metadata */}
            <div style={{ flex: '1 1 420px', minWidth: 0 }}>
              
              {/* Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                {doctor.department && (
                  <span 
                    style={{ 
                      background: 'rgba(229, 182, 74, 0.22)', 
                      color: 'var(--nims-gold, #e5b64a)', 
                      border: '1px solid rgba(229, 182, 74, 0.45)',
                      padding: '0.3rem 0.85rem', 
                      borderRadius: '50px', 
                      fontSize: '0.78rem', 
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {doctor.department}
                  </span>
                )}

                {(doctor.heroDesignation || doctor.designation || doctor.title) && (
                  <span 
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.14)', 
                      color: '#ffffff', 
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      padding: '0.3rem 0.85rem', 
                      borderRadius: '50px', 
                      fontSize: '0.78rem', 
                      fontWeight: 700 
                    }}
                  >
                    {doctor.heroDesignation || doctor.designation || doctor.title}
                  </span>
                )}

                {doctor.doctorId && (
                  <span 
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.08)', 
                      color: '#94a3b8', 
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      padding: '0.3rem 0.75rem', 
                      borderRadius: '50px', 
                      fontSize: '0.74rem', 
                      fontWeight: 600 
                    }}
                  >
                    ID: {doctor.doctorId}
                  </span>
                )}
              </div>

              {/* Doctor Name */}
              <h1 
                style={{ 
                  fontSize: 'clamp(2.1rem, 3.2vw, 2.85rem)', 
                  fontWeight: 800, 
                  color: '#ffffff', 
                  margin: '0 0 0.45rem 0', 
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em'
                }}
              >
                {doctor.name}
              </h1>

              {/* Qualifications / Subtitle */}
              {(doctor.education || doctor.heroQualification || doctor.qualification) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '1.02rem', fontWeight: 600, margin: '0 0 0.65rem 0' }}>
                  <GraduationCap size={18} color="var(--nims-gold, #e5b64a)" />
                  <span>{doctor.education || doctor.heroQualification || doctor.qualification}</span>
                </div>
              )}

              {/* Specialization / Sub-department Focus */}
              {(doctor.specialization || doctor.spec) && (
                <p style={{ color: '#94a3b8', fontSize: '0.94rem', margin: '0 0 0.95rem 0', lineHeight: 1.5 }}>
                  {doctor.specialization || doctor.spec}
                </p>
              )}

              {/* High-Impact Quick Facts Strip */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.85rem' }}>
                
                {doctor.fee != null && Number(doctor.fee) > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(255, 255, 255, 0.09)', border: '1px solid rgba(255, 255, 255, 0.12)', padding: '0.4rem 0.85rem', borderRadius: '8px', fontSize: '0.86rem' }}>
                    <IndianRupee size={15} color="#4ade80" />
                    <span>OPD Fee: <b style={{ color: '#4ade80' }}>₹{doctor.fee}</b></span>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(255, 255, 255, 0.09)', border: '1px solid rgba(255, 255, 255, 0.12)', padding: '0.4rem 0.85rem', borderRadius: '8px', fontSize: '0.86rem', color: '#e2e8f0' }}>
                  <Calendar size={15} color="var(--nims-gold, #e5b64a)" />
                  <span>Days: <b>{formattedActiveDays}</b></span>
                </div>

                {(doctor.room || doctor.sittingLocation || doctor.block) && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(255, 255, 255, 0.09)', border: '1px solid rgba(255, 255, 255, 0.12)', padding: '0.4rem 0.85rem', borderRadius: '8px', fontSize: '0.86rem', color: '#e2e8f0' }}>
                    <MapPin size={15} color="#93c5fd" />
                    <span>Location: <b>{doctor.room || doctor.sittingLocation || doctor.block}</b></span>
                  </div>
                )}

                {doctor.languages && doctor.languages.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(255, 255, 255, 0.09)', border: '1px solid rgba(255, 255, 255, 0.12)', padding: '0.4rem 0.85rem', borderRadius: '8px', fontSize: '0.86rem', color: '#cbd5e1' }}>
                    <Globe size={15} color="#cbd5e1" />
                    <span>Languages: <b>{doctor.languages.join(', ')}</b></span>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          MAIN 2-COLUMN BALANCED WORKSPACE (65% CONTENT | 35% CONSULTATION CARD)
         ========================================================================= */}
      <div style={{ maxWidth: '1200px', margin: '2.5rem auto 0', padding: '0 1.5rem' }}>
        <div className="doctor-profile-layout">
          
          {/* =====================================================================
              LEFT / MAIN COLUMN (65% on desktop): Clinical Profile, Schedule & Info
             ===================================================================== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* 1. Doctor Overview & Clinical Biography */}
            <div 
              style={{ 
                background: '#ffffff', 
                borderRadius: '16px', 
                padding: '1.75rem', 
                border: '1px solid #e8ecf1', 
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(23, 42, 52, 0.08)', color: 'var(--nims-navy, #172a34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Stethoscope size={20} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nims-navy, #172a34)', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Doctor Overview &amp; Biography
                  </h2>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    Clinical Profile &amp; Hospital Role
                  </span>
                </div>
              </div>

              {shortBioText && (
                <div 
                  style={{ 
                    padding: '1rem 1.25rem', 
                    background: '#f8fafc', 
                    borderLeft: '4px solid var(--nims-orange, #bd171c)', 
                    borderRadius: '6px', 
                    color: '#1e293b', 
                    fontSize: '1rem', 
                    lineHeight: 1.6,
                    marginBottom: '1.25rem',
                    fontStyle: 'italic',
                    fontWeight: 500
                  }}
                >
                  "{shortBioText}"
                </div>
              )}

              <div style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
                {displayBio}
              </div>
            </div>

            {/* 2. Key Highlights & Bullet Points from Admin */}
            {allHighlights.length > 0 && (
              <div 
                style={{ 
                  background: '#ffffff', 
                  borderRadius: '16px', 
                  padding: '1.75rem', 
                  border: '1px solid #e8ecf1', 
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(9, 86, 151, 0.08)', color: '#095697', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award size={20} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nims-navy, #172a34)', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Key Highlights &amp; Accomplishments
                    </h2>
                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      Clinical Distinctions, Fellowships &amp; Hospital Achievements
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {allHighlights.map((hl, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '0.75rem', 
                        padding: '1rem 1.15rem', 
                        background: '#f8fafc', 
                        border: '1px solid #e8ecf1', 
                        borderRadius: '10px',
                        borderLeft: '4px solid #095697' 
                      }}
                    >
                      <CheckCircle2 size={18} color="#095697" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.98rem', color: '#1e293b', fontWeight: 600, lineHeight: 1.5 }}>
                        {hl}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Academic Qualifications & Degrees from Admin */}
            {(parsedDegrees.length > 0 || rawEducation) && (
              <div 
                style={{ 
                  background: '#ffffff', 
                  borderRadius: '16px', 
                  padding: '1.75rem', 
                  border: '1px solid #e8ecf1', 
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(189, 23, 28, 0.08)', color: 'var(--nims-orange, #bd171c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nims-navy, #172a34)', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Academic Qualifications &amp; Education
                    </h2>
                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      Degrees, Certifications &amp; Medical Training
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                  {parsedDegrees.length > 0 ? (
                    parsedDegrees.map((deg, idx) => (
                      <div 
                        key={idx} 
                        style={{ 
                          padding: '1rem 1.25rem', 
                          background: '#f8fafc', 
                          border: '1px solid #e8ecf1', 
                          borderRadius: '10px', 
                          borderLeft: '4px solid var(--nims-orange, #bd171c)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem'
                        }}
                      >
                        <CheckCircle2 size={18} color="var(--nims-orange, #bd171c)" style={{ flexShrink: 0 }} />
                        <div>
                          <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.98rem' }}>{deg}</div>
                          <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '2px' }}>Verified Medical Credential</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '0.9rem 1.15rem', background: '#f8fafc', borderRadius: '8px', color: '#334155', fontWeight: 600 }}>
                      {rawEducation}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 4. Clinical Specialization & Focus Areas from Admin */}
            {(expertiseList.length > 0 || rawSpec) && (
              <div 
                style={{ 
                  background: '#ffffff', 
                  borderRadius: '16px', 
                  padding: '1.75rem', 
                  border: '1px solid #e8ecf1', 
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(22, 163, 74, 0.08)', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <HeartPulse size={20} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nims-navy, #172a34)', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Clinical Specialization &amp; Expertise
                    </h2>
                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      Key Procedures, Conditions Treated &amp; Clinical Focus
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                  {expertiseList.length > 0 ? (
                    expertiseList.map((exp, idx) => (
                      <div 
                        key={idx} 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          gap: '0.65rem', 
                          padding: '0.85rem 1rem', 
                          background: '#f8fafc', 
                          borderRadius: '8px', 
                          border: '1px solid #edf2f7',
                          fontSize: '0.94rem',
                          color: '#334155',
                          fontWeight: 600
                        }}
                      >
                        <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '3px' }} strokeWidth={2.5} />
                        <span>{exp}</span>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '0.85rem 1rem', background: '#f8fafc', borderRadius: '8px', color: '#334155', fontSize: '0.95rem' }}>
                      {rawSpec}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 5. Hospital Chamber & Practice Location from Admin */}
            <div 
              style={{ 
                background: '#ffffff', 
                borderRadius: '16px', 
                padding: '1.75rem', 
                border: '1px solid #e8ecf1', 
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(23, 42, 52, 0.08)', color: 'var(--nims-navy, #172a34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={20} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nims-navy, #172a34)', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Hospital Chamber &amp; Practice Location
                  </h2>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    NIMS Super Speciality Hospital, Jaipur
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
                {room && (
                  <div style={{ padding: '0.9rem 1.1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Chamber / Cabin</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--nims-navy, #172a34)', marginTop: '2px' }}>{room}</div>
                  </div>
                )}
                {floor && (
                  <div style={{ padding: '0.9rem 1.1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Floor</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--nims-navy, #172a34)', marginTop: '2px' }}>{floor}</div>
                  </div>
                )}
                {block && (
                  <div style={{ padding: '0.9rem 1.1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Hospital Block</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--nims-navy, #172a34)', marginTop: '2px' }}>{block}</div>
                  </div>
                )}
                <div style={{ padding: '0.9rem 1.1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>OPD Consultation</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nims-orange, #bd171c)', marginTop: '2px' }}>{formattedActiveDays}</div>
                </div>
              </div>

              {sittingLocation && (
                <div style={{ marginTop: '1rem', padding: '0.85rem 1rem', background: '#f1f5f9', borderRadius: '8px', fontSize: '0.88rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} color="var(--nims-navy, #172a34)" style={{ flexShrink: 0 }} />
                  <span><strong>Chamber Note:</strong> {sittingLocation}</span>
                </div>
              )}
            </div>

            {/* 6. Official Verified Profiles / Social Links from Admin */}
            {hasSocial && (
              <div 
                style={{ 
                  background: '#ffffff', 
                  borderRadius: '16px', 
                  padding: '1.5rem 1.75rem', 
                  border: '1px solid #e8ecf1', 
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  flexWrap: 'wrap', 
                  gap: '1rem' 
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--nims-navy, #172a34)', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Official Professional Profiles
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    Connect with Dr. {doctor.name} on verified channels
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  {socialLinks.linkedin && (
                    <a 
                      href={socialLinks.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      title="LinkedIn Profile"
                      style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#0a66c2', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'transform 0.15s ease' }}
                      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                  {socialLinks.youtube && (
                    <a 
                      href={socialLinks.youtube} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      title="YouTube Channel"
                      style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#ff0000', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'transform 0.15s ease' }}
                      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Youtube size={18} />
                    </a>
                  )}
                  {socialLinks.facebook && (
                    <a 
                      href={socialLinks.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      title="Facebook Profile"
                      style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#1877f2', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'transform 0.15s ease' }}
                      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Facebook size={18} />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a 
                      href={socialLinks.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      title="Instagram Profile"
                      style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'transform 0.15s ease' }}
                      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Instagram size={18} />
                    </a>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* =====================================================================
              RIGHT COLUMN (35% on desktop): Sticky OPD Booking & Consultation Card
             ===================================================================== */}
          <div className="doctor-sticky-booking-sidebar">
            
            <div 
              style={{ 
                background: '#ffffff', 
                borderRadius: '16px', 
                padding: '1.65rem', 
                border: '1px solid #e8ecf1', 
                boxShadow: '0 8px 24px rgba(23, 42, 52, 0.06)' 
              }}
            >
              <div style={{ paddingBottom: '1rem', borderBottom: '1px solid #edf2f7', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--nims-orange, #bd171c)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Official OPD Consultation
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--nims-navy, #172a34)', margin: '0.25rem 0 0 0' }}>
                  Book an Appointment
                </h3>
              </div>

              {/* Consultation Fee Callout */}
              {doctor.fee != null && Number(doctor.fee) > 0 && (
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0.85rem 1rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.86rem', color: '#166534', fontWeight: 600 }}>OPD Consultation Fee</span>
                  <span style={{ fontSize: '1.35rem', color: '#15803d', fontWeight: 800 }}>₹{doctor.fee}</span>
                </div>
              )}

              {/* Key Specs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <Clock size={16} color="var(--nims-orange, #bd171c)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.86rem', color: '#334155' }}>
                    <div style={{ fontWeight: 700, color: 'var(--nims-navy, #172a34)' }}>OPD Schedule</div>
                    <div>{opdDaysSummary}</div>
                  </div>
                </div>

                {doctor.opdOnlineHours && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <Video size={16} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '0.86rem', color: '#334155' }}>
                      <div style={{ fontWeight: 700, color: 'var(--nims-navy, #172a34)' }}>Online Consultation</div>
                      <div>{doctor.opdOnlineHours}</div>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <MapPin size={16} color="var(--nims-navy, #172a34)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.86rem', color: '#334155' }}>
                    <div style={{ fontWeight: 700, color: 'var(--nims-navy, #172a34)' }}>Chamber / Location</div>
                    <div>{locationString}</div>
                  </div>
                </div>

              </div>

              {/* Main Booking Action */}
              {doctor.isOpdAvailable !== false ? (
                <motion.button
                  onClick={() => onOpenBooking(doctor)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, var(--nims-orange, #bd171c) 0%, #9e1217 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.95rem 1.25rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.55rem',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(189, 23, 28, 0.28)'
                  }}
                >
                  <Calendar size={18} />
                  Book Appointment Now
                </motion.button>
              ) : (
                <div style={{ padding: '0.8rem', background: '#f1f5f9', borderRadius: '10px', textAlign: 'center', color: '#64748b', fontSize: '0.88rem', fontWeight: 600 }}>
                  Consultation by Prior Direct Request Only
                </div>
              )}

              {/* Quick Helpline Button */}
              <a
                href="tel:0141-2388999"
                style={{
                  width: '100%',
                  marginTop: '0.75rem',
                  background: '#ffffff',
                  color: 'var(--nims-navy, #172a34)',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = 'var(--nims-navy, #172a34)';
                  e.currentTarget.style.background = '#f8fafc';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.background = '#ffffff';
                }}
              >
                <PhoneCall size={15} color="var(--nims-orange, #bd171c)" />
                <span>Call Helpline: 0141-23 88 999</span>
              </a>

              {/* Cashless Schemes Accepted */}
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px dashed #e2e8f0', fontSize: '0.78rem', color: '#15803d', lineHeight: 1.5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  <ShieldCheck size={14} color="#16a34a" /> Cashless Empanelment
                </div>
                <div style={{ color: '#64748b' }}>
                  Ayushman Bharat (AB-PMJAY), RGHS, CGHS, and all major Private Insurance TPAs accepted.
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* =========================================================================
          MOBILE FLOATING STICKY ACTION BAR
         ========================================================================= */}
      {doctor.isOpdAvailable !== false && (
        <div className="doctor-floating-mobile-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
            <img
              src={imageSrc}
              alt={doctor.name}
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #e2e8f0' }}
            />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--nims-navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {doctor.name}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700 }}>
                {doctor.fee ? `Fee: ₹${doctor.fee}` : 'OPD Available'}
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenBooking(doctor)}
            className="btn btn-primary"
            style={{ padding: '0.65rem 1.15rem', fontSize: '0.88rem', whiteSpace: 'nowrap', borderRadius: '8px', flexShrink: 0 }}
          >
            <Calendar size={14} style={{ marginRight: '4px' }} /> Book OPD
          </button>
        </div>
      )}

    </div>
  );
}
