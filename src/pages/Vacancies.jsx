import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  GraduationCap,
  Building2,
  Send,
  Upload,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  Users,
  Award,
  Sparkles,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { MotionFadeIn, MotionStagger, MotionItem } from '../components/motion/MotionWrapper';
import AnimatedCounter from '../components/common/AnimatedCounter';

export default function Vacancies() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeJobModal, setActiveJobModal] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    currentCtc: '',
    resumeName: ''
  });

  const vacanciesData = [
    {
      id: 'nurse-staff',
      title: 'Staff Nurse (ICU / OT / General Wards)',
      department: 'Nursing',
      deptCategory: 'Nursing',
      qualification: 'B.Sc Nursing / GNM (State Nursing Council Registered)',
      experience: '1 - 6 Years in NABH Hospital',
      location: 'NIMS Hospital, NH-11C, Jaipur',
      type: 'Full-time',
      vacanciesCount: 15,
      description: 'Provide high-quality patient care in intensive care units, post-operative wards, and modular operation theatres under senior nursing leadership.',
      skills: ['Critical Care', 'IV Cannulation', 'Patient Monitoring', 'NABH Protocols']
    },
    {
      id: 'res-doctor',
      title: 'Resident Doctor (MD / MS / DNB)',
      department: 'General Medicine & Emergency',
      deptCategory: 'Doctors',
      qualification: 'MBBS + MD/MS/DNB (MCI / State Medical Council Registered)',
      experience: '0 - 4 Years',
      location: 'NIMS Hospital, NH-11C, Jaipur',
      type: 'Full-time',
      vacanciesCount: 6,
      description: 'Manage clinical admissions, round-the-clock emergency triage, IPD patient management, and work alongside tertiary super specialists.',
      skills: ['Emergency Triage', 'IPD Care', 'Clinical Diagnosis', 'Patient Counseling']
    },
    {
      id: 'lab-technician',
      title: 'Senior Pathology Lab Technician',
      department: 'Pathology & Blood Bank',
      deptCategory: 'Allied Health',
      qualification: 'DMLT / BMLT / MMLT',
      experience: '2 - 5 Years in Automated Diagnostic Lab',
      location: 'NIMS Hospital, NH-11C, Jaipur',
      type: 'Full-time',
      vacanciesCount: 4,
      description: 'Operate advanced automated biochemistry, hematology, and histopathology analyzers under strict NABL quality standards.',
      skills: ['Hematology', 'Biochemistry', 'Quality Control', 'Blood Bank']
    },
    {
      id: 'front-desk',
      title: 'Front Desk Executive & Patient Care Officer',
      department: 'Hospital Administration',
      deptCategory: 'Admin',
      qualification: 'Graduate / BBA / MHA / Hotel Management',
      experience: '1 - 4 Years in Healthcare or Hospitality',
      location: 'NIMS Hospital, NH-11C, Jaipur',
      type: 'Full-time',
      vacanciesCount: 5,
      description: 'Handle patient registration, OPD appointments, VIP coordination, and insurance/TPA inquiry desk with empathetic communication.',
      skills: ['HIS Software', 'Patient Communication', 'Billing Coordination', 'Multilingual']
    },
    {
      id: 'ot-technician',
      title: 'OT & Anesthesia Technician',
      department: 'Surgical OT Services',
      deptCategory: 'Allied Health',
      qualification: 'Diploma / Degree in Operation Theatre Technology',
      experience: '2 - 6 Years in Modular Surgical Suites',
      location: 'NIMS Hospital, NH-11C, Jaipur',
      type: 'Full-time',
      vacanciesCount: 4,
      description: 'Prepare laparoscopic suites, maintain sterile surgical equipment, assist surgical teams, and monitor anesthesia delivery systems.',
      skills: ['Sterilization', 'Anesthesia Equipment', 'Laparoscopy Setup', 'Surgical Assisting']
    },
    {
      id: 'dialysis-technician',
      title: 'Dialysis Technician',
      department: 'Nephrology & Renal Sciences',
      deptCategory: 'Allied Health',
      qualification: 'Diploma / B.Sc in Dialysis Technology',
      experience: '1 - 5 Years Hemodialysis Unit',
      location: 'NIMS Hospital, NH-11C, Jaipur',
      type: 'Full-time',
      vacanciesCount: 3,
      description: 'Operate advanced hemodialysis machines, initiate and monitor dialyzer circuits, and ensure safety for end-stage renal disease patients.',
      skills: ['Hemodialysis', 'Vascular Access', 'Water Treatment RO', 'Patient Safety']
    },
    {
      id: 'clinical-pharmacist',
      title: 'Hospital Pharmacist',
      department: 'Pharmacy Services',
      deptCategory: 'Allied Health',
      qualification: 'B.Pharm / D.Pharm (Registered with Pharmacy Council)',
      experience: '1 - 3 Years Inpatient/Outpatient Pharmacy',
      location: 'NIMS Hospital, NH-11C, Jaipur',
      type: 'Full-time',
      vacanciesCount: 4,
      description: 'Dispense prescribed pharmaceuticals, review medication charts for drug interactions, and maintain narcotic/emergency drug inventories.',
      skills: ['Drug Dispensing', 'Inventory Control', 'Prescription Audits', 'Cold Chain']
    },
    {
      id: 'radiology-consultant',
      title: 'Consultant Radiologist',
      department: 'Radio-Diagnosis & Imaging',
      deptCategory: 'Doctors',
      qualification: 'MD / DNB / DMRD in Radio-Diagnosis',
      experience: '3+ Years Experience',
      location: 'NIMS Hospital, NH-11C, Jaipur',
      type: 'Full-time',
      vacanciesCount: 2,
      description: 'Lead 128-slice CT scans, 3.0 Tesla MRI reporting, ultrasound Doppler examinations, and non-vascular image-guided procedures.',
      skills: ['MRI 3.0T', 'CT 128-Slice', 'USG Doppler', 'Guided Biopsies']
    }
  ];

  const categories = [
    { id: 'All', label: 'All Open Roles' },
    { id: 'Doctors', label: 'Doctors & Specialists' },
    { id: 'Nursing', label: 'Nursing Staff' },
    { id: 'Allied Health', label: 'Paramedical & Diagnostics' },
    { id: 'Admin', label: 'Hospital Administration' }
  ];

  const filteredJobs = vacanciesData.filter((job) => {
    const matchesDept = selectedDept === 'All' || job.deptCategory === selectedDept;
    const matchesKeyword =
      job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.department.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.qualification.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesDept && matchesKeyword;
  });

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setApplicationSubmitted(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resumeName: e.target.files[0].name });
    }
  };

  return (
    <div className="vacancies-page">
      {/* Hero Banner */}
      <section className="vacancies-hero-section">
        <div className="container">
          <div className="vacancies-hero-content">
            <div className="vacancies-badge">
              <Sparkles size={14} color="var(--nims-orange)" />
              <span>Shape the Future of Quaternary Healthcare</span>
            </div>

            <h1 className="vacancies-hero-title">
              Build Your Career at <br />
              <span className="gradient-text">NIMS Hospital, Jaipur</span>
            </h1>

            <p className="vacancies-hero-sub">
              Join Rajasthan's premier 3,400+ bed hospital and medical university. Work with renowned clinicians,
              world-class modular infrastructure, and empower millions of healing journeys on NH-11C Jaipur.
            </p>

            {/* Quick Culture Metric Row */}
            <div className="vacancies-metrics-strip">
              <div className="v-metric-item">
                <span className="v-metric-num"><AnimatedCounter target={3400} suffix="+" /></span>
                <span className="v-metric-lbl">Hospital Bed Capacity</span>
              </div>
              <div className="v-metric-divider" />
              <div className="v-metric-item">
                <span className="v-metric-num"><AnimatedCounter target={500} suffix="+" /></span>
                <span className="v-metric-lbl">Super Specialists</span>
              </div>
              <div className="v-metric-divider" />
              <div className="v-metric-item">
                <span className="v-metric-num">NABH & NABL</span>
                <span className="v-metric-lbl">Clinical Environment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Toolbar */}
      <section className="vacancies-toolbar-section">
        <div className="container">
          <div className="vacancies-filter-container">
            {/* Search Input */}
            <div className="vacancies-search-box">
              <Search size={18} color="var(--nims-navy)" />
              <input
                type="text"
                placeholder="Search job title, qualification, or department..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              {searchKeyword && (
                <button
                  type="button"
                  onClick={() => setSearchKeyword('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="vacancies-filter-pills">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedDept(cat.id)}
                  className={`v-filter-pill ${selectedDept === cat.id ? 'active' : ''}`}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings Grid */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <MotionFadeIn>
            <div className="vacancies-list-header">
              <h3>
                Current Openings ({filteredJobs.length} {filteredJobs.length === 1 ? 'Position' : 'Positions'})
              </h3>
              <span className="header-hint">Verified Active Positions at NIMS Hospital Campus</span>
            </div>
          </MotionFadeIn>

          {filteredJobs.length === 0 ? (
            <div className="no-vacancies-box">
              <Briefcase size={42} color="#94a3b8" />
              <h4>No matching positions found</h4>
              <p>Try clearing your search filters or check back shortly as new clinical roles are posted weekly.</p>
              <button
                type="button"
                onClick={() => { setSelectedDept('All'); setSearchKeyword(''); }}
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
              >
                Show All Openings
              </button>
            </div>
          ) : (
            <MotionStagger className="vacancies-cards-grid" staggerDelay={0.07}>
              {filteredJobs.map((job) => (
                <MotionItem key={job.id}>
                  <motion.div
                    className="vacancy-job-card"
                    whileHover={{ y: -6, boxShadow: '0 20px 42px rgba(10, 47, 94, 0.12)' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                  >
                    <div className="v-card-top">
                      <div>
                        <span className="v-dept-badge">{job.department}</span>
                        <h4 className="v-job-title">{job.title}</h4>
                      </div>
                      <span className="v-type-badge">{job.type}</span>
                    </div>

                    <p className="v-job-desc">{job.description}</p>

                    <div className="v-details-box">
                      <div className="v-detail-row">
                        <GraduationCap size={15} color="var(--nims-navy)" />
                        <span><b>Eligibility:</b> {job.qualification}</span>
                      </div>
                      <div className="v-detail-row">
                        <Clock size={15} color="var(--nims-orange)" />
                        <span><b>Experience:</b> {job.experience}</span>
                      </div>
                      <div className="v-detail-row">
                        <MapPin size={15} color="var(--nims-navy)" />
                        <span>{job.location}</span>
                      </div>
                    </div>

                    {/* Skills Pills */}
                    <div className="v-skills-wrap">
                      {job.skills.map((skill, idx) => (
                        <span key={idx} className="v-skill-chip">{skill}</span>
                      ))}
                    </div>

                    {/* Apply CTA */}
                    <div className="v-card-footer">
                      <span className="v-openings-count">
                        <Users size={13} color="#10b981" />
                        <span>{job.vacanciesCount} Openings</span>
                      </span>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                          setActiveJobModal(job);
                          setApplicationSubmitted(false);
                        }}
                        className="btn btn-primary v-apply-btn"
                      >
                        <span>Apply Now</span>
                        <ArrowRight size={14} />
                      </motion.button>
                    </div>
                  </motion.div>
                </MotionItem>
              ))}
            </MotionStagger>
          )}
        </div>
      </section>

      {/* Why Work at NIMS Section */}
      <section className="section" style={{ background: '#ffffff', borderTop: '1px solid #edf2f7' }}>
        <div className="container">
          <MotionFadeIn>
            <div className="section-header">
              <span className="section-subtitle">Why Join NIMS Hospital</span>
              <h2>An Empowering Environment to Grow</h2>
              <p>We believe world-class patient outcomes begin with deeply valued doctors, nurses, and allied clinical teams.</p>
            </div>
          </MotionFadeIn>

          <MotionStagger className="why-work-grid" staggerDelay={0.08}>
            <MotionItem>
              <div className="why-work-card">
                <div className="why-icon-box">
                  <HeartPulse size={24} color="var(--nims-orange)" />
                </div>
                <h4>High-Volume Clinical Exposure</h4>
                <p>3,400 beds and 40+ super-speciality departments provide unprecedented surgical and clinical learning opportunities every single day.</p>
              </div>
            </MotionItem>

            <MotionItem>
              <div className="why-work-card">
                <div className="why-icon-box">
                  <GraduationCap size={24} color="var(--nims-navy)" />
                </div>
                <h4>Academic & Research Ecosystem</h4>
                <p>Integrated with NIMS University Rajasthan. Access continuous CMEs, medical journals, research fellowships, and academic advancement.</p>
              </div>
            </MotionItem>

            <MotionItem>
              <div className="why-work-card">
                <div className="why-icon-box">
                  <Building2 size={24} color="var(--nims-orange)" />
                </div>
                <h4>On-Campus Living & Amenities</h4>
                <p>Modern residential quarters, faculty apartments, 24×7 dining, sports complexes, and green campus living on Jaipur-Delhi highway.</p>
              </div>
            </MotionItem>

            <MotionItem>
              <div className="why-work-card">
                <div className="why-icon-box">
                  <ShieldCheck size={24} color="var(--nims-navy)" />
                </div>
                <h4>Comprehensive Benefits & Care</h4>
                <p>Subsidized medical care for family members, competitive compensation matching industry standards, and recognized retirement benefits.</p>
              </div>
            </MotionItem>
          </MotionStagger>
        </div>
      </section>

      {/* Interactive Job Application Modal with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {activeJobModal && createPortal(
          <motion.div
            className="modal-backdrop-custom"
            onClick={() => setActiveJobModal(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <motion.div
              className="v-apply-modal-box"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: 'spring', stiffness: 380, damping: 25 }}
            >
              <div className="v-modal-header">
                <div>
                  <span className="v-modal-sub">APPLYING FOR</span>
                  <h3 className="v-modal-title">{activeJobModal.title}</h3>
                  <span className="v-modal-dept">{activeJobModal.department} • {activeJobModal.location}</span>
                </div>
                <button
                  type="button"
                  className="v-modal-close"
                  onClick={() => setActiveJobModal(null)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="v-modal-body">
              {applicationSubmitted ? (
                <div className="v-success-box">
                  <CheckCircle2 size={48} color="#10b981" />
                  <h4>Application Submitted Successfully!</h4>
                  <p>
                    Thank you, <b>{formData.name}</b>. Your application for <b>{activeJobModal.title}</b> has been received by
                    the NIMS Hospital HR & Medical Recruitment Team.
                  </p>
                  <p className="success-note">
                    Our HR desk will review your credentials and contact you at <b>{formData.phone || formData.email}</b> within 2 business days.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ marginTop: '1.5rem' }}
                    onClick={() => setActiveJobModal(null)}
                  >
                    Done & Return to Vacancies
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="v-form-grid">
                  <div className="v-form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Aryan Sharma / Priya Patel"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="v-form-group">
                    <label>Mobile Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      pattern="[0-9]{10}"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="v-form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="v-form-group">
                    <label>Highest Medical / Academic Qualification *</label>
                    <input
                      type="text"
                      placeholder="e.g. B.Sc Nursing, MD Medicine, DMLT"
                      required
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    />
                  </div>

                  <div className="v-form-group">
                    <label>Total Relevant Experience *</label>
                    <select
                      required
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    >
                      <option value="">Select Experience Range</option>
                      <option value="Fresher">Fresher (0 - 1 Year)</option>
                      <option value="1-3 Years">1 - 3 Years</option>
                      <option value="3-5 Years">3 - 5 Years</option>
                      <option value="5-10 Years">5 - 10 Years</option>
                      <option value="10+ Years">10+ Years</option>
                    </select>
                  </div>

                  <div className="v-form-group">
                    <label>Current / Expected CTC (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 4.5 LPA / Negotiable"
                      value={formData.currentCtc}
                      onChange={(e) => setFormData({ ...formData, currentCtc: e.target.value })}
                    />
                  </div>

                  {/* Resume Upload Box */}
                  <div className="v-form-group v-full-width">
                    <label>Upload Resume / CV (.pdf, .docx) *</label>
                    <div className="v-file-dropzone">
                      <Upload size={22} color="var(--nims-orange)" />
                      <div>
                        {formData.resumeName ? (
                          <span style={{ color: '#10b981', fontWeight: 700 }}>
                            ✓ Selected: {formData.resumeName}
                          </span>
                        ) : (
                          <span>Click to browse and upload your latest resume</span>
                        )}
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        required
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  <div className="v-form-footer v-full-width">
                    <button type="submit" className="btn btn-primary v-submit-btn">
                      <Send size={15} />
                      <span>Submit Official Job Application</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>,
        document.body
      )}
    </AnimatePresence>
  </div>
);
}
