import React from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { videoReviewsData } from '../../data/videoReviewsData';

const VideoGalleryModal = ({ activeVideoIndex, setActiveVideoIndex, videoList = videoReviewsData }) => {
  if (activeVideoIndex === null) return null;

  return createPortal(
    <div
      onClick={() => setActiveVideoIndex(null)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        background: 'rgba(35, 32, 33, 0.95)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '900px',
          width: '100%',
          background: '#000000',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveVideoIndex(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            background: 'rgba(0,0,0,0.6)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--nims-orange)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
        >
          <X size={22} />
        </button>

        {/* Prev Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveVideoIndex((prev) => (prev > 0 ? prev - 1 : videoList.length - 1));
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '16px',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(4px)',
            border: 'none',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--nims-orange)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          <ChevronLeft size={28} />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveVideoIndex((prev) => (prev < videoList.length - 1 ? prev + 1 : 0));
          }}
          style={{
            position: 'absolute',
            top: '50%',
            right: '16px',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(4px)',
            border: 'none',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--nims-orange)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          <ChevronRight size={28} />
        </button>

        {/* Video Player */}
        <div style={{ height: '60vh', minHeight: '300px', width: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <video
            key={videoList[activeVideoIndex]?.id}
            controls
            autoPlay
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          >
            <source src={videoList[activeVideoIndex]?.videoUrl} type="video/mp4" />
          </video>
        </div>

        {/* Video Details */}
        <div style={{ padding: '1.25rem 2rem', background: '#373435', color: '#fff' }}>
          <h3 style={{ color: '#fff', fontSize: '1.25rem', margin: '0' }}>
            {videoList[activeVideoIndex]?.title}
          </h3>
          <p style={{ color: 'var(--nims-orange)', fontSize: '0.9rem', margin: '0.25rem 0 0 0', fontWeight: 600 }}>
            Video {activeVideoIndex + 1} of {videoList.length}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default VideoGalleryModal;
