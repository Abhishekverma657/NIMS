import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export default function DoctorCard({ doctor, onBook }) {
  return (
    <motion.div
      className="nims-doctor-card"
      whileHover={{
        y: -5,
        boxShadow: '0 20px 42px rgba(10, 47, 94, 0.12)',
        borderColor: 'rgba(244, 117, 33, 0.35)'
      }}
      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
    >
      {/* Photo Column */}
      <div className="doctor-photo-wrap">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="doctor-photo"
          loading="lazy"
          onError={(e) => {
            // High quality fallback medical doctor avatar
            e.currentTarget.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80";
          }}
        />
        
        {/* Verified Badge */}
        <div className="doctor-verified-badge" title="NIMS Verified Super Specialist">
          <CheckCircle2 size={13} color="#ffffff" />
          <span>Verified</span>
        </div>
      </div>

      {/* Info Column */}
      <div className="doctor-info-wrap">
        <div>
          {/* Department Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.45rem' }}>
            <span className="badge-pill badge-navy" style={{ fontSize: '0.72rem', padding: '0.2rem 0.65rem' }}>
              {doctor.department}
            </span>
          </div>

          {/* Doctor Name */}
          <h3 className="doctor-name">
            {doctor.name}
          </h3>

          {/* Designation */}
          <div className="doctor-title">
            {doctor.title}
          </div>

          {/* Qualifications */}
          <div className="doctor-qual">
            {doctor.qualification}
          </div>
        </div>

        {/* Schedule & Location Box */}
        <div className="doctor-schedule-box">
          <div className="schedule-item">
            <Clock size={14} color="var(--nims-orange)" style={{ flexShrink: 0 }} />
            <span><b>OPD:</b> {doctor.opdSchedule}</span>
          </div>
          <div className="schedule-item">
            <MapPin size={14} color="var(--nims-navy)" style={{ flexShrink: 0 }} />
            <span>{doctor.roomNo}</span>
          </div>
        </div>

        {/* CTA Button */}
        {doctor.isOpdAvailable !== false && (
          <motion.button
            onClick={() => onBook(doctor)}
            className="btn btn-primary doctor-book-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Calendar size={15} />
            <span>Book OPD Appointment</span>
            <ArrowRight size={14} className="btn-arrow" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
