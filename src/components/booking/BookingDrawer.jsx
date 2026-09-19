import React, { useState, useMemo, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, ChevronRight, ArrowLeft, ShieldCheck, HeartPulse } from 'lucide-react';
import { specialitiesData } from '../../data/specialitiesData';
import { doctorsData } from '../../data/doctorsData';

export default function BookingDrawer({ isOpen, onClose, prefill }) {
  const [step, setStep] = useState(1);
  const [selectedSpeciality, setSelectedSpeciality] = useState('cardiology');
  const [selectedDoctor, setSelectedDoctor] = useState(doctorsData[0].id);
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  const [patientData, setPatientData] = useState({
    fullName: '',
    phone: '',
    email: '',
    gender: 'Female',
    age: '',
    reason: ''
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [tokenNumber, setTokenNumber] = useState('');

  // Synchronize prefill when drawer opens
  useEffect(() => {
    if (isOpen && prefill) {
      if (prefill.speciality) {
        setSelectedSpeciality(prefill.speciality);
      }
      if (prefill.doctor) {
        const docId = typeof prefill.doctor === 'object' ? prefill.doctor.id : prefill.doctor;
        setSelectedDoctor(docId);
        if (!prefill.speciality && typeof prefill.doctor === 'object' && prefill.doctor.specialityId) {
          setSelectedSpeciality(prefill.doctor.specialityId);
        }
      }
    }
  }, [isOpen, prefill]);

  // Dynamically filter clinical specialists based on selected department / speciality
  const displayedDoctors = useMemo(() => {
    if (selectedSpeciality === 'all') {
      return doctorsData;
    }

    const specObj = specialitiesData.find(s => s.id === selectedSpeciality);
    const specName = specObj ? specObj.name.toLowerCase() : '';
    const cleanSpecId = (selectedSpeciality || '').toLowerCase().replace(/[^a-z]/g, '');

    const filtered = doctorsData.filter(doc => {
      const docSpecClean = (doc.specialityId || '').toLowerCase().replace(/[^a-z]/g, '');
      const docDept = (doc.department || '').toLowerCase();
      const docTitle = (doc.title || '').toLowerCase();

      // Direct ID or clean ID match
      if (docSpecClean === cleanSpecId) return true;

      // Speciality ID keyword mappings
      if (cleanSpecId === 'cardiology' && (docSpecClean.includes('cardio') || docSpecClean.includes('ctvs') || docDept.includes('cardio'))) return true;
      if (cleanSpecId === 'ctvs' && (docSpecClean.includes('ctvs') || docDept.includes('cardio') || docTitle.includes('ctvs'))) return true;
      if (cleanSpecId === 'neurosurgery' || cleanSpecId === 'neurology') {
        if (docSpecClean.includes('neuro') || docDept.includes('neuro')) return true;
      }
      if (cleanSpecId === 'gastroenterology') {
        if (docSpecClean.includes('gastro') || docDept.includes('gastro') || docTitle.includes('gastro')) return true;
      }
      if (cleanSpecId === 'paediatrics' || cleanSpecId === 'neonatology') {
        if (docSpecClean.includes('paediatric') || docDept.includes('paediatric') || docTitle.includes('pediatric') || docTitle.includes('paediatric')) return true;
      }
      if (cleanSpecId === 'orthopaedics') {
        if (docSpecClean.includes('ortho') || docDept.includes('ortho')) return true;
      }
      if (cleanSpecId === 'gynaecology') {
        if (docSpecClean.includes('gynae') || docDept.includes('gynae') || docDept.includes('obstetric')) return true;
      }
      if (cleanSpecId === 'urology' || cleanSpecId === 'nephrology') {
        if (docSpecClean.includes('uro') || docDept.includes('uro') || docDept.includes('renal')) return true;
      }
      if (cleanSpecId === 'respiratorymedicine' || cleanSpecId === 'criticalcare' || cleanSpecId === 'emergencymedicine') {
        if (docSpecClean.includes('respiratory') || docDept.includes('respiratory') || docTitle.includes('pulmon') || docTitle.includes('critical')) return true;
      }
      if (cleanSpecId === 'generalmedicine' || cleanSpecId === 'endocrinology') {
        if (docSpecClean.includes('medicine') || docDept.includes('medicine') || docTitle.includes('metabolic')) return true;
      }
      if (cleanSpecId === 'generalsurgery') {
        if (docSpecClean.includes('surgery') || docDept.includes('surgery')) return true;
      }
      if (cleanSpecId === 'oncology') {
        if (docSpecClean.includes('onco') || docTitle.includes('onco') || docTitle.includes('cancer')) return true;
      }

      // Department name matching
      if (specName && (docDept.includes(specName) || specName.includes(docDept))) {
        return true;
      }

      return false;
    });

    if (filtered.length > 0) {
      return filtered;
    }

    // Default duty specialist fallback for departments without a distinct profile in doctorsData
    return [
      {
        id: `faculty-${selectedSpeciality}`,
        name: `Senior Consultant (${specObj ? specObj.name : 'Specialist'})`,
        title: `Attending Senior Faculty, Dept. of ${specObj ? specObj.name : 'Clinical Care'}`,
        department: specObj ? specObj.name : 'Clinical Specialist',
        specialityId: selectedSpeciality,
        qualification: "MBBS, MD / MS, Senior Clinical Specialist",
        experience: "15+ Years Clinical Experience",
        opdSchedule: "Mon - Sat (09:00 AM - 03:00 PM)",
        roomNo: `OPD Unit, ${specObj?.category || 'Clinical'} Wing`,
        image: "/assets/images/resource/Balvir.webp",
        isDutySpecialist: true
      }
    ];
  }, [selectedSpeciality]);

  // Keep selectedDoctor in sync when displayedDoctors changes
  useEffect(() => {
    if (displayedDoctors && displayedDoctors.length > 0) {
      const exists = displayedDoctors.some(d => d.id === selectedDoctor);
      if (!exists) {
        setSelectedDoctor(displayedDoctors[0].id);
      }
    }
  }, [displayedDoctors, selectedDoctor]);

  if (!isOpen) return null;

  const timeSlots = [
    '09:30 AM', '10:00 AM', '10:30 AM', '11:15 AM',
    '12:00 PM', '02:30 PM', '03:15 PM', '04:00 PM'
  ];

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!patientData.fullName || !patientData.phone) {
      alert('Please enter patient name and mobile number');
      return;
    }
    const token = 'NIMS-OPD-' + Math.floor(100000 + Math.random() * 900000);
    setTokenNumber(token);
    setBookingConfirmed(true);
  };

  const handleReset = () => {
    setStep(1);
    setBookingConfirmed(false);
    onClose();
  };

  const currentDoctorObj =
    displayedDoctors.find(d => d.id === selectedDoctor) ||
    doctorsData.find(d => d.id === selectedDoctor) ||
    displayedDoctors[0] ||
    doctorsData[0];

  const currentSpecialityObj =
    selectedSpeciality === 'all'
      ? { id: 'all', name: 'All Specialities & Super Specialities', category: 'General' }
      : (specialitiesData.find(s => s.id === selectedSpeciality) || { id: selectedSpeciality, name: 'Speciality OPD', category: 'General' });

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'flex-end',
      background: 'rgba(5, 26, 54, 0.65)',
      backdropFilter: 'blur(8px)',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* Background click to dismiss */}
      <div style={{ flex: 1 }} onClick={onClose} />

      {/* Slide-over Container */}
      <div style={{
        width: '100%',
        maxWidth: '520px',
        height: '100%',
        background: '#ffffff',
        boxShadow: '-8px 0 35px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Drawer Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'linear-gradient(135deg, var(--nims-navy) 0%, var(--nims-navy-light) 100%)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid var(--nims-gold)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              background: '#ffffff',
              padding: '0.35rem 0.6rem',
              borderRadius: 'var(--radius-xs)',
              display: 'flex',
              alignItems: 'center'
            }}>
              <img
                src="/assets/images/nims-hospital-logo.svg"
                alt="NIMS Logo"
                style={{ height: '28px', width: 'auto' }}
                onError={(e) => {
                  e.currentTarget.src = "https://nimshospitals.in/assets/images/nims-hospital-logo.svg";
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--nims-orange)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                OPD Appointment Desk
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.2rem', margin: 0 }}>
                Book an Appointment
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Stepper Indicator */}
        {!bookingConfirmed && (
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--nims-border)',
            background: '#f8fafc',
            padding: '0.75rem 1.5rem'
          }}>
            {[
              { num: 1, label: 'Doctor' },
              { num: 2, label: 'Slot' },
              { num: 3, label: 'Patient' }
            ].map((s, idx) => (
              <div
                key={s.num}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                  gap: '0.45rem',
                  fontSize: '0.82rem',
                  fontWeight: step >= s.num ? 700 : 500,
                  color: step >= s.num ? 'var(--nims-navy)' : '#94a3b8'
                }}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  background: step >= s.num ? 'var(--nims-orange)' : '#e2e8f0',
                  color: step >= s.num ? '#fff' : '#64748b'
                }}>
                  {s.num}
                </div>
                <span>{s.label}</span>
                {idx < 2 && <div style={{ flex: 1, height: '1px', background: '#e2e8f0', margin: '0 0.5rem' }} />}
              </div>
            ))}
          </div>
        )}

        {/* Drawer Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {bookingConfirmed ? (
            /* Confirmation Success Card */
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.12)',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem'
              }}>
                <CheckCircle2 size={44} />
              </div>
              <span className="badge-pill badge-green" style={{ marginBottom: '0.5rem' }}>
                OPD Appointment Confirmed
              </span>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>
                Thank You, {patientData.fullName}!
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#64748b', marginBottom: '1.5rem' }}>
                Confirmation SMS and WhatsApp token have been dispatched to <b>+91 {patientData.phone}</b>.
              </p>

              {/* Receipt Box */}
              <div style={{
                background: '#f8fafc',
                border: '1px dashed #cbd5e1',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                textAlign: 'left',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Booking Token:</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--nims-crimson)' }}>{tokenNumber}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Doctor:</span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--nims-navy)' }}>{currentDoctorObj.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Department:</span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{currentSpecialityObj.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Date & Slot:</span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--nims-navy)' }}>{selectedDate} at {selectedSlot}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Campus:</span>
                  <span style={{ fontSize: '0.85rem' }}>NIMS Hospital, NH-11C, Jaipur</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                Done / Book Another
              </button>
            </div>
          ) : step === 1 ? (
            /* Step 1: Select Department & Doctor */
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                <label style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--nims-navy)', margin: 0 }}>
                  1. Select Speciality / Department
                </label>
                {selectedSpeciality !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setSelectedSpeciality('all')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--nims-orange)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: 0,
                      textDecoration: 'underline'
                    }}
                  >
                    View All Doctors
                  </button>
                )}
              </div>

              <select
                value={selectedSpeciality}
                onChange={(e) => setSelectedSpeciality(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid var(--nims-border)',
                  fontSize: '0.92rem',
                  background: '#f8fafc',
                  marginBottom: '1.4rem',
                  outline: 'none',
                  fontWeight: 600,
                  color: 'var(--nims-navy)',
                  cursor: 'pointer'
                }}
              >
                <option value="all">★ All Departments & Specialities (Show All Doctors)</option>
                {specialitiesData.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name} ({spec.category})
                  </option>
                ))}
              </select>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                <label style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--nims-navy)', margin: 0 }}>
                  2. Choose Clinical Specialist
                </label>
                <span style={{
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  padding: '0.2rem 0.65rem',
                  borderRadius: '20px',
                  background: 'rgba(10, 47, 94, 0.08)',
                  color: 'var(--nims-navy)'
                }}>
                  {displayedDoctors.length} {displayedDoctors.length === 1 ? 'Doctor' : 'Doctors'} Available
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {displayedDoctors.map((doc) => {
                  const isSelected = selectedDoctor === doc.id;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDoctor(doc.id)}
                      style={{
                        display: 'flex',
                        gap: '0.85rem',
                        padding: '0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected ? '2px solid var(--nims-crimson)' : '1px solid var(--nims-border)',
                        background: isSelected ? 'rgba(192, 48, 74, 0.04)' : '#ffffff',
                        boxShadow: isSelected ? '0 4px 14px rgba(192, 48, 74, 0.12)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      <img
                        src={doc.image}
                        alt={doc.name}
                        style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                        onError={(e) => {
                          e.currentTarget.src = "/assets/images/resource/Balvir.webp";
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--nims-navy)' }}>
                            {doc.name}
                          </div>
                          {isSelected && (
                            <span style={{
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              color: 'var(--nims-crimson)',
                              background: 'rgba(192, 48, 74, 0.1)',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '12px',
                              flexShrink: 0
                            }}>
                              Selected ✓
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--nims-crimson)', fontWeight: 600, marginTop: '0.1rem' }}>
                          {doc.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
                          {doc.opdSchedule}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : step === 2 ? (
            /* Step 2: Date & Slot */
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--nims-navy)' }}>
                Choose Consultation Date
              </label>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--nims-border)',
                  fontSize: '0.92rem',
                  marginBottom: '1.75rem',
                  background: '#f8fafc'
                }}
              />

              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.65rem', color: 'var(--nims-navy)' }}>
                Available Time Slots ({selectedDate})
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem' }}>
                {timeSlots.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      style={{
                        padding: '0.7rem',
                        borderRadius: 'var(--radius-sm)',
                        border: isSelected ? '2px solid var(--nims-crimson)' : '1px solid var(--nims-border)',
                        background: isSelected ? 'var(--nims-crimson)' : '#ffffff',
                        color: isSelected ? '#ffffff' : 'var(--nims-navy)',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <Clock size={14} />
                      <span>{slot}</span>
                    </button>
                  );
                })}
              </div>

              <div style={{
                marginTop: '1.5rem',
                padding: '0.85rem',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(244, 117, 33, 0.08)',
                border: '1px solid rgba(244, 117, 33, 0.25)',
                fontSize: '0.82rem',
                color: '#9a3412',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem'
              }}>
                <ShieldCheck size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Zero pre-payment required. Consultation fee can be paid directly at hospital cash counter or via Ayushman/RGHS card.</span>
              </div>
            </div>
          ) : (
            /* Step 3: Patient Information Form */
            <form onSubmit={handleConfirm}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={patientData.fullName}
                    onChange={(e) => setPatientData({ ...patientData, fullName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--nims-border)',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      maxLength="10"
                      value={patientData.phone}
                      onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--nims-border)',
                        fontSize: '0.92rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                      Age
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 35"
                      value={patientData.age}
                      onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--nims-border)',
                        fontSize: '0.92rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={patientData.email}
                    onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--nims-border)',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    Brief Symptoms / Health Concern
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Describe symptoms briefly (e.g. chest pain, routine checkup, knee ache)..."
                    value={patientData.reason}
                    onChange={(e) => setPatientData({ ...patientData, reason: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--nims-border)',
                      fontSize: '0.92rem',
                      resize: 'vertical'
                    }}
                  />
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Drawer Footer Controls */}
        {!bookingConfirmed && (
          <div style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid var(--nims-border)',
            background: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn btn-ghost"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="btn btn-primary"
              >
                <span>Continue</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirm}
                className="btn btn-primary"
                style={{ minWidth: '180px' }}
              >
                <span>Confirm OPD Booking</span>
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
