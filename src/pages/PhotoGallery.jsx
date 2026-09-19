import React, { useState, useEffect, useCallback } from 'react';
import { galleryData } from '../data/galleryData';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Sparkles,
  Maximize2,
  Camera,
  Layers,
  ArrowRight
} from 'lucide-react';
import { createPortal } from 'react-dom';
import AnimatedCounter from '../components/common/AnimatedCounter';

export default function PhotoGallery() {
  const [activeTab, setActiveTab] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = [
    'All',
    'Campus & Facilities',
    'OTs & Critical Care',
    'Diagnostics & Technology',
    'Emergency & Ambulance',
    'Clinical Care & Wards'
  ];

  const filtered = galleryData.filter(
    (item) => activeTab === 'All' || item.category === activeTab
  );

  // Lightbox navigation handlers
  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
  }, [filtered.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
  }, [filtered.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex, handlePrev, handleNext]);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Dynamic Header Banner */}
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--nims-orange)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.85rem', borderRadius: 'var(--radius-full)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.85rem' }}>
            <Camera size={13} />
            <span>Official Photo Gallery</span>
          </div>

          <h1
            style={{
              color: '#ffffff',
              fontSize: 'clamp(2rem, 3.8vw, 2.9rem)',
              marginBottom: '0.75rem',
              fontWeight: 800,
              lineHeight: 1.2
            }}
          >
            A Visual Tour of NIMS Hospital
          </h1>

          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '720px', lineHeight: 1.6, margin: 0 }}>
            Experience our sprawling 3,400-bed campus, advanced modular surgical suites, 24×7 ALS ambulances, high-end diagnostic laboratories, and comforting inpatient recovery suites.
          </p>

          {/* Highlights Ribbon */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginTop: '2rem',
              paddingTop: '1.75rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--nims-orange)' }}>
                <AnimatedCounter target={30} suffix="+" />
              </span>
              <span style={{ fontSize: '0.86rem', color: '#94a3b8' }}>High-Resolution Facilities</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                <AnimatedCounter target={3400} suffix="+" />
              </span>
              <span style={{ fontSize: '0.86rem', color: '#94a3b8' }}>Inpatient Beds</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#10b981' }}>
                <AnimatedCounter staticText="24×7" />
              </span>
              <span style={{ fontSize: '0.86rem', color: '#94a3b8' }}>Level-1 Emergency & Trauma</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="section" style={{ paddingTop: '2.5rem' }}>
        <div className="container">
          {/* Controls Bar: Filter Pills + Counter */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.25rem',
              marginBottom: '2.5rem',
              background: '#ffffff',
              padding: '1rem 1.4rem',
              borderRadius: '20px',
              border: '1px solid #edf2f7',
              boxShadow: '0 4px 16px rgba(10, 47, 94, 0.03)'
            }}
          >
            {/* Category Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {categories.map((cat) => {
                const count = cat === 'All' ? galleryData.length : galleryData.filter(i => i.category === cat).length;
                const isActive = activeTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    style={{
                      padding: '0.5rem 1.15rem',
                      borderRadius: 'var(--radius-xl)',
                      border: '1px solid',
                      borderColor: isActive ? 'var(--nims-navy)' : '#e2e8f0',
                      background: isActive ? 'var(--nims-navy)' : '#ffffff',
                      color: isActive ? '#ffffff' : 'var(--nims-text)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>{cat}</span>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        padding: '0.1rem 0.45rem',
                        borderRadius: '10px',
                        background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(10, 47, 94, 0.08)',
                        color: isActive ? '#ffffff' : 'var(--nims-navy)',
                        fontWeight: 700
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Total Results Count */}
            <div style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: 600 }}>
              Showing <b>{filtered.length}</b> photographs
            </div>
          </div>

          {/* Photo Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: '1.5rem'
            }}
          >
            {filtered.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #edf2f7',
                  boxShadow: '0 4px 16px rgba(10, 47, 94, 0.04)',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 18px 36px rgba(10, 47, 94, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(244, 117, 33, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(10, 47, 94, 0.04)';
                  e.currentTarget.style.borderColor = '#edf2f7';
                }}
              >
                {/* Photo Preview with Zoom Icon on Hover */}
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden', background: '#f1f5f9' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.45s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                  />

                  {/* Category Pill Over Image */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(10, 47, 94, 0.88)',
                      backdropFilter: 'blur(8px)',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}
                  >
                    {item.category}
                  </div>

                  {/* Zoom Hover Icon Button */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(6px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--nims-navy)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}
                  >
                    <Maximize2 size={16} />
                  </div>
                </div>

                {/* Card Information */}
                <div style={{ padding: '1.25rem 1.4rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'var(--nims-navy)',
                        margin: '0 0 0.4rem 0',
                        lineHeight: 1.35,
                        fontFamily: 'Plus Jakarta Sans',
                        sansSerif: true
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.85rem',
                        color: '#64748b',
                        lineHeight: 1.5,
                        margin: 0
                      }}
                    >
                      {item.caption}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: 'var(--nims-orange)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      marginTop: '1rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid #f1f5f9'
                    }}
                  >
                    <span>View Fullscreen</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Fullscreen Lightbox Modal with Slideshow & Thumbnails */}
      {lightboxIndex !== null && filtered[lightboxIndex] && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 999999,
            background: 'rgba(3, 16, 36, 0.96)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Control Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 2rem',
              color: '#ffffff',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(5, 26, 54, 0.6)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span
                style={{
                  background: 'var(--nims-orange)',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.75rem',
                  borderRadius: '20px'
                }}
              >
                {filtered[lightboxIndex].category}
              </span>
              <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                Photo <b>{lightboxIndex + 1}</b> of <b>{filtered.length}</b>
              </span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
              aria-label="Close Lightbox"
            >
              <X size={22} />
            </button>
          </div>

          {/* Central Main Image Area with Previous & Next Arrows */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.5rem',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Arrow */}
            <button
              onClick={handlePrev}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                borderRadius: '50%',
                width: '52px',
                height: '52px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flexShrink: 0,
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--nims-orange)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'none';
              }}
              aria-label="Previous Photo"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Big Center Image */}
            <div
              style={{
                maxWidth: '85vw',
                maxHeight: '68vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={filtered[lightboxIndex].image}
                alt={filtered[lightboxIndex].title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '68vh',
                  objectFit: 'contain',
                  borderRadius: '16px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)'
                }}
              />
            </div>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                borderRadius: '50%',
                width: '52px',
                height: '52px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flexShrink: 0,
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--nims-orange)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'none';
              }}
              aria-label="Next Photo"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Bottom Info Bar & Thumbnails Strip */}
          <div
            style={{
              background: 'rgba(5, 26, 54, 0.85)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '1rem 2rem',
              color: '#ffffff'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title & Caption */}
            <div style={{ maxWidth: '800px', margin: '0 auto 1rem auto', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#ffffff', margin: '0 0 0.35rem 0', fontWeight: 700 }}>
                {filtered[lightboxIndex].title}
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>
                {filtered[lightboxIndex].caption}
              </p>
            </div>

            {/* Thumbnail Strip */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                overflowX: 'auto',
                padding: '0.25rem 0'
              }}
            >
              {filtered.map((thumb, idx) => (
                <button
                  key={thumb.id}
                  onClick={() => setLightboxIndex(idx)}
                  style={{
                    width: '56px',
                    height: '42px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: idx === lightboxIndex ? '2px solid var(--nims-orange)' : '1px solid rgba(255,255,255,0.2)',
                    opacity: idx === lightboxIndex ? 1 : 0.55,
                    padding: 0,
                    cursor: 'pointer',
                    background: 'transparent',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <img
                    src={thumb.image}
                    alt={thumb.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
