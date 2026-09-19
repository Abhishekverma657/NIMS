import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronRight,
  HeartPulse,
  Users,
  Building2,
  Clock,
  Target,
  Eye,
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  PhoneCall,
  Sparkles,
  X,
  ArrowRight,
  GraduationCap,
  Globe2,
  Stethoscope,
  Medal,
  Microscope,
  Activity,
  Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MotionFadeIn, MotionStagger, MotionItem } from '../components/motion/MotionWrapper';

export default function About({ onOpenBooking, initialTab = 'overview' }) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeVmCard, setActiveVmCard] = useState('mission');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [counters, setCounters] = useState({ beds: 0, doctors: 0, specialities: 0 });

  // Update tab based on route or prop
  useEffect(() => {
    if (location.pathname.includes('founder')) {
      setActiveTab('founder');
      const el = document.getElementById('founder-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname.includes('purpose')) {
      setActiveTab('purpose');
      const el = document.getElementById('vision-mission-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.pathname]);

  // Stats counting animation
  useEffect(() => {
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounters({
        beds: Math.floor(easeOut * 3400),
        doctors: Math.floor(easeOut * 500),
        specialities: Math.floor(easeOut * 50)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const degreesList = [
    'M.B.B.S. (Gold Medalist)',
    'M.D. (Medicine)',
    'M.C.H. (USA)',
    'M.I.A.P.',
    'M.A.H.T. (England)',
    'F.I.A.P.',
    'F.A.A.P. (USA)',
    'F.I.C.A. (USA)',
    'F.A.C.U. (London)'
  ];

  const appointmentsList = [
    {
      role: 'Pediatric - Gastroenterology',
      inst: "Kings College Hospital, London (UK)",
      icon: <Stethoscope size={16} />
    },
    {
      role: 'Pediatric Nutrition',
      inst: 'Harvard University (USA)',
      icon: <GraduationCap size={16} />
    },
    {
      role: 'W.H.O. Fellow',
      inst: 'Child Health in USA',
      icon: <Globe2 size={16} />
    },
    {
      role: 'Commonwealth Medical Fellow',
      inst: 'London, United Kingdom',
      icon: <Medal size={16} />
    },
    {
      role: 'President',
      inst: 'Intl. Society of Pediatric Gastroenterology, Hepatology & Nutrition',
      icon: <Award size={16} />
    },
    {
      role: 'International President',
      inst: 'World Health Summit – 2025',
      icon: <Sparkles size={16} />
    },
    {
      role: 'Vice President',
      inst: 'Strategic Council of GUNI (Global University Network for Innovation)',
      icon: <Building2 size={16} />
    },
    {
      role: 'Director',
      inst: 'Institute of Pediatric Gastroenterology & Organ Transplant',
      icon: <ShieldCheck size={16} />
    },
    {
      role: 'Chairman',
      inst: 'Institute of Stem Cell, Nutrition & Regenerative Medicine',
      icon: <Microscope size={16} />
    },
    {
      role: 'Chairman (National Council)',
      inst: 'National Council on Skill Development & Petro Chem, ASSOCHAM',
      icon: <Briefcase size={16} />
    },
    {
      role: 'Executive Member',
      inst: 'WHS Academic Alliance, Germany',
      icon: <Activity size={16} />
    },
    {
      role: 'Goodwill Ambassador',
      inst: 'AUAP (Association of Universities of Asia & The Pacific)',
      icon: <Globe2 size={16} />
    }
  ];

  const meetingPhotos = [
    {
      src: '/assets/images/resource/image1.webp',
      title: 'Global Health Summit & International Bilateral Cooperation',
      sub: 'Prof. Dr. Balvir S. Tomar with Global Medical Dignitaries'
    },
    {
      src: '/assets/images/resource/image2.webp',
      title: 'With Union Minister Shri Nitin Gadkari',
      sub: 'Presentation of Clinical Healthcare Initiatives & Research Monograph'
    },
    {
      src: '/assets/images/resource/image3.webp',
      title: 'European Academic Collaboration & MoU Signing',
      sub: 'Fostering International Medical Exchange & Surgery Pedagogy'
    },
    {
      src: '/assets/images/resource/image4.webp',
      title: 'National Healthcare Excellence & Leadership Award',
      sub: 'Honoring Pioneering Contributions in Quaternary Medicine'
    }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    let targetId = 'overview-section';
    if (tabId === 'founder') targetId = 'founder-section';
    if (tabId === 'purpose') targetId = 'vision-mission-section';

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* 1. Page Banner */}
      <section className="nims-pagebanner">
        <div className="container">
          <div className="nims-pagebanner-content">
            <h1 className="nims-pagebanner-title">About Us</h1>
            <nav aria-label="breadcrumb" className="nims-pagebanner-breadcrumb">
              <Link to="/" className="crumb-item">HOME</Link>
              <ChevronRight size={14} className="crumb-sep" />
              <span className="crumb-item active">ABOUT US</span>
            </nav>

            {/* Quick Navigation Filter Pills */}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleTabClick('overview')}
                style={{
                  padding: '0.45rem 1.15rem',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: activeTab === 'overview' ? 'var(--nims-orange)' : 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.2s ease'
                }}
              >
                About Hospital
              </button>
              <button
                onClick={() => handleTabClick('founder')}
                style={{
                  padding: '0.45rem 1.15rem',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: activeTab === 'founder' ? 'var(--nims-orange)' : 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.2s ease'
                }}
              >
                Founder &amp; Chancellor
              </button>
              <button
                onClick={() => handleTabClick('purpose')}
                style={{
                  padding: '0.45rem 1.15rem',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: activeTab === 'purpose' ? 'var(--nims-orange)' : 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.2s ease'
                }}
              >
                Vision &amp; Mission
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main About Section: Advanced care, delivered with compassion */}
      <section id="overview-section" className="nims-about2-sec">
        <img
          src="/assets/images/shape/bg-07.jpg"
          alt="NIMS Shape"
          className="nims-about2-bgicon"
          loading="lazy"
        />

        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(1.75rem, 4vw, 3.5rem)',
              alignItems: 'center'
            }}
          >
            {/* Left Column: Heading, text, subheading, and authentic accreditation seals */}
            <div>
              <span
                style={{
                  color: 'var(--nims-orange)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.6rem',
                  display: 'inline-block'
                }}
              >
                About NIMS Hospital
              </span>
              <h2 className="nims-about2-heading">
                Advanced care, delivered with compassion.
              </h2>
              <p className="nims-about2-para">
                NIMS Hospital was built on a simple belief — that care should be advanced enough to treat the most complex conditions, affordable enough for every family, and compassionate enough that every patient feels cared for from the moment they arrive.
              </p>
              <h5 className="nims-about2-subheading">
                20 years of experience, certified doctors &amp; using modern technology
              </h5>

              {/* Authentic Clinical Accreditation Cards (Replacing stock mockup certificates) */}
              <div className="accreditation-badges-grid">
                <div className="accred-badge-card">
                  <div className="accred-seal-icon">
                    <Award size={22} />
                  </div>
                  <div className="accred-text-block">
                    <span className="accred-tag">Apex Certified</span>
                    <div className="accred-title">NABH Hospital</div>
                    <div className="accred-sub">Patient Safety Standards</div>
                  </div>
                </div>

                <div className="accred-badge-card">
                  <div className="accred-seal-icon">
                    <Microscope size={22} />
                  </div>
                  <div className="accred-text-block">
                    <span className="accred-tag">ISO Certified</span>
                    <div className="accred-title">NABL Labs</div>
                    <div className="accred-sub">Diagnostics &amp; Pathology</div>
                  </div>
                </div>

                <div className="accred-badge-card">
                  <div className="accred-seal-icon">
                    <ShieldCheck size={22} />
                  </div>
                  <div className="accred-text-block">
                    <span className="accred-tag">Authorized</span>
                    <div className="accred-title">Organ Transplant</div>
                    <div className="accred-sub">Level-1 Trauma &amp; Surgical</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Rotating Badge & Layered Images */}
            <div>
              <div className="nims-about2-media">
                {/* Circular Rotating Badge */}
                <div className="nims-about2-badge">
                  <svg className="nims-about2-badge-spin" viewBox="0 0 120 120">
                    <defs>
                      <path
                        id="badgeCircle"
                        d="M 60,60 m -48,0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0"
                      />
                    </defs>
                    <text>
                      <textPath xlinkHref="#badgeCircle" startOffset="0%">
                        Trusted Healthcare Excellence Since 2001 •
                      </textPath>
                    </text>
                  </svg>
                  <HeartPulse size={36} className="nims-about2-badge-icon" />
                </div>

                {/* Main Hospital Hallway Photo (Local asset) */}
                <img
                  src="/assets/images/gallery/gallery27.png"
                  alt="Hospital Hallway & Modern Facilities"
                  className="nims-about2-mainimg"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/images/hospital-img.png";
                  }}
                />

                {/* Overlapping Doctor Consultation Photo (Local asset) */}
                <img
                  src="/assets/images/gallery/gallery21.png"
                  alt="Specialist Doctor Consultation"
                  className="nims-about2-overlapimg"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/images/news/1.png";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Hospital Stats Section */}
      <section className="nims-stats-sec">
        <div className="nims-stats-hexbg" />
        <div className="container position-relative" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.75rem',
              textAlign: 'center'
            }}
          >
            {/* Stat 1: Beds */}
            <div className="nims-stats-item">
              <div className="nims-stats-icon">
                <HeartPulse size={44} color="#1bbde4" />
              </div>
              <div className="nims-stats-label">Bed</div>
              <div className="nims-stats-count-wrap">
                <span className="nims-stats-count">{counters.beds.toLocaleString()}</span>
                <span className="nims-stats-suffix">+</span>
              </div>
            </div>

            {/* Stat 2: Expert Doctors */}
            <div className="nims-stats-item">
              <div className="nims-stats-icon">
                <Users size={44} color="#1bbde4" />
              </div>
              <div className="nims-stats-label">Expert Doctors</div>
              <div className="nims-stats-count-wrap">
                <span className="nims-stats-count">{counters.doctors}</span>
                <span className="nims-stats-suffix">+</span>
              </div>
            </div>

            {/* Stat 3: Medical Specialities */}
            <div className="nims-stats-item">
              <div className="nims-stats-icon">
                <Building2 size={44} color="#1bbde4" />
              </div>
              <div className="nims-stats-label">Medical Specialities</div>
              <div className="nims-stats-count-wrap">
                <span className="nims-stats-count">{counters.specialities}</span>
                <span className="nims-stats-suffix">+</span>
              </div>
            </div>

            {/* Stat 4: 24x7 Emergency */}
            <div className="nims-stats-item">
              <div className="nims-stats-icon">
                <Clock size={44} color="#1bbde4" />
              </div>
              <div className="nims-stats-label">Emergency</div>
              <div className="nims-stats-count-wrap">
                <span className="nims-stats-count">24×7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Founder & Chancellor Hero Section (Local asset Balvir.webp) */}
      <section id="founder-section" className="chancellor-section">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(1.75rem, 4vw, 3rem)',
              alignItems: 'stretch'
            }}
          >
            {/* Left Photo Column: Balvir.webp from public/assets/images/resource/ */}
            <MotionFadeIn direction="left" duration={0.65}>
              <div className="chancellor-photo-col">
                <div className="chancellor-photo-wrap">
                  <motion.img
                    src="/assets/images/resource/Balvir.webp"
                    alt="Prof. (Dr.) Balvir S. Tomar"
                    loading="lazy"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    onError={(e) => {
                      e.currentTarget.src = "/assets/images/hospital-img.png";
                    }}
                  />
                  <div className="chancellor-namecard">
                    <h3>Prof. (Dr.) Balvir S. Tomar</h3>
                    <p style={{ fontWeight: 700, color: 'var(--nims-navy)' }}>Founder &amp; Hon'ble Chancellor</p>
                    <p>Nims University Rajasthan, Jaipur</p>
                  </div>
                </div>
              </div>
            </MotionFadeIn>

            {/* Right Text Column: The Leading Voice */}
            <MotionFadeIn direction="right" duration={0.65} delay={0.1}>
              <div className="chancellor-text-col">
                <span
                  style={{
                    color: 'var(--nims-orange)',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '0.6rem',
                    display: 'inline-block'
                  }}
                >
                  Visionary Leadership
                </span>
                <h2 className="chancellor-heading">
                  The <span className="script">Leading Voice</span> in Unlocking Potential, and Changing Lives.
                </h2>
                <p className="chancellor-desc">
                  A rare precedent of exceptional talent, hard work and acute insight with an immense zeal to serve society, Dr. Tomar was born to a noble family of educationists and doctors in Varanasi. A bright student all through his academic career, he followed the wishes of his parents and decided to become a doctor early on for which he took admission in the Gojra Raja Medical College in Gwalior. A true achiever he passed his MBBS with a Gold Medal and claimed the top spot in his University.
                </p>
                <p className="chancellor-desc" style={{ marginTop: '1rem' }}>
                  With a steadfast vision to elevate healthcare to global standards in India, he established NIMS Hospital and University, combining world-class quaternary clinical infrastructure, affordable community healthcare, and groundbreaking pedagogical research.
                </p>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to="/contact-us"
                      className="btn btn-outline"
                      style={{ padding: '0.8rem 1.6rem' }}
                    >
                      <span>Connect With NIMS</span>
                      <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </MotionFadeIn>
          </div>
        </div>
      </section>

      {/* 5. Executive Credentials & Diplomatic Photo Gallery (Local assets image1.webp - image4.webp) */}
      <section className="about-label-strip">
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <span
              style={{
                color: 'var(--nims-orange)',
                fontSize: '0.85rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.4rem',
                display: 'inline-block'
              }}
            >
              Academic Excellence &amp; Global Honors
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', color: 'var(--nims-navy)', fontWeight: 800, margin: '0 0 12px 0' }}>
              Distinguished Credentials &amp; Global Engagements
            </h2>
            <div style={{ width: '72px', height: '4px', background: 'var(--nims-orange)', borderRadius: '2px' }} />
          </div>

          <div className="credentials-dual-grid">
            {/* Left Column: Modern Credentials & Appointments Card */}
            <div className="about-credentials-card">
              <div style={{ marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--nims-orange)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Medical Qualifications &amp; Fellowships
                </span>
              </div>

              {/* Degrees Chip Row */}
              <div className="credentials-chips-wrap">
                {degreesList.map((deg, idx) => (
                  <span key={idx} className="credential-chip">
                    <Award size={12} color="var(--nims-orange)" />
                    <span>{deg}</span>
                  </span>
                ))}
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--nims-navy)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Key International Directorships &amp; Fellowships
                </span>
              </div>

              {/* Appointments 2-Column Compact Grid */}
              <div className="appointments-grid">
                {appointmentsList.map((item, idx) => (
                  <div key={idx} className="appointment-item" title={`${item.role} — ${item.inst}`}>
                    <div className="appointment-icon-box">
                      {item.icon}
                    </div>
                    <div className="appointment-content">
                      <h5>{item.role}</h5>
                      <p>{item.inst}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Diplomatic Photo Gallery Card (image1.webp - image4.webp) */}
            <div className="diplomatic-gallery-card">
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--nims-orange)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Diplomatic Engagements &amp; Summits
                </span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nims-navy)', margin: '4px 0 0 0' }}>
                  Global Leadership Moments
                </h4>
              </div>

              <div className="about-photo-grid">
                {meetingPhotos.map((item, idx) => (
                  <figure
                    key={idx}
                    onClick={() => setSelectedPhoto(item)}
                    title={`Click to preview: ${item.title}`}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/images/hospital-img.png";
                      }}
                    />
                    <div className="photo-caption-bar">
                      <div>{item.title}</div>
                    </div>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Vision and Mission Section */}
      <section id="vision-mission-section" className="nims-vm2-sec">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(1.75rem, 4vw, 3.5rem)',
              alignItems: 'center'
            }}
          >
            {/* Left Column: Campus View Photograph */}
            <div className="nims-vm2-media">
              <img
                src="/assets/images/gallery/gallery04.png"
                alt="NIMS Hospital Campus"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/assets/images/hospital-img.png";
                }}
              />
            </div>

            {/* Right Column: Heading, Intro, and Interactive Vision/Mission Cards */}
            <div>
              <span
                style={{
                  color: 'var(--nims-orange)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.5rem',
                  display: 'inline-block'
                }}
              >
                Our Guiding Philosophy
              </span>
              <h2 className="nims-vm2-heading">
                Inspirational Health<br />Our Vision and Mission
              </h2>
              <p className="nims-vm2-intro">
                To enhance the health and well-being of our community by providing compassionate, high-quality healthcare services through dedicated professionals and advanced medical practices.
              </p>

              {/* Cards Container */}
              <div className="nims-vm2-cards">
                {/* Mission Card */}
                <div
                  className={`nims-vm2-card ${activeVmCard === 'mission' ? 'is-active' : ''}`}
                  onClick={() => setActiveVmCard('mission')}
                  role="button"
                  tabIndex={0}
                >
                  <div className="nims-vm2-icon">
                    <Target size={36} />
                  </div>
                  <div className="nims-vm2-body">
                    <h5>Mission</h5>
                    <p>
                      To enhance the health and well-being of our community by providing compassionate, high-quality healthcare services through dedicated medical professionals and advanced clinical protocols. We are devoted to ensuring that advanced quaternary care remains accessible, ethical, and transparent for every individual.
                    </p>
                  </div>
                </div>

                {/* Vision Card */}
                <div
                  className={`nims-vm2-card ${activeVmCard === 'vision' ? 'is-active' : ''}`}
                  onClick={() => setActiveVmCard('vision')}
                  role="button"
                  tabIndex={0}
                >
                  <div className="nims-vm2-icon">
                    <Eye size={36} />
                  </div>
                  <div className="nims-vm2-body">
                    <h5>Vision</h5>
                    <p>
                      To be recognized as a premier global institution of healthcare excellence, medical education, and biomedical innovation. We strive to set new benchmarks in multi-speciality patient outcomes, community outreach, and clinical pedagogy across India and beyond.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={onOpenBooking}
                  className="btn btn-primary"
                  style={{ padding: '0.85rem 2rem', fontSize: '0.98rem' }}
                >
                  <Calendar size={18} />
                  <span>Book OPD Appointment</span>
                </button>
                <Link
                  to="/specialities"
                  className="btn btn-outline"
                  style={{ padding: '0.85rem 1.75rem', fontSize: '0.98rem' }}
                >
                  <span>Explore Specialities</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meeting Photo Lightbox Modal */}
      {selectedPhoto && createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(3, 16, 36, 0.88)',
            backdropFilter: 'blur(10px)',
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
              maxWidth: '720px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.75rem',
                background: 'var(--nims-navy)',
                color: '#ffffff'
              }}
            >
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#ffffff', fontWeight: 800 }}>
                  {selectedPhoto.title}
                </h4>
                <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '2px' }}>
                  {selectedPhoto.sub}
                </div>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '1.5rem', background: '#071f3d', textAlign: 'center' }}>
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                style={{
                  maxHeight: '500px',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  borderRadius: '10px'
                }}
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
