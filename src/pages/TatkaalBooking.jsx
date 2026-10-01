import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, CheckCircle2, ChevronRight, ArrowLeft, Upload, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TatkaalBooking() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [icuCategories, setIcuCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [requestType, setRequestType] = useState('Patient'); // Patient or Attendant
  const [admissionNature, setAdmissionNature] = useState('Emergency');
  
  const [patient, setPatient] = useState({
    name: '', age: '', gender: 'Male', mobile: '', altMobile: '',
    city: 'Jaipur', state: 'Rajasthan', pincode: '302001',
    idProofType: 'Aadhaar Card', idNumber: '', uhid: ''
  });

  const [medical, setMedical] = useState({
    condition: 'Breathlessness / SpO2 Drop', diagnosis: '', 
    criticality: 'Critical', department: 'Not Specified', icuCategory: 'MICU',
    referringDoctor: '', referringHospital: '',
    oxygenNeeded: true, ventilator: false, ambulance: true, isolation: false
  });

  const [attendant, setAttendant] = useState({
    name: '', relation: 'Father', mobile: '', emergencyContact: ''
  });

  const [payment, setPayment] = useState({
    category: 'Cash (Pre-Booking Deposit)', amount: 5000,
    consentAccurate: false, consentVerification: false, consentPolicy: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/ipd/public/form-options`);
        if (res.ok) {
          const data = await res.json();
          setIcuCategories(data.icuCategories || []);
          setDepartments(data.departments || []);
          if(data.icuCategories?.length) {
            setMedical(prev => ({...prev, icuCategory: data.icuCategories[0].name}));
          }
        }
      } catch (err) {
        console.error('Error fetching form options:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOptions();
  }, []);

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(c => c + 1);
  };
  
  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(c => c - 1);
    else navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!payment.consentAccurate || !payment.consentVerification || !payment.consentPolicy) {
      alert("Please accept all terms and conditions.");
      return;
    }
    
    setIsSubmitting(true);
    
    const admissionNotes = `
      Nature: ${admissionNature}
      Requested By: ${requestType}
      Condition: ${medical.condition}
      Diagnosis: ${medical.diagnosis}
      Criticality: ${medical.criticality}
      Department: ${medical.department}
      Referring Dr: ${medical.referringDoctor} (${medical.referringHospital})
      Oxygen Needed: ${medical.oxygenNeeded} | Ventilator: ${medical.ventilator} | Isolation: ${medical.isolation}
      Payment Category: ${payment.category}
    `.trim();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/ipd/public/request-direct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestedWardType: medical.icuCategory,
          admissionNotes,
          patientDetails: {
            name: patient.name,
            phone: patient.mobile,
            age: patient.age,
            gender: patient.gender,
            contactPerson: attendant.name
          }
        })
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        setBookingResult(data.ipdRequest);
      } else {
        alert(data.message || 'Booking failed. Please try again.');
      }
    } catch (err) {
      console.error('Error booking bed:', err);
      alert('Network error. Please try again.');
    }
    setIsSubmitting(false);
  };

  const stepTitles = [
    "Request Type & Mode",
    "Patient Details & ID Proof",
    "Medical Condition & ICU",
    "Attendant Details",
    "Document Uploads",
    "Payment & Consent"
  ];

  return (
    <div className="tatkaal-container">
      <style>{`
        .tatkaal-container {
          min-height: 100vh;
          background-color: #f8fafc;
          padding: 2rem 1rem 5rem;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .tatkaal-max-width {
          max-width: 900px;
          margin: 0 auto;
        }
        .tatkaal-back-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 500;
          font-size: 1rem;
          margin-bottom: 1.5rem;
          transition: color 0.2s;
        }
        .tatkaal-back-btn:hover {
          color: #bd171c;
        }
        .tatkaal-card {
          background: #ffffff;
          border-radius: 1.5rem;
          box-shadow: 0 20px 25px -5px rgba(189, 23, 28, 0.05), 0 8px 10px -6px rgba(189, 23, 28, 0.01);
          border: 1px solid rgba(248, 113, 113, 0.15);
          overflow: hidden;
        }
        .tatkaal-header {
          background: linear-gradient(135deg, #9e1217 0%, #bd171c 50%, #dc2626 100%);
          padding: 2.5rem;
          color: white;
          position: relative;
        }
        .tatkaal-header-icon {
          width: 3rem;
          height: 3rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
        }
        .tatkaal-title {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .tatkaal-subtitle {
          color: #fee2e2;
          font-weight: 500;
          margin: 0;
          font-size: 1.1rem;
        }
        .tatkaal-body {
          padding: 2.5rem;
        }
        .step-indicator {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
          position: relative;
        }
        .step-indicator::before {
          content: '';
          position: absolute;
          top: 15px;
          left: 10px;
          right: 10px;
          height: 2px;
          background: #e2e8f0;
          z-index: 1;
        }
        .step-dot {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.875rem;
          color: #64748b;
          position: relative;
          z-index: 2;
          transition: all 0.3s;
        }
        .step-dot.active {
          border-color: #e11d48;
          background: #e11d48;
          color: white;
        }
        .step-dot.completed {
          border-color: #e11d48;
          background: white;
          color: #e11d48;
        }
        .tatkaal-step-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1.5rem;
          border-bottom: 2px solid #f1f5f9;
          padding-bottom: 0.75rem;
        }
        .tatkaal-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 640px) {
          .tatkaal-form-grid { grid-template-columns: 1fr; }
        }
        .tatkaal-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .tatkaal-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
        }
        .tatkaal-input, .tatkaal-select {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
          font-family: inherit;
          background: white;
        }
        .tatkaal-input:focus, .tatkaal-select:focus {
          border-color: #f43f5e;
          box-shadow: 0 0 0 3px rgba(244, 63, 94, 0.2);
        }
        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: #334155;
          cursor: pointer;
        }
        .tatkaal-submit-btn {
          width: 100%;
          background: linear-gradient(to right, #e11d48, #be123c);
          color: white;
          font-weight: 700;
          font-size: 1.125rem;
          padding: 1rem;
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 10px 15px -3px rgba(159, 18, 57, 0.3);
        }
        .tatkaal-submit-btn:hover:not(:disabled) {
          background: linear-gradient(to right, #be123c, #9f1239);
        }
        .tatkaal-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .nav-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e2e8f0;
        }
        .btn-outline {
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          border: 2px solid #e2e8f0;
          background: white;
          color: #475569;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-outline:hover {
          border-color: #cbd5e1;
          background: #f8fafc;
        }
        .btn-primary {
          padding: 0.75rem 2rem;
          border-radius: 0.75rem;
          border: none;
          background: #e11d48;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-primary:hover {
          background: #be123c;
        }
        .tab-group {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .tab-btn {
          flex: 1;
          padding: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 0.75rem;
          background: white;
          color: #64748b;
          font-weight: 600;
          cursor: pointer;
          text-align: center;
        }
        .tab-btn.active {
          border-color: #e11d48;
          background: #fff1f2;
          color: #e11d48;
        }
        .upload-box {
          border: 2px dashed #cbd5e1;
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          color: #64748b;
          cursor: pointer;
          background: #f8fafc;
          transition: all 0.2s;
        }
        .upload-box:hover {
          border-color: #94a3b8;
          background: #f1f5f9;
        }
      `}</style>

      <div className="tatkaal-max-width">
        <button onClick={() => navigate(-1)} className="tatkaal-back-btn">
          <ArrowLeft size={18} /> Back
        </button>

        <div className="tatkaal-card">
          <div className="tatkaal-header">
            <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.1 }}>
              <Activity size={200} style={{ marginTop: '-40px', marginRight: '-40px' }} />
            </div>
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center' }}>
              <div className="tatkaal-header-icon">
                <ShieldCheck size={28} color="white" />
              </div>
              <div>
                <h1 className="tatkaal-title">NIMS Tatkaal Seva</h1>
                <p className="tatkaal-subtitle">Direct Emergency ICU Admission</p>
              </div>
            </div>
          </div>

          <div className="tatkaal-body">
            {bookingResult ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ width: '90px', height: '90px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <CheckCircle2 size={48} />
                </div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>Tatkaal ICU Bed Requested!</h2>
                <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', color: '#dc2626', fontWeight: 700, margin: '0.5rem 0 1.5rem' }}>
                  BOOKING ID: {bookingResult._id}
                </div>
                <p style={{ color: '#475569', marginBottom: '2rem', fontSize: '0.875rem' }}>
                  NIMS Bed Management Desk will contact the attendant within 5-10 minutes for bed allocation.
                </p>
                <button onClick={() => navigate('/')} className="tatkaal-submit-btn" style={{ maxWidth: '300px' }}>
                  Return to Home
                </button>
              </motion.div>
            ) : (
              <div>
                <div className="step-indicator">
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <div key={num} className={`step-dot ${currentStep === num ? 'active' : currentStep > num ? 'completed' : ''}`}>
                      {currentStep > num ? <CheckCircle2 size={16} /> : num}
                    </div>
                  ))}
                </div>

                <h2 className="tatkaal-step-title">{stepTitles[currentStep - 1]}</h2>

                {currentStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="tatkaal-input-group" style={{ marginBottom: '1.5rem' }}>
                      <label className="tatkaal-label">Who is requesting?</label>
                      <div className="tab-group">
                        <button className={`tab-btn ${requestType === 'Patient' ? 'active' : ''}`} onClick={() => setRequestType('Patient')}>Self (Patient)</button>
                        <button className={`tab-btn ${requestType === 'Attendant' ? 'active' : ''}`} onClick={() => setRequestType('Attendant')}>Family / Attendant</button>
                      </div>
                    </div>
                    <div className="tatkaal-input-group">
                      <label className="tatkaal-label">Nature of Admission</label>
                      <div className="tab-group">
                        <button className={`tab-btn ${admissionNature === 'Emergency' ? 'active' : ''}`} onClick={() => setAdmissionNature('Emergency')}>Emergency</button>
                        <button className={`tab-btn ${admissionNature === 'Transfer' ? 'active' : ''}`} onClick={() => setAdmissionNature('Transfer')}>Hospital Transfer</button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="tatkaal-form-grid">
                      <div className="tatkaal-input-group">
                        <label className="tatkaal-label">Patient Name</label>
                        <input value={patient.name} onChange={e => setPatient({...patient, name: e.target.value})} className="tatkaal-input" placeholder="Full Name" />
                      </div>
                      <div className="tatkaal-input-group">
                        <label className="tatkaal-label">Mobile Number</label>
                        <input value={patient.mobile} onChange={e => setPatient({...patient, mobile: e.target.value})} className="tatkaal-input" placeholder="10-digit number" />
                      </div>
                      <div className="tatkaal-input-group">
                        <label className="tatkaal-label">Age</label>
                        <input value={patient.age} onChange={e => setPatient({...patient, age: e.target.value})} type="number" className="tatkaal-input" placeholder="Years" />
                      </div>
                      <div className="tatkaal-input-group">
                        <label className="tatkaal-label">Gender</label>
                        <select value={patient.gender} onChange={e => setPatient({...patient, gender: e.target.value})} className="tatkaal-select">
                          <option>Male</option><option>Female</option><option>Other</option>
                        </select>
                      </div>
                      <div className="tatkaal-input-group">
                        <label className="tatkaal-label">City</label>
                        <input value={patient.city} onChange={e => setPatient({...patient, city: e.target.value})} className="tatkaal-input" />
                      </div>
                      <div className="tatkaal-input-group">
                        <label className="tatkaal-label">ID Proof (Aadhaar)</label>
                        <input value={patient.idNumber} onChange={e => setPatient({...patient, idNumber: e.target.value})} className="tatkaal-input" placeholder="12-digit number" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    {isLoading ? <p>Loading options...</p> : (
                      <div className="tatkaal-form-grid">
                        <div className="tatkaal-input-group" style={{ gridColumn: '1 / -1' }}>
                          <label className="tatkaal-label">Required ICU Category</label>
                          <select value={medical.icuCategory} onChange={e => setMedical({...medical, icuCategory: e.target.value})} className="tatkaal-select" style={{ border: '2px solid #e11d48', fontWeight: 'bold' }}>
                            {icuCategories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                          </select>
                        </div>
                        <div className="tatkaal-input-group" style={{ gridColumn: '1 / -1' }}>
                          <label className="tatkaal-label">Medical Condition / Diagnosis</label>
                          <textarea value={medical.diagnosis} onChange={e => setMedical({...medical, diagnosis: e.target.value})} className="tatkaal-input" rows="3" placeholder="Describe the emergency..."></textarea>
                        </div>
                        <div className="tatkaal-input-group">
                          <label className="tatkaal-label">Referring Doctor (if any)</label>
                          <input value={medical.referringDoctor} onChange={e => setMedical({...medical, referringDoctor: e.target.value})} className="tatkaal-input" placeholder="Dr. Name" />
                        </div>
                        <div className="tatkaal-input-group">
                          <label className="tatkaal-label">Referring Hospital</label>
                          <input value={medical.referringHospital} onChange={e => setMedical({...medical, referringHospital: e.target.value})} className="tatkaal-input" placeholder="Hospital Name" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="tatkaal-form-grid">
                      <div className="tatkaal-input-group">
                        <label className="tatkaal-label">Attendant Name</label>
                        <input value={attendant.name} onChange={e => setAttendant({...attendant, name: e.target.value})} className="tatkaal-input" placeholder="Full Name" />
                      </div>
                      <div className="tatkaal-input-group">
                        <label className="tatkaal-label">Relation to Patient</label>
                        <select value={attendant.relation} onChange={e => setAttendant({...attendant, relation: e.target.value})} className="tatkaal-select">
                          <option>Father</option><option>Mother</option><option>Spouse</option><option>Son/Daughter</option><option>Other</option>
                        </select>
                      </div>
                      <div className="tatkaal-input-group">
                        <label className="tatkaal-label">Mobile Number</label>
                        <input value={attendant.mobile} onChange={e => setAttendant({...attendant, mobile: e.target.value})} className="tatkaal-input" placeholder="10-digit number" />
                      </div>
                      <div className="tatkaal-input-group">
                        <label className="tatkaal-label">Emergency Contact</label>
                        <input value={attendant.emergencyContact} onChange={e => setAttendant({...attendant, emergencyContact: e.target.value})} className="tatkaal-input" placeholder="Alternative number" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 5 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.875rem' }}>Upload available medical reports to help doctors prepare for admission. (Optional for Tatkaal)</p>
                    <div className="tatkaal-form-grid">
                      <div className="upload-box">
                        <Upload size={24} style={{ margin: '0 auto 0.5rem' }} />
                        <div style={{ fontWeight: 600, color: '#334155' }}>Doctor Referral Letter</div>
                        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Click to browse</div>
                      </div>
                      <div className="upload-box">
                        <Upload size={24} style={{ margin: '0 auto 0.5rem' }} />
                        <div style={{ fontWeight: 600, color: '#334155' }}>Medical Reports (CT/Blood)</div>
                        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Click to browse</div>
                      </div>
                      <div className="upload-box" style={{ gridColumn: '1 / -1' }}>
                        <Upload size={24} style={{ margin: '0 auto 0.5rem' }} />
                        <div style={{ fontWeight: 600, color: '#334155' }}>Patient ID Proof (Aadhaar)</div>
                        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Click to browse</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 6 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="tatkaal-input-group" style={{ marginBottom: '1.5rem' }}>
                      <label className="tatkaal-label">Payment Mode / Scheme</label>
                      <select value={payment.category} onChange={e => setPayment({...payment, category: e.target.value})} className="tatkaal-select" style={{ fontSize: '1.1rem', padding: '1rem' }}>
                        <option>Cash (Pre-Booking Deposit)</option>
                        <option>TPA / Private Insurance</option>
                        <option>Janadhar Scheme</option>
                        <option>Ayushmann Bharat (PM-JAY)</option>
                        <option>RGHS (Rajasthan Govt)</option>
                        <option>CGHS (Central Govt)</option>
                      </select>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                      <div className="checkbox-label" style={{ marginBottom: '1rem' }}>
                        <input type="checkbox" checked={payment.consentAccurate} onChange={e => setPayment({...payment, consentAccurate: e.target.checked})} />
                        <span>I declare that all patient information provided is accurate.</span>
                      </div>
                      <div className="checkbox-label" style={{ marginBottom: '1rem' }}>
                        <input type="checkbox" checked={payment.consentVerification} onChange={e => setPayment({...payment, consentVerification: e.target.checked})} />
                        <span>I understand bed allocation is subject to clinical verification upon arrival.</span>
                      </div>
                      <div className="checkbox-label">
                        <input type="checkbox" checked={payment.consentPolicy} onChange={e => setPayment({...payment, consentPolicy: e.target.checked})} />
                        <span>I accept the hospital's admission and payment policies.</span>
                      </div>
                    </div>

                    <button onClick={handleSubmit} disabled={isSubmitting} className="tatkaal-submit-btn">
                      {isSubmitting ? 'Processing...' : 'Confirm Tatkaal Booking'}
                    </button>
                  </motion.div>
                )}

                <div className="nav-buttons">
                  <button onClick={handleBack} className="btn-outline">
                    Back
                  </button>
                  {currentStep < 6 && (
                    <button onClick={handleNext} className="btn-primary">
                      Continue
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
