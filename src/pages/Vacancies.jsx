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
  X,
  Send
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MotionFadeIn, MotionStagger, MotionItem } from '../components/motion/MotionWrapper';
import { generateJobSlug } from '../data/vacanciesData';

export default function Vacancies() {
  const navigate = useNavigate();

  const [selectedDept, setSelectedDept] = useState('All');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [vacanciesData, setVacanciesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch live active positions directly from backend API
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
    fetch(`${baseUrl}/hr/jobs?activeOnly=true`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.jobs)) {
          setVacanciesData(
            data.jobs.map((job) => ({
              ...job,
              id: job._id || job.id,
              slug: generateJobSlug(job.title),
              openings: job.vacanciesCount || job.openings || 1
            }))
          );
        } else {
          setVacanciesData([]);
        }
      })
      .catch((err) => {
        console.error('Failed to load vacancies from API:', err);
        setVacanciesData([]);
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

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#64748b' }}>
              <div className="animate-spin" style={{ width: '38px', height: '38px', border: '3px solid #cbd5e1', borderTopColor: 'var(--nims-navy)', borderRadius: '50%', margin: '0 auto 1rem' }} />
              <p style={{ fontSize: '0.92rem', fontWeight: 600 }}>Loading verified job openings...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
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
                      <span className="v-type-badge">
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                        {job.type || 'Full-Time'}
                      </span>
                    </div>

                    <p className="v-job-desc">{job.description}</p>

                    <div className="v-details-box">
                      <div className="v-detail-row" title={`Eligibility: ${job.qualification}`}>
                        <GraduationCap size={14} color="var(--nims-navy)" style={{ flexShrink: 0 }} />
                        <span className="v-detail-text"><b>Eligibility:</b> {job.qualification}</span>
                      </div>
                      <div className="v-detail-row" title={`Experience: ${job.experience}`}>
                        <Clock size={14} color="var(--nims-orange)" style={{ flexShrink: 0 }} />
                        <span className="v-detail-text"><b>Experience:</b> {job.experience}</span>
                      </div>
                      <div className="v-detail-row" title={job.location || 'Jaipur Campus'}>
                        <MapPin size={14} color="var(--nims-navy)" style={{ flexShrink: 0 }} />
                        <span className="v-detail-text">{job.location || 'Jaipur Campus'}</span>
                      </div>
                    </div>

                    {/* Skills / Key Scope Pills (Fixed to max 2 preview items with single-line ellipsis for clean uniform card height) */}
                    {job.skills && job.skills.length > 0 && (
                      <div className="v-skills-wrap">
                        {job.skills.slice(0, 2).map((skill, idx) => (
                          <span key={idx} className="v-skill-chip" title={skill}>
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 2 && (
                          <span className="v-skill-chip-more">
                            +{job.skills.length - 2} more in Details &rarr;
                          </span>
                        )}
                      </div>
                    )}

                    {/* Card Footer: View Details & Quick Apply CTA */}
                    <div className="v-card-footer">
                      <span className="v-openings-count">
                        <Users size={13} color="#10b981" />
                        <span>{job.openings || job.vacanciesCount || 1} Openings</span>
                      </span>

                      <div className="v-card-actions">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigateToJob(job);
                          }}
                          className="v-card-detail-btn"
                          title={`View detailed page for ${job.title}`}
                        >
                          <span>Details</span>
                          <ArrowRight size={13} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/careers/${job.slug || generateJobSlug(job.title)}?apply=true`);
                          }}
                          className="v-card-apply-btn"
                          title={`Apply directly for ${job.title}`}
                        >
                          <Send size={12} />
                          <span>Apply</span>
                        </button>
                      </div>
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
