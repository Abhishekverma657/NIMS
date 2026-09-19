import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Star, MessageSquare } from 'lucide-react';
import { MotionFadeIn, MotionStagger, MotionItem } from '../components/motion/MotionWrapper';
import VideoCard from '../components/video/VideoCard';
import VideoGalleryModal from '../components/video/VideoGalleryModal';
import { videoReviewsData } from '../data/videoReviewsData';
import { writtenTestimonialsData } from '../data/writtenTestimonialsData';
import Footer from '../components/common/Footer';

export default function Reviews() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const [reviewFilter, setReviewFilter] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-transition">
      <div style={{
        background: 'linear-gradient(135deg, var(--nims-navy) 0%, #1a4f8b 100%)',
        padding: '6rem 5% 4rem',
        color: '#fff',
        textAlign: 'center'
      }}>
        <MotionFadeIn>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '50px', marginBottom: '1rem', backdropFilter: 'blur(10px)' }}>
            <Star size={16} color="var(--nims-orange)" fill="var(--nims-orange)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em' }}>PATIENT REVIEWS</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0' }}>Real Stories, Real Healing</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: '#cbd5e1', lineHeight: 1.6 }}>
            Read and watch the inspiring journeys of our patients who trusted NIMS Hospital for their medical care.
          </p>
        </MotionFadeIn>
      </div>

      <section style={{ padding: '4rem 5%', background: 'var(--color-background)', minHeight: '60vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Filters */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {['all', 'video', 'written'].map((filter) => (
              <button
                key={filter}
                onClick={() => setReviewFilter(filter)}
                style={{
                  padding: '0.6rem 1.5rem',
                  borderRadius: '50px',
                  border: 'none',
                  background: reviewFilter === filter ? 'var(--nims-navy)' : '#fff',
                  color: reviewFilter === filter ? '#fff' : 'var(--color-text)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: reviewFilter === filter ? '0 8px 20px rgba(10, 47, 94, 0.2)' : '0 2px 8px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  textTransform: 'capitalize'
                }}
              >
                {filter === 'all' ? 'All Reviews' : filter === 'video' ? 'Video Stories' : 'Written Reviews'}
              </button>
            ))}
          </div>

          <MotionStagger style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
            gap: '2rem'
          }} key={reviewFilter}>
            
            {/* Video Reviews */}
            {(reviewFilter === 'all' || reviewFilter === 'video') && videoReviewsData.map((item, idx) => (
              <VideoCard 
                key={item.id} 
                item={item} 
                index={idx}
                setActiveVideoModal={setActiveVideoIndex}
              />
            ))}

            {/* Written Testimonials */}
            {(reviewFilter === 'all' || reviewFilter === 'written') && writtenTestimonialsData.map((testi, idx) => (
              <MotionItem key={`written-${idx}`}>
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
                    height: '100%',
                    borderRadius: '16px'
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
                      {[...Array(testi.rating)].map((_, rIdx) => (
                        <Star key={rIdx} size={15} fill="#f59e0b" color="#f59e0b" />
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
      </section>

      <Footer />

      {/* VIDEO MODAL (Gallery View) */}
      <VideoGalleryModal 
        activeVideoIndex={activeVideoIndex} 
        setActiveVideoIndex={setActiveVideoIndex} 
      />
    </div>
  );
}
