import React, { useState } from 'react';
import { Calendar, CheckCircle2, ChevronDown, ChevronUp, ShieldCheck, Tag, HeartPulse, Search } from 'lucide-react';
import { packagesData } from '../data/packagesData';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionFadeIn, MotionStagger, MotionItem } from '../components/motion/MotionWrapper';

export default function HealthPackages({ onOpenBooking, onOpenPackageBooking }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Full Body & Executive', 'Women & Motherhood', 'Heart & Cardio', 'Radiology & Scans', 'Senior Citizen'];

  const filtered = packagesData.filter((pkg) => {
    const matchesCat = activeCategory === 'All' || pkg.category === activeCategory;
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pkg.tests.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const toggleExpand = (id) => {
    setExpandedPackage(expandedPackage === id ? null : id);
  };

  return (
    <div>
      {/* Banner */}
      <section style={{
        background: 'linear-gradient(135deg, var(--nims-navy) 0%, var(--nims-navy-light) 100%)',
        color: '#ffffff',
        padding: '3.5rem 0 2.5rem',
        borderBottom: '3px solid var(--nims-gold)'
      }}>
        <div className="container">
          <span className="badge-pill badge-gold" style={{ marginBottom: '0.75rem' }}>
            Preventive Healthcare & Diagnostics
          </span>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '0.5rem' }}>
            Health Packages ({packagesData.length} Panels Available)
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.02rem', maxWidth: '650px' }}>
            Early diagnosis saves lives. Choose from comprehensive master health checkups, maternity panels, cardiac wellness, and senior citizen packages at subsidized rates.
          </p>
        </div>
      </section>

      {/* Main Filter & Grid */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          {/* Controls Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2.5rem',
            background: '#ffffff',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--nims-border)'
          }}>
            {/* Category Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid',
                    borderColor: activeCategory === cat ? 'var(--nims-navy)' : '#e2e8f0',
                    background: activeCategory === cat ? 'var(--nims-navy)' : '#ffffff',
                    color: activeCategory === cat ? '#ffffff' : 'var(--nims-text)',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.18s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#f8fafc',
              border: '1px solid var(--nims-border)',
              borderRadius: 'var(--radius-full)',
              padding: '0.45rem 1rem',
              width: '100%',
              maxWidth: '280px'
            }}>
              <Search size={16} color="#94a3b8" style={{ marginRight: '0.5rem' }} />
              <input
                type="text"
                placeholder="Search test or package..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.86rem',
                  width: '100%',
                  background: 'transparent'
                }}
              />
            </div>
          </div>

          {/* Cards Grid */}
          <MotionStagger
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
              gap: '1.75rem',
              alignItems: 'start'
            }}
            staggerDelay={0.07}
          >
            {filtered.map((pkg) => {
              const isExpanded = expandedPackage === pkg.id;
              return (
                <MotionItem key={pkg.id}>
                  <motion.div
                    className="health-package-card"
                    layout
                    whileHover={{ y: -5, boxShadow: '0 20px 45px rgba(10, 47, 94, 0.11)' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  >
                    <div>
                      {/* Top Badge Strip */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            color: 'var(--nims-navy)',
                            background: '#f1f5f9',
                            padding: '0.24rem 0.65rem',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid #e2e8f0'
                          }}
                        >
                          {pkg.category}
                        </span>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            letterSpacing: '0.03em',
                            color: '#15803d',
                            background: '#dcfce7',
                            padding: '0.24rem 0.65rem',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid #bbf7d0'
                          }}
                        >
                          {pkg.discount}
                        </span>
                      </div>

                      {/* Package Name */}
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--nims-navy)', marginBottom: '0.35rem', lineHeight: 1.25, minHeight: '3.15rem', display: 'flex', alignItems: 'center', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        {pkg.name}
                      </h3>

                      {/* Highlights / Speciality Subtitle */}
                      <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--nims-orange)', marginBottom: '1.15rem', display: 'flex', alignItems: 'center', gap: '5px', minHeight: '1.35rem' }}>
                        <span>★</span>
                        <span>{pkg.badge}</span>
                      </div>

                      {/* Luxury Price Strip */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                        padding: '0.85rem 1.15rem',
                        background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        marginBottom: '1.35rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem' }}>
                          <span style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--nims-navy)', letterSpacing: '-0.02em' }}>
                            {pkg.price}
                          </span>
                          <span style={{ fontSize: '0.9rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                            {pkg.originalPrice}
                          </span>
                        </div>
                        <span style={{
                          fontSize: '0.75rem',
                          color: '#15803d',
                          fontWeight: 800,
                          background: '#ffffff',
                          padding: '0.22rem 0.6rem',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid #bbf7d0',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                        }}>
                          {pkg.testsCount} Tests
                        </span>
                      </div>

                      {/* Key Parameters Included Header & List */}
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.65rem' }}>
                          Key Parameters Included:
                        </div>
                        
                        {/* First 4 Tests (Always Visible & Consistent) */}
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: '#334155' }}>
                          {pkg.tests.slice(0, 4).map((test, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', lineHeight: 1.4 }}>
                              <CheckCircle2 size={16} color="var(--nims-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                              <span style={{ fontWeight: 500 }}>{test}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Smooth Animated Extra Tests (Beyond 4) */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              key={`expanded-${pkg.id}`}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                              style={{ overflow: 'hidden' }}
                            >
                              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.5rem', fontSize: '0.88rem', color: '#334155' }}>
                                {pkg.tests.slice(4).map((test, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.02, duration: 0.18 }}
                                    style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', lineHeight: 1.4 }}
                                  >
                                    <CheckCircle2 size={16} color="var(--nims-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                    <span style={{ fontWeight: 500 }}>{test}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Footer Actions: Expand Button / Placeholder & Book CTA */}
                    <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                      <div style={{ minHeight: '40px', display: 'flex', alignItems: 'center', marginBottom: '1.15rem' }}>
                        {pkg.tests.length > 4 ? (
                          <button
                            type="button"
                            onClick={() => toggleExpand(pkg.id)}
                            className="package-expand-btn"
                          >
                            <span>{isExpanded ? 'Show Less' : `+${pkg.tests.length - 4} More Tests`}</span>
                            <motion.span
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.24, ease: 'easeInOut' }}
                              style={{ display: 'inline-flex' }}
                            >
                              <ChevronDown size={15} />
                            </motion.span>
                          </button>
                        ) : (
                          <span style={{
                            fontSize: '0.78rem',
                            color: '#64748b',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            background: '#f8fafc',
                            padding: '0.35rem 0.75rem',
                            borderRadius: 'var(--radius-full)',
                            border: '1px dashed #cbd5e1',
                            fontWeight: 600
                          }}>
                            <CheckCircle2 size={13} color="#15803d" />
                            All Core Tests Included
                          </span>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          if (onOpenPackageBooking) {
                            onOpenPackageBooking(pkg);
                          } else if (onOpenBooking) {
                            onOpenBooking(pkg);
                          }
                        }}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '0.8rem 1rem', fontSize: '0.94rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                      >
                        <Calendar size={16} />
                        <span>Book Package Checkup</span>
                      </motion.button>
                    </div>
                  </motion.div>
                </MotionItem>
              );
            })}
          </MotionStagger>
      </div>
    </section>
    </div>
  );
}
