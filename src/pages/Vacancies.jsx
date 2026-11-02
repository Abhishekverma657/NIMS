import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  GraduationCap,
  Building2,
  Search,
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  Users,
  Sparkles,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MotionFadeIn, MotionStagger, MotionItem } from '../components/motion/MotionWrapper';
import { vacanciesData as fallbackVacancies, generateJobSlug } from '../data/vacanciesData';

export default function Vacancies() {
  const navigate = useNavigate();

  const [selectedDept, setSelectedDept] = useState('All');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [vacanciesData, setVacanciesData] = useState(fallbackVacancies);
  const [loading, setLoading] = useState(true);

  // Fetch live active positions from backend, fallback seamlessly to curated jobs
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
    fetch(`${baseUrl}/hr/jobs?activeOnly=true`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.jobs) && data.jobs.length > 0) {
          setVacanciesData(
            data.jobs.map((job) => ({
              ...job,
              id: job._id || job.id,
              slug: generateJobSlug(job.title),
              openings: job.vacanciesCount || job.openings || 1
            }))
          );
        }
      })
      .catch((err) => {
        console.warn('Backend jobs fetch note: using active clinical vacancies catalog', err);
      })
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
    const matchesDept =
      selectedDept === 'All' ||
      job.category === selectedDept ||
      job.deptCategory === selectedDept ||
      (job.department && job.department.toLowerCase().includes(selectedDept.toLowerCase()));

    const q = searchKeyword.toLowerCase().trim();
    const matchesKeyword =
      !q ||
      job.title.toLowerCase().includes(q) ||
      (job.department && job.department.toLowerCase().includes(q)) ||
      (job.qualification && job.qualification.toLowerCase().includes(q)) ||
      (job.skills && job.skills.some((s) => s.toLowerCase().includes(q)));

    return matchesDept && matchesKeyword;
  });

  const handleNavigateToJob = (job) => {
    const targetSlug = job.slug || generateJobSlug(job.title);
    navigate(`/careers/${targetSlug}`);
  };

  return (
    <div className="vacancies-page">
      {/* Space-Optimized Compact Hero Banner */}
      <section className="vacancies-hero-section">
        <div className="container">
          <div className="vacancies-hero-content">
            <div className="vacancies-badge">
              <Sparkles size={13} color="var(--nims-orange)" />
              <span>Shape the Future of Quaternary Healthcare</span>
            </div>

            <h1 className="vacancies-hero-title">
              Build Your Career at <span className="gradient-text">NIMS Hospital, Jaipur</span>
            </h1>

            <p className="vacancies-hero-sub">
              Join Rajasthan's premier 2,400+ bed hospital and medical university. Work with renowned clinicians,
              world-class modular infrastructure, and empower millions of healing journeys on NH-11C Jaipur.
            </p>
          </div>
        </div>
      </section>

      {/* Compact Search & Filter Toolbar */}
      <section className="vacancies-toolbar-section">
        <div className="container">
          <div className="vacancies-filter-container">
            {/* Search Input */}
            <div className="vacancies-search-box">
              <Search size={16} color="var(--nims-navy)" />
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
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}
                  title="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="vacancies-filter-pills">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
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

      {/* Space-Optimized Job Openings Section - Top Row of Cards Visible Immediately Above The Fold */}
      <section className="section" style={{ background: '#f8fafc', padding: '1.5rem 0 3.5rem' }}>
        <div className="container">
          <MotionFadeIn>
            <div className="vacancies-list-header">
              <h3>
                Current Openings ({filteredJobs.length} {filteredJobs.length === 1 ? 'Position' : 'Positions'})
              </h3>
              <span className="header-hint">
                Verified Active Positions at NIMS Hospital Campus &bull; Click any role to view detailed scope & qualifications
              </span>
            </div>
          </MotionFadeIn>

          {filteredJobs.length === 0 ? (
            <div className="no-vacancies-box">
              <Briefcase size={38} color="#94a3b8" />
              <h4>No matching positions found</h4>
              <p>Try clearing your search filters or check back shortly as new clinical roles are posted weekly.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedDept('All');
                  setSearchKeyword('');
                }}
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
              >
                Show All Openings
              </button>
            </div>
          ) : (
            <MotionStagger className="vacancies-cards-grid" staggerDelay={0.06}>
              {filteredJobs.map((job) => (
                <MotionItem key={job.id}>
                  <motion.div
                    className="vacancy-job-card"
                    whileHover={{ y: -5, boxShadow: '0 18px 38px rgba(35, 32, 33, 0.1)' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                    onClick={() => handleNavigateToJob(job)}
                    style={{ cursor: 'pointer' }}
                    title={`Click to view full role details for ${job.title}`}
                  >
                    <div className="v-card-top">
                      <div>
                        <span className="v-dept-badge">{job.department}</span>
                        <h4 className="v-job-title">{job.title}</h4>
                      </div>
                      <span className="v-type-badge">{job.type || 'Full-Time'}</span>
                    </div>

                    <p className="v-job-desc">{job.description}</p>

                    <div className="v-details-box">
                      <div className="v-detail-row">
                        <GraduationCap size={14} color="var(--nims-navy)" />
                        <span><b>Eligibility:</b> {job.qualification}</span>
                      </div>
                      <div className="v-detail-row">
                        <Clock size={14} color="var(--nims-orange)" />
                        <span><b>Experience:</b> {job.experience}</span>
                      </div>
                      <div className="v-detail-row">
                        <MapPin size={14} color="var(--nims-navy)" />
                        <span>{job.location || 'Jaipur Campus'}</span>
                      </div>
                    </div>

                    {/* Skills Pills */}
                    {job.skills && job.skills.length > 0 && (
                      <div className="v-skills-wrap">
                        {job.skills.map((skill, idx) => (
                          <span key={idx} className="v-skill-chip">{skill}</span>
                        ))}
                      </div>
                    )}

                    {/* Card Footer: View Details CTA (Apply button only appears on the dedicated detail page!) */}
                    <div className="v-card-footer">
                      <span className="v-openings-count">
                        <Users size={13} color="#10b981" />
                        <span>{job.openings || job.vacanciesCount || 1} Openings</span>
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigateToJob(job);
                        }}
                        className="v-card-detail-btn"
                        title={`View detailed page for ${job.title}`}
                      >
                        <span>View Details</span>
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
      <section className="section" style={{ background: '#ffffff', borderTop: '1px solid #edf2f7', padding: '3.5rem 0' }}>
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
    </div>
  );
}
