import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, CheckCircle, Users, Bed,
  Activity, Scissors, Zap, HeartPulse, Brain,
  Bone, Stethoscope, Eye, Baby, TestTube2, Syringe, Wind,
  Radiation, Ambulance, BrainCircuit, Ear, Sparkles,
  Accessibility, Atom, Ribbon, Microscope, Dna,
  HeartHandshake, Smile, SmilePlus, Scale, Droplet, ScanEye
} from 'lucide-react';
import './SpecialityCard.css';

const MotionLink = motion(Link);

/* ---- Dedicated Anatomical & Clinical SVG Icons in matching Lucide Stroke Style ---- */
function ToothIcon({ size = 24, color = 'currentColor', strokeWidth = 2, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 3C4.5 3 3 5 3 8c0 3.8 1.6 7.4 2.5 11 .5 2 2.2 2 2.8-.5.7-3.2 1.7-6.5 3.7-6.5s3 3.3 3.7 6.5c.6 2.5 2.3 2.5 2.8.5.9-3.6 2.5-7.2 2.5-11 0-3-1.5-5-4-5-2 0-3 1.5-5 1.5S9 3 7 3z" />
      <path d="M9 8c1 .8 2 1.2 3 1.2s2-.4 3-1.2" />
    </svg>
  );
}

function SpineIcon({ size = 24, color = 'currentColor', strokeWidth = 2, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <rect x="7" y="3" width="10" height="3" rx="1.5" />
      <rect x="6" y="8" width="12" height="3.5" rx="1.5" />
      <rect x="6" y="13.5" width="12" height="3.5" rx="1.5" />
      <rect x="7" y="19" width="10" height="3" rx="1.5" />
    </svg>
  );
}

function LiverIcon({ size = 24, color = 'currentColor', strokeWidth = 2, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 8.5C4 5.5 7 4 12 4c6.5 0 9 3 9 7.5 0 4.5-3 8.5-8.5 8.5-4 0-6.5-1.5-7.5-4.5C4 13 4 10.5 4 8.5z" />
      <path d="M12 4v16" />
      <path d="M8 12c1.5 1 2.5 1 4 0" />
      <path d="M14 13c1.5 1 2.5 1 4 0" />
    </svg>
  );
}

function StomachIcon({ size = 24, color = 'currentColor', strokeWidth = 2, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 2v4c0 1.5-.5 2.5-1.5 3.5C5.5 11.5 4 14 4 17c0 3 2.5 5 6 5 4.5 0 9-3 9-8 0-4-3-7.5-6-7.5-1 0-1.5-.5-1.5-1.5V2" />
      <path d="M12 13c1.5 1 2.5 2 2.5 3.5" />
    </svg>
  );
}

function KidneyIcon({ size = 24, color = 'currentColor', strokeWidth = 2, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3C8 3 5 6 5 11c0 5 3.5 10 7.5 10 3.5 0 6.5-2.5 7.5-6.5.5-2-.5-3.5-2-4 1.5-.5 2-2 1.5-4C18.5 3.5 15.5 3 12 3z" />
      <path d="M14.5 9.5c-1.5.5-2.5 1.5-2.5 2.5s1 2 2.5 2.5" />
    </svg>
  );
}

function LungsIcon({ size = 24, color = 'currentColor', strokeWidth = 2, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2v6" />
      <path d="M12 8c-2 0-3.5 1.5-4 3" />
      <path d="M12 8c2 0 3.5 1.5 4 3" />
      <path d="M8 11C5.5 11 3 13 3 16.5 3 20 5.5 22 8.5 22c2.5 0 3.5-2 3.5-5v-6" />
      <path d="M16 11c2.5 0 5 2 5 5.5 0 3.5-2.5 5.5-5.5 5.5-2.5 0-3.5-2-3.5-5v-6" />
    </svg>
  );
}

function IVFIcon({ size = 24, color = 'currentColor', strokeWidth = 2, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="14" cy="12" r="7" />
      <circle cx="14" cy="12" r="3" strokeDasharray="2 2" />
      <circle cx="14" cy="12" r="1.2" fill={color} />
      <path d="M3 6l6 6" />
      <path d="M2 5l2-2" />
      <path d="M7 10l2 2" />
    </svg>
  );
}

function SkinIcon({ size = 24, color = 'currentColor', strokeWidth = 2, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2.5a4.5 4.5 0 0 0-4.5 4.5c0 3.5 4.5 8 4.5 8s4.5-4.5 4.5-8A4.5 4.5 0 0 0 12 2.5z" />
      <path d="M3 17.5c3-1.5 6-1.5 9 0s6 1.5 9 0" />
      <path d="M3 21.5c3-1.5 6-1.5 9 0s6 1.5 9 0" />
      <circle cx="19" cy="6" r="1.2" fill={color} />
      <circle cx="5" cy="9" r="1.2" fill={color} />
    </svg>
  );
}

