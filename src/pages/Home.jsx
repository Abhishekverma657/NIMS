import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Smartphone,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

function AppStoreBadge({ style = {} }) {
  return (
    <svg
      viewBox="0 0 135 40"
      width="148"
      height="44"
      style={{ display: 'block', height: '44px', width: 'auto', borderRadius: '8px', ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="135" height="40" rx="7" fill="#000000" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.8" />
      <g transform="translate(11, 7.5)">
        <path
          fill="#ffffff"
          d="M15.5 13.5c-.01-3.1 2.5-4.6 2.6-4.7-1.4-2.1-3.7-2.4-4.5-2.4-1.9-.2-3.7 1.1-4.7 1.1-1 0-2.5-1.1-4-1-2.1.03-4 1.2-5.1 3.1-2.2 3.8-.6 9.3 1.6 12.4 1 1.5 2.3 3.2 3.9 3.1 1.6-.06 2.2-1 4-1 1.9 0 2.4 1 4.1 1 1.7-.03 2.7-1.5 3.8-3 1.2-1.7 1.7-3.4 1.7-3.5-.03-.02-3.3-1.3-3.4-5zM12.5 4.8c.9-1 1.4-2.5 1.3-3.9-1.2.05-2.7.8-3.6 1.8-.8.9-1.4 2.3-1.3 3.8 1.4.1 2.8-.7 3.6-1.7z"
        />
      </g>
      <text x="39" y="14" fill="#ffffff" fontSize="7" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontWeight="400" letterSpacing="0.2">
        Download on the
      </text>
      <text x="39" y="28" fill="#ffffff" fontSize="13" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontWeight="700" letterSpacing="0.2">
        App Store
      </text>
    </svg>
  );
}

function GooglePlayBadge({ style = {} }) {
  return (
    <svg
      viewBox="0 0 135 40"
      width="148"
      height="44"
      style={{ display: 'block', height: '44px', width: 'auto', borderRadius: '8px', ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="135" height="40" rx="7" fill="#000000" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.8" />
      <g transform="translate(10, 8)">
        <path d="M1.2 1.3C1.07 1.45 1 1.7 1 2.05v19.9c0 .35.07.6.2.75l.08.08 11.14-11.15v-.26L1.28 1.22l-.08.08z" fill="#00d6ff" />
        <path d="M16.14 15.25l-3.72-3.72v-.26l3.72-3.72.08.05 4.41 2.51c1.26.71 1.26 1.88 0 2.6l-4.41 2.49-.08.05z" fill="#ffce00" />
        <path d="M12.42 11.53L1.2 22.75c.41.44 1.1.49 1.88.05l13.06-7.44-3.72-3.83z" fill="#ff334b" />
        <path d="M12.42 11.53L16.14 7.8 3.08.36C2.3-.08 1.61-.03 1.2.41l11.22 11.12z" fill="#00e676" />
      </g>
      <text x="41" y="14" fill="#ffffff" fontSize="7" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontWeight="500" letterSpacing="0.8">
        GET IT ON
      </text>
      <text x="41" y="28" fill="#ffffff" fontSize="13" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontWeight="700" letterSpacing="0.2">
        Google Play
      </text>
    </svg>
  );
}
import { specialitiesData } from '../data/specialitiesData';
import './SpecialitiesSection.css';
import { useDoctors } from '../context/DoctorContext';
import { packagesData } from '../data/packagesData';
import SpecialityCard from '../components/specialities/SpecialityCard';
import DoctorCard from '../components/doctors/DoctorCard';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionFadeIn, MotionStagger, MotionItem, MotionCard } from '../components/motion/MotionWrapper';
import AnimatedCounter from '../components/common/AnimatedCounter';
import VideoCard from '../components/video/VideoCard';
import VideoGalleryModal from '../components/video/VideoGalleryModal';
import { videoReviewsData } from '../data/videoReviewsData';
import { writtenTestimonialsData } from '../data/writtenTestimonialsData';
import ModernHeroSlider from '../components/home/ModernHeroSlider';

export default function Home({ onOpenBooking, onOpenPackageBooking }) {
  const { doctors } = useDoctors();
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [reviewFilter, setReviewFilter] = useState('all');
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const [expandedHomePkg, setExpandedHomePkg] = useState({});
  
  // Doctor Filter State
  const [doctorDeptFilter, setDoctorDeptFilter] = useState('Cardiology');
  const doctorTabsRef = useRef(null);

  const doctorCategories = useMemo(() => {
    const list = [
      'All Doctors',
      'Cardiology',
      'CTVS',
      'Neurosurgery',
      'Neurology',
      'Orthopaedics',
      'Obstetrics & Gynaecology',
      'Paediatrics',
      'Neonatology',
      'Urology',
      'Nephrology',
      'Gastroenterology',
      'Surgical Gastroenterology',
      'General Surgery',
      'General Medicine',
      'Respiratory Medicine',
      'Medical Oncology',
      'Surgical Oncology',
      'Radiation Oncology',
      'Endocrinology',
      'ENT',
      'Ophthalmology',
      'Dermatology',
      'Psychiatry',
      'Interventional Radiology',
      'Emergency Medicine',
      'Plastic Surgery',
      'Dental',
      'IVF & Fertility',
      'Liver Transplant, HPB & GI Surgery',
      'Spine Surgery',
      'Physiotherapy',
      'Bone Marrow Transplant (BMT)',
      'Clinical Hematology',
      'Nuclear Medicine',
      'Clinical Psychology'
    ];

    // Also include any dynamically loaded doctor department not in the base list
    if (Array.isArray(doctors)) {
      doctors.forEach(d => {
        if (d.department) {
          const clean = d.department.trim();
          const exists = list.some(c => 
            c.toLowerCase() === clean.toLowerCase() ||
            (clean.length > 5 && c.toLowerCase().includes(clean.toLowerCase()))
          );
          if (!exists && clean.length > 1) {
            list.push(clean);
          }
        }
      });
    }

    return list;
  }, [doctors]);

  const matchDoctorToDept = (d, filterDept) => {
    if (!filterDept || filterDept === 'All' || filterDept === 'All Doctors') return true;
    const f = filterDept.toLowerCase().trim();
    const dept = (d.department || '').toLowerCase().trim();
    const spec = (d.specialityId || '').toLowerCase().trim();
    const title = (d.title || '').toLowerCase().trim();

    if (f === 'cardiology') {
      return (dept.includes('cardio') && !dept.includes('thoracic') && !dept.includes('ctvs')) || spec === 'cardiology';
    }
    if (f === 'ctvs') {
      return dept.includes('ctvs') || dept.includes('cardiothoracic') || spec === 'ctvs' || title.includes('ctvs');
    }
    if (f === 'neurosurgery') {
      return dept.includes('neurosurg') || spec.includes('neurosurg') || title.includes('neurosurg');
    }
    if (f === 'neurology') {
      return (dept.includes('neurolog') && !dept.includes('surg')) || (spec.includes('neurolog') && !spec.includes('surg'));
    }
    if (f.includes('ortho')) {
      return dept.includes('ortho') || spec.includes('ortho') || title.includes('ortho');
    }
    if (f.includes('gynae') || f.includes('obstetric')) {
      return dept.includes('gynae') || dept.includes('obstetric') || spec.includes('gynae') || spec.includes('obstetric');
    }
    if (f === 'paediatrics' || f === 'pediatrics') {
      return dept.includes('paediatr') || dept.includes('pediatr') || spec.includes('paediatr') || spec.includes('pediatr');
    }
    if (f.includes('neonat')) {
      return dept.includes('neonat') || dept.includes('neonant') || spec.includes('neonat') || spec.includes('neonant');
    }
    if (f === 'urology') {
      return (!dept.includes('neuro') && dept.includes('urolog')) || spec === 'urology' || (!title.includes('neuro') && title.includes('urolog'));
    }
    if (f === 'nephrology') {
      return dept.includes('nephrolog') || spec.includes('nephrolog') || title.includes('nephrolog');
    }
    if (f === 'gastroenterology') {
      return dept.includes('gastro') || spec.includes('gastro');
    }
    if (f.includes('surgical gastro')) {
      return (dept.includes('gastro') && dept.includes('surg')) || spec.includes('surgical-gastro') || dept.includes('gastro');
    }
    if (f === 'general surgery') {
      return (dept.includes('general') && dept.includes('surg')) || spec === 'general-surgery';
    }
    if (f === 'general medicine') {
      return (dept.includes('general') && dept.includes('med')) || dept.includes('internal medicine') || spec === 'general-medicine' || spec === 'internal-medicine';
    }
    if (f.includes('respiratory') || f.includes('tb & resp') || f.includes('pulmon')) {
      return dept.includes('respirat') || dept.includes('pulmon') || spec.includes('respirat') || dept.includes('chest');
    }
    if (f.includes('medical oncology')) {
      return (dept.includes('onco') && dept.includes('med')) || spec === 'medical-oncology';
    }
    if (f.includes('surgical oncology')) {
      return (dept.includes('onco') && dept.includes('surg')) || spec === 'surgical-oncology';
    }
    if (f.includes('radiation oncology')) {
      return (dept.includes('onco') && dept.includes('rad')) || spec === 'radiation-oncology';
    }
    if (f.includes('endocrin')) {
      return dept.includes('endocrin') || spec.includes('endocrin');
    }
    if (f === 'ent') {
      return /\bent\b/i.test(dept) || spec === 'ent' || title.includes('otorhinolaryngology') || /\bent\b/i.test(title);
    }
    if (f.includes('ophthalm')) {
      return dept.includes('ophthalm') || dept.includes('opthalm') || spec.includes('ophthalm') || spec.includes('opthalm');
    }
    if (f.includes('derma') || f.includes('skin')) {
      return dept.includes('derma') || dept.includes('skin') || spec.includes('derma') || spec.includes('skin');
    }
    if (f.includes('psychiat')) {
      return dept.includes('psychiat') || spec.includes('psychiat');
    }
    if (f.includes('interventional radiology') || f === 'i-r') {
      return dept.includes('i-r') || dept.includes('interventional radiol') || spec.includes('i-r') || spec.includes('interventional-radiology');
    }
    if (f.includes('emergency')) {
      return dept.includes('emergency') || spec.includes('emergency');
    }
    if (f.includes('plastic')) {
      return dept.includes('plastic') || spec.includes('plastic');
    }
    if (f.includes('dental')) {
      return dept.includes('dental') || spec.includes('dental');
    }
    if (f.includes('ivf')) {
      return dept.includes('ivf') || spec.includes('ivf');
    }
    if (f.includes('liver') || f.includes('hpb')) {
      return dept.includes('liver') || dept.includes('hpb') || spec.includes('liver') || spec.includes('hpb');
    }
    if (f.includes('spine')) {
      return dept.includes('spine') || spec.includes('spine');
    }
    if (f.includes('physio')) {
      return dept.includes('physio') || spec.includes('physio');
    }
    if (f.includes('bmt') || f.includes('bone marrow')) {
      return dept.includes('bmt') || dept.includes('bone marrow') || spec.includes('bmt');
    }
    if (f.includes('hematol')) {
      return dept.includes('hematol') || spec.includes('hematol');
    }
    if (f.includes('nuclear')) {
      return dept.includes('nuclear') || spec.includes('nuclear');
    }
    if (f.includes('psycholog')) {
      return dept.includes('psycholog') || spec.includes('psycholog');
    }

    return dept.includes(f) || spec.includes(f) || title.includes(f);
  };

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
      image: '/assets/slider/slider3.png',
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
  const videoReviews = videoReviewsData.filter(v => !v.doctorId).slice(0, 4);
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

              <Link
                to="/health-packages"
                className="btn btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.6rem',
                  fontSize: '0.9rem',
                  borderRadius: '50px',
                  textDecoration: 'none'
                }}
              >
                <span>View All Health Packages</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </MotionFadeIn>

          <MotionStagger style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(1.5rem, 2.2vw, 2.25rem)',
            alignItems: 'start'
          }} staggerDelay={0.08}>
            {featuredPackages.map((pkg) => (
              <MotionItem key={pkg.id}>
                <div style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  padding: 'clamp(1.75rem, 2.2vw, 2.35rem)',
                  border: '1px solid var(--nims-border)',
                  boxShadow: '0 10px 30px rgba(23, 42, 52, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease'
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.1rem' }}>
                      <span style={{
                        background: 'rgba(189, 23, 28, 0.1)',
                        color: 'var(--nims-orange)',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '9999px',
                        fontSize: '0.85rem',
                        fontWeight: 800
                      }}>
                        {pkg.discount || 'Special Price'}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Tag size={15} color="var(--nims-gold)" />
                        {pkg.category}
                      </span>
                    </div>

                    <h3 style={{ fontSize: 'clamp(1.3rem, 1.6vw, 1.55rem)', fontWeight: 800, color: 'var(--nims-navy)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                      {pkg.name}
                    </h3>
                    <p style={{ fontSize: '0.94rem', color: 'var(--color-text-secondary)', marginBottom: '1.35rem', lineHeight: 1.5 }}>
                      {pkg.badge}
                    </p>

                    <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '14px', marginBottom: '1.5rem', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--nims-navy)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Key Included Parameters ({pkg.testsCount} Tests):
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                        {pkg.tests.slice(0, 4).map((test, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.94rem', color: '#334155' }}>
                            <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0 }} />
                            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{test}</span>
                          </div>
                        ))}

                        <AnimatePresence initial={false}>
                          {expandedHomePkg[pkg.id] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.28, ease: 'easeInOut' }}
                              style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '0.55rem', paddingTop: '0.2rem' }}
                            >
                              {pkg.tests.slice(4).map((test, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, y: -4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.02, duration: 0.18 }}
                                  style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.94rem', color: '#334155' }}
                                >
                                  <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0 }} />
                                  <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{test}</span>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {pkg.tests.length > 4 && (
                          <button
                            type="button"
                            onClick={() => setExpandedHomePkg(prev => ({ ...prev, [pkg.id]: !prev[pkg.id] }))}
                            style={{
                              background: '#ffffff',
                              border: '1px dashed #cbd5e1',
                              borderRadius: '8px',
                              padding: '0.45rem 0.65rem',
                              color: 'var(--nims-orange)',
                              fontWeight: 700,
                              fontSize: '0.82rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginTop: '0.35rem',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <span>
                              {expandedHomePkg[pkg.id]
                                ? '▲ Collapse extra tests'
                                : `+ ${pkg.tests.length - 4} more vital tests (Click to View)`}
                            </span>
                            <ChevronDown size={14} style={{ transform: expandedHomePkg[pkg.id] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem', marginBottom: '1.35rem' }}>
                      <span style={{ fontSize: 'clamp(1.8rem, 2.2vw, 2.25rem)', fontWeight: 900, color: 'var(--nims-navy)' }}>
                        {pkg.price}
                      </span>
                      {pkg.originalPrice && (
                        <span style={{ fontSize: '1.05rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                          {pkg.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenPackageBooking ? onOpenPackageBooking(pkg) : null}
                      style={{
                        width: '100%',
                        padding: '0.92rem 1.4rem',
                        borderRadius: '50px',
                        background: 'linear-gradient(135deg, var(--nims-orange) 0%, #9e1217 100%)',
                        color: '#ffffff',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: 'clamp(0.95rem, 1vw, 1.05rem)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.55rem',
                        boxShadow: '0 4px 15px rgba(189, 23, 28, 0.3)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <FlaskConical size={18} />
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
                    Unit of NIMS University Rajasthan • 26+ Years of Trusted Care
                  </span>
                </div>

                <h2 style={{ fontSize:'clamp(1.8rem, 3vw, 2.6rem)', fontWeight:800, color:'var(--nims-navy)', lineHeight:1.15, marginBottom:'1.25rem', letterSpacing:'-0.02em' }}>
                  World-Class Healthcare,<br />
                  <span style={{ color:'var(--nims-orange)' }}>Accessible &amp; Compassionate</span><br />
                  For Every Family.
                </h2>

                <p style={{ fontSize:'0.96rem', lineHeight:1.75, marginBottom:'0.9rem', color:'#475569' }}>
                  <strong>NIMS Hospital is a unit of NIMS University Rajasthan</strong>, built on a simple belief — that care should be advanced enough to treat the most complex conditions, affordable enough for every family, and compassionate enough that every patient feels cared for from the moment they arrive.
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
            const list = doctors.filter(d => {
              if (d.isOpdAvailable === false) return false;
              return matchDoctorToDept(d, doctorDeptFilter);
            });

            if (list.length === 0) {
              return (
                <div style={{
                  textAlign: 'center',
                  padding: '3rem 1.5rem',
                  background: '#f8fafc',
                  borderRadius: '16px',
                  border: '1px dashed #cbd5e1',
                  margin: '1.5rem 0'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(189, 23, 28, 0.1)',
                    color: 'var(--nims-crimson)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <Stethoscope size={24} />
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--nims-navy)', marginBottom: '0.35rem' }}>
                    Specialist Consultants Available at OPD
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', maxWidth: '520px', margin: '0 auto 1.25rem' }}>
                    {doctorDeptFilter} department faculty and attending consultants are on duty at NIMS Hospital OPD. Connect with our helpdesk to consult or book a visit.
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => setDoctorDeptFilter('All Doctors')}
                      className="btn btn-outline"
                      style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}
                    >
                      View All Doctors
                    </button>
                    <button
                      type="button"
                      onClick={onOpenBooking}
                      className="btn btn-primary"
                      style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}
                    >
                      Book OPD Consultation
                    </button>
                  </div>
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

              <MotionStagger className="nims-testimonials-grid" staggerDelay={0.08}>
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

              <MotionStagger className="nims-testimonials-grid" staggerDelay={0.08}>
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
                    <span className="nims-pulse-dot" />
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

              {/* REAL OFFICIAL APP STORE & GOOGLE PLAY DOWNLOAD BADGES */}
              <div className="nims-app-store-grid">
                <a 
                  href="https://www.nimstatkalseva.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nims-store-badge-link"
                  title="Download NIMS Tatkal Seva on Apple App Store"
                >
                  <AppStoreBadge />
                </a>

                <a 
                  href="https://play.google.com/store/apps/details?id=com.nimstatkalseva.android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nims-store-badge-link"
                  title="Get NIMS Tatkal Seva on Google Play"
                >
                  <GooglePlayBadge />
                </a>
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
