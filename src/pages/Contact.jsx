import React, { useState } from 'react';
import { MapPin, PhoneCall, Mail, Clock, Send, CheckCircle2, ShieldAlert, Navigation } from 'lucide-react';

export default function Contact() {
  const [msgSent, setMsgSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    department: 'General Enquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsgSent(true);
  };

  return (
    <div>
      {/* Banner */}
      <section style={{
        background: 'linear-gradient(135deg, var(--nims-navy) 0%, var(--nims-navy-light) 100%)',
        color: '#ffffff',
        padding: '3.5rem 0 2.5rem',
        borderBottom: '3px solid var(--nims-gold)'
      }}>
        <div className="container">
          <span className="badge-pill badge-gold" style={{ marginBottom: '0.75rem' }}>
            Reach NIMS Hospital, Jaipur
          </span>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '0.5rem' }}>
            Contact Us & 24×7 Emergency Care
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.02rem', maxWidth: '650px' }}>
            We are here to assist you 24 hours a day, 365 days a year. Connect with our emergency triage, OPD appointment desk, or international patient office.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Hubs & Enquiry Form */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          {/* Quick Hubs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3.5rem'
          }}>
            {/* Hub 1: Emergency */}
            <div className="smooth-card" style={{ padding: '1.75rem', borderTop: '4px solid var(--nims-crimson)', background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'var(--nims-crimson-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--nims-crimson)'
                }}>
                  <PhoneCall size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--nims-crimson)', textTransform: 'uppercase' }}>
                    Level-1 Trauma & Ambulance
                  </div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--nims-navy)' }}>24×7 Emergency Helpline</h3>
                </div>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--nims-crimson)', margin: '0.5rem 0' }}>
                0141-23 88 999
              </div>
              <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
                Direct access to trauma resuscitation bay, cardiac emergency unit, and fleet of ALS life support ambulances.
              </p>
            </div>

            {/* Hub 2: OPD Appointment & TPA */}
            <div className="smooth-card" style={{ padding: '1.75rem', borderTop: '4px solid var(--nims-navy)', background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(35, 32, 33, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--nims-navy)'
                }}>
                  <Clock size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--nims-navy)', textTransform: 'uppercase' }}>
                    Consultation & Schemes
                  </div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--nims-navy)' }}>OPD & TPA Desk</h3>
                </div>
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--nims-navy)', margin: '0.5rem 0' }}>
                +91 7412048766
              </div>
              <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
                OPD Schedule: Mon - Sat (09:00 AM - 05:00 PM). Cashless Ayushman & RGHS desk guidance.
              </p>
            </div>

            {/* Hub 3: Campus & Email */}
            <div className="smooth-card" style={{ padding: '1.75rem', borderTop: '4px solid var(--nims-gold)', background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'var(--nims-gold-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#b54c04'
                }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--nims-gold)', textTransform: 'uppercase' }}>
                    Hospital Address
                  </div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--nims-navy)' }}>Jaipur Campus</h3>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--nims-navy)', margin: '0.5rem 0' }}>
                Jaipur-Delhi Highway (NH-11C), Dr. B.S. Tomar City, Jaipur - 303121
              </div>
              <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
                Email: <b>info@nimsuniversity.org</b>
              </p>
            </div>
          </div>

          {/* Map & Form Split Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(1.75rem, 4vw, 3rem)',
            alignItems: 'start'
          }}>
            {/* Left: Contact Form */}
            <div style={{
              background: '#ffffff',
              padding: 'clamp(1.25rem, 3vw, 2rem)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--nims-border)'
            }}>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--nims-navy)', marginBottom: '0.35rem' }}>
                Send Us an Enquiry
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.5rem' }}>
                Have questions regarding treatments, doctor availability, or hospital services? Fill out the form below.
              </p>

              {msgSent ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.12)',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--nims-navy)' }}>
                    Message Dispatched Successfully
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0.5rem 0 1.25rem' }}>
                    Our patient coordination desk has received your request and will call you back on <b>+91 {form.phone}</b> shortly.
                  </p>
                  <button onClick={() => setMsgSent(false)} className="btn btn-ghost">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                        Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength="10"
                        placeholder="10-digit number"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@email.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      Department / Query Type
                    </label>
                    <select
                      value={form.department}
                      onChange={e => setForm({ ...form, department: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', background: '#fff' }}
                    >
                      <option>General Enquiry</option>
                      <option>OPD Doctor Appointment</option>
                      <option>Health Checkup Packages</option>
                      <option>Cashless Insurance & TPA</option>
                      <option>Organ Transplant Evaluation</option>
                      <option>Feedback / Patient Care</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      Message / Requirement *
                    </label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Write your query here..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', resize: 'vertical' }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem' }}>
                    <Send size={15} />
                    <span>Submit Enquiry</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right: Embedded Interactive Map & Navigation Card */}
            <div>
              <div style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--nims-border)',
                background: '#ffffff'
              }}>
                <div style={{ padding: '1.25rem 1.5rem', background: 'var(--nims-navy)', color: '#fff' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--nims-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Location Map
                  </div>
                  <h3 style={{ color: '#fff', fontSize: '1.2rem', margin: '0.2rem 0' }}>
                    NIMS Hospital Campus on NH-11C
                  </h3>
                </div>

                {/* Google Map iframe centered on NIMS Hospital Jaipur */}
                <div style={{ height: '340px', width: '100%', background: '#e2e8f0' }}>
                  <iframe
                    title="NIMS Hospital Jaipur Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113642.48202564245!2d75.9221293!3d27.1852026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396da6bb5e436979%3A0xe54d89fa3ae58fbe!2sNIMS%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div style={{ padding: '1.25rem 1.5rem', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--nims-navy)' }}>
                      Quick Highway Access
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      Easy entry directly from Jaipur-Delhi Expressway
                    </div>
                  </div>

                  <a
                    href="https://maps.google.com/?q=NIMS+Hospital+Jaipur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.84rem' }}
                  >
                    <Navigation size={14} />
                    <span>Get GPS Directions</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