/* ---- Direct 1-to-1 Mapping for Every NIMS Speciality by ID ---- */
const ID_ICON_MAP = {
  'medical-oncology': Ribbon,
  'surgical-oncology': Scissors,
  'radiation-oncology': Radiation,
  'cardiology': HeartPulse,
  'neurosurgery': Brain,
  'ctvs': HeartHandshake,
  'general-medicine': Stethoscope,
  'orthopaedics': Bone,
  'emergency-medicine': Ambulance,
  'nephrology': KidneyIcon,
  'general-surgery': Scissors,
  'neurology': BrainCircuit,
  'interventional-radiology': ScanEye,
  'paediatrics': Baby,
  'urology': Droplet,
  'gastroenterology': StomachIcon,
  'ent': Ear,
  'tb-resp-diseases': LungsIcon,
  'neonatology': Baby,
  'obstetrics-gynaecology': HeartHandshake,
  'surgical-gastroenterology': StomachIcon,
  'endocrinology': Scale,
  'plastic-surgery': Sparkles,
  'ophthalmology': Eye,
  'ivf': IVFIcon,
  'liver-transplant': LiverIcon,
  'dental': ToothIcon,
  'spine-surgery': SpineIcon,
  'skin-vd': SkinIcon,
  'physiotherapy': Accessibility,
  'psychiatry': Smile,
  'nuclear-medicine': Atom,
  'bmt': Dna,
  'clinical-hematology': Microscope,
  'clinical-psychology': SmilePlus,
};

/* ---- Fallback Keyword Matcher by Name ---- */
const KEYWORD_MAP = [
  { test: /(tooth|dent)/i, icon: ToothIcon },
  { test: /(spine)/i, icon: SpineIcon },
  { test: /(ivf|fertil|reproduct)/i, icon: IVFIcon },
  { test: /(liver|hpb)/i, icon: LiverIcon },
  { test: /(skin|dermat|v\.d\.)/i, icon: SkinIcon },
  { test: /(physio|rehab)/i, icon: Accessibility },
  { test: /(kidney|nephro)/i, icon: KidneyIcon },
  { test: /(lung|resp|tb|pulmon)/i, icon: LungsIcon },
  { test: /(stomach|gastro)/i, icon: StomachIcon },
  { test: /(ear|ent)/i, icon: Ear },
  { test: /(atom|nuclear)/i, icon: Atom },
  { test: /(radiat)/i, icon: Radiation },
  { test: /(blood|hemat)/i, icon: Microscope },
  { test: /(marrow|bmt|stem|dna)/i, icon: Dna },
  { test: /(psychol)/i, icon: SmilePlus },
  { test: /(psych|mental)/i, icon: Smile },
  { test: /(plastic|cosmetic)/i, icon: Sparkles },
  { test: /(diabet|endo|thyroid|hormon)/i, icon: Scale },
  { test: /(emerg|trauma|ambul)/i, icon: Ambulance },
  { test: /(cardio|heart|ctvs)/i, icon: HeartPulse },
  { test: /(neuro)/i, icon: Brain },
  { test: /(ortho|bone|joint)/i, icon: Bone },
  { test: /(eye|ophthal)/i, icon: Eye },
  { test: /(baby|paed|pediatr|neonat)/i, icon: Baby },
  { test: /(surg|sciss)/i, icon: Scissors },
  { test: /(chemo|oncol|cancer)/i, icon: Ribbon },
  { test: /(radio|scan)/i, icon: ScanEye },
  { test: /(urol|urin)/i, icon: Droplet },
  { test: /(pathol|lab)/i, icon: TestTube2 },
  { test: /(anaesth)/i, icon: Syringe },
];

function getIconForSpec(spec) {
  if (!spec) return Stethoscope;

  // 1. Direct ID lookup
  if (spec.id && ID_ICON_MAP[spec.id]) {
    return ID_ICON_MAP[spec.id];
  }

  // 2. Keyword check on name & shortDesc
  const combined = `${spec.name || ''} ${spec.shortDesc || ''} ${spec.id || ''}`.toLowerCase();
  for (const item of KEYWORD_MAP) {
    if (item.test.test(combined)) {
      return item.icon;
    }
  }

  return Stethoscope;
}

export default function SpecialityCard({ spec, index = 1 }) {
  const IconComponent = getIconForSpec(spec);
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

