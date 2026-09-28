import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  ChevronRight,
  Mail,
  PhoneCall,
  MapPin,
  ExternalLink
} from 'lucide-react';

export default function PrivacyPolicy({ initialTab = 'privacy' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b' }}>
      {/* Banner / Header */}
      <section style={{
        background: 'linear-gradient(135deg, var(--nims-navy-deep) 0%, var(--nims-navy) 100%)',
        color: '#ffffff',
        padding: '3rem 0 2.5rem',
        borderBottom: '4px solid var(--nims-orange)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.85rem',
            color: '#94a3b8',
            marginBottom: '0.75rem'
          }}>
            <Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} color="#64748b" />
            <span style={{ color: 'var(--nims-gold)', fontWeight: 600 }}>
              {activeTab === 'privacy' && 'Privacy Policy'}
              {activeTab === 'terms' && 'Terms & Conditions'}
              {activeTab === 'disclaimer' && 'Disclaimer'}
            </span>
          </div>

          <div>
            <h1 style={{
              color: '#ffffff',
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              margin: 0,
              letterSpacing: '-0.02em'
            }}>
              {activeTab === 'privacy' && 'Privacy Policy'}
              {activeTab === 'terms' && 'Terms & Conditions'}
              {activeTab === 'disclaimer' && 'Disclaimer'}
            </h1>
            <div style={{ color: '#cbd5e1', fontSize: '0.95rem', marginTop: '0.4rem' }}>
              NIMS Tatkal Seva • NIMS Hospital, Rajasthan
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.65rem 1.5rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => handleTabChange('privacy')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.6rem 1.1rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.9rem',
              background: activeTab === 'privacy' ? 'var(--nims-navy)' : 'transparent',
              color: activeTab === 'privacy' ? '#ffffff' : '#64748b'
            }}
          >
            <ShieldCheck size={16} color={activeTab === 'privacy' ? 'var(--nims-gold)' : '#94a3b8'} />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => handleTabChange('terms')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.6rem 1.1rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.9rem',
              background: activeTab === 'terms' ? 'var(--nims-navy)' : 'transparent',
              color: activeTab === 'terms' ? '#ffffff' : '#64748b'
            }}
          >
            <FileText size={16} color={activeTab === 'terms' ? 'var(--nims-gold)' : '#94a3b8'} />
            <span>Terms &amp; Conditions</span>
          </button>

          <button
            onClick={() => handleTabChange('disclaimer')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.6rem 1.1rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.9rem',
              background: activeTab === 'disclaimer' ? 'var(--nims-navy)' : 'transparent',
              color: activeTab === 'disclaimer' ? '#ffffff' : '#64748b'
            }}
          >
            <AlertTriangle size={16} color={activeTab === 'disclaimer' ? 'var(--nims-gold)' : '#94a3b8'} />
            <span>Disclaimer</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ padding: '2.5rem 1.5rem 4rem', maxWidth: '1000px' }}>
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid #e2e8f0',
          padding: '2.5rem 2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          lineHeight: 1.75,
          fontSize: '0.95rem',
          color: '#334155'
        }}>

          {/* ===================== TAB 1: PRIVACY POLICY ===================== */}
          {activeTab === 'privacy' && (
            <div>
              <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1.25rem', marginBottom: '1.75rem' }}>
                <h2 style={{ fontSize: '1.75rem', color: 'var(--nims-navy)', margin: '0 0 0.35rem 0', fontWeight: 800 }}>
                  Privacy Policy
                </h2>
                <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>
                  Last Updated: 26 September 2026
                </div>
              </div>

              <p style={{ marginBottom: '1rem' }}>
                NIMS Tatkal Seva (&quot;App&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a healthcare service application operated by NIMS Hospital, Rajasthan. This Privacy Policy explains how we collect, use, store, protect, and share information when you use the NIMS Tatkal Seva mobile application and related services.
              </p>

              <p style={{ marginBottom: '1.75rem' }}>
                By using the App, you acknowledge that you have read and understood this Privacy Policy.
              </p>

              {/* 1. Services Covered */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  1. Services Covered
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>NIMS Tatkal Seva provides access to healthcare-related services, including:</p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                  <li>ICU Bed Booking</li>
                  <li>OPD Booking</li>
                  <li>Online Doctor Appointments</li>
                  <li>24×7 Ambulance Booking and Location-Based Tracking</li>
                  <li>Health Checkup Package Booking</li>
                  <li>Home Sample Collection</li>
                  <li>Hospital Visit and Diagnostic Services</li>
                  <li>Notifications and service-related communication</li>
                </ul>
              </div>

              {/* 2. Information We Collect */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  2. Information We Collect
                </h3>
                <p style={{ marginBottom: '0.75rem' }}>Depending on the services you use, we may collect the following information:</p>

                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--nims-navy)', marginBottom: '0.35rem', fontWeight: 700 }}>
                    Personal Information
                  </h4>
                  <ul style={{ paddingLeft: '1.5rem' }}>
                    <li>Full name</li>
                    <li>Mobile number</li>
                    <li>Email address</li>
                    <li>Date of birth or age</li>
                    <li>Gender</li>
                    <li>Address</li>
                    <li>Emergency contact details</li>
                    <li>Patient identification information</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--nims-navy)', marginBottom: '0.35rem', fontWeight: 700 }}>
                    Health Information
                  </h4>
                  <p style={{ marginBottom: '0.35rem' }}>Where required to provide healthcare services, we may collect information such as:</p>
                  <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.5rem' }}>
                    <li>Medical history</li>
                    <li>Symptoms and health-related information</li>
                    <li>Doctor appointments</li>
                    <li>Prescriptions</li>
                    <li>Diagnostic and laboratory information</li>
                    <li>Health package and test bookings</li>
                    <li>Other information voluntarily provided by you for receiving healthcare services</li>
                  </ul>
                  <p style={{ fontStyle: 'italic', color: '#64748b' }}>
                    Health information is sensitive information and is handled only for appropriate healthcare and service-related purposes.
                  </p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--nims-navy)', marginBottom: '0.35rem', fontWeight: 700 }}>
                    Location Information
                  </h4>
                  <p style={{ marginBottom: '0.35rem' }}>If you use ambulance booking or location-based services, the App may request access to your device location.</p>
                  <p style={{ marginBottom: '0.35rem' }}>Location may be used to:</p>
                  <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.5rem' }}>
                    <li>Identify your pickup location</li>
                    <li>Help locate or dispatch an ambulance</li>
                    <li>Enable ambulance tracking</li>
                    <li>Improve emergency-service coordination</li>
                    <li>Provide relevant location-based services</li>
                  </ul>
                  <p>
                    Location access will be requested through the device&apos;s permission system, and you can manage permission through your device settings.
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--nims-navy)', marginBottom: '0.35rem', fontWeight: 700 }}>
                    Device and Technical Information
                  </h4>
                  <p style={{ marginBottom: '0.35rem' }}>We may automatically receive limited technical information such as:</p>
                  <ul style={{ paddingLeft: '1.5rem' }}>
                    <li>Device type and model</li>
                    <li>Operating system</li>
                    <li>App version</li>
                    <li>IP address</li>
                    <li>Device identifiers where technically required</li>
                    <li>Crash and diagnostic information</li>
                    <li>Network information</li>
                    <li>App usage information</li>
                  </ul>
                </div>
              </div>

              {/* 3. How We Use Your Information */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  3. How We Use Your Information
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>We may use your information to:</p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                  <li>Create and manage your account</li>
                  <li>Process ICU bed requests</li>
                  <li>Schedule OPD visits and appointments</li>
                  <li>Facilitate ambulance bookings</li>
                  <li>Provide ambulance location and tracking services</li>
                  <li>Process health package bookings</li>
                  <li>Arrange home sample collection</li>
                  <li>Coordinate hospital and diagnostic services</li>
                  <li>Communicate appointment and booking updates</li>
                  <li>Send important service notifications</li>
                  <li>Provide customer support</li>
                  <li>Maintain and improve the App</li>
                  <li>Detect fraud, misuse, security threats, or unauthorized activity</li>
                  <li>Comply with applicable legal and regulatory requirements</li>
                </ul>
                <p>
                  We will process personal data only for specified and appropriate purposes and, where consent is the basis for processing, consent should be clear and informed. The Digital Personal Data Protection Act, 2023 sets requirements around notice, consent, and withdrawal of consent.
                </p>
              </div>

              {/* 4. Sharing of Information */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  4. Sharing of Information
                </h3>
                <p style={{ marginBottom: '0.75rem', fontWeight: 600 }}>
                  We do not sell your personal information or health information.
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  We may share information where reasonably necessary to provide the requested service, including with:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
                  <li>NIMS Hospital departments and authorized healthcare personnel</li>
                  <li>Doctors and medical professionals involved in your care</li>
                  <li>Ambulance operators or authorized emergency-service personnel</li>
                  <li>Diagnostic laboratories and sample-collection personnel</li>
                  <li>Authorized service providers supporting the App</li>
                  <li>Payment service providers, where applicable</li>
                  <li>Technology, hosting, security, and communication service providers</li>
                  <li>Government, regulatory, or law-enforcement authorities where required by applicable law</li>
                </ul>
                <p>
                  Third-party service providers are expected to process information only for authorized purposes and appropriate security requirements.
                </p>
              </div>

              {/* 5. Payment Information */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  5. Payment Information
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  If payment services are provided through the App, payments may be processed through authorized third-party payment gateways.
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  We generally do not directly store complete debit-card, credit-card, CVV, or banking credentials unless specifically stated in the App.
                </p>
                <p>
                  Payment providers may collect and process payment information according to their own privacy policies.
                </p>
              </div>

              {/* 6. Ambulance Location Services */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  6. Ambulance Location Services
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  For ambulance booking and tracking, location information may be used to determine the pickup location and support communication between the patient and ambulance service.
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  Location access will be limited to what is reasonably necessary for the relevant functionality.
                </p>
                <p>
                  You may disable location permissions through your device settings; however, certain location-based services may not function correctly without location access.
                </p>
              </div>

              {/* 7. Data Security */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  7. Data Security
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  We take reasonable technical and organizational measures to protect personal and health information against:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
                  <li>Unauthorized access</li>
                  <li>Unauthorized disclosure</li>
                  <li>Loss or misuse</li>
                  <li>Alteration</li>
                  <li>Destruction</li>
                </ul>
                <p>
                  However, no electronic transmission or storage system can be guaranteed to be completely secure.
                </p>
              </div>

              {/* 8. Data Retention */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  8. Data Retention
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  We retain personal information only for as long as reasonably necessary to:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
                  <li>Provide requested healthcare services</li>
                  <li>Maintain medical/service records</li>
                  <li>Fulfil legal, regulatory, accounting, or reporting requirements</li>
                  <li>Resolve disputes</li>
                  <li>Maintain security and prevent fraud</li>
                </ul>
                <p>
                  When information is no longer required for legitimate purposes, it may be securely deleted, anonymized, or otherwise disposed of in accordance with applicable requirements.
                </p>
              </div>

              {/* 9. Account and Data Deletion */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  9. Account and Data Deletion
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  Users may request deletion of their account and associated personal information by contacting us through the contact details provided below or through an available account-deletion option within the App.
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  Certain information may need to be retained where required by applicable law, medical-record requirements, legal obligations, fraud prevention, or legitimate operational purposes.
                </p>
                <p>
                  Google Play requires apps offering account creation to provide users with a clear and accessible account-deletion mechanism and to address associated user data appropriately.
                </p>
              </div>

              {/* 10. Children's Privacy */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  10. Children&apos;s Privacy
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  NIMS Tatkal Seva is not intended to independently collect information from children without appropriate involvement or authorization of a parent or legal guardian where required.
                </p>
                <p>
                  If information concerning a minor is provided for healthcare services, it should be provided by a parent, guardian, or other authorized person where applicable.
                </p>
              </div>

              {/* 11. Notifications and Communications */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  11. Notifications and Communications
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>We may send:</p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
                  <li>Appointment confirmations</li>
                  <li>ICU booking updates</li>
                  <li>Ambulance booking and tracking updates</li>
                  <li>Health package updates</li>
                  <li>Sample collection updates</li>
                  <li>Important healthcare/service notifications</li>
                  <li>Customer-support communications</li>
                </ul>
                <p>
                  You may control certain notification permissions through your device settings. Some essential service communications may be necessary for providing requested services.
                </p>
              </div>

              {/* 12. Third-Party Services */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  12. Third-Party Services
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>The App may use third-party services for functions such as:</p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
                  <li>Cloud hosting</li>
                  <li>Maps and location services</li>
                  <li>Push notifications</li>
                  <li>Analytics and crash reporting</li>
                  <li>Payment processing</li>
                  <li>SMS or communication services</li>
                </ul>
                <p>
                  Such providers may process information necessary to perform their services. Where applicable, their processing is subject to their respective privacy policies and contractual requirements.
                </p>
              </div>

              {/* 13. Your Privacy Rights */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  13. Your Privacy Rights
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  Subject to applicable law, you may have rights regarding your personal information, including the ability to:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
                  <li>Request information about processing of your personal data</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Withdraw consent where consent is the basis for processing</li>
                  <li>Request deletion of personal information where applicable</li>
                  <li>Raise a privacy-related complaint or grievance</li>
                </ul>
                <p>
                  The DPDP Act provides for withdrawal of consent where consent is the basis for processing, with the withdrawal process intended to be comparable in ease to giving consent.
                </p>
              </div>

              {/* 14. Changes to This Privacy Policy */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  14. Changes to This Privacy Policy
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  We may update this Privacy Policy from time to time to reflect changes in our services, technology, legal requirements, or privacy practices.
                </p>
                <p>
                  The updated Privacy Policy will be made available through the App and/or our website. The &quot;Last Updated&quot; date at the top of this policy will indicate when it was most recently revised.
                </p>
              </div>

              {/* 15. Contact Us */}
              <div style={{
                marginBottom: '2rem',
                background: '#f8fafc',
                padding: '1.5rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  15. Contact Us
                </h3>
                <p style={{ marginBottom: '1rem' }}>
                  For questions, requests, complaints, or concerns regarding this Privacy Policy or your personal information, please contact:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', color: '#1e293b' }}>
                  <div><strong>NIMS Tatkal Seva</strong></div>
                  <div>Unit of NIMS Hospital, Jaipur - Rajasthan</div>
                  <div>Privacy/Support Email: <a href="mailto:support@nimshospitals.net" style={{ color: 'var(--nims-orange)', fontWeight: 600 }}>support@nimshospitals.net</a></div>
                  <div>Hospital Website: <a href="https://nimshospitals.net/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--nims-orange)', fontWeight: 600 }}>https://nimshospitals.net/</a> and <a href="https://nimshospitals.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--nims-orange)', fontWeight: 600 }}>https://nimshospitals.in</a></div>
                  <div>Contact Number: <a href="tel:7412048766" style={{ color: 'var(--nims-orange)', fontWeight: 600 }}>+91 7412048766</a></div>
                  <div>Address: Tala Mod, Jaipur NH-11C, Delhi - Jaipur Expy, Manoharpur, Rajasthan 303002</div>
                </div>
              </div>

              {/* 16. Consent */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  16. Consent
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  By using NIMS Tatkal Seva, you acknowledge that you have read this Privacy Policy and understand how your information may be collected, used, stored, and shared for providing the services described above.
                </p>
                <p style={{ marginBottom: '1.25rem' }}>
                  Where required, we will obtain appropriate consent before collecting or processing personal or sensitive information.
                </p>
                <div style={{ fontWeight: 700, color: 'var(--nims-orange)' }}>
                  NIMS Tatkal Seva – 24×7 Care, Just a Tap Away.
                </div>
              </div>
            </div>
          )}

          {/* ===================== TAB 2: TERMS & CONDITIONS ===================== */}
          {activeTab === 'terms' && (
            <div>
              <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1.25rem', marginBottom: '1.75rem' }}>
                <h2 style={{ fontSize: '1.75rem', color: 'var(--nims-navy)', margin: '0 0 0.35rem 0', fontWeight: 800 }}>
                  Terms &amp; Conditions
                </h2>
                <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>
                  Last Updated: 26 September 2026
                </div>
              </div>

              <p style={{ marginBottom: '1rem' }}>
                Welcome to NIMS Tatkal Seva, a healthcare service application operated by NIMS Hospital, Rajasthan. These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of the NIMS Tatkal Seva mobile application and related services.
              </p>

              <p style={{ marginBottom: '1.75rem' }}>
                By downloading, accessing, or using the App, you agree to these Terms. If you do not agree with these Terms, please do not use the App.
              </p>

              {/* 1. Services */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  1. Services
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>NIMS Tatkal Seva provides access to healthcare-related services, including:</p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
                  <li>ICU Bed Booking</li>
                  <li>OPD Offline Booking</li>
                  <li>Online Doctor Appointments</li>
                  <li>24×7 Ambulance Booking</li>
                  <li>Ambulance Location and Tracking</li>
                  <li>Health Checkup Package Booking</li>
                  <li>Home Sample Collection</li>
                  <li>Hospital Visit and Diagnostic Services</li>
                  <li>Service-related notifications and communication</li>
                </ul>
                <p>
                  Availability of individual services may vary depending on location, hospital capacity, medical requirements, and operational circumstances.
                </p>
              </div>

              {/* 2. User Eligibility */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  2. User Eligibility
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>You must provide accurate and complete information when using the App.</p>
                <p style={{ marginBottom: '0.5rem' }}>
                  If you are booking a service for another person, you confirm that you are authorized to provide the required information and make the booking on their behalf.
                </p>
                <p>
                  Parents, guardians, or authorized representatives may use the App to arrange services for minors or other individuals where applicable.
                </p>
              </div>

              {/* 3. Account Registration */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  3. Account Registration
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  Certain features may require you to create an account using your mobile number or other information.
                </p>
                <p style={{ marginBottom: '0.5rem' }}>You are responsible for:</p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
                  <li>Providing accurate information</li>
                  <li>Keeping your account information updated</li>
                  <li>Maintaining the security of your account</li>
                  <li>Not sharing your login credentials with unauthorized persons</li>
                </ul>
                <p>You must immediately notify us if you suspect unauthorized use of your account.</p>
              </div>

              {/* 4. ICU Bed Booking */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  4. ICU Bed Booking
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  ICU bed booking through the App is a request/booking facility and does not guarantee admission unless explicitly confirmed by the hospital.
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  ICU bed availability may change at any time due to emergency admissions, discharge, medical requirements, or other hospital circumstances.
                </p>
                <p>
                  Final admission and allocation decisions remain subject to hospital policies, bed availability, and medical assessment.
                </p>
              </div>

              {/* 5. OPD and Online Appointments */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  5. OPD and Online Appointments
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>Users may book OPD visits and online appointments through the App.</p>
                <p style={{ marginBottom: '0.5rem' }}>An appointment request may be subject to doctor availability, hospital schedules, and confirmation.</p>
                <p style={{ marginBottom: '0.5rem' }}>
                  Appointment timings may change due to emergencies, doctor availability, hospital operations, or other unforeseen circumstances.
                </p>
                <p>Users should follow the instructions provided in their booking confirmation.</p>
              </div>

              {/* 6. Ambulance Booking */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  6. Ambulance Booking
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  The App may allow users to request and track ambulances using location-based services.
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  Ambulance availability, estimated arrival time, route, and other information displayed in the App may change due to:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
                  <li>Traffic</li>
                  <li>Weather</li>
                  <li>Emergency situations</li>
                  <li>Ambulance availability</li>
                  <li>Road conditions</li>
                  <li>Technical limitations</li>
                  <li>Other circumstances beyond our control</li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}>
                  Ambulance tracking and estimated arrival times are provided for convenience and may not always be exact.
                </p>
                <p>
                  For life-threatening emergencies, users should also contact the appropriate emergency services immediately.
                </p>
              </div>

              {/* 7. Health Package and Sample Collection */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  7. Health Package and Sample Collection
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>Users may book health checkup packages through the App.</p>
                <p style={{ marginBottom: '0.5rem' }}>
                  Home sample collection is subject to service availability, location, scheduling, and applicable requirements.
                </p>
                <p style={{ marginBottom: '0.5rem' }}>Certain tests may require the patient to visit the hospital or laboratory.</p>
                <p>
                  Test results and medical interpretations should be discussed with an appropriately qualified healthcare professional.
                </p>
              </div>

              {/* 8. Medical Disclaimer */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  8. Medical Disclaimer
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>NIMS Tatkal Seva is primarily a healthcare service and booking platform.</p>
                <p style={{ marginBottom: '0.5rem' }}>
                  Information displayed through the App should not be considered a substitute for professional medical advice, diagnosis, or treatment.
                </p>
                <p style={{ marginBottom: '0.5rem' }}>The App does not replace consultation with a qualified doctor or healthcare professional.</p>
                <p>
                  In an emergency, users should seek immediate medical assistance through appropriate emergency services or visit the nearest emergency facility.
                </p>
              </div>

              {/* 9. Payments and Charges */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  9. Payments and Charges
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>Certain services may require payment.</p>
                <p style={{ marginBottom: '0.5rem' }}>
                  Applicable charges, package prices, consultation fees, ambulance charges, diagnostic charges, or other fees may be displayed before confirmation where applicable.
                </p>
                <p style={{ marginBottom: '0.5rem' }}>Payments may be processed through third-party payment service providers.</p>
                <p style={{ marginBottom: '0.5rem' }}>Users agree to provide valid payment information when required.</p>
                <p>
                  Additional charges may apply where applicable based on the selected service or actual service provided.
                </p>
              </div>

              {/* 10. Cancellation and Refunds */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  10. Cancellation and Refunds
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>Cancellation and refund eligibility may vary depending on the service booked.</p>
                <p style={{ marginBottom: '0.5rem' }}>
                  Any applicable cancellation charges, refund conditions, and processing timelines will be communicated according to the relevant service or hospital policy.
                </p>
                <p style={{ marginBottom: '0.5rem' }}>Where a third-party service provider is involved, its applicable terms may also apply.</p>
                <p>
                  Refunds, where approved, may take reasonable processing time depending on the payment method and banking/payment provider.
                </p>
              </div>

              {/* 11. User Responsibilities */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  11. User Responsibilities
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>Users agree not to:</p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
                  <li>Provide false, misleading, or fraudulent information</li>
                  <li>Create accounts for unauthorized purposes</li>
                  <li>Misuse ambulance, ICU, OPD, or appointment services</li>
                  <li>Attempt unauthorized access to the App or its systems</li>
                  <li>Interfere with the operation or security of the App</li>
                  <li>Upload malicious software or harmful content</li>
                  <li>Use the App for unlawful activities</li>
                  <li>Attempt to access another user&apos;s information</li>
                  <li>Reverse engineer or copy the App or its functionality without authorization</li>
                </ul>
                <p>We reserve the right to restrict or suspend access where misuse is identified.</p>
              </div>

              {/* 12. Location Services */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  12. Location Services
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  Certain features, particularly ambulance booking and tracking, may require access to your device location.
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  You are responsible for providing accurate location information when requesting location-based services.
                </p>
                <p>
                  If location permission is disabled or inaccurate, certain features may not function correctly.
                </p>
              </div>

              {/* 13. Third-Party Services */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  13. Third-Party Services
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>The App may integrate with third-party services such as:</p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
                  <li>Maps and location providers</li>
                  <li>Payment gateways</li>
                  <li>SMS and communication providers</li>
                  <li>Cloud and hosting services</li>
                  <li>Analytics and technical service providers</li>
                </ul>
                <p>Use of such services may also be subject to the respective third party&apos;s terms and policies.</p>
              </div>

              {/* 14. Privacy */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  14. Privacy
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  Your use of NIMS Tatkal Seva is also governed by our Privacy Policy, which explains how personal, health, location, and other information may be collected and processed.
                </p>
                <p>By using the App, you acknowledge that you have reviewed the Privacy Policy.</p>
              </div>

              {/* 15. Availability of Services */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  15. Availability of Services
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  We aim to keep NIMS Tatkal Seva available and functional; however, uninterrupted availability cannot be guaranteed.
                </p>
                <p style={{ marginBottom: '0.5rem' }}>The App or individual services may temporarily become unavailable due to:</p>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li>Maintenance</li>
                  <li>Technical problems</li>
                  <li>Internet or network failures</li>
                  <li>Server issues</li>
                  <li>Security incidents</li>
                  <li>Hospital operational requirements</li>
                  <li>Emergencies</li>
                  <li>Events beyond our reasonable control</li>
                </ul>
              </div>

              {/* 16. Intellectual Property */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  16. Intellectual Property
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  The NIMS Tatkal Seva name, logo, design, software, content, graphics, text, and other materials available through the App are owned by or licensed to NIMS Hospital, Rajasthan, unless otherwise stated.
                </p>
                <p>
                  You may not copy, reproduce, modify, distribute, sell, or commercially exploit such materials without prior written authorization.
                </p>
              </div>

              {/* 17. Limitation of Liability */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  17. Limitation of Liability
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  To the extent permitted by applicable law, NIMS Tatkal Seva and NIMS Hospital shall not be responsible for losses arising from circumstances beyond reasonable control, including network failures, traffic conditions, third-party service interruptions, inaccurate location information, ambulance delays, or changes in hospital/doctor availability.
                </p>
                <p>
                  Nothing in these Terms is intended to exclude or limit liability where such exclusion or limitation is not permitted under applicable law.
                </p>
              </div>

              {/* 18. Changes to Services and Terms */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  18. Changes to Services and Terms
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  We may modify, suspend, or discontinue any feature or service at any time based on operational, technical, medical, or legal requirements.
                </p>
                <p style={{ marginBottom: '0.5rem' }}>We may also update these Terms from time to time.</p>
                <p>
                  The updated Terms will be made available through the App and/or our website. Continued use of the App after an update constitutes acceptance of the revised Terms, subject to applicable law.
                </p>
              </div>

              {/* 19. Suspension or Termination */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  19. Suspension or Termination
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  We may suspend or terminate access to an account where there is reasonable evidence of:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
                  <li>Fraudulent activity</li>
                  <li>Misuse of services</li>
                  <li>Violation of these Terms</li>
                  <li>Unauthorized access</li>
                  <li>Illegal activity</li>
                  <li>Conduct that may compromise the safety or security of users or the platform</li>
                </ul>
                <p>Users may stop using the App at any time.</p>
              </div>

              {/* 20. Governing Law and Jurisdiction */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  20. Governing Law and Jurisdiction
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>These Terms shall be governed by the applicable laws of India.</p>
                <p>
                  Any dispute arising in connection with these Terms or the services provided through the App shall be subject to the jurisdiction of the appropriate courts in Rajasthan, subject to applicable law.
                </p>
              </div>

              {/* 21. Contact Us */}
              <div style={{
                marginBottom: '2rem',
                background: '#f8fafc',
                padding: '1.5rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  21. Contact Us
                </h3>
                <p style={{ marginBottom: '1rem' }}>
                  For questions, complaints, support, or concerns regarding these Terms, please contact:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', color: '#1e293b' }}>
                  <div><strong>NIMS Tatkal Seva</strong></div>
                  <div>Unit of NIMS Hospital, Jaipur - Rajasthan</div>
                  <div>Support Email: <a href="mailto:support@nimshospitals.net" style={{ color: 'var(--nims-orange)', fontWeight: 600 }}>support@nimshospitals.net</a></div>
                  <div>Hospital Website: <a href="https://nimshospitals.net/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--nims-orange)', fontWeight: 600 }}>https://nimshospitals.net/</a> and <a href="https://nimshospitals.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--nims-orange)', fontWeight: 600 }}>https://nimshospitals.in</a></div>
                  <div>Contact Number: <a href="tel:7412048766" style={{ color: 'var(--nims-orange)', fontWeight: 600 }}>+91 7412048766</a></div>
                  <div>Address: Tala Mod, Jaipur NH-11C, Delhi - Jaipur Expy, Manoharpur, Rajasthan 303002</div>
                </div>
              </div>

              {/* 22. Acceptance */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--nims-navy)', marginBottom: '0.75rem', fontWeight: 700 }}>
                  22. Acceptance
                </h3>
                <p style={{ marginBottom: '1.25rem' }}>
                  By downloading, registering, accessing, or using NIMS Tatkal Seva, you confirm that you have read, understood, and agreed to these Terms &amp; Conditions.
                </p>
                <div style={{ fontWeight: 700, color: 'var(--nims-orange)' }}>
                  NIMS Tatkal Seva<br />
                  24×7 Care, Just a Tap Away.
                </div>
              </div>
            </div>
          )}

          {/* ===================== TAB 3: DISCLAIMER ===================== */}
          {activeTab === 'disclaimer' && (
            <div>
              <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1.25rem', marginBottom: '1.75rem' }}>
                <h2 style={{ fontSize: '1.75rem', color: 'var(--nims-navy)', margin: '0 0 0.35rem 0', fontWeight: 800 }}>
                  Disclaimer
                </h2>
              </div>

              <p style={{ marginBottom: '1rem' }}>
                NIMS Tatkal Seva is a healthcare service and booking platform operated by NIMS Hospital, Rajasthan. The App is designed to provide convenient access to services such as ICU bed booking, OPD booking, online appointments, ambulance booking, health packages, and home sample collection.
              </p>

              <p style={{ marginBottom: '1rem' }}>
                The information and services provided through the App are intended for general healthcare-service facilitation and should not be considered a substitute for professional medical advice, diagnosis, or treatment.
              </p>

              <p style={{ marginBottom: '1rem' }}>
                ICU bed availability, doctor appointments, ambulance availability, estimated arrival times, health package availability, and other service information may change based on hospital capacity, emergency situations, traffic, location, technical limitations, and other circumstances.
              </p>

              <p style={{ marginBottom: '1rem' }}>
                Ambulance booking and tracking information is provided for convenience and may not always represent the exact location or arrival time of an ambulance.
              </p>

              <p style={{ marginBottom: '1rem' }}>
                For any medical emergency or life-threatening situation, users should seek immediate medical attention and contact the appropriate emergency services or visit the nearest emergency facility.
              </p>

              <p style={{ marginBottom: '1rem' }}>
                NIMS Tatkal Seva does not guarantee a particular medical outcome, treatment result, appointment availability, ICU admission, ambulance arrival time, or diagnostic result through the App.
              </p>

              <p style={{ marginBottom: '1rem' }}>
                Users are responsible for providing accurate information, including patient details and location information, when using the services.
              </p>

              <p style={{ marginBottom: '1.5rem' }}>
                By using NIMS Tatkal Seva, you acknowledge and agree to this Disclaimer and understand that healthcare services are subject to medical assessment, hospital policies, availability, and applicable laws.
              </p>

              <div style={{ fontWeight: 700, color: 'var(--nims-orange)', lineHeight: 1.6 }}>
                NIMS Tatkal Seva<br />
                Unit of NIMS Hospital, Rajasthan<br />
                24×7 Care, Just a Tap Away
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
