import React, { useState } from 'react';
import { X, Briefcase, MapPin, Clock, Send, CheckCircle2, Building, GraduationCap } from 'lucide-react';
import { vacanciesData } from '../../data/vacanciesData';

export default function VacanciesModal({ isOpen, onClose }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [applicant, setApplicant] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '2 Years',
    qualification: '',
    lastOrg: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleCloseAll = () => {
    setSelectedJob(null);
    setFormSubmitted(false);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 9999,
      background: 'rgba(5, 26, 54, 0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: '#ffffff',
        width: '100%',
        maxWidth: '720px',
        maxHeight: '90vh',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          background: 'var(--nims-navy)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '3px solid var(--nims-gold)'
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--nims-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
              NIMS Hospital Careers
            </div>
            <h3 style={{ color: '#fff', fontSize: '1.35rem', margin: '0.2rem 0 0 0' }}>
              {selectedJob ? `Apply: ${selectedJob.title}` : 'Current Hospital Openings'}
            </h3>
          </div>
          <button
            onClick={handleCloseAll}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem 1.75rem', overflowY: 'auto', flex: 1 }}>
          {formSubmitted ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.12)',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem'
              }}>
                <CheckCircle2 size={40} />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--nims-navy)' }}>
                Application Submitted Successfully!
              </h3>
              <p style={{ color: 'var(--nims-text-muted)', maxWidth: '440px', margin: '0.5rem auto 1.5rem' }}>
                Thank you for applying for <b>{selectedJob?.title}</b>. The HR Medical Recruitment board will review your profile and contact you within 3 business days.
              </p>
              <button onClick={handleCloseAll} className="btn btn-secondary">
                Back to Website
              </button>
            </div>
          ) : selectedJob ? (
            /* Application Form for Selected Job */
            <form onSubmit={handleSubmit}>
              <div style={{
                padding: '0.85rem',
                borderRadius: 'var(--radius-sm)',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                marginBottom: '1.25rem',
                fontSize: '0.88rem'
              }}>
                <span style={{ fontWeight: 700, color: 'var(--nims-navy)' }}>Role: {selectedJob.title}</span> • 
                <span style={{ color: '#64748b', marginLeft: '6px' }}>{selectedJob.department}</span> • 
                <span style={{ color: 'var(--nims-crimson)', fontWeight: 600, marginLeft: '6px' }}>{selectedJob.openings} Openings</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Candidate name"
                    value={applicant.name}
                    onChange={e => setApplicant({ ...applicant, name: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@domain.com"
                    value={applicant.email}
                    onChange={e => setApplicant({ ...applicant, email: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength="10"
                    placeholder="10-digit number"
                    value={applicant.phone}
                    onChange={e => setApplicant({ ...applicant, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Total Experience
                  </label>
                  <select
                    value={applicant.experience}
                    onChange={e => setApplicant({ ...applicant, experience: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', background: '#fff' }}
                  >
                    <option>0 - 1 Year (Fresher)</option>
                    <option>2 - 4 Years</option>
                    <option>5 - 8 Years</option>
                    <option>8+ Years</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Educational Qualification *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.Sc Nursing, MD Medicine, DMLT"
                  value={applicant.qualification}
                  onChange={e => setApplicant({ ...applicant, qualification: e.target.value })}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Upload Resume / CV (PDF / DOCX)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px dashed #cbd5e1', background: '#f8fafc' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="btn btn-ghost"
                >
                  Back to List
                </button>
                <button type="submit" className="btn btn-primary">
                  <Send size={15} />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          ) : (
            /* Open Positions List */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontSize: '0.92rem', color: '#64748b' }}>
                Join Rajasthan’s premier 3,400-bed healthcare institute. We offer world-class medical infrastructure and competitive career growth.
              </p>

              {vacanciesData.map((job) => (
                <div
                  key={job.id}
                  style={{
                    padding: '1.15rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--nims-border)',
                    borderLeft: '4px solid var(--nims-navy)',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.85rem'
                  }}
                >
                  <div>
                    <h4 style={{ color: 'var(--nims-navy)', fontSize: '1.05rem', margin: '0 0 0.35rem 0' }}>
                      {job.title}
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', fontSize: '0.8rem', color: '#64748b' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Building size={13} color="var(--nims-crimson)" />
                        {job.department}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock size={13} />
                        {job.experience}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <MapPin size={13} color="var(--nims-gold)" />
                        {job.location}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedJob(job)}
                    className="btn btn-gold"
                    style={{ padding: '0.45rem 1rem', fontSize: '0.84rem' }}
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
