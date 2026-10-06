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
  Activity,
  FlaskConical,
  PhoneCall,
  Sparkles,
  Ambulance,
  Award,
  Tag,
  CheckCircle2,
  Smartphone
} from 'lucide-react';

function AppStoreMark() {
  return (
    <svg viewBox="0 0 384 512" width="18" height="18" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.3 4 270.5c0 39.1 14.2 80.1 42.6 123.3 23.5 35.2 54.3 74.8 94.6 73.3 21 .5 35.8-14.9 63.2-14.9 26.6 0 40.3 14.9 62.7 14.9 40.7-.6 69.8-36.6 92.3-72.1 15.9-24.7 26.2-49.7 29.3-75-48.4-20.5-45.7-50.1-45.7-51.3zM252.6 96c18.1-21.5 16.5-41.1 16-48-16 1-34.5 10.9-45.1 23.1-11.7 13.1-18.6 29.3-17.1 48.2 17.3 1.3 33.8-7.6 46.2-23.3z" />
    </svg>
  );
}

function GooglePlayMark() {
  return (
    <svg viewBox="0 0 512 512" width="18" height="18" aria-hidden="true" focusable="false">
      <path fill="#00A0FF" d="M50 32 286 256 50 480Z" />
      <path fill="#00D084" d="m50 32 280 162-44 62Z" />
      <path fill="#FFE14D" d="m286 256 44 62L50 480Z" />
      <path fill="#FF3D59" d="m330 194 132 62-132 62-44-62Z" />
    </svg>
  );
}
import { specialitiesData } from '../data/specialitiesData';
import './SpecialitiesSection.css';
import { doctorsData } from '../data/doctorsData';
import { packagesData } from '../data/packagesData';
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

