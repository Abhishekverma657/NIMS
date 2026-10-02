import React from 'react';
import { 
  Phone, 
  MapPin,
  Map, 
  Clock, 
  Bed, 
  ArrowRight,
  ShieldCheck,
  Zap,
  HeartPulse,
  Smartphone,
  Ambulance,
  CalendarDays,
  FlaskConical,
  Stethoscope,
  Home as HomeIcon,
  User,
  PhoneCall
} from 'lucide-react';
import './HeroCustom.css';

export default function HeroCustom() {
  return (
    <div className="hero-custom-container">
      {/* Background image is handled in CSS */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.15)', zIndex: 1 }} />

      {/* Red Curve Overlay (Left Side) */}
      <div className="hero-curve-overlay"></div>
      
      {/* Content over Red Curve */}
      <div className="hero-curve-content" style={{ paddingLeft: '5rem' }}>
        
        {/* Exact Logo from User */}
        <div style={{ marginBottom: '1rem', marginTop: '-2rem' }}>
          <img 
            src="/assets/tatkal_sewa.png" 
            alt="NIMS Tatkal Seva" 
            style={{ maxHeight: '160px', width: 'auto', dropShadow: '0 4px 10px rgba(0,0,0,0.3)' }} 
          />
        </div>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.6rem',
          marginBottom: '1.5rem',
          fontSize: '1.1rem',
          fontWeight: 600,
          borderBottom: '1px solid rgba(255,255,255,0.3)',
          paddingBottom: '10px',
          width: 'fit-content'
        }}>
          <HeartPulse size={22} />
          <span>Associated With NIMS Hospital</span>
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          border: '1px solid rgba(255,255,255,0.5)',
          padding: '0.5rem 1.2rem',
          borderRadius: '50px',
          marginBottom: '2rem',
          background: 'transparent'
        }}>
          <div style={{ background: 'white', borderRadius: '50%', padding: '4px', display: 'flex' }}>
            <Map size={16} color="#bd171c" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Rajasthan's Trusted Healthcare Service</span>
        </div>

        <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '1.2rem', letterSpacing: '-0.5px' }}>
          Your Health, Our Priority
        </h2>

        <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={24} />
            <span style={{ fontWeight: 600, fontSize: '1.2rem' }}>Fast</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={24} />
            <span style={{ fontWeight: 600, fontSize: '1.2rem' }}>Safe</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HeartPulse size={24} />
            <span style={{ fontWeight: 600, fontSize: '1.2rem' }}>Reliable</span>
          </div>
        </div>

        {/* Download App Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#a70000',
          border: '2px solid rgba(255,255,255,0.8)',
          borderRadius: '50px',
          padding: '0.5rem 1.5rem 0.5rem 0.5rem',
          width: 'fit-content',
          cursor: 'pointer',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{ 
            background: '#fff', 
            borderRadius: '50px', 
            width: '60px', 
            height: '60px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginRight: '1rem'
          }}>
            <Smartphone size={30} color="#bd171c" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>Download Mobile App</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Book • Track • Manage • Stay Healthy</div>
          </div>
          <div style={{ background: 'white', borderRadius: '50%', padding: '6px', marginLeft: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowRight size={20} color="#bd171c" />
          </div>
        </div>
      </div>

      {/* Floating Contact Form */}
      <div className="hero-contact-form-wrapper">
        <div style={{ 
          background: 'linear-gradient(135deg, #d3101c, #9b0b14)',
          borderRadius: '16px',
          padding: '1.5rem',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
          boxShadow: '0 10px 20px rgba(189, 23, 28, 0.2)',
          marginTop: '-3rem'
        }}>
          <div style={{ 
            background: 'white', 
            borderRadius: '50%', 
            width: '45px', 
            height: '45px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <PhoneCall size={20} color="#bd171c" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Request a Call-back</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9 }}>Our team will get back to you soon.</p>
          </div>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={(e) => e.preventDefault()}>
          <div style={{ position: 'relative' }}>
            <User size={18} color="#94a3b8" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem' }} />
            <input 
              type="text" 
              placeholder="Full Name" 
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 3rem',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '1rem',
                outline: 'none',
                background: '#f8fafc'
              }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Phone size={18} color="#94a3b8" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem' }} />
            <input 
              type="text" 
              placeholder="Phone Number" 
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 3rem',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '1rem',
                outline: 'none',
                background: '#f8fafc'
              }}
            />
          </div>
          <button style={{
            background: 'linear-gradient(135deg, #d3101c, #9b0b14)',
            color: 'white',
            border: 'none',
            padding: '1rem',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            marginTop: '0.5rem',
            boxShadow: '0 4px 15px rgba(189, 23, 28, 0.4)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <PhoneCall size={18} />
            Request Call-back
          </button>
        </form>
      </div>

      {/* Bottom Bar Icons - Reverting to full width connected style */}
      <div className="hero-bottom-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'white' }}>
          <div style={{ border: '2px solid white', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ambulance size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Book Ambulance</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>Near Me</div>
          </div>
        </div>

        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.3)' }}></div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'white' }}>
          <div style={{ border: '2px solid white', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Stethoscope size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Book Health Checkup</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>& Sample Collect<br/>From Home</div>
          </div>
        </div>

        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.3)' }}></div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'white' }}>
          <div style={{ border: '2px solid white', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CalendarDays size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Online</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>Appointment</div>
          </div>
        </div>

        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.3)' }}></div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'white' }}>
          <div style={{ border: '2px solid white', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FlaskConical size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Health Checkup</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>Packages</div>
          </div>
        </div>

        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.3)' }}></div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'white' }}>
          <div style={{ border: '2px solid white', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HomeIcon size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Sample Collect</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>From Home</div>
          </div>
        </div>
      </div>
    </div>
  );
}
