import React from 'react';
import { motion } from 'framer-motion';
import { Play, Video } from 'lucide-react';
import { MotionItem } from '../motion/MotionWrapper';

const VideoCard = ({ item, index, setActiveVideoModal }) => {
  return (
    <MotionItem>
      <motion.div
        className="smooth-card"
        whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(10, 47, 94, 0.12)' }}
        transition={{ type: 'spring', stiffness: 350, damping: 24 }}
        onClick={() => setActiveVideoModal(index)}
        style={{
          overflow: 'hidden',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          borderRadius: '16px',
          cursor: 'pointer'
        }}
      >
        <div
          style={{
            position: 'relative',
            height: '220px',
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Video Preview Frame */}
          <video 
            src={`${item.videoUrl}#t=2.0`} 
            preload="metadata" 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              opacity: 0.8
            }} 
          />

          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--nims-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 8px 24px rgba(244, 117, 33, 0.6)',
              zIndex: 2
            }}
          >
            <Play size={28} fill="#ffffff" style={{ marginLeft: '4px' }} />
          </motion.div>
        </div>

        <div style={{ padding: '1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderTop: '4px solid var(--nims-orange)' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--nims-navy)', margin: 0, lineHeight: 1.4, fontWeight: 700 }}>
            {item.title}
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Video size={14} /> Watch Patient Story
          </span>
        </div>
      </motion.div>
    </MotionItem>
  );
};

export default VideoCard;
