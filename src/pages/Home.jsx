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
  X
} from 'lucide-react';
import { specialitiesData } from '../data/specialitiesData';
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
      type: 'video',
      videoUrl: '/assets/video/nimshospital-vedio.mp4',
      poster: '/assets/images/hospital-img.png',
      badge: 'Your Health, Our Priority',
      titlePart1: 'Healing built on ',
      highlightWord: 'trust ',
      titlePart2: 'powered by expertise.',
      subtitle: "One of India's largest 2,400-bed super-speciality teaching hospitals — bringing together renowned specialists, advanced technology, and compassionate care on a single campus in Jaipur.",
      primaryCta: 'Book Appointment',
      secondaryCta: 'Explore Specialities',
      secondaryLink: '/specialities'
    },
    {
      id: 1,
      type: 'image',
      image: '/assets/images/banner/slider1.webp',
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
      image: '/assets/images/banner/slider2.webp',
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

  const filterTabs = ['All', 'Super Speciality', 'Surgical', 'Medical & Allied', 'Mother & Child', 'Diagnostics'];

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
      podBg: 'rgba(10, 47, 94, 0.08)'
    },
    {
      target: 500,
      suffix: '+',
      label: 'Expert Doctors',
      sub: "Renowned super-specialists & surgeons",
      icon: <UserCheck size={24} color="var(--nims-orange)" />,
      podBg: 'rgba(244, 117, 33, 0.12)'
    },
    {
      target: 40,
      suffix: '+',
      label: 'Super Specialities',
      sub: "Comprehensive quaternary clinical care",
      icon: <Stethoscope size={24} color="var(--nims-navy)" />,
      podBg: 'rgba(10, 47, 94, 0.08)'
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
      {/* HERO SLIDER (With Real Video Banner & Exact NIMS Button Colors) */}
      <section style={{
        position: 'relative',
        height: 'clamp(580px, 84vh, 740px)',
        overflow: 'hidden',
        background: '#0a2f5e'
      }}>
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: isActive ? 1 : 0,
                visibility: isActive ? 'visible' : 'hidden',
                transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                zIndex: isActive ? 2 : 1
              }}
            >
              {/* Media: Video or Hospital Image */}
              {slide.type === 'video' ? (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <video
                    autoPlay
                    loop
                    muted={isVideoMuted}
                    playsInline
                    poster={slide.poster}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  >
                    <source src={slide.videoUrl} type="video/mp4" />
                  </video>
                  {/* Mute/Unmute Control */}
                  <div style={{
                    position: 'absolute',
                    bottom: '28px',
                    right: '28px',
                    zIndex: 10
                  }}>
                    <button
                      onClick={() => setIsVideoMuted(!isVideoMuted)}
                      style={{
                        background: 'rgba(10, 47, 94, 0.75)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#fff',
                        borderRadius: '50%',
                        width: '38px',
                        height: '38px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      title={isVideoMuted ? 'Unmute Video' : 'Mute Video'}
                    >
                      {isVideoMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                  </div>
                </div>
              ) : (
                <img
                  src={slide.image}
                  alt={slide.titlePart1}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              )}

              {/* Crystal-Clear Scrim Overlay (Soft & transparent for video so it stays 100% bright) */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: slide.type === 'video'
                  ? 'linear-gradient(90deg, rgba(5, 20, 42, 0.55) 0%, rgba(5, 20, 42, 0.22) 42%, rgba(0, 0, 0, 0) 70%)'
                  : 'linear-gradient(90deg, rgba(7, 31, 61, 0.88) 0%, rgba(10, 47, 94, 0.65) 55%, rgba(0, 0, 0, 0.25) 100%)',
                zIndex: 3,
                pointerEvents: 'none'
              }} />

              {/* Content Overlay */}
              <div className="container" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 4,
                display: 'flex',
                alignItems: 'center'
              }}>
                <motion.div
                  key={`hero-content-${slide.id}-${isActive}`}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 26 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    maxWidth: '660px',
                    color: '#ffffff',
                    textShadow: '0 2px 14px rgba(0, 0, 0, 0.65)'
                  }}
                >
                  {/* Badge Pill: Exactly like screenshot */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: '#ffffff',
                    color: 'var(--nims-navy)',
                    padding: '0.35rem 0.9rem',
                    borderRadius: 'var(--radius-xl)',
                    marginBottom: '1.25rem',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                  }}>
                    <Heart size={14} color="var(--nims-orange)" fill="var(--nims-orange)" />
                    <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                      {slide.badge}
                    </span>
                  </div>

                  {/* Headline: Exact word 'trust' highlighted in NIMS Orange */}
                  <h1 style={{
                    fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.15,
                    marginBottom: '1.25rem',
                    letterSpacing: '-0.02em'
                  }}>
                    {slide.titlePart1}
                    <span style={{ color: 'var(--nims-orange)' }}>
                      {slide.highlightWord}
                    </span>
                    {slide.titlePart2}
                  </h1>

                  <p style={{
                    fontSize: '1.02rem',
                    color: '#e2e8f0',
                    lineHeight: 1.65,
                    marginBottom: '2rem'
                  }}>
                    {slide.subtitle}
                  </p>

                  {/* Exact Buttons from Screenshot: Orange for Book Appointment, Navy for Explore */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <motion.button
                      onClick={onOpenBooking}
                      className="btn btn-orange"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        padding: '0.85rem 1.8rem',
                        fontSize: '1rem',
                        background: 'var(--nims-orange)'
                      }}
                    >
                      <Calendar size={18} />
                      <span>{slide.primaryCta}</span>
                    </motion.button>

                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
                      <Link
                        to={slide.secondaryLink}
                        className="btn btn-secondary"
                        style={{
                          padding: '0.85rem 1.8rem',
                          fontSize: '1rem',
                          background: 'var(--nims-navy)',
                          border: '1px solid rgba(255, 255, 255, 0.25)'
                        }}
                      >
                        <span>{slide.secondaryCta}</span>
                        <ArrowRight size={16} />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
            border: 'none',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
            border: 'none',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: '0.65rem'
        }}>
          {heroSlides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: currentSlide === idx ? '32px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: currentSlide === idx ? 'var(--nims-orange)' : 'rgba(255,255,255,0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

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

      {/* SPECIALITIES PREVIEW SECTION (Exact match to screenshot) */}
      <section className="section" style={{ background: '#f8fafc', borderBottom: '1px solid #edf2f7' }}>
        <div className="container">
          {/* Header layout matching screenshot */}
          <MotionFadeIn>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{ maxWidth: '720px' }}>
                <span className="section-subtitle" style={{ display: 'block', marginBottom: '0.4rem' }}>
                  Centres of Clinical Excellence
                </span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.35rem)', color: 'var(--nims-navy)', marginBottom: '0.65rem' }}>
                  Our Super Specialities
                </h2>
                <p style={{ fontSize: '1.02rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  Advanced, integrated care across every major discipline — delivered by expert clinicians with the latest technology.
                </p>
              </div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/specialities"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--nims-navy)',
                    fontWeight: 700,
                    fontSize: '0.98rem',
                    textDecoration: 'none',
                    padding: '0.65rem 1.25rem',
                    borderRadius: 'var(--radius-xl)',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 8px rgba(10, 47, 94, 0.04)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--nims-orange)';
                    e.currentTarget.style.color = 'var(--nims-orange)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.color = 'var(--nims-navy)';
                  }}
                >
                  <span>View all specialties</span>
                  <span style={{ fontSize: '1.15rem' }}>&rarr;</span>
                </Link>
              </motion.div>
            </div>
          </MotionFadeIn>

          {/* Filter Bar & Search with Horizontal Auto-Scroll Pills */}
          <MotionFadeIn delay={0.1}>
            <div className="nims-specialities-filter-bar">
              <div className="nims-filter-pill-scroll">
                {filterTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={(e) => handleSpecTabClick(tab, e)}
                    className={`nims-filter-pill ${activeTab === tab ? 'active' : ''}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="speciality-search-box" style={{
                display: 'flex',
                alignItems: 'center',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 'var(--radius-xl)',
                padding: '0.45rem 1rem',
                width: '100%',
                maxWidth: '280px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                flexShrink: 0
              }}>
                <Search size={16} color="#94a3b8" style={{ marginRight: '0.5rem' }} />
                <input
                  type="text"
                  placeholder="Search department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    fontSize: '0.85rem',
                    width: '100%',
                    background: 'transparent'
                  }}
                />
              </div>
            </div>
          </MotionFadeIn>

          {/* Specialities Grid - EXACT 3-CARDS PER ROW LAYOUT */}
          <MotionStagger key={`spec-${activeTab}-${searchTerm}`} className="specialities-three-col-grid" staggerDelay={0.06}>
            {filteredSpecialities.slice(0, 6).map((spec) => (
              <MotionItem key={spec.id}>
                <SpecialityCard spec={spec} />
              </MotionItem>
            ))}
          </MotionStagger>

          <MotionFadeIn delay={0.15}>
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                <Link
                  to="/specialities"
                  className="btn btn-secondary"
                  style={{
                    padding: '0.85rem 2.2rem',
                    fontSize: '1rem',
                    boxShadow: '0 4px 16px rgba(10, 47, 94, 0.2)'
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
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(1.75rem, 4vw, 3.5rem)',
            alignItems: 'center'
          }}>
            <MotionFadeIn direction="left">
              <div>
                <span className="badge-pill badge-orange" style={{ marginBottom: '0.75rem' }}>
                  26+ Years of Trusted Care in Jaipur
                </span>
                <h2 style={{ fontSize: 'clamp(1.7rem, 2.8vw, 2.3rem)', marginBottom: '1.25rem', color: 'var(--nims-navy)' }}>
                  The best healthcare should never feel out of reach.
                </h2>
                <p style={{ fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '1.25rem', color: '#475569' }}>
                  NIMS Hospital was built on a simple belief — that care should be advanced enough to treat the most complex conditions, affordable enough for every family, and compassionate enough that every patient feels cared for from the moment they arrive.
                </p>
                <p style={{ fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '1.75rem', color: '#475569' }}>
                  From preventive care and diagnostics to organ transplantation, critical care and complex surgeries — patients receive seamless, coordinated treatment on a single campus.
                </p>

                {/* Feature Pills */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--nims-navy)' }}>
                    <CheckCircle size={18} color="var(--nims-orange)" />
                    <span>NABH Accredited</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--nims-navy)' }}>
                    <CheckCircle size={18} color="var(--nims-navy)" />
                    <span>Award-Winning Care</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--nims-navy)' }}>
                    <CheckCircle size={18} color="var(--nims-orange)" />
                    <span>500+ Specialists</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--nims-navy)' }}>
                    <CheckCircle size={18} color="var(--nims-navy)" />
                    <span>Integrated Campus</span>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                  <Link to="/about" className="btn btn-secondary" style={{ padding: '0.75rem 1.6rem' }}>
                    <span>Learn More About Hospital & Leadership</span>
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </MotionFadeIn>

            {/* Campus Photo Visual */}
            <MotionFadeIn direction="right" delay={0.15}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-1)',
                  border: '4px solid #ffffff'
                }}>
                  <img
                    src="/assets/images/hospital-img.png"
                    alt="NIMS Hospital Jaipur Campus"
                    style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80";
                    }}
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                  style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '20px',
                    background: 'var(--nims-navy)',
                    color: '#ffffff',
                    padding: '1.15rem 1.5rem',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    cursor: 'default'
                  }}
                >
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--nims-orange)', lineHeight: 1 }}>
                    <AnimatedCounter target={2400} suffix="+" />
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc' }}>
                    Beds on Single Campus
                  </div>
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
                      whileHover={{ y: -5, boxShadow: '0 18px 36px rgba(10, 47, 94, 0.1)' }}
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
