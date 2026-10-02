import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, CheckCircle, Users, Bed,
  Activity, Scissors, Zap, HeartPulse, Brain,
  Bone, Stethoscope, Eye, Baby, TestTube2, Syringe, Wind
} from 'lucide-react';
import './SpecialityCard.css';

const MotionLink = motion(Link);

const ICON_MAP = {
  'medical oncology': Activity,
  'surgical oncology': Scissors,
  'radiation oncology': Zap,
  'cardiology': HeartPulse,
  'ctvs': HeartPulse,
  'neurosurgery': Brain,
  'neurology': Brain,
  'orthopaedics': Bone,
  'ophthalmology': Eye,
  'obstetrics': Baby,
  'gynaecology': Baby,
  'laboratory': TestTube2,
  'pathology': TestTube2,
  'anaesthesia': Syringe,
  'pulmonology': Wind,
  'respiratory': Wind,
};

function getIconForSpec(name = '') {
  const lower = name.toLowerCase();
  for (const [key, icon] of Object.entries(ICON_MAP)) {
    if (lower.includes(key)) return icon;
  }
  return Stethoscope;
}

export default function SpecialityCard({ spec, index = 1 }) {
  const IconComponent = getIconForSpec(spec.name);
  const watermarkNum = String(index).padStart(2, '0');

  return (
    <MotionLink
      to={`/specialities/${spec.id}`}
      className="spec-card-modern"
      whileTap={{ scale: 0.98 }}
    >
      {/* Decorative background shapes */}
      <div className="spec-card-bg-shape-top" />
      <div className="spec-card-bg-shape-bottom" />
      <div className="spec-card-bg-pattern" />

      {/* Card body */}
      <div className="spec-card-body">

        {/* Header row */}
        <div className="spec-card-header">
          {/* Icon Badge */}
          <div className="spec-card-icon-box">
            <IconComponent size={28} color="#fff" strokeWidth={1.8} />
          </div>

          {/* Category badge */}
          <span className="spec-card-category">
            {spec.category || 'SUPER SPECIALITY'}
          </span>
        </div>

        {/* Title + Description */}
        <h3 className="spec-card-title">
          {spec.name}
        </h3>
        <p className="spec-card-desc">
          {spec.shortDesc || spec.description}
        </p>

        {/* Stats pill */}
        <div className="spec-card-stats">
          <div className="spec-card-stat-item">
            <Users size={13} color="#C8102E" strokeWidth={2.5} />
            <span><strong>{spec.doctorsCount || 8}+</strong> Specialists</span>
          </div>
          <span className="spec-card-stat-divider" />
          <div className="spec-card-stat-item">
            <Bed size={13} color="#C8102E" strokeWidth={2.5} />
            <span><strong>{spec.beds || 40}+</strong> Beds</span>
          </div>
        </div>

        {/* Procedures */}
        <div className="spec-card-procs">
          {(spec.procedures || []).slice(0, 3).map((proc, idx) => (
            <div key={idx} className="spec-card-proc-item">
              <CheckCircle size={15} color="#C8102E" strokeWidth={2.5} style={{ flexShrink: 0 }} />
              <span className="spec-card-proc-text">{proc}</span>
            </div>
          ))}
          {(spec.procedures || []).length > 3 && (
            <span className="spec-card-proc-more">
              +{spec.procedures.length - 3} Advanced Procedures &rarr;
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="spec-card-footer">
          <div className="spec-card-explore">
            <span>Explore Department</span>
            <ArrowRight size={14} color="#C8102E" strokeWidth={2.5} className="spec-card-explore-icon" />
          </div>

          <div className="spec-card-footer-right">
            <span className="spec-card-opd">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              OPD Active
            </span>
            <div className="spec-card-arrow-btn">
              <ArrowRight size={14} color="#fff" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>
    </MotionLink>
  );
}

