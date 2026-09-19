import React, { useState } from 'react';
import { Calendar, CheckCircle2, ChevronDown, ChevronUp, ShieldCheck, Tag, HeartPulse, Search } from 'lucide-react';
import { packagesData } from '../data/packagesData';
import { motion } from 'framer-motion';
import { MotionFadeIn, MotionStagger, MotionItem } from '../components/motion/MotionWrapper';

export default function HealthPackages({ onOpenBooking }) {
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
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem'
            }}
            staggerDelay={0.07}
          >
            {filtered.map((pkg) => {
              const isExpanded = expandedPackage === pkg.id;
              return (
                <MotionItem key={pkg.id}>
                  <motion.div
                    className="smooth-card"
                    whileHover={{ y: -6, boxShadow: '0 20px 42px rgba(10, 47, 94, 0.12)' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                    style={{
                      padding: '1.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      background: '#ffffff',
                      borderTop: '4px solid var(--nims-navy)',
                      height: '100%'
                    }}
                  >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <span className="badge-pill badge-gold" style={{ fontSize: '0.72rem' }}>
                        {pkg.category}
                      </span>
                      <span className="badge-pill badge-crimson" style={{ fontSize: '0.72rem' }}>
                        {pkg.discount}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.35rem' }}>
                      {pkg.name}
                    </h3>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--nims-gold)', marginBottom: '1rem' }}>
                      ★ {pkg.badge}
                    </div>

                    {/* Price Block */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      background: '#f8fafc',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '1.25rem'
                    }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--nims-navy)' }}>
                        {pkg.price}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                        {pkg.originalPrice}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700, marginLeft: 'auto' }}>
                        {pkg.testsCount} Tests Included
                      </span>
                    </div>

                    {/* Preview Tests (First 4) */}
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--nims-navy)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        Key Parameters Included:
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.86rem', color: '#475569' }}>
                        {(isExpanded ? pkg.tests : pkg.tests.slice(0, 4)).map((test, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                            <CheckCircle2 size={15} color="var(--nims-crimson)" style={{ flexShrink: 0, marginTop: '3px' }} />
                            <span>{test}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    {pkg.tests.length > 4 && (
                      <button
                        onClick={() => toggleExpand(pkg.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--nims-navy)',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.4rem 0',
                          marginBottom: '1rem'
                        }}
                      >
                        <span>{isExpanded ? 'Show Less' : `+${pkg.tests.length - 4} More Tests`}</span>
                        {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </button>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={onOpenBooking}
                      className="btn btn-primary"
                      style={{ width: '100%', padding: '0.7rem' }}
                    >
                      <Calendar size={15} />
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
