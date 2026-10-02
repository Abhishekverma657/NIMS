import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Heart,
  ShieldCheck,
  Bed,
  UserCheck,
  Stethoscope,
  Clock,
  ArrowRight,
  Star,
  CheckCircle,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Search,
  Video,
  FileText,
  Play,
  X,
  Activity
} from 'lucide-react';
import { specialitiesData } from '../data/specialitiesData';
import './SpecialitiesSection.css';
import { doctorsData } from '../data/doctorsData';
import SpecialityCard from '../components/specialities/SpecialityCard';
import DoctorCard from '../components/doctors/DoctorCard';
import { motion } from 'framer-motion';
import { MotionFadeIn, MotionStagger, MotionItem, MotionCard } from '../components/motion/MotionWrapper';
import AnimatedCounter from '../components/common/AnimatedCounter';
import VideoCard from '../components/video/VideoCard';
import VideoGalleryModal from '../components/video/VideoGalleryModal';
import { videoReviewsData } from '../data/videoReviewsData';
import { writtenTestimonialsData } from '../data/writtenTestimonialsData';
import ModernHeroSlider from '../components/home/ModernHeroSlider';

export default function Home({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [reviewFilter, setReviewFilter] = useState('all');
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  
  // Doctor Filter State
  const [doctorDeptFilter, setDoctorDeptFilter] = useState('Cardiology');
  const doctorTabsRef = useRef(null);

  const doctorCategories = [
    'Cardiology',
    'CTVS',
    'Neurosurgery',
    'Orthopaedics',
    'Obstetrics & Gynaecology',
    'Paediatrics',
    'Urology',
    'Surgical Gastroenterology',
    'General Surgery',
    'Respiratory Medicine',
    'General Medicine'
  ];

  const handleDoctorTabClick = (dept, e) => {
    setDoctorDeptFilter(dept);
    if (e && e.currentTarget) {
      e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  const handleSpecTabClick = (tab, e) => {
    setActiveTab(tab);
    if (e && e.currentTarget) {
      e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  const scrollDoctorTabs = (direction) => {
    if (doctorTabsRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      doctorTabsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // Testimonials Filter & Video Modal State
  const [unmutedVideoId, setUnmutedVideoId] = useState(null);

  const heroSlides = [
    {
      id: 0,
      type: 'image',
      image: '/assets/slider/nims-slider1.jpeg',
      isTatkalLayout: true,
      badge: 'Your Health, Our Priority',
      titlePart1: 'Healing built on ',
      highlightWord: 'trust ',
      titlePart2: 'powered by expertise.',
      subtitle: "One of India's largest 2,400-bed super-speciality teaching hospitals.",
      primaryCta: 'Book Appointment',
      secondaryCta: 'Explore Specialities',
      secondaryLink: '/specialities'
    },
    {
      id: 1,
      type: 'image',
      image: '/assets/slider/nims-slider2.jpeg',
      badge: 'NABH & NABL Accredited Care',
      titlePart1: 'Rajasthan’s Premier ',
      highlightWord: '2,400-Bed ',
      titlePart2: 'Quaternary Medical Campus',
      subtitle: 'Bringing together 500+ renowned clinicians, modular laminar airflow theatres, and multi-organ transplantation on a single campus.',
      primaryCta: 'Book Appointment',
      secondaryCta: 'About Hospital',
      secondaryLink: '/about'
    },
    {
      id: 2,
      type: 'image',
      image: '/assets/slider/nims-slider3.jpeg',
      badge: '24×7 Level-1 Trauma Active',
      titlePart1: 'Every emergency answered. ',
      highlightWord: 'Every hour ',
      titlePart2: 'of every day.',
      subtitle: 'Rapid triage trauma bay, on-campus blood bank, and advanced life support ambulances stationed directly on NH-11C, Jaipur.',
      primaryCta: 'Emergency Info',
      secondaryCta: 'Health Packages',
      secondaryLink: '/health-packages'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const filterTabs = ['All', 'Super Speciality', 'Surgical', 'Medical & Allied', 'Mother & Child'];

  const filteredSpecialities = specialitiesData.filter((item) => {
    const matchesTab = activeTab === 'All' || item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const stats = [
    {
      target: 2400,
      suffix: '+',
      label: 'Inpatient Beds',
      sub: "Largest campus facility in Rajasthan",
      icon: <Bed size={24} color="var(--nims-navy)" />,
      podBg: 'rgba(35, 32, 33, 0.08)'
    },
    {
      target: 500,
      suffix: '+',
      label: 'Expert Doctors',
      sub: "Renowned super-specialists & surgeons",
      icon: <UserCheck size={24} color="var(--nims-orange)" />,
      podBg: 'rgba(189, 23, 28, 0.12)'
    },
    {
      target: 40,
      suffix: '+',
      label: 'Super Specialities',
      sub: "Comprehensive quaternary clinical care",
      icon: <Stethoscope size={24} color="var(--nims-navy)" />,
      podBg: 'rgba(35, 32, 33, 0.08)'
    },
    {
      staticText: '24×7',
      label: 'Emergency & Trauma',
      sub: "Level-1 emergency & blood bank",
      icon: <Clock size={24} color="#10b981" />,
      podBg: 'rgba(16, 185, 129, 0.12)'
    }
  ];

  // Video Reviews (exclude doctor-specific ones)
  const videoReviews = videoReviewsData.filter(v => !v.doctorId).slice(0, 3);

  return (
    <div style={{ position: 'relative' }}>
      <ModernHeroSlider slides={heroSlides} />

      {/* BENTO STATS STRIP */}
      <section style={{
        padding: '3rem 0',
        background: '#ffffff',
        borderBottom: '1px solid var(--nims-border)'
      }}>
        <div className="container">
          <MotionStagger style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}>
            {stats.map((stat, i) => (
              <MotionItem key={i}>
                <div className="nims-bento-stat-card">
                  <div className="stat-icon-pod" style={{ background: stat.podBg }}>
                    {stat.icon}
                  </div>
                  <div>
                    <div className="stat-number-wrap">
                      <AnimatedCounter
                        target={stat.target}
                        suffix={stat.suffix}
                        staticText={stat.staticText}
                        className="stat-number"
                      />
                    </div>
                    <div className="stat-label">{stat.label}</div>
                    <div className="stat-sub">{stat.sub}</div>
                  </div>
                </div>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>

      {/* SPECIALITIES PREVIEW SECTION (EXACT REFERENCE MATCH) */}
      <section className="spec-section-wrapper">
        {/* Soft Background Medical Patterns / Elements */}
        <div className="spec-bg-shape-1"></div>
        <div className="spec-bg-shape-2"></div>
        <div className="spec-bg-pattern"></div>

        <div className="container relative z-10">
          <MotionFadeIn>
            <div className="spec-header-container">
              <div className="spec-header-text">
                <div className="spec-header-subtitle">
                  <Activity size={15} strokeWidth={2.5} /> Advanced Medical Care
                </div>
                <h2 className="spec-header-title">
                  Our <span>Super Specialities</span>
                </h2>
                <p className="spec-header-desc">
                  Advanced, integrated care across every major discipline — delivered by expert clinicians with the latest technology and world-class infrastructure.
                </p>
              </div>

              <div className="spec-header-actions">
                <div className="spec-search-wrapper">
                  <Search size={18} className="spec-search-icon-left" />
                  <input
                    type="text"
                    placeholder="Search department, treatment or doctor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="spec-search-input"
                  />
                  <button className="spec-search-btn-right">
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </button>
                </div>
                
                <Link to="/specialities" className="spec-view-all-btn">
                  View all specialities <ArrowRight size={16} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </MotionFadeIn>

          {/* Filter Bar with Horizontal Auto-Scroll Pills */}
          <MotionFadeIn delay={0.1}>
            <div className="spec-filter-scroll">
              {filterTabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={(e) => handleSpecTabClick(tab, e)}
                    className={`spec-filter-pill ${isActive ? 'active' : 'inactive'}`}
                  >
                    {isActive && <Activity size={14} color="rgba(255,255,255,0.8)" />}
                    {tab}
                  </button>
                );
              })}
            </div>
          </MotionFadeIn>

          {/* Specialities Grid */}
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <MotionStagger key={`spec-${activeTab}-${searchTerm}`} className="spec-grid" staggerDelay={0.06}>
              {filteredSpecialities.slice(0, 6).map((spec, index) => (
                <MotionItem key={spec.id} style={{ height: '100%' }}>
                  <SpecialityCard spec={spec} index={index + 1} />
                </MotionItem>
              ))}
            </MotionStagger>
          </div>

          <MotionFadeIn delay={0.15}>
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                <Link
                  to="/specialities"
                  className="btn btn-secondary"
                  style={{
                    padding: '0.85rem 2.2rem',
                    fontSize: '1rem',
                    boxShadow: '0 4px 16px rgba(35, 32, 33, 0.2)'
                  }}
                >
                  <span>Explore All 30+ Super Specialities</span>
                  <ArrowRight size={17} />
                </Link>
              </motion.div>
            </div>
          </MotionFadeIn>
        </div>
      </section>

      {/* ABOUT HOSPITAL SUMMARY SECTION */}
      <section style={{
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        padding: '5rem 0',
        borderBottom: '1px solid #f0f4f8'
      }}>
        {/* Decorative glowing orbs */}
        <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'400px', height:'400px', background:'radial-gradient(circle, rgba(200,16,46,0.06) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'300px', height:'300px', background:'radial-gradient(circle, rgba(200,16,46,0.04) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />

        <div className="container" style={{ position:'relative', zIndex:10 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'center'
          }}>
            {/* Left: Text Content */}
            <MotionFadeIn direction="left">
              <div>
                {/* Badge */}
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'1.25rem' }}>
                  <div style={{ width:'32px', height:'2px', background:'#C8102E', borderRadius:'2px' }} />
                  <span style={{ color:'#C8102E', fontWeight:800, fontSize:'0.7rem', textTransform:'uppercase', letterSpacing:'0.15em' }}>
                    26+ Years of Trusted Care in Jaipur
                  </span>
                </div>

                <h2 style={{ fontSize:'clamp(1.8rem, 3vw, 2.6rem)', fontWeight:800, color:'#142235', lineHeight:1.15, marginBottom:'1.25rem', letterSpacing:'-0.02em' }}>
                  The best healthcare<br />
                  <span style={{ color:'#C8102E' }}>should never feel</span><br />
                  out of reach.
                </h2>

                <p style={{ fontSize:'0.96rem', lineHeight:1.75, marginBottom:'0.9rem', color:'#475569' }}>
                  NIMS Hospital was built on a simple belief — that care should be advanced enough to treat the most complex conditions, affordable enough for every family, and compassionate enough that every patient feels cared for from the moment they arrive.
                </p>
                <p style={{ fontSize:'0.96rem', lineHeight:1.75, marginBottom:'2rem', color:'#64748b' }}>
                  From preventive care and diagnostics to organ transplantation, critical care and complex surgeries — seamless, coordinated treatment on a single campus.
                </p>

                {/* Feature Grid */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginBottom:'2.25rem' }}>
                  {[
                    { label:'NABH Accredited', red: true },
                    { label:'Award-Winning Care', red: false },
                    { label:'500+ Specialists', red: true },
                    { label:'Integrated Campus', red: false }
                  ].map((item, i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px', background:'#f8fafc', border:`1px solid ${item.red ? 'rgba(200,16,46,0.2)' : '#e2e8f0'}`, borderRadius:'10px', padding:'0.65rem 0.85rem' }}>
                      <div style={{ width:'8px', height:'8px', borderRadius:'50%', background: item.red ? '#C8102E' : '#10B981', flexShrink:0 }} />
                      <span style={{ fontSize:'0.83rem', fontWeight:700, color:'#142235' }}>{item.label}</span>
                    </div>
                  ))}
                </div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display:'inline-block' }}>
                  <Link to="/about" style={{
                    display:'inline-flex', alignItems:'center', gap:'8px',
                    background:'linear-gradient(135deg, #C8102E, #9B0000)',
                    color:'#fff', fontWeight:700, fontSize:'0.9rem',
                    padding:'0.85rem 2rem', borderRadius:'9999px',
                    boxShadow:'0 6px 20px rgba(200,16,46,0.35)',
                    textDecoration:'none'
                  }}>
                    Learn More About Hospital &amp; Leadership
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </MotionFadeIn>

            {/* Right: Image + Stats */}
            <MotionFadeIn direction="right" delay={0.15}>
              <div style={{ position:'relative' }}>
                {/* Main image */}
                <div style={{ borderRadius:'20px', overflow:'hidden', border:'2px solid rgba(255,255,255,0.08)', boxShadow:'0 30px 80px rgba(0,0,0,0.4)' }}>
                  <img
                    src="/assets/images/hospital-img.png"
                    alt="NIMS Hospital Jaipur Campus"
                    style={{ width:'100%', height:'380px', objectFit:'cover', display:'block' }}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80";
                    }}
                  />
                  {/* Gradient overlay on image */}
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(20,34,53,0.5) 0%, transparent 50%)', borderRadius:'20px' }} />
                </div>

                {/* Stat card - bottom left */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ type:'spring', stiffness:350, damping:22 }}
                  style={{
                    position:'absolute', bottom:'-18px', left:'20px',
                    background:'rgba(255,255,255,0.95)',
                    backdropFilter:'blur(12px)',
                    padding:'1rem 1.4rem', borderRadius:'14px',
                    boxShadow:'0 16px 40px rgba(0,0,0,0.2)',
                    border:'1px solid rgba(255,255,255,0.5)',
                    cursor:'default', minWidth:'140px'
                  }}
                >
                  <div style={{ fontSize:'1.7rem', fontWeight:800, color:'#C8102E', lineHeight:1 }}>
                    <AnimatedCounter target={2400} suffix="+" />
                  </div>
                  <div style={{ fontSize:'0.75rem', fontWeight:600, color:'#475569', marginTop:'2px' }}>
                    Beds on Single Campus
                  </div>
                </motion.div>

                {/* Floating accent card - top right */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type:'spring', stiffness:350, damping:22 }}
                  style={{
                    position:'absolute', top:'20px', right:'-12px',
                    background:'linear-gradient(135deg, #C8102E, #9B0000)',
                    color:'white', padding:'0.8rem 1.1rem', borderRadius:'14px',
                    boxShadow:'0 12px 30px rgba(200,16,46,0.4)',
                    cursor:'default', minWidth:'120px'
                  }}
                >
                  <div style={{ fontSize:'1.3rem', fontWeight:800, lineHeight:1 }}>26+</div>
                  <div style={{ fontSize:'0.65rem', fontWeight:600, opacity:0.85, marginTop:'2px', textTransform:'uppercase', letterSpacing:'0.08em' }}>Years of Care</div>
                </motion.div>
              </div>
            </MotionFadeIn>
          </div>
        </div>
      </section>

      {/* OUR DOCTORS SECTION (Modern 2-Column Grid with Official Photos) */}
      <section className="section" style={{ background: '#ffffff', borderBottom: '1px solid var(--nims-border)' }}>
        <div className="container">
          <MotionFadeIn>
            <div className="section-header" style={{ marginBottom: '1.5rem' }}>
              <span className="section-subtitle">OUR CLINICAL FACULTY</span>
              <h2>OUR DOCTORS</h2>
              <p>A dedicated and experienced team of clinicians to entrust your health and well-being.</p>
            </div>
          </MotionFadeIn>

          {/* Speciality Horizontal Scrollbar Tabs (Full Container Width) */}
          <div className="doctor-tabs-wrapper">
            <button
              type="button"
              className="doctor-nav-arrow"
              onClick={() => scrollDoctorTabs('left')}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="speciality-scroll" ref={doctorTabsRef}>
              {doctorCategories.map((dept) => {
                const isActive = doctorDeptFilter === dept;
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={(e) => handleDoctorTabClick(dept, e)}
                    className={`speciality-tab ${isActive ? 'active' : ''}`}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="doctor-nav-arrow"
              onClick={() => scrollDoctorTabs('right')}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* 2-Columns Grid - EXACT 2 CARDS PER ROW */}
          {(() => {
            const list = doctorsData.filter(d => {
              if (d.isOpdAvailable === false) return false;
              if (doctorDeptFilter === 'All' || doctorDeptFilter === 'All Doctors') return true;
              const filter = doctorDeptFilter.toLowerCase();
              const dept = d.department.toLowerCase();
              const spec = (d.specialityId || '').toLowerCase();
              const title = (d.title || '').toLowerCase();

              if (filter === 'ctvs') return dept.includes('cardiothoracic') || spec.includes('ctvs') || title.includes('ctvs');
              if (filter.includes('paediatric') || filter.includes('pediatric')) return dept.includes('paediatric') || dept.includes('pediatric');
              if (filter.includes('gastro')) return dept.includes('gastro');
              if (filter.includes('cardio')) return dept.includes('cardio');
              if (filter.includes('ortho')) return dept.includes('ortho');
              if (filter.includes('neuro')) return dept.includes('neuro');
              if (filter.includes('uro')) return dept.includes('uro');
              if (filter.includes('gynae')) return dept.includes('gynae') || dept.includes('obstetric');
              if (filter.includes('respiratory')) return dept.includes('respiratory') || dept.includes('pulmon');
              if (filter.includes('medicine')) return dept.includes('medicine');
              if (filter.includes('surgery')) return dept.includes('surgery');
              return dept.includes(filter) || spec.includes(filter) || title.includes(filter);
            });

            if (list.length === 0) {
              return (
                <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#64748b' }}>
                  <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--nims-navy)' }}>
                    Is speciality mein abhi koi doctor listed nahi hai.
                  </p>
                  <button
                    type="button"
                    onClick={() => setDoctorDeptFilter('All')}
                    className="btn btn-outline"
                    style={{ marginTop: '0.85rem', fontSize: '0.88rem' }}
                  >
                    View All Doctors
                  </button>
                </div>
              );
            }

            return (
              <MotionStagger key={`doc-${doctorDeptFilter}`} className="doctors-two-col-grid" staggerDelay={0.06}>
                {list.map((doc) => (
                  <MotionItem key={doc.id}>
                    <DoctorCard
                      doctor={doc}
                      onBook={() => onOpenBooking(doc)}
                    />
                  </MotionItem>
                ))}
              </MotionStagger>
            );
          })()}

          <MotionFadeIn delay={0.15}>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenBooking}
                className="btn btn-secondary"
                style={{ padding: '0.85rem 2.2rem', fontSize: '0.98rem' }}
              >
                <span>Book Appointment with Doctor</span>
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </MotionFadeIn>
        </div>
      </section>

      {/* PATIENT TESTIMONIALS & VIDEO REVIEWS HUB */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <MotionFadeIn>
            <div className="section-header">
              <span className="section-subtitle">Real Healing Journeys</span>
              <h2>Patient Stories & Video Reviews</h2>
              <p>Listen directly to patients and families who experienced critical recoveries and compassionate care at NIMS Hospital.</p>

              {/* Review Type Filter Tabs */}
              <div style={{
                display: 'inline-flex',
                background: '#ffffff',
                padding: '0.3rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--nims-border)',
                marginTop: '1.5rem',
                gap: '0.35rem'
              }}>
                <button
                  onClick={() => setReviewFilter('all')}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: 'var(--radius-xl)',
                    border: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: reviewFilter === 'all' ? 'var(--nims-navy)' : 'transparent',
                    color: reviewFilter === 'all' ? '#fff' : 'var(--color-text-secondary)'
                  }}
                >
                  All Stories
                </button>
                <button
                  onClick={() => setReviewFilter('video')}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: 'var(--radius-xl)',
                    border: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: reviewFilter === 'video' ? 'var(--nims-orange)' : 'transparent',
                    color: reviewFilter === 'video' ? '#fff' : 'var(--color-text-secondary)'
                  }}
                >
                  <Video size={15} />
                  <span>Video Reviews</span>
                </button>
                <button
                  onClick={() => setReviewFilter('written')}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: 'var(--radius-xl)',
                    border: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: reviewFilter === 'written' ? 'var(--nims-navy)' : 'transparent',
                    color: reviewFilter === 'written' ? '#fff' : 'var(--color-text-secondary)'
                  }}
                >
                  <FileText size={15} />
                  <span>Google Reviews (5.0 ★)</span>
                </button>
              </div>
            </div>
          </MotionFadeIn>

          {/* Video Reviews Cards */}
          {(reviewFilter === 'all' || reviewFilter === 'video') && (
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nims-navy)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Video size={18} color="var(--nims-orange)" />
                <span>Featured Video Testimonials</span>
              </div>

              <MotionStagger style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                gap: '1.5rem'
              }} staggerDelay={0.08}>
                {videoReviews.map((item, idx) => (
                  <VideoCard 
                    key={item.id} 
                    item={item} 
                    index={idx}
                    setActiveVideoModal={setActiveVideoIndex}
                  />
                ))}
              </MotionStagger>
            </div>
          )}

          {/* Written Google Reviews */}
          {(reviewFilter === 'all' || reviewFilter === 'written') && (
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nims-navy)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={18} color="var(--nims-navy)" />
                <span>Verified Google Written Testimonials</span>
              </div>

              <MotionStagger style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                gap: '1.5rem'
              }} staggerDelay={0.08}>
                {writtenTestimonialsData.map((testi, i) => (
                  <MotionItem key={i}>
                    <motion.div
                      className="smooth-card"
                      whileHover={{ y: -5, boxShadow: '0 18px 36px rgba(35, 32, 33, 0.1)' }}
                      transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                      style={{
                        padding: '1.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        background: '#ffffff',
                        height: '100%'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                              width: '42px',
                              height: '42px',
                              borderRadius: '50%',
                              background: 'var(--nims-navy)',
                              color: 'var(--nims-orange)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.9rem'
                            }}>
                              {testi.initials}
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, color: 'var(--nims-navy)', fontSize: '0.95rem' }}>
                                {testi.name}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                                {testi.role}
                              </div>
                            </div>
                          </div>

                          <span className="badge-pill badge-green" style={{ fontSize: '0.7rem' }}>
                            Google Review
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '3px', marginBottom: '0.85rem' }}>
                          {[...Array(testi.rating)].map((_, idx) => (
                            <Star key={idx} size={15} fill="#f59e0b" color="#f59e0b" />
                          ))}
                        </div>

                        <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, fontStyle: 'italic' }}>
                          "{testi.comment}"
                        </p>
                      </div>

                      <div style={{ paddingTop: '1rem', marginTop: '1rem', borderTop: '1px solid var(--nims-border)', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                        Verified Patient Experience • Jaipur
                      </div>
                    </motion.div>
                  </MotionItem>
                ))}
              </MotionStagger>
            </div>
          )}

          {/* Unified View All Button at the bottom */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/reviews" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', borderRadius: '50px', fontSize: '1rem', fontWeight: 600 }}>
              <Video size={20} /> View All Patient Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* VIDEO MODAL (Gallery View) */}
      <VideoGalleryModal 
        activeVideoIndex={activeVideoIndex} 
        setActiveVideoIndex={setActiveVideoIndex} 
      />
    </div>
  );
}
