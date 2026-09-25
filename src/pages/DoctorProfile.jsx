import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { MotionFadeIn, MotionStagger } from '../components/motion/MotionWrapper';
import { doctorsData } from '../data/doctorsData';
import { videoReviewsData } from '../data/videoReviewsData';
import VideoCard from '../components/video/VideoCard';
import VideoGalleryModal from '../components/video/VideoGalleryModal';

export default function DoctorProfile({ onOpenBooking }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const doctor = doctorsData.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div style={{ textAlign: 'center', padding: '10rem 1rem', minHeight: '60vh', background: '#fff' }}>
        <h2 style={{ color: 'var(--nims-navy)' }}>Doctor Profile Not Found</h2>
        <button className="btn-primary" onClick={() => navigate(-1)} style={{ marginTop: '1rem' }}>
          Go Back
        </button>
      </div>
    );
  }

  const doctorVideos = videoReviewsData.filter(v => v.doctorId === id);

  return (
    <div className="page-transition" style={{ background: '#fff' }}>
      {/* Top Navigation / Breadcrumb Area */}
      <div style={{ borderBottom: '1px solid #eaeaea', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 5%' }}>
          <button 
            onClick={() => navigate(-1)}
            style={{ 
              background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', 
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem', 
              padding: '0.5rem 0', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 500
            }}
          >
            <ArrowLeft size={18} /> Back to Doctors
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <section style={{ padding: '4rem 5% 3rem', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <MotionFadeIn style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'flex-start' }}>
            
            {/* Left Column: Image */}
            <div style={{ maxWidth: '400px' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '4px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} 
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80";
                  }}
                />
              </div>
              
              {doctor.isOpdAvailable !== false && (
                <motion.button
                  onClick={() => onOpenBooking(doctor)}
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ width: '100%', marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '4px' }}
                >
                  <Calendar size={20} />
                  Book Appointment
                </motion.button>
              )}
            </div>

            {/* Right Column: Info */}
            <div>
              <h1 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0', fontWeight: 600, color: '#095697', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {doctor.name}
              </h1>
              
              <p style={{ fontSize: '1.1rem', color: '#555', margin: '0 0 0.5rem 0', fontWeight: 500 }}>
                {doctor.heroQualification || doctor.qualification}
              </p>
              
              <p style={{ fontSize: '1.1rem', color: '#555', margin: '0 0 0.5rem 0' }}>
                {doctor.heroDesignation || doctor.title}
              </p>
              
              <p style={{ fontSize: '1.1rem', color: '#777', margin: '0 0 1.5rem 0' }}>
                {doctor.heroDepartment || doctor.department}
              </p>
              
              {doctor.languages && doctor.languages.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <p style={{ color: '#777', margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>Language Known:</p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {doctor.languages.map((lang, idx) => (
                      <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#444', fontSize: '0.95rem' }}>
                        <span style={{ color: '#095697', fontWeight: 'bold' }}>{lang.charAt(0)}</span> {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Hero Highlights */}
              {doctor.highlights && doctor.highlights.length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0, margin: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {doctor.highlights.map((hl, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', color: '#444', fontSize: '1.05rem', lineHeight: 1.6 }}>
                      <CheckCircle2 size={18} color="#373435" style={{ flexShrink: 0, marginTop: '4px' }} />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              )}

            </div>
          </MotionFadeIn>
        </div>
      </section>

      {/* Details Section */}
      {(doctor.about || (doctor.detailedQualifications && doctor.detailedQualifications.length > 0) || (doctor.detailedExperience && doctor.detailedExperience.length > 0) || doctor.expertise) && (
        <section style={{ padding: '4rem 5%', background: '#f8fafc', borderTop: '1px solid #eaeaea' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            
            {/* About */}
            {doctor.about && (
              <div>
                <h2 style={{ color: '#373435', marginBottom: '1.5rem', fontSize: '1.8rem', fontWeight: 600 }}>Know More About {doctor.name}</h2>
                <div style={{ color: '#555', fontSize: '1.1rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {doctor.about}
                </div>
              </div>
            )}

            {/* Detailed Timelines: Qualifications & Experience */}
            {((doctor.detailedQualifications && doctor.detailedQualifications.length > 0) || (doctor.detailedExperience && doctor.detailedExperience.length > 0)) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                
                {doctor.detailedQualifications && doctor.detailedQualifications.length > 0 && (
                  <div>
                    <h3 style={{ color: '#373435', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Award size={24} color="var(--nims-orange)" />
                      Qualifications
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                      {doctor.detailedQualifications.map((item, idx) => (
                        <div key={idx} style={{ padding: '1.5rem', background: '#fff', border: '1px solid #eaeaea', borderRadius: '12px', borderTop: '4px solid var(--nims-orange)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', transition: 'transform 0.2s', cursor: 'default' }}
                             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                          <div style={{ fontWeight: 600, color: '#373435', fontSize: '1.1rem', marginBottom: '0.8rem', lineHeight: 1.4 }}>{item.title}</div>
                          {item.year && <div style={{ display: 'inline-block', background: 'rgba(244,117,33,0.1)', color: 'var(--nims-orange)', fontSize: '0.85rem', fontWeight: 600, padding: '0.3rem 0.8rem', borderRadius: '50px', marginBottom: '0.8rem' }}>{item.year}</div>}
                          {item.org && <div style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.5 }}>{item.org}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {doctor.detailedExperience && doctor.detailedExperience.length > 0 && (
                  <div>
                    <h3 style={{ color: '#373435', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={24} color="var(--nims-orange)" />
                      Experience
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                      {doctor.detailedExperience.map((item, idx) => (
                        <div key={idx} style={{ padding: '1.5rem', background: '#fff', border: '1px solid #eaeaea', borderRadius: '12px', borderTop: '4px solid var(--nims-orange)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', transition: 'transform 0.2s', cursor: 'default' }}
                             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                          <div style={{ fontWeight: 600, color: '#373435', fontSize: '1.1rem', marginBottom: '0.8rem', lineHeight: 1.4 }}>{item.title}</div>
                          {item.year && <div style={{ display: 'inline-block', background: 'rgba(244,117,33,0.1)', color: 'var(--nims-orange)', fontSize: '0.85rem', fontWeight: 600, padding: '0.3rem 0.8rem', borderRadius: '50px', marginBottom: '0.8rem' }}>{item.year}</div>}
                          {item.org && <div style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.5 }}>{item.org}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* Expertise */}
            {doctor.expertise && doctor.expertise.length > 0 && (
              <div>
                <h3 style={{ color: '#373435', marginBottom: '1.5rem', fontSize: '1.8rem', fontWeight: 600 }}>
                  Special Interests and Expertise
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  {doctor.expertise.map((exp, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                      <div style={{ marginTop: '0.3rem', color: '#10b981' }}><CheckCircle2 size={20} /></div>
                      <span style={{ fontSize: '1.1rem', color: '#555', lineHeight: 1.6 }}>{exp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {doctorVideos.length > 0 && (
        <section style={{ padding: '5rem 5%', background: '#fff', borderTop: '1px solid #eaeaea' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ display: 'inline-block', background: 'rgba(244,117,33,0.1)', color: 'var(--nims-orange)', padding: '0.4rem 1.2rem', borderRadius: '50px', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem' }}>
                Patient Stories
              </div>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--nims-navy)' }}>
                Testimonials for {doctor.name}
              </h2>
            </div>

            <MotionStagger>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {doctorVideos.map((video, index) => (
                  <VideoCard 
                    key={video.id} 
                    item={video} 
                    index={index}
                    setActiveVideoModal={setActiveVideoIndex} 
                  />
                ))}
              </div>
            </MotionStagger>
          </div>
        </section>
      )}

      {activeVideoIndex !== null && (
        <VideoGalleryModal
          videoList={doctorVideos}
          activeVideoIndex={activeVideoIndex}
          setActiveVideoIndex={setActiveVideoIndex}
        />
      )}
    </div>
  );
}
