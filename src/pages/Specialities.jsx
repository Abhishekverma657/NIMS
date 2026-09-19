import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { specialitiesData } from '../data/specialitiesData';
import SpecialityCard from '../components/specialities/SpecialityCard';
import { motion } from 'framer-motion';
import { MotionFadeIn, MotionStagger, MotionItem } from '../components/motion/MotionWrapper';

export default function Specialities({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Super Speciality', 'Surgical', 'Medical & Allied', 'Mother & Child', 'Diagnostics'];

  const handleCategoryClick = (cat, e) => {
    setActiveCategory(cat);
    if (e && e.currentTarget) {
      e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  const filtered = specialitiesData.filter((item) => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.shortDesc && item.shortDesc.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          item.procedures.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      {/* Banner */}
      <section style={{
        background: 'linear-gradient(135deg, var(--nims-navy) 0%, var(--nims-navy-dark) 100%)',
        color: '#ffffff',
        padding: '3.5rem 0 2.75rem',
        borderBottom: '3px solid var(--nims-orange)'
      }}>
        <div className="container">
          <MotionFadeIn>
            <span className="badge-pill" style={{ background: 'var(--nims-orange)', color: '#ffffff', marginBottom: '0.85rem' }}>
              NIMS Centres of Clinical Excellence
            </span>
            <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '0.65rem' }}>
              Specialities & Super Specialities
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '700px', lineHeight: 1.6 }}>
              Explore over 30 clinical disciplines staffed by 500+ experienced clinicians, equipped with 3,400 beds, advanced diagnostic pathology, and modular surgical theatres.
            </p>
          </MotionFadeIn>
        </div>
      </section>

      {/* Main Filter & Grid */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          {/* Controls Bar */}
          <MotionFadeIn delay={0.08}>
            <div className="nims-specialities-filter-bar" style={{
              padding: '1rem 1.25rem',
              background: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-1)',
              border: '1px solid #edf2f7'
            }}>
              {/* Category Filter Pills with Horizontal Touch Scroll */}
              <div className="nims-filter-pill-scroll">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={(e) => handleCategoryClick(cat, e)}
                    className={`nims-filter-pill ${activeCategory === cat ? 'active' : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="speciality-search-box" style={{
                display: 'flex',
                alignItems: 'center',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 'var(--radius-xl)',
                padding: '0.45rem 1rem',
                width: '100%',
                maxWidth: '300px',
                flexShrink: 0
              }}>
                <Search size={16} color="#94a3b8" style={{ marginRight: '0.5rem' }} />
                <input
                  type="text"
                  placeholder="Search specialty, procedure..."
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
          </MotionFadeIn>

          {/* Results Count */}
          <div style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: '#64748b' }}>
            Showing <b>{filtered.length}</b> clinical departments
          </div>

          {/* Cards Grid using exact same card design */}
          {filtered.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1.5rem',
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              color: '#64748b'
            }}>
              <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--nims-navy)', marginBottom: '0.4rem' }}>
                No clinical departments found
              </p>
              <p style={{ fontSize: '0.88rem' }}>
                Try searching with a different term or tap the "All" category above.
              </p>
            </div>
          ) : (
            <MotionStagger
              key={`spec-page-${activeCategory}-${searchTerm}`}
              className="specialities-three-col-grid"
              staggerDelay={0.025}
            >
              {filtered.map((spec) => (
                <MotionItem key={spec.id}>
                  <SpecialityCard spec={spec} />
                </MotionItem>
              ))}
            </MotionStagger>
          )}
        </div>
      </section>
    </div>
  );
}
