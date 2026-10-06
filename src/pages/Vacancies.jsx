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
  Printer,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionFadeIn, MotionStagger, MotionItem } from '../components/motion/MotionWrapper';
import AnimatedCounter from '../components/common/AnimatedCounter';
import VacanciesModal from '../components/vacancies/VacanciesModal';

export default function Vacancies() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [modalJob, setModalJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    councilRegNo: '',
    experience: '',
    noticePeriod: 'Immediate Joiner',
    currentCtc: '',
    resumeName: ''
  });

  const [vacanciesData, setVacanciesData] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
    fetch(`${baseUrl}/hr/jobs?activeOnly=true`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setVacanciesData(data.jobs.map(job => ({ ...job, id: job._id })));
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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
    const token = 'NIMS-HR-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
    setTokenNumber(token);
    setApplicationSubmitted(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resumeName: e.target.files[0].name });
    }
  };

  const handlePrintSlip = () => {
    const slipHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>NIMS Hospital - Job Application Receipt (${tokenNumber})</title>
        <style>
          @page { size: A4 portrait; margin: 10mm 14mm; }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; padding: 10px; font-size: 13px; line-height: 1.45; }
          .wrapper { max-width: 720px; margin: 0 auto; border: 2px solid #373435; border-radius: 12px; overflow: hidden; }
          .header { background: #373435; color: #fff; padding: 16px 20px; border-bottom: 3.5px solid #bd171c; }
          .header h1 { font-size: 17px; font-weight: 800; color: #fff; margin-bottom: 2px; }
          .header p { font-size: 10.5px; color: #cbd5e1; }
          .token-strip { background: #f1f5f9; padding: 12px 20px; border-bottom: 1.5px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
          .token-val { font-size: 17px; font-weight: 900; color: #373435; letter-spacing: 1px; }
          .body { padding: 18px 20px; }
          .role-box { background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 10px; padding: 12px 16px; margin-bottom: 14px; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 14px; }
          td { padding: 5px; border-bottom: 1px solid #f1f5f9; }
          td.lbl { color: #64748b; font-weight: 600; width: 35%; }
          td.val { color: #0f172a; font-weight: 700; }
          .timeline { background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 10px; padding: 12px 16px; font-size: 11px; color: #166534; margin-bottom: 14px; }
          .footer { background: #f8fafc; border-top: 1.5px solid #e2e8f0; padding: 10px 20px; font-size: 10px; color: #64748b; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="header">
            <h1>NIMS HOSPITAL (Unit of NIMS UNIVERSITY Rajasthan)</h1>
            <p>National Highway 11C, Delhi-Jaipur Expressway, Jaipur, Rajasthan 303121 &bull; Central Recruitment Directorate</p>
          </div>
          <div class="token-strip">
            <div><span style="font-size: 10px; color: #64748b; text-transform: uppercase;">Application Token:</span> <strong class="token-val">${tokenNumber}</strong></div>
            <div style="font-size: 11px; color: #475569;">Logged: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
          </div>
          <div class="body">
            <div class="role-box">
              <div style="font-size: 10px; color: #bd171c; font-weight: 800; text-transform: uppercase;">POSITION APPLIED</div>
              <div style="font-size: 16px; font-weight: 800; color: #373435;">${activeJobModal?.title}</div>
              <div style="font-size: 11px; color: #64748b;">Dept: ${activeJobModal?.department} &bull; ${activeJobModal?.location}</div>
            </div>
            <table>
              <tr><td class="lbl">Candidate Name:</td><td class="val">${formData.name}</td></tr>
              <tr><td class="lbl">Mobile / WhatsApp:</td><td class="val">+91 ${formData.phone}</td></tr>
              <tr><td class="lbl">Email:</td><td class="val">${formData.email}</td></tr>
              <tr><td class="lbl">Highest Qualification:</td><td class="val">${formData.qualification}</td></tr>
              <tr><td class="lbl">Council Reg. No:</td><td class="val">${formData.councilRegNo || 'Submitted / Under Review'}</td></tr>
              <tr><td class="lbl">Experience:</td><td class="val">${formData.experience}</td></tr>
              <tr><td class="lbl">Notice Period:</td><td class="val">${formData.noticePeriod}</td></tr>
              ${formData.resumeName ? `<tr><td class="lbl">Attached CV:</td><td class="val">${formData.resumeName}</td></tr>` : ''}
            </table>
            <div class="timeline">
              <strong>Next Steps in Recruitment:</strong>
              <p style="margin-top: 4px;">Your profile has been submitted to the Medical Superintendent and Departmental Head. Shortlisted candidates will be contacted within 2-3 business days for technical and clinical panel rounds.</p>
            </div>
          </div>
          <div class="footer">
            <div>NIMS Hospital HR Department &bull; hr@nimshospitals.in</div>
            <div>Helpline: 0141-23 88 999 (Ext: 3410)</div>
          </div>
        </div>
      </body>
      </html>
    `;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(slipHtml);
    doc.close();
    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) document.body.removeChild(iframe);
      }, 2000);
    }, 400);
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
              Join Rajasthan's premier 2,400+ bed hospital and medical university. Work with renowned clinicians,
              world-class modular infrastructure, and empower millions of healing journeys on NH-11C Jaipur.
            </p>

            {/* Quick Culture Metric Row */}
            <div className="vacancies-metrics-strip">
              <div className="v-metric-item">
                <span className="v-metric-num"><AnimatedCounter target={2400} suffix="+" /></span>
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
                    whileHover={{ y: -6, boxShadow: '0 20px 42px rgba(35, 32, 33, 0.12)' }}
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

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalJob(job);
                          setIsModalOpen(true);
                        }}
                        className="btn btn-primary v-apply-btn"
                        style={{
                          position: 'relative',
                          zIndex: 10,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>Apply Now</span>
                        <ArrowRight size={14} />
                      </button>
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
                <p>2,400 beds and 40+ super-speciality departments provide unprecedented surgical and clinical learning opportunities every single day.</p>
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

      {/* 3-Step Guided Vacancy Application Modal */}
      <VacanciesModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setModalJob(null);
        }}
        initialJob={modalJob}
        vacanciesData={vacanciesData}
      />
    </div>
  );
}