export default function Home({ onOpenBooking, onOpenPackageBooking }) {
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

  const heroSlides = [
    {
      id: 0,
      image: '/assets/slider/nims-slider3.jpeg',
      badge: '⚡ 24×7 Level-1 Emergency & Quaternary Care',
      titlePart1: 'Healing built on ',
      highlightWord: 'trust, ',
      titlePart2: 'powered by clinical expertise.',
      subtitle: "One of India's largest 2,400-bed super-speciality & research hospitals.",
      primaryCta: 'Book OPD Visit',
      secondaryCta: 'Explore Specialities',
      secondaryLink: '/specialities'
    }
  ];

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
      sub: "Largest medical campus in Rajasthan",
      icon: <Bed size={24} color="var(--nims-navy)" />,
      podBg: 'rgba(23, 42, 52, 0.08)'
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
      sub: "Comprehensive clinical care departments",
      icon: <Stethoscope size={24} color="var(--nims-navy)" />,
      podBg: 'rgba(23, 42, 52, 0.08)'
    },
    {
      staticText: '24×7',
      label: 'Trauma & Emergency',
      sub: "Level-1 emergency & blood bank",
      icon: <Clock size={24} color="#10b981" />,
      podBg: 'rgba(16, 185, 129, 0.12)'
    }
  ];

  // Video Reviews (exclude doctor-specific ones)
  const videoReviews = videoReviewsData.filter(v => !v.doctorId).slice(0, 3);
  // Featured Health Packages for homepage banner section
  const featuredPackages = packagesData.slice(0, 3);

  return (
    <div style={{ position: 'relative' }}>
      {/* ULTRA PREMIUM HERO SLIDER */}
      <ModernHeroSlider 
        slides={heroSlides} 
        onOpenBooking={onOpenBooking} 
        onOpenPackageBooking={onOpenPackageBooking}
      />

      {/* LIVE EMERGENCY TICKER STRIP */}
      <div className="nims-live-status-bar">
        <div className="container nims-live-status-inner">
          <div className="nims-live-status-group">
            <span className="nims-live-status-badge">
              <span className="pulse-dot-live" style={{ background: '#ffffff' }} />
              24×7 LIVE STATUS
            </span>
            <span className="nims-live-status-text">
              Level-1 Emergency &amp; Trauma Unit Active • OPD Open • Cashless Insurance Accepted
            </span>
          </div>

          <a href="tel:0141-2388999" className="nims-live-status-hotline">
            <PhoneCall size={15} />
            <span>Emergency Hotline: 0141-23 88 999</span>
          </a>
        </div>
      </div>

      {/* BENTO STATS STRIP */}
      <section style={{
        padding: '3.5rem 0',
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

      {/* HEALTH PACKAGES & DIAGNOSTICS PROMO SECTION */}
      <section style={{
        padding: '4.5rem 0',
        background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
        borderBottom: '1px solid var(--nims-border)',
        position: 'relative'
      }}>
        <div className="container">
          <MotionFadeIn>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--nims-orange)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
                  <FlaskConical size={16} />
                  PREVENTIVE HEALTHCARE &amp; DIAGNOSTICS
                </div>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--nims-navy)', margin: 0, letterSpacing: '-0.02em' }}>
                  Comprehensive <span style={{ color: 'var(--nims-orange)' }}>Health Packages</span>
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.96rem', marginTop: '0.4rem', maxWidth: '600px' }}>
                  Subsidized preventive health screening panels designed for total body wellness and early diagnosis.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenPackageBooking ? onOpenPackageBooking() : null}
                className="btn btn-secondary"
                style={{ padding: '0.75rem 1.6rem', fontSize: '0.9rem', borderRadius: '50px' }}
              >
                <span>View All Health Packages</span>
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </MotionFadeIn>

          <MotionStagger style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '1.75rem'
          }} staggerDelay={0.08}>
            {featuredPackages.map((pkg) => (
              <MotionItem key={pkg.id}>
                <div style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '1.75rem',
                  border: '1px solid var(--nims-border)',
                  boxShadow: '0 10px 30px rgba(23, 42, 52, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  transition: 'all 0.3s ease'
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{
                        background: 'rgba(189, 23, 28, 0.1)',
                        color: 'var(--nims-orange)',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 800
                      }}>
                        {pkg.discount || 'Special Price'}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Tag size={14} color="var(--nims-gold)" />
                        {pkg.category}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--nims-navy)', marginBottom: '0.4rem' }}>
                      {pkg.name}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.4 }}>
                      {pkg.badge}
                    </p>

                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--nims-navy)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Key Included Parameters ({pkg.testsCount} Tests):
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {pkg.tests.slice(0, 4).map((test, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#475569' }}>
                            <CheckCircle2 size={14} color="#10b981" style={{ flexShrink: 0 }} />
                            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{test}</span>
                          </div>
                        ))}
                        {pkg.tests.length > 4 && (
                          <div style={{ fontSize: '0.76rem', color: 'var(--nims-orange)', fontWeight: 700, marginTop: '0.2rem' }}>
                            + {pkg.tests.length - 4} more vital tests included
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '1.25rem' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--nims-navy)' }}>
                        {pkg.price}
                      </span>
                      {pkg.originalPrice && (
                        <span style={{ fontSize: '0.9rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                          {pkg.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onOpenPackageBooking ? onOpenPackageBooking(pkg) : null}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        borderRadius: '50px',
                        background: 'linear-gradient(135deg, var(--nims-orange) 0%, #9e1217 100%)',
                        color: '#ffffff',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 15px rgba(189, 23, 28, 0.3)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <FlaskConical size={16} />
                      <span>Book Diagnostic Package</span>
                    </button>
                  </div>
                </div>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>

      {/* SPECIALITIES PREVIEW SECTION */}
      <section className="spec-section-wrapper">
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
        <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'400px', height:'400px', background:'radial-gradient(circle, rgba(189,23,28,0.06) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />

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
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'1.25rem' }}>
                  <div style={{ width:'32px', height:'2px', background:'var(--nims-orange)', borderRadius:'2px' }} />
                  <span style={{ color:'var(--nims-orange)', fontWeight:800, fontSize:'0.7rem', textTransform:'uppercase', letterSpacing:'0.15em' }}>
                    26+ Years of Trusted Care in Jaipur
                  </span>
                </div>

                <h2 style={{ fontSize:'clamp(1.8rem, 3vw, 2.6rem)', fontWeight:800, color:'var(--nims-navy)', lineHeight:1.15, marginBottom:'1.25rem', letterSpacing:'-0.02em' }}>
                  World-Class Healthcare,<br />
                  <span style={{ color:'var(--nims-orange)' }}>Accessible &amp; Compassionate</span><br />
                  For Every Family.
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
                    { label:'NABH Accredited Hospital', red: true },
                    { label:'NABL Accredited Labs', red: false },
                    { label:'500+ Specialist Doctors', red: true },
                    { label:'Single Integrated Campus', red: false }
                  ].map((item, i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px', background:'#f8fafc', border:`1px solid ${item.red ? 'rgba(189,23,28,0.2)' : '#e2e8f0'}`, borderRadius:'10px', padding:'0.65rem 0.85rem' }}>
                      <div style={{ width:'8px', height:'8px', borderRadius:'50%', background: item.red ? 'var(--nims-orange)' : '#10B981', flexShrink:0 }} />
                      <span style={{ fontSize:'0.83rem', fontWeight:700, color:'var(--nims-navy)' }}>{item.label}</span>
                    </div>
                  ))}
                </div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display:'inline-block' }}>
                  <Link to="/about" style={{
                    display:'inline-flex', alignItems:'center', gap:'8px',
                    background:'linear-gradient(135deg, var(--nims-orange), var(--nims-orange-hover))',
                    color:'#fff', fontWeight:700, fontSize:'0.9rem',
                    padding:'0.85rem 2rem', borderRadius:'9999px',
                    boxShadow:'0 6px 20px rgba(189,23,28,0.35)',
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
                <div style={{ borderRadius:'20px', overflow:'hidden', border:'2px solid rgba(255,255,255,0.08)', boxShadow:'0 30px 80px rgba(0,0,0,0.2)' }}>
                  <img
                    src="/assets/images/hospital-img.png"
                    alt="NIMS Hospital Jaipur Campus"
                    style={{ width:'100%', height:'380px', objectFit:'cover', display:'block' }}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80";
                    }}
                  />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(23,42,52,0.5) 0%, transparent 50%)', borderRadius:'20px' }} />
                </div>

                {/* Stat card - bottom left */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ type:'spring', stiffness:350, damping:22 }}
                  style={{
                    position:'absolute', bottom:'-18px', left:'20px',
                    background:'rgba(255,255,255,0.96)',
                    backdropFilter:'blur(12px)',
                    padding:'1rem 1.4rem', borderRadius:'14px',
                    boxShadow:'0 16px 40px rgba(0,0,0,0.18)',
                    border:'1px solid rgba(255,255,255,0.8)',
                    cursor:'default', minWidth:'140px'
                  }}
                >
                  <div style={{ fontSize:'1.7rem', fontWeight:800, color:'var(--nims-orange)', lineHeight:1 }}>
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
                    background:'linear-gradient(135deg, var(--nims-navy), var(--nims-navy-dark))',
                    color:'white', padding:'0.8rem 1.1rem', borderRadius:'14px',
                    boxShadow:'0 12px 30px rgba(23,42,52,0.4)',
                    cursor:'default', minWidth:'120px'
                  }}
                >
                  <div style={{ fontSize:'1.3rem', fontWeight:800, lineHeight:1, color: 'var(--nims-gold)' }}>26+</div>
                  <div style={{ fontSize:'0.65rem', fontWeight:600, opacity:0.85, marginTop:'2px', textTransform:'uppercase', letterSpacing:'0.08em' }}>Years of Care</div>
                </motion.div>
              </div>
            </MotionFadeIn>
          </div>
        </div>
      </section>

      {/* OUR DOCTORS SECTION */}
      <section className="section" style={{ background: '#ffffff', borderBottom: '1px solid var(--nims-border)' }}>
        <div className="container">
          <MotionFadeIn>
            <div className="section-header" style={{ marginBottom: '1.5rem' }}>
              <span className="section-subtitle">OUR CLINICAL FACULTY</span>
              <h2>OUR DOCTORS</h2>
              <p>A dedicated and experienced team of clinicians to entrust your health and well-being.</p>
            </div>
          </MotionFadeIn>

          {/* Speciality Horizontal Scrollbar Tabs */}
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

          {/* 2-Columns Grid */}
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
              <div className="nims-review-filter-wrapper">
                <button
                  onClick={() => setReviewFilter('all')}
                  className={`nims-review-tab-btn ${reviewFilter === 'all' ? 'active-all' : ''}`}
                >
                  <span>All Stories</span>
                </button>
                <button
                  onClick={() => setReviewFilter('video')}
                  className={`nims-review-tab-btn ${reviewFilter === 'video' ? 'active-video' : ''}`}
                >
                  <Video size={15} />
                  <span>Video Reviews</span>
                </button>
                <button
                  onClick={() => setReviewFilter('written')}
                  className={`nims-review-tab-btn ${reviewFilter === 'written' ? 'active-written' : ''}`}
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '1', minWidth: '180px' }}>
                            <div style={{
                              width: '42px',
                              height: '42px',
                              borderRadius: '50%',
                              background: 'var(--nims-navy)',
                              color: 'var(--nims-gold)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              flexShrink: 0
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

                          <span className="badge-pill badge-green" style={{ fontSize: '0.7rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
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

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/reviews" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', borderRadius: '50px', fontSize: '1rem', fontWeight: 600 }}>
              <Video size={20} /> View All Patient Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* NIMS TATKAAL SEVA & EMERGENCY APP DOWNLOAD BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, #09131d 0%, #111e2b 60%, #0d1722 100%)',
        color: '#ffffff',
        padding: '3.5rem 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(229,182,74,0.2)'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="nims-emergency-callout-card">
            {/* LEFT SIDE: TEXT & CALL CTA */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'linear-gradient(135deg, #c8102e 0%, #9e0c15 100%)',
                  color: '#ffffff',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  <Ambulance size={14} color="#ffffff" /> 24×7 LEVEL-1 EMERGENCY &amp; AMBULANCE
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  background: 'rgba(229, 182, 74, 0.15)',
                  border: '1px solid rgba(229, 182, 74, 0.4)',
                  color: 'var(--nims-gold)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: 800
                }}>
                  <Sparkles size={13} /> NIMS TATKAL SEVA
                </span>
              </div>

              <h2 style={{ 
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', 
                fontWeight: 800, 
                color: '#ffffff', 
                marginBottom: '0.75rem',
                lineHeight: 1.2
              }}>
                Need Immediate Medical Assistance?
              </h2>

              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.98rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
                Book 24/7 ICU Beds, Request Emergency ALS Ambulances, or Schedule Specialist OPD Consultations instantly via the <strong>NIMS Tatkaal Seva Mobile App</strong> or call our Emergency Hotline.
              </p>

              <div className="nims-emergency-call-group">
                <a 
                  href="tel:0141-2388999"
                  className="nims-call-btn"
                >
                  <PhoneCall size={19} />
                  <span>Call 0141-23 88 999</span>
                </a>

                <button
                  onClick={() => onOpenBooking ? onOpenBooking() : null}
                  className="nims-opd-btn"
                >
                  <Calendar size={18} />
                  <span>Book OPD Doctor</span>
                </button>
              </div>
            </div>

            {/* RIGHT SIDE: NIMS TATKAAL SEVA LOGO & APP STORE / GOOGLE PLAY BUTTONS */}
            <div className="nims-app-download-box">
              <div className="nims-app-brand-header">
                <img 
                  src="/assets/NIMS_Hospital_Logo_Website_Horizontal.svg" 
                  alt="NIMS Hospital Logo"
                  className="nims-app-card-logo"
                />
                <div className="nims-app-brand-text">
                  <span className="nims-app-badge">
                    OFFICIAL MOBILE APP
                  </span>
                  <h3 className="nims-app-title">
                    NIMS TATKAAL SEVA
                  </h3>
                </div>
              </div>

              <p className="nims-app-desc">
                Download the mobile app for 1-tap ICU bed booking, emergency tracking &amp; lab reports.
              </p>

              {/* APP STORE & GOOGLE PLAY DOWNLOAD BUTTONS */}
              <div className="nims-app-store-grid">
                <Link 
                  to="/tatkaal-booking"
                  className="nims-store-btn"
                >
                  <AppStoreMark />
                  <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                    <span style={{ display: 'block', fontSize: '0.62rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Download on</span>
                    <strong style={{ fontSize: '0.86rem', fontWeight: 800 }}>App Store</strong>
                  </div>
                </Link>

                <Link 
                  to="/tatkaal-booking"
                  className="nims-store-btn"
                >
                  <GooglePlayMark />
                  <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                    <span style={{ display: 'block', fontSize: '0.62rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>GET IT ON</span>
                    <strong style={{ fontSize: '0.86rem', fontWeight: 800 }}>Google Play</strong>
                  </div>
                </Link>
              </div>
            </div>
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
