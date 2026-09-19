import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Users, Bed } from 'lucide-react';

const MotionLink = motion(Link);

export default function SpecialityCard({ spec }) {
  return (
    <MotionLink
      to={`/specialities/${spec.id}`}
      className="modern-speciality-card"
      style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}
      whileHover={{
        y: -6,
        boxShadow: '0 20px 40px rgba(10, 47, 94, 0.12)',
        borderColor: 'rgba(244, 117, 33, 0.4)'
      }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
    >
      {/* Top Accent Gradient Bar */}
      <div className="card-hover-accent" />

      {/* Card Header: Icon Pedestal + Category & 24x7 Badges */}
      <div className="card-top-row">
        <motion.div
          className="spec-icon-wrapper"
          whileHover={{ rotate: 5, scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <img
            src={spec.svgIcon}
            alt={`${spec.name} Department Icon`}
            className="spec-official-icon"
            loading="lazy"
          />
        </motion.div>

        <div className="spec-header-badges">
          <span className="spec-category-tag">
            {spec.category}
          </span>
          {spec.emergency && (
            <span className="spec-emergency-chip">
              <span className="pulse-dot pulse-dot-orange" />
              <span>24×7 Care</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Body: Title, Short Description & Clinical Capacity Bar */}
      <div className="card-body-content">
        <h3 className="spec-card-title">
          {spec.name}
        </h3>
        <p className="spec-card-desc">
          {spec.shortDesc || spec.description}
        </p>

        {/* Clinical Stats Bar (Specialists & Dedicated Beds) */}
        <div className="spec-stats-bar">
          <div className="spec-stat-item">
            <Users size={13} className="spec-stat-icon" />
            <span><b>{spec.doctorsCount || 12}+</b> Specialists</span>
          </div>
          <span className="spec-stat-divider" />
          <div className="spec-stat-item">
            <Bed size={13} className="spec-stat-icon" />
            <span><b>{spec.beds || 60}+</b> Beds</span>
          </div>
        </div>

        {/* Procedures / Clinical Capabilities */}
        {spec.procedures && spec.procedures.length > 0 && (
          <div className="spec-procedures-section">
            <div className="spec-procedures-list">
              {spec.procedures.slice(0, 2).map((proc, idx) => (
                <div key={idx} className="spec-proc-row">
                  <CheckCircle2 size={13} className="proc-check-icon" />
                  <span className="proc-row-text">{proc}</span>
                </div>
              ))}
            </div>
            {spec.procedures.length > 2 && (
              <span className="proc-more-badge">
                +{spec.procedures.length - 2} Advanced Procedures
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer: Action Link & Emergency Availability Indicator */}
      <div className="card-footer-row">
        <span className="learn-more-text">
          <span>Explore Department</span>
          <ArrowRight size={14} className="learn-more-arrow" />
        </span>
        <span className="spec-opd-badge">OPD Active</span>
      </div>
    </MotionLink>
  );
}
