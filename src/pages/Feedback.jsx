import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Star, CheckCircle2, AlertCircle, Stethoscope, User,
  Calendar, Building2, Send, Check, ShieldCheck, Clock,
  Award, MessageSquare, Phone, Heart, Sparkles, RefreshCw,
  Search, ChevronDown, X
} from 'lucide-react';
import { useDoctors } from '../context/DoctorContext';
import { doctorsData } from '../data/doctorsData.js';

const RATING_INFO = {
  1: { hi: 'बहुत खराब', en: 'Very Poor', color: '#dc2626', bg: '#fef2f2' },
  2: { hi: 'सुधार योग्य', en: 'Needs Work', color: '#ea580c', bg: '#fff7ed' },
  3: { hi: 'संतोषजनक', en: 'Average', color: '#ca8a04', bg: '#fefce8' },
  4: { hi: 'अच्छा', en: 'Good', color: '#2563eb', bg: '#eff6ff' },
  5: { hi: 'उत्कृष्ट', en: 'Excellent', color: '#059669', bg: '#ecfdf5' }
};

// ── Searchable Doctor Dropdown Component ──
function SearchableDoctorDropdown({
  doctors,
  selectedDoctor,
  onSelect,
  isCustom,
  onToggleCustom,
  customDoctorName,
  onChangeCustomName
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Autofocus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  // Filter doctors based on live search query (name or department)
  const filteredDoctors = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return doctors;
    return doctors.filter(
      (doc) =>
        (doc.name || '').toLowerCase().includes(q) ||
        (doc.dept || '').toLowerCase().includes(q)
    );
  }, [doctors, search]);

  const selectedDoctorObj = useMemo(() => {
    if (!selectedDoctor) return null;
    return doctors.find(
      (d) => (d.name || '').toLowerCase() === selectedDoctor.toLowerCase()
    );
  }, [doctors, selectedDoctor]);

  if (isCustom) {
    return (
      <div className="fb-field-group" style={{ marginBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
          <label className="fb-field-label" style={{ margin: 0 }}>
            डॉक्टर का नाम (Doctor's Name)<span className="req">*</span>
          </label>
          <button
            type="button"
            onClick={onToggleCustom}
            style={{
              background: 'none',
              border: 'none',
              color: '#bd171c',
              fontSize: '0.82rem',
              fontWeight: 800,
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            सूची से डॉक्टर चुनें (Select from list)
          </button>
        </div>
        <div className="fb-input-wrapper">
          <Stethoscope size={18} className="fb-input-icon" />
          <input
            type="text"
            required
            placeholder="उदा. Dr. Vinod Kumar Punia"
            value={customDoctorName}
            onChange={(e) => onChangeCustomName(e.target.value)}
            className="fb-input"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fb-field-group" style={{ marginBottom: 0 }} ref={dropdownRef}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
        <label className="fb-field-label" style={{ margin: 0 }}>
          डॉक्टर का नाम (Doctor's Name)<span className="req">*</span>
        </label>
        <button
          type="button"
          onClick={onToggleCustom}
          style={{
            background: 'none',
            border: 'none',
            color: '#bd171c',
            fontSize: '0.82rem',
            fontWeight: 800,
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          अन्य डॉक्टर का नाम लिखें (Type custom name)
        </button>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Trigger Button */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`fb-custom-select-trigger ${isOpen ? 'open' : ''} ${selectedDoctor ? 'has-value' : ''}`}
          role="button"
          tabIndex={0}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden', flex: 1 }}>
            <Stethoscope size={18} color="#bd171c" style={{ flexShrink: 0 }} />
            {selectedDoctor ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', overflow: 'hidden' }}>
                <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.94rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {selectedDoctor}
                </span>
                {selectedDoctorObj?.dept && (
                  <span className="fb-doc-dept-pill">
                    {selectedDoctorObj.dept}
                  </span>
                )}
              </div>
            ) : (
              <span style={{ color: '#64748b', fontSize: '0.92rem', fontWeight: 600 }}>
                -- डॉक्टर चुनें या खोजें (Click to Select / Search Doctor) --
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
            {selectedDoctor && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect('');
                }}
                className="fb-doc-clear-btn"
                title="Deselect Doctor"
              >
                <X size={15} />
              </button>
            )}
            <ChevronDown
              size={18}
              color="#64748b"
              style={{
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }}
            />
          </div>
        </div>

        {/* Dropdown Popup Menu */}
        {isOpen && (
          <div className="fb-custom-dropdown-menu">
            {/* Search Input Box */}
            <div className="fb-dropdown-search-box">
              <Search size={16} color="#94a3b8" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="डॉक्टर या विभाग खोजें (उदा. Vinod, Cardiology)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="fb-dropdown-search-input"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Results Counter */}
            <div className="fb-dropdown-count-strip">
              <span>उपलब्ध डॉक्टर: <strong>{filteredDoctors.length}</strong></span>
              {search && <span>खोज: "<strong>{search}</strong>"</span>}
            </div>

            {/* Scrollable Doctor Items */}
            <div className="fb-dropdown-items-scroll">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doc, idx) => {
                  const isSelected = (selectedDoctor || '').toLowerCase() === (doc.name || '').toLowerCase();
                  const initials = doc.name
                    ? doc.name.replace(/^dr\.\s*/i, '').trim().split(/\s+/).map(p => p[0]).slice(0, 2).join('').toUpperCase()
                    : 'DR';

                  return (
                    <div
                      key={doc.id || idx}
                      onClick={() => {
                        onSelect(doc.name);
                        setIsOpen(false);
                        setSearch('');
                      }}
                      className={`fb-dropdown-item ${isSelected ? 'selected' : ''}`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                        <div className="fb-doc-avatar-circle">
                          {initials}
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.92rem' }}>
                            {doc.name}
                          </div>
                          {doc.dept && (
                            <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600, marginTop: '0.1rem' }}>
                              {doc.dept}
                            </div>
                          )}
                        </div>
                      </div>

                      {isSelected && (
                        <div style={{ display: 'flex', alignItems: 'center', color: '#059669', flexShrink: 0 }}>
                          <Check size={18} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="fb-dropdown-no-results">
                  <AlertCircle size={24} color="#94a3b8" />
                  <p style={{ margin: '0.35rem 0', fontWeight: 700, color: '#334155', fontSize: '0.88rem' }}>
                    "{search}" नाम से कोई डॉक्टर नहीं मिला
                  </p>
                  <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.78rem', color: '#64748b' }}>
                    क्या आप इसे सीधे डॉक्टर के रूप में चुनना चाहते हैं?
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(search.trim());
                      setIsOpen(false);
                      setSearch('');
                    }}
                    className="fb-doc-use-search-btn"
                  >
                    "{search}" को डॉक्टर के रूप में चुनें
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Helper Bar */}
            <div className="fb-dropdown-footer">
              <span>सूची में डॉक्टर नहीं मिला?</span>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onToggleCustom();
                }}
                className="fb-dropdown-custom-switch-btn"
              >
                नाम स्वयं टाइप करें ➔
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── 5-Star Interactive Rating Field Component (Starts Empty) ──
function StarRatingField({ labelHi, labelEn, value, onChange }) {
  const [hoverRating, setHoverRating] = useState(0);
  const activeRating = hoverRating || value || 0;
  const currentInfo = activeRating > 0 ? (RATING_INFO[activeRating] || RATING_INFO[5]) : null;

  return (
    <div className={`fb-rating-card ${value > 0 ? 'rated' : 'unrated'}`}>
      <div className="fb-rating-header">
        <div>
          <div className="fb-rating-title-hi">{labelHi}</div>
          <div className="fb-rating-title-en">{labelEn}</div>
        </div>
        {currentInfo ? (
          <div
            className="fb-rating-badge rated"
            style={{
              color: currentInfo.color,
              backgroundColor: currentInfo.bg,
              borderColor: currentInfo.color + '40'
            }}
          >
            {activeRating}★ • {currentInfo.hi}
          </div>
        ) : (
          <div className="fb-rating-badge empty">
            ⭐ रेटिंग दें (Tap to Rate)
          </div>
        )}
      </div>

      <div className="fb-stars-row">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = activeRating > 0 && star <= activeRating;
          return (
            <button
              type="button"
              key={star}
              onClick={() => onChange(value === star ? 0 : star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="fb-star-btn"
              title={`${star} Star - ${RATING_INFO[star]?.hi}`}
              aria-label={`${star} star`}
            >
              <Star
                size={26}
                style={{
                  fill: isFilled ? '#f59e0b' : '#ffffff',
                  color: isFilled ? '#f59e0b' : '#cbd5e1',
                  strokeWidth: isFilled ? 0 : 1.75,
                  filter: isFilled ? 'drop-shadow(0 2px 5px rgba(245, 158, 11, 0.4))' : 'none',
                  transform: isFilled ? 'scale(1.08)' : 'scale(1)',
                  transition: 'all 0.15s ease'
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Toggle Choice Pills Component (हाँ/नहीं or अच्छा/खराब) ──
function TogglePills({ labelHi, labelEn, options, value, onChange }) {
  return (
    <div className="fb-toggle-card">
      <div className="fb-toggle-title-hi">{labelHi}</div>
      <div className="fb-toggle-title-en">{labelEn}</div>

      <div className="fb-toggle-options-grid">
        {options.map((opt) => {
          const isSelected = value === opt.value;
          const isPositive = opt.value === 'हाँ' || opt.value === 'अच्छा';

          let btnClass = 'fb-pill-btn';
          if (isSelected) {
            btnClass += isPositive ? ' active-positive' : ' active-negative';
          }

          return (
            <button
              type="button"
              key={opt.value}
              onClick={() => onChange(isSelected ? '' : opt.value)}
              className={btnClass}
            >
              {isSelected && <Check size={14} strokeWidth={3} />}
              <span>{opt.labelHi}</span>
              <span className="fb-pill-subtext">({opt.labelEn})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Feedback() {
  const { doctors = [] } = useDoctors();

  // Basic Details - Empty by default
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [department, setDepartment] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [customDoctor, setCustomDoctor] = useState(false);

  // 1 to 5 Star Ratings (INITIALIZED AS 0 / EMPTY AS REQUESTED)
  const [ratings, setRatings] = useState({
    admissionDischarge: 0,
    doctorConsultation: 0,
    nursingCare: 0,
    cleanliness: 0,
    facilities: 0,
    food: 0
  });

  // Doctor Care (4 questions) - ALL EMPTY BY DEFAULT
  const [doctorCare, setDoctorCare] = useState({
    doctorVisits: '',
    doctorBehavior: '',
    doctorExplanation: '',
    timelyTreatment: ''
  });

  // Nursing & Staff (5 questions) - ALL EMPTY BY DEFAULT
  const [nursingAndStaff, setNursingAndStaff] = useState({
    nursingFriendly: '',
    nursingPromptResponse: '',
    staffProblemResolution: '',
    staffComplaintResponse: '',
    staffPrivacy: ''
  });

  // Hygiene, Facilities & Food (6 questions) - ALL EMPTY BY DEFAULT
  const [hospitalFacilities, setHospitalFacilities] = useState({
    timelyReports: '',
    canteenParking: '',
    wardToiletCleanliness: '',
    bedLinenCleanliness: '',
    calmEnvironment: '',
    timelyFood: ''
  });

  // Overall & Suggestions (5 questions) - ALL EMPTY BY DEFAULT
  const [overallAndSuggestions, setOverallAndSuggestions] = useState({
    billingTransparency: '',
    overallExperience: '',
    recommendHospital: '',
    socialFollow: '',
    suggestions: ''
  });

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Combine doctors from Backend API Context + Static Catalogue (deduplicated & sorted A-Z)
  const doctorOptions = useMemo(() => {
    const map = new Map();

    // 1. Backend API / Context Doctors
    if (Array.isArray(doctors)) {
      for (const d of doctors) {
        const name = (d?.name || '').trim();
        if (name && !map.has(name.toLowerCase())) {
          map.set(name.toLowerCase(), {
            id: d.id || d._id,
            name: name,
            dept: d.department || d.speciality || d.specialityId || ''
          });
        }
      }
    }

    // 2. Static Catalogue Doctors
    if (Array.isArray(doctorsData)) {
      for (const d of doctorsData) {
        const name = (d?.name || '').trim();
        if (name && !map.has(name.toLowerCase())) {
          map.set(name.toLowerCase(), {
            id: d.id,
            name: name,
            dept: d.department || d.title || ''
          });
        }
      }
    }

    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [doctors]);

  // Live average calculation (only counts ratings > 0)
  const liveAverageRating = useMemo(() => {
    const vals = Object.values(ratings).filter((v) => typeof v === 'number' && v > 0);
    if (vals.length === 0) return null;
    const sum = vals.reduce((a, b) => a + b, 0);
    return Number((sum / vals.length).toFixed(1));
  }, [ratings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!patientName.trim()) {
      setErrorMessage('कृपया मरीज का नाम दर्ज करें (Please enter patient full name).');
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }

    if (!doctorName.trim()) {
      setErrorMessage('कृपया संबंधित डॉक्टर का नाम चुनें या लिखें (Please select or enter doctor name).');
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }

    if (patientPhone.trim() && patientPhone.trim().length !== 10) {
      setErrorMessage('कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें (Please enter a valid 10-digit mobile number).');
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }

    // Check if patient rated all 6 categories
    const unrated = Object.entries(ratings).filter(([_, val]) => !val || val === 0);
    if (unrated.length > 0) {
      setErrorMessage(
        'कृपया सभी 6 मुख्य अस्पताल सेवाओं को 1 से 5 स्टार रेटिंग दें (Please provide 1-5 star ratings for all 6 service areas).'
      );
      const ratingsElem = document.getElementById('ratings-section');
      if (ratingsElem) {
        ratingsElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    const isLocal = typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    const candidates = [];
    if (isLocal) {
      candidates.push('http://localhost:5001/api');
    }
    const envUrl = (typeof import.meta !== 'undefined' && import.meta?.env) ? import.meta.env.VITE_API_BASE_URL : null;
    if (envUrl && !candidates.includes(envUrl)) {
      candidates.push(envUrl);
    }
    if (!candidates.includes('https://api.nimshospitals.net/api')) {
      candidates.push('https://api.nimshospitals.net/api');
    }
    if (!candidates.includes('http://localhost:5001/api')) {
      candidates.push('http://localhost:5001/api');
    }

    const payload = {
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      date,
      department,
      doctorName: doctorName.trim(),
      ratings,
      doctorCare,
      nursingAndStaff,
      hospitalFacilities,
      overallAndSuggestions
    };

    let savedData = null;
    let apiErrorMsg = '';

    for (const base of candidates) {
      try {
        const res = await fetch(`${base}/feedback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            savedData = json.data || payload;
            break;
          } else {
            apiErrorMsg = json.message || 'Feedback recording failed.';
          }
        }
      } catch (err) {
        // try next endpoint candidate
      }
    }

    setIsSubmitting(false);

    if (savedData) {
      setSubmittedFeedback(savedData);
      window.scrollTo({ top: 80, behavior: 'smooth' });
    } else {
      setErrorMessage(apiErrorMsg || 'अस्पताल सर्वर से संपर्क नहीं हो सका। कृपया नेटवर्क जांचकर पुनः प्रयास करें।');
    }
  };

  const handleReset = () => {
    setSubmittedFeedback(null);
    setPatientName('');
    setPatientPhone('');
    setDepartment('');
    setDoctorName('');
    setCustomDoctor(false);
    setRatings({
      admissionDischarge: 0,
      doctorConsultation: 0,
      nursingCare: 0,
      cleanliness: 0,
      facilities: 0,
      food: 0
    });
    setDoctorCare({
      doctorVisits: '',
      doctorBehavior: '',
      doctorExplanation: '',
      timelyTreatment: ''
    });
    setNursingAndStaff({
      nursingFriendly: '',
      nursingPromptResponse: '',
      staffProblemResolution: '',
      staffComplaintResponse: '',
      staffPrivacy: ''
    });
    setHospitalFacilities({
      timelyReports: '',
      canteenParking: '',
      wardToiletCleanliness: '',
      bedLinenCleanliness: '',
      calmEnvironment: '',
      timelyFood: ''
    });
    setOverallAndSuggestions({
      billingTransparency: '',
      overallExperience: '',
      recommendHospital: '',
      socialFollow: '',
      suggestions: ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fb-page-wrapper">
      <style>{`
        /* ── ROOT PAGE WRAPPER ── */
        .fb-page-wrapper {
          min-height: 100vh;
          background: #f1f5f9;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          color: #0f172a;
          box-sizing: border-box;
          padding-bottom: 5rem;
          width: 100%;
        }

        /* ── BRAND HERO SECTION ── */
        .fb-hero-section {
          background: linear-gradient(135deg, #172a34 0%, #0f232e 50%, #172a34 100%);
          border-bottom: 4px solid #bd171c;
          padding: 3.5rem 1.5rem 4.75rem;
          text-align: center;
          position: relative;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }
        .fb-hero-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        .fb-hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(229, 182, 74, 0.5);
          color: #e5b64a;
          padding: 0.45rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .fb-hero-title {
          font-size: clamp(1.75rem, 3.2vw, 2.4rem);
          font-weight: 900;
          color: #ffffff !important;
          margin: 0 0 0.65rem 0;
          line-height: 1.25;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
        }
        .fb-hero-subtitle {
          font-size: clamp(0.85rem, 1.3vw, 0.96rem);
          color: #e2e8f0 !important;
          max-width: 760px;
          margin: 0 auto 1.25rem;
          line-height: 1.6;
        }
        .fb-hero-trust-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          font-size: 0.78rem;
          font-weight: 700;
          color: #cbd5e1;
        }
        .fb-trust-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* ── FULL WIDTH SHELL CONTAINER (UP TO 1200PX MATCHING NIMS DESIGN) ── */
        .fb-content-shell {
          max-width: 1200px;
          width: calc(100% - 2.5rem);
          margin: -2.75rem auto 0;
          position: relative;
          z-index: 20;
          box-sizing: border-box;
        }
        @media (max-width: 640px) {
          .fb-content-shell {
            width: calc(100% - 1.25rem);
            margin-top: -2rem;
          }
        }

        /* ── CARD STYLING ── */
        .fb-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 1.15rem;
          padding: 1.35rem 1.25rem;
          margin-bottom: 1.35rem;
          box-shadow: 0 6px 20px rgba(15, 23, 42, 0.04);
          box-sizing: border-box;
        }
        @media (min-width: 768px) {
          .fb-card {
            padding: 1.65rem 1.65rem;
          }
        }
        .fb-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 0.85rem;
          margin-bottom: 1.15rem;
          gap: 0.85rem;
          flex-wrap: wrap;
        }
        .fb-card-header-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .fb-card-icon-box {
          width: 38px;
          height: 38px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          flex-shrink: 0;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }
        .fb-card-title-hi {
          font-size: 1.08rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          line-height: 1.3;
        }
        .fb-card-desc-en {
          font-size: 0.76rem;
          color: #64748b;
          margin: 0.15rem 0 0 0;
        }

        /* ── FORM INPUTS & LABELS ── */
        .fb-field-group {
          margin-bottom: 1rem;
        }
        .fb-field-label {
          display: block;
          font-size: 0.80rem;
          font-weight: 700;
          color: #334155;
          margin-bottom: 0.35rem;
        }
        .fb-field-label span.req {
          color: #dc2626;
          margin-left: 0.2rem;
        }
        .fb-field-label span.opt {
          color: #94a3b8;
          font-weight: 500;
          font-size: 0.75rem;
        }
        .fb-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .fb-input-icon {
          position: absolute;
          left: 0.95rem;
          color: #94a3b8;
          pointer-events: none;
        }
        .fb-input {
          width: 100%;
          height: 44px;
          padding: 0 0.9rem 0 2.75rem;
          border: 1.5px solid #cbd5e1;
          border-radius: 0.75rem;
          background: #f8fafc;
          font-size: 0.85rem;
          font-weight: 600;
          color: #0f172a;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        .fb-input:focus {
          border-color: #bd171c;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(189, 23, 28, 0.12);
        }
        .fb-textarea {
          width: 100%;
          padding: 0.75rem 0.95rem;
          border: 1.5px solid #cbd5e1;
          border-radius: 0.75rem;
          background: #f8fafc;
          font-size: 0.85rem;
          font-weight: 500;
          color: #0f172a;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
          resize: vertical;
          line-height: 1.5;
        }
        .fb-textarea:focus {
          border-color: #bd171c;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(189, 23, 28, 0.12);
        }

        /* ── SEARCHABLE DOCTOR DROPDOWN STYLING ── */
        .fb-custom-select-trigger {
          width: 100%;
          height: 44px;
          padding: 0 0.9rem;
          border: 1.5px solid #cbd5e1;
          border-radius: 0.75rem;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.2s ease;
          box-sizing: border-box;
          font-size: 0.85rem;
        }
        .fb-custom-select-trigger:hover {
          background: #ffffff;
          border-color: #94a3b8;
        }
        .fb-custom-select-trigger.open {
          border-color: #bd171c;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(189, 23, 28, 0.12);
        }
        .fb-custom-select-trigger.has-value {
          background: #ffffff;
        }
        .fb-doc-dept-pill {
          font-size: 0.70rem;
          font-weight: 800;
          padding: 0.15rem 0.5rem;
          background: #f1f5f9;
          color: #172a34;
          border-radius: 9999px;
          border: 1px solid #e2e8f0;
          white-space: nowrap;
        }
        .fb-doc-clear-btn {
          background: #f1f5f9;
          border: none;
          width: 22px;
          height: 22px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .fb-doc-clear-btn:hover {
          background: #fee2e2;
          color: #dc2626;
        }
        .fb-custom-dropdown-menu {
          position: absolute;
          top: calc(100% + 5px);
          left: 0;
          right: 0;
          z-index: 60;
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          border-radius: 0.85rem;
          box-shadow: 0 14px 32px rgba(15, 23, 42, 0.14);
          overflow: hidden;
          animation: fbFadeDown 0.18s ease-out;
        }
        @keyframes fbFadeDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fb-dropdown-search-box {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.65rem 0.95rem;
          border-bottom: 1px solid #f1f5f9;
          background: #ffffff;
        }
        .fb-dropdown-search-input {
          width: 100%;
          border: none;
          outline: none;
          font-size: 0.85rem;
          font-weight: 600;
          color: #0f172a;
          background: transparent;
        }
        .fb-dropdown-search-input::placeholder {
          color: #94a3b8;
          font-weight: 500;
        }
        .fb-dropdown-count-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.35rem 0.95rem;
          background: #f8fafc;
          border-bottom: 1px solid #f1f5f9;
          font-size: 0.72rem;
          color: #64748b;
        }
        .fb-dropdown-items-scroll {
          max-height: 280px;
          overflow-y: auto;
          padding: 0.35rem;
        }
        .fb-dropdown-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.65rem;
          padding: 0.55rem 0.75rem;
          border-radius: 0.65rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .fb-dropdown-item:hover {
          background: #f1f5f9;
        }
        .fb-dropdown-item.selected {
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
        }
        .fb-doc-avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #172a34 0%, #233e4c 100%);
          color: #e5b64a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 900;
          flex-shrink: 0;
        }
        .fb-dropdown-no-results {
          padding: 1.75rem 1.25rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .fb-doc-use-search-btn {
          background: #172a34;
          color: #ffffff;
          border: none;
          padding: 0.45rem 1rem;
          border-radius: 0.55rem;
          font-size: 0.78rem;
          font-weight: 800;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .fb-doc-use-search-btn:hover {
          background: #bd171c;
        }
        .fb-dropdown-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.55rem 0.95rem;
          background: #f8fafc;
          border-top: 1px solid #f1f5f9;
          font-size: 0.74rem;
          color: #64748b;
        }
        .fb-dropdown-custom-switch-btn {
          background: none;
          border: none;
          color: #bd171c;
          font-weight: 800;
          cursor: pointer;
          padding: 0;
          font-size: 0.74rem;
        }
        .fb-dropdown-custom-switch-btn:hover {
          text-decoration: underline;
        }

        /* ── GRID SYSTEM (RESPONSIVE FULL-WIDTH) ── */
        .fb-grid-2 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .fb-grid-2 {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* ── DEPARTMENT SELECTOR (OPD vs IPD) ── */
        .fb-dept-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.65rem;
        }
        .fb-dept-btn {
          height: 44px;
          border: 1.5px solid #cbd5e1;
          border-radius: 0.75rem;
          background: #f8fafc;
          font-size: 0.82rem;
          font-weight: 800;
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .fb-dept-btn.active {
          background: #172a34;
          color: #ffffff;
          border-color: #172a34;
          box-shadow: 0 4px 14px rgba(23, 42, 52, 0.28);
        }

        /* ── 5-STAR RATING CARDS (FULL WIDTH SPREAD) ── */
        .fb-rating-card {
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 0.95rem;
          padding: 1rem 1.15rem;
          transition: all 0.2s ease;
        }
        .fb-rating-card.rated {
          border-color: #fde68a;
          background: #ffffff;
        }
        .fb-rating-card:hover {
          background: #ffffff;
          border-color: #fcd34d;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.08);
        }
        .fb-rating-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.65rem;
          margin-bottom: 0.75rem;
        }
        .fb-rating-title-hi {
          font-size: 0.88rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.35;
        }
        .fb-rating-title-en {
          font-size: 0.72rem;
          color: #64748b;
          font-weight: 500;
          margin-top: 0.15rem;
        }
        .fb-rating-badge {
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          border: 1px solid;
          white-space: nowrap;
        }
        .fb-rating-badge.empty {
          color: #64748b;
          background-color: #f1f5f9;
          border-color: #cbd5e1;
        }
        .fb-stars-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
        .fb-star-btn {
          background: none;
          border: none;
          padding: 0.2rem;
          cursor: pointer;
          border-radius: 0.45rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s ease;
        }
        .fb-star-btn:hover {
          transform: scale(1.15);
        }

        /* ── TOGGLE PILL QUESTIONS (FULL WIDTH) ── */
        .fb-toggle-card {
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 0.95rem;
          padding: 1rem 1.15rem;
          transition: all 0.2s ease;
        }
        .fb-toggle-card:hover {
          background: #ffffff;
          border-color: #cbd5e1;
        }
        .fb-toggle-title-hi {
          font-size: 0.88rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.35;
        }
        .fb-toggle-title-en {
          font-size: 0.72rem;
          color: #64748b;
          font-weight: 500;
          margin-top: 0.15rem;
        }
        .fb-toggle-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.65rem;
          margin-top: 0.85rem;
        }
        .fb-pill-btn {
          height: 40px;
          border: 1.5px solid #cbd5e1;
          border-radius: 0.75rem;
          background: #ffffff;
          font-size: 0.82rem;
          font-weight: 800;
          color: #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .fb-pill-btn:hover {
          border-color: #94a3b8;
          background: #f1f5f9;
        }
        .fb-pill-btn.active-positive {
          background: #059669;
          color: #ffffff;
          border-color: #059669;
          box-shadow: 0 3px 12px rgba(5, 150, 105, 0.28);
          transform: translateY(-1px);
        }
        .fb-pill-btn.active-negative {
          background: #dc2626;
          color: #ffffff;
          border-color: #dc2626;
          box-shadow: 0 3px 12px rgba(220, 38, 38, 0.28);
          transform: translateY(-1px);
        }
        .fb-pill-subtext {
          font-size: 0.70rem;
          font-weight: 600;
          opacity: 0.9;
        }

        /* ── SUBMIT BUTTON & FOOTER ── */
        .fb-submit-box {
          text-align: center;
          padding: 1.25rem 0;
        }
        .fb-submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, #bd171c 0%, #9e1217 100%);
          color: #ffffff;
          border: none;
          padding: 0.95rem 3rem;
          border-radius: 0.85rem;
          font-size: 0.96rem;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(189, 23, 28, 0.3);
          transition: all 0.2s ease;
          width: 100%;
          max-width: 480px;
        }
        .fb-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(189, 23, 28, 0.4);
        }
        .fb-submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }
        .fb-submit-btn-content {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
        }
        .fb-submit-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .fb-submit-btn-icon {
          flex-shrink: 0;
        }
        .fb-submit-btn-hi {
          font-size: 0.98rem;
          font-weight: 800;
          letter-spacing: 0.01em;
        }
        .fb-submit-btn-en {
          font-size: 0.92rem;
          font-weight: 700;
          opacity: 0.95;
        }
        @media (max-width: 768px) {
          .fb-submit-btn {
            padding: 0.85rem 1.25rem;
            max-width: 100%;
          }
          .fb-submit-btn-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.15rem;
            width: 100%;
            text-align: center;
          }
          .fb-submit-btn-primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            width: 100%;
          }
          .fb-submit-btn-hi {
            font-size: 1.05rem;
            font-weight: 900;
            line-height: 1.2;
          }
          .fb-submit-btn-en {
            font-size: 0.82rem;
            font-weight: 600;
            opacity: 0.92;
            line-height: 1.2;
            text-align: center;
          }
        }
        .fb-privacy-note {
          font-size: 0.76rem;
          color: #64748b;
          margin-top: 0.75rem;
        }

        /* ── SUCCESS RECEIPT SCREEN ── */
        .fb-success-box {
          background: #ffffff;
          border-radius: 1.5rem;
          border: 1.5px solid #cbd5e1;
          padding: 3.5rem 2rem;
          text-align: center;
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.08);
          max-width: 700px;
          margin: 3rem auto;
        }
        .fb-success-badge {
          width: 76px;
          height: 76px;
          border-radius: 1.5rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
        }
        .fb-success-ref-card {
          background: #0f172a;
          color: #ffffff;
          padding: 1.25rem 1.75rem;
          border-radius: 1rem;
          margin: 1.75rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
      `}</style>

      {/* ── Brand Hero Banner ── */}
      <section className="fb-hero-section">
        <div className="fb-hero-content">
          <div className="fb-hero-pill">
            <Star size={15} fill="#e5b64a" />
            <span>मरीज फीडबैक पोर्टल • PATIENT FEEDBACK PORTAL</span>
          </div>

          <h1 className="fb-hero-title">
            मरीज़ फीडबैक फॉर्म
          </h1>

          <p className="fb-hero-subtitle">
            प्रिय मरीज/अभिभावक, NIMS Super Speciality Hospital में आपके उपचार व सेवाओं के अनुभव को साझा करें,
            ताकि हम अपनी स्वास्थ्य सेवाओं को निरंतर और बेहतर बना सकें।
          </p>

          <div className="fb-hero-trust-bar">
            <div className="fb-trust-item">
              <Heart size={18} color="#e5b64a" fill="#e5b64a" />
              <span>रोगी संतुष्टि हमारी प्राथमिकता</span>
            </div>
            <div className="fb-trust-item">
              <ShieldCheck size={18} color="#e5b64a" />
              <span>गुणवत्ता एवं रोगी सुरक्षा</span>
            </div>
            <div className="fb-trust-item">
              <Award size={18} color="#e5b64a" />
              <span>निरंतर सेवा सुधार का संकल्प</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Form Shell (Full 1200px Width) ── */}
      <div className="fb-content-shell">
        {submittedFeedback ? (
          /* ── SUCCESS RECEIPT VIEW ── */
          <div className="fb-success-box">
            <div className="fb-success-badge">
              <CheckCircle2 size={44} strokeWidth={2.5} />
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#ecfdf5', color: '#065f46', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.82rem', fontWeight: 800, marginBottom: '1rem', border: '1px solid #a7f3d0' }}>
              <Check size={15} strokeWidth={3} />
              <span>सफलतापूर्वक दर्ज हुआ (Successfully Submitted)</span>
            </div>

            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.75rem 0' }}>
              धन्यवाद{submittedFeedback.patientName ? `, ${submittedFeedback.patientName}` : ''}!
            </h2>

            <p style={{ fontSize: '1.02rem', color: '#475569', lineHeight: 1.75, maxWidth: '580px', margin: '0 auto 2rem' }}>
              आपकी बहुमूल्य राय सीधे NIMS अस्पताल प्रशासन तक पहुँच गई है। NIMS Super Speciality Hospital परिवार आपके उत्तम स्वास्थ्य और शीघ्र स्वास्थ्य लाभ की कामना करता है।
            </p>

            <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.75rem' }}>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  background: '#0f172a',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '0.85rem',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                नया फीडबैक दर्ज करें (Submit Another)
              </button>
              <a
                href="/"
                style={{
                  background: '#f1f5f9',
                  color: '#334155',
                  textDecoration: 'none',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '0.85rem',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
              >
                होमपेज पर जाएं (Return Home)
              </a>
            </div>
          </div>
        ) : (
          /* ── FEEDBACK FORM (FULL WIDTH) ── */
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', color: '#991b1b', padding: '1rem 1.25rem', borderRadius: '1rem', fontSize: '0.88rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: '0 4px 12px rgba(220, 38, 38, 0.08)' }}>
                <AlertCircle size={20} color="#dc2626" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* ═══════════════════════════════════════════════
                CARD 1: प्राथमिक जानकारी (Basic Information)
               ═══════════════════════════════════════════════ */}
            <div className="fb-card">
              <div className="fb-card-header">
                <div className="fb-card-header-left">
                  <div className="fb-card-icon-box" style={{ background: '#172a34' }}>
                    <User size={20} color="#e5b64a" />
                  </div>
                  <div>
                    <h2 className="fb-card-title-hi">1. प्राथमिक जानकारी (Patient &amp; Visit Details)</h2>
                    <p className="fb-card-desc-en">कृपया मरीज का नाम, विज़िट दिनांक एवं संबंधित डॉक्टर का चयन करें।</p>
                  </div>
                </div>
              </div>

              <div className="fb-grid-2">
                {/* Patient Name */}
                <div className="fb-field-group">
                  <label className="fb-field-label">
                    मरीज़ का नाम (Patient's Full Name)<span className="req">*</span>
                  </label>
                  <div className="fb-input-wrapper">
                    <User size={16} className="fb-input-icon" />
                    <input
                      type="text"
                      required
                      placeholder="उदा. राहुल शर्मा (Rahul Sharma)"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="fb-input"
                    />
                  </div>
                </div>

                {/* Patient Mobile */}
                <div className="fb-field-group">
                  <label className="fb-field-label">
                    मोबाइल नंबर (Mobile Number) <span className="opt">(ऐच्छिक / Optional)</span>
                  </label>
                  <div className="fb-input-wrapper">
                    <Phone size={16} className="fb-input-icon" />
                    <input
                      type="tel"
                      maxLength={10}
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      placeholder="उदा. 9876543210"
                      value={patientPhone}
                      onChange={(e) => {
                        const cleanDigits = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setPatientPhone(cleanDigits);
                      }}
                      className="fb-input"
                    />
                  </div>
                </div>
              </div>

              <div className="fb-grid-2">
                {/* Date */}
                <div className="fb-field-group">
                  <label className="fb-field-label">
                    दिनांक (Date of Visit / Feedback)<span className="req">*</span>
                  </label>
                  <div className="fb-input-wrapper">
                    <Calendar size={16} className="fb-input-icon" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="fb-input"
                    />
                  </div>
                </div>

                {/* Department */}
                <div className="fb-field-group">
                  <label className="fb-field-label">
                    विभाग (Department: OPD / IPD)<span className="req">*</span>
                  </label>
                  <div className="fb-dept-selector">
                    <button
                      type="button"
                      onClick={() => setDepartment(department === 'OPD' ? '' : 'OPD')}
                      className={`fb-dept-btn ${department === 'OPD' ? 'active' : ''}`}
                    >
                      <Building2 size={16} />
                      <span>OPD (ओपीडी - बाह्य रोगी)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDepartment(department === 'IPD' ? '' : 'IPD')}
                      className={`fb-dept-btn ${department === 'IPD' ? 'active' : ''}`}
                    >
                      <Building2 size={16} />
                      <span>IPD (आईपीडी - भर्ती रोगी)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Searchable Doctor Selection Dropdown */}
              <SearchableDoctorDropdown
                doctors={doctorOptions}
                selectedDoctor={doctorName}
                onSelect={(val) => setDoctorName(val)}
                isCustom={customDoctor}
                onToggleCustom={() => {
                  setCustomDoctor(!customDoctor);
                  if (!customDoctor) setDoctorName('');
                }}
                customDoctorName={doctorName}
                onChangeCustomName={(val) => setDoctorName(val)}
              />
            </div>

            {/* ═══════════════════════════════════════════════
                CARD 2: अस्पताल सेवाएं (1 से 5 स्टार रेटिंग)
                - EMPTY BY DEFAULT AS REQUESTED
               ═══════════════════════════════════════════════ */}
            <div className="fb-card" id="ratings-section">
              <div className="fb-card-header">
                <div className="fb-card-header-left">
                  <div className="fb-card-icon-box" style={{ background: '#f59e0b' }}>
                    <Star size={24} fill="#ffffff" color="#ffffff" />
                  </div>
                  <div>
                    <h2 className="fb-card-title-hi">2. अस्पताल सेवाएं (1 से 5 स्टार रेटिंग)</h2>
                    <p className="fb-card-desc-en">स्टार्स पर क्लिक करके अपनी रेटिंग दर्ज करें (5★ = उत्कृष्ट, 1★ = बहुत खराब)</p>
                  </div>
                </div>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: liveAverageRating ? '#fef3c7' : '#f1f5f9', color: liveAverageRating ? '#92400e' : '#64748b', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.82rem', fontWeight: 800, border: `1px solid ${liveAverageRating ? '#fcd34d' : '#cbd5e1'}` }}>
                  <Star size={15} fill={liveAverageRating ? '#f59e0b' : '#cbd5e1'} color={liveAverageRating ? '#f59e0b' : '#94a3b8'} />
                  <span>
                    {liveAverageRating ? `औसत रेटिंग: ${liveAverageRating} / 5.0` : 'रेटिंग: अभी दर्ज नहीं (Not Rated)'}
                  </span>
                </div>
              </div>

              <div className="fb-grid-2">
                <StarRatingField
                  labelHi="भर्ती और डिस्चार्ज की प्रक्रिया"
                  labelEn="Admission & Discharge Process"
                  value={ratings.admissionDischarge}
                  onChange={(val) => setRatings((prev) => ({ ...prev, admissionDischarge: val }))}
                />
                <StarRatingField
                  labelHi="डॉक्टर ने बात ध्यान से सुनी और सही इलाज समझाया"
                  labelEn="Doctor Consultation & Attention"
                  value={ratings.doctorConsultation}
                  onChange={(val) => setRatings((prev) => ({ ...prev, doctorConsultation: val }))}
                />
                <StarRatingField
                  labelHi="नर्सों का व्यवहार और देखभाल"
                  labelEn="Nurses' Behavior & Patient Care"
                  value={ratings.nursingCare}
                  onChange={(val) => setRatings((prev) => ({ ...prev, nursingCare: val }))}
                />
                <StarRatingField
                  labelHi="वार्ड और अस्पताल की स्वच्छता"
                  labelEn="Cleanliness of Ward & Hospital"
                  value={ratings.cleanliness}
                  onChange={(val) => setRatings((prev) => ({ ...prev, cleanliness: val }))}
                />
                <StarRatingField
                  labelHi="बिजली, पानी और बैठने की व्यवस्था"
                  labelEn="Facilities: Electricity, Water & Seating"
                  value={ratings.facilities}
                  onChange={(val) => setRatings((prev) => ({ ...prev, facilities: val }))}
                />
                <StarRatingField
                  labelHi="अस्पताल में भोजन की गुणवत्ता"
                  labelEn="Quality of Hospital Food"
                  value={ratings.food}
                  onChange={(val) => setRatings((prev) => ({ ...prev, food: val }))}
                />
              </div>
            </div>

            {/* ═══════════════════════════════════════════════
                CARD 3: डॉक्टर एवं चिकित्सा देखभाल (Doctor Care)
               ═══════════════════════════════════════════════ */}
            <div className="fb-card">
              <div className="fb-card-header">
                <div className="fb-card-header-left">
                  <div className="fb-card-icon-box" style={{ background: '#0d9488' }}>
                    <Stethoscope size={24} color="#ffffff" />
                  </div>
                  <div>
                    <h2 className="fb-card-title-hi">3. डॉक्टर एवं चिकित्सा देखभाल (Doctor &amp; Clinical Care)</h2>
                    <p className="fb-card-desc-en">डॉक्टर के परामर्श, समयबद्धता और व्यवहार का मूल्यांकन करें।</p>
                  </div>
                </div>
              </div>

              <div className="fb-grid-2">
                <TogglePills
                  labelHi="क्या डॉक्टर समय-समय पर आपको देखने आते थे?"
                  labelEn="Did the doctors visit regularly?"
                  options={[
                    { value: 'हाँ', labelHi: 'हाँ', labelEn: 'Yes' },
                    { value: 'नहीं', labelHi: 'नहीं', labelEn: 'No' }
                  ]}
                  value={doctorCare.doctorVisits}
                  onChange={(val) => setDoctorCare((prev) => ({ ...prev, doctorVisits: val }))}
                />
                <TogglePills
                  labelHi="डॉक्टर का व्यवहार कैसा था?"
                  labelEn="How was the doctor's behavior?"
                  options={[
                    { value: 'अच्छा', labelHi: 'अच्छा', labelEn: 'Good' },
                    { value: 'खराब', labelHi: 'खराब', labelEn: 'Poor' }
                  ]}
                  value={doctorCare.doctorBehavior}
                  onChange={(val) => setDoctorCare((prev) => ({ ...prev, doctorBehavior: val }))}
                />
                <TogglePills
                  labelHi="क्या डॉक्टर ने बीमारी और इलाज स्पष्ट रूप से समझाया?"
                  labelEn="Did doctor explain illness & treatment clearly?"
                  options={[
                    { value: 'हाँ', labelHi: 'हाँ', labelEn: 'Yes' },
                    { value: 'नहीं', labelHi: 'नहीं', labelEn: 'No' }
                  ]}
                  value={doctorCare.doctorExplanation}
                  onChange={(val) => setDoctorCare((prev) => ({ ...prev, doctorExplanation: val }))}
                />
                <TogglePills
                  labelHi="क्या आपको समय पर उपचार और परामर्श मिला?"
                  labelEn="Did you receive timely consultation & treatment?"
                  options={[
                    { value: 'हाँ', labelHi: 'हाँ', labelEn: 'Yes' },
                    { value: 'नहीं', labelHi: 'नहीं', labelEn: 'No' }
                  ]}
                  value={doctorCare.timelyTreatment}
                  onChange={(val) => setDoctorCare((prev) => ({ ...prev, timelyTreatment: val }))}
                />
              </div>
            </div>

            {/* ═══════════════════════════════════════════════
                CARD 4: नर्सिंग स्टाफ एवं सहयोगी दल (Nursing & Staff)
               ═══════════════════════════════════════════════ */}
            <div className="fb-card">
              <div className="fb-card-header">
                <div className="fb-card-header-left">
                  <div className="fb-card-icon-box" style={{ background: '#2563eb' }}>
                    <Heart size={24} color="#ffffff" />
                  </div>
                  <div>
                    <h2 className="fb-card-title-hi">4. नर्सिंग स्टाफ एवं सहयोगी दल (Nursing &amp; Staff Care)</h2>
                    <p className="fb-card-desc-en">नर्सिंग दल की तत्परता, निजता का सम्मान एवं शिकायतों के निवारण का अनुभव।</p>
                  </div>
                </div>
              </div>

              <div className="fb-grid-2">
                <TogglePills
                  labelHi="नर्सिंग स्टाफ का व्यवहार मित्रवत और मददगार था?"
                  labelEn="Was the nursing staff friendly and helpful?"
                  options={[
                    { value: 'हाँ', labelHi: 'हाँ', labelEn: 'Yes' },
                    { value: 'नहीं', labelHi: 'नहीं', labelEn: 'No' }
                  ]}
                  value={nursingAndStaff.nursingFriendly}
                  onChange={(val) => setNursingAndStaff((prev) => ({ ...prev, nursingFriendly: val }))}
                />
                <TogglePills
                  labelHi="क्या नर्सों ने बुलाने पर तुरंत प्रतिक्रिया दी?"
                  labelEn="Did nurses respond promptly when called?"
                  options={[
                    { value: 'हाँ', labelHi: 'हाँ', labelEn: 'Yes' },
                    { value: 'नहीं', labelHi: 'नहीं', labelEn: 'No' }
                  ]}
                  value={nursingAndStaff.nursingPromptResponse}
                  onChange={(val) => setNursingAndStaff((prev) => ({ ...prev, nursingPromptResponse: val }))}
                />
                <TogglePills
                  labelHi="क्या स्टाफ ने आपकी समस्याओं का तुरंत समाधान किया?"
                  labelEn="Did staff promptly resolve your issues?"
                  options={[
                    { value: 'हाँ', labelHi: 'हाँ', labelEn: 'Yes' },
                    { value: 'नहीं', labelHi: 'नहीं', labelEn: 'No' }
                  ]}
                  value={nursingAndStaff.staffProblemResolution}
                  onChange={(val) => setNursingAndStaff((prev) => ({ ...prev, staffProblemResolution: val }))}
                />
                <TogglePills
                  labelHi="आपकी शिकायतों पर कर्मचारियों की प्रतिक्रिया कैसी थी?"
                  labelEn="How was staff reaction to complaints?"
                  options={[
                    { value: 'अच्छा', labelHi: 'अच्छा', labelEn: 'Good' },
                    { value: 'खराब', labelHi: 'खराब', labelEn: 'Poor' }
                  ]}
                  value={nursingAndStaff.staffComplaintResponse}
                  onChange={(val) => setNursingAndStaff((prev) => ({ ...prev, staffComplaintResponse: val }))}
                />
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <TogglePills
                  labelHi="क्या स्टाफ ने आपकी निजता (Privacy) का सम्मान किया?"
                  labelEn="Did staff respect your privacy at all times?"
                  options={[
                    { value: 'हाँ', labelHi: 'हाँ', labelEn: 'Yes' },
                    { value: 'नहीं', labelHi: 'नहीं', labelEn: 'No' }
                  ]}
                  value={nursingAndStaff.staffPrivacy}
                  onChange={(val) => setNursingAndStaff((prev) => ({ ...prev, staffPrivacy: val }))}
                />
              </div>
            </div>

            {/* ═══════════════════════════════════════════════
                CARD 5: स्वच्छता, सुविधाएं एवं खानपान (Facilities & Food)
               ═══════════════════════════════════════════════ */}
            <div className="fb-card">
              <div className="fb-card-header">
                <div className="fb-card-header-left">
                  <div className="fb-card-icon-box" style={{ background: '#059669' }}>
                    <Building2 size={24} color="#ffffff" />
                  </div>
                  <div>
                    <h2 className="fb-card-title-hi">5. स्वच्छता, सुविधाएं एवं खानपान (Hygiene, Facilities &amp; Food)</h2>
                    <p className="fb-card-desc-en">वार्ड, शौचालय, पार्किंग, कैंटीन एवं जांच रिपोर्ट की समयबद्धता।</p>
                  </div>
                </div>
              </div>

              <div className="fb-grid-2">
                <TogglePills
                  labelHi="क्या जांच (X-ray, Blood Test) रिपोर्ट समय पर मिली?"
                  labelEn="Were diagnostic reports delivered on time?"
                  options={[
                    { value: 'हाँ', labelHi: 'हाँ', labelEn: 'Yes' },
                    { value: 'नहीं', labelHi: 'नहीं', labelEn: 'No' }
                  ]}
                  value={hospitalFacilities.timelyReports}
                  onChange={(val) => setHospitalFacilities((prev) => ({ ...prev, timelyReports: val }))}
                />
                <TogglePills
                  labelHi="कैंटीन और पार्किंग की सुविधा कैसी थी?"
                  labelEn="How were the canteen and parking facilities?"
                  options={[
                    { value: 'अच्छा', labelHi: 'अच्छा', labelEn: 'Good' },
                    { value: 'खराब', labelHi: 'खराब', labelEn: 'Poor' }
                  ]}
                  value={hospitalFacilities.canteenParking}
                  onChange={(val) => setHospitalFacilities((prev) => ({ ...prev, canteenParking: val }))}
                />
                <TogglePills
                  labelHi="वार्ड और शौचालय की साफ-सफाई कैसी थी?"
                  labelEn="How was cleanliness of ward & washrooms?"
                  options={[
                    { value: 'अच्छा', labelHi: 'अच्छा', labelEn: 'Good' },
                    { value: 'खराब', labelHi: 'खराब', labelEn: 'Poor' }
                  ]}
                  value={hospitalFacilities.wardToiletCleanliness}
                  onChange={(val) => setHospitalFacilities((prev) => ({ ...prev, wardToiletCleanliness: val }))}
                />
                <TogglePills
                  labelHi="वार्ड, बेड और चादरों की स्वच्छता कैसी थी?"
                  labelEn="How was cleanliness of beds and linens?"
                  options={[
                    { value: 'अच्छा', labelHi: 'अच्छा', labelEn: 'Good' },
                    { value: 'खराब', labelHi: 'खराब', labelEn: 'Poor' }
                  ]}
                  value={hospitalFacilities.bedLinenCleanliness}
                  onChange={(val) => setHospitalFacilities((prev) => ({ ...prev, bedLinenCleanliness: val }))}
                />
                <TogglePills
                  labelHi="क्या अस्पताल का वातावरण शांत और आरामदायक था?"
                  labelEn="Was the hospital environment quiet and comfortable?"
                  options={[
                    { value: 'हाँ', labelHi: 'हाँ', labelEn: 'Yes' },
                    { value: 'नहीं', labelHi: 'नहीं', labelEn: 'No' }
                  ]}
                  value={hospitalFacilities.calmEnvironment}
                  onChange={(val) => setHospitalFacilities((prev) => ({ ...prev, calmEnvironment: val }))}
                />
                <TogglePills
                  labelHi="क्या आपको खाना टाइम से मिला?"
                  labelEn="Was food served on time?"
                  options={[
                    { value: 'हाँ', labelHi: 'हाँ', labelEn: 'Yes' },
                    { value: 'नहीं', labelHi: 'नहीं', labelEn: 'No' }
                  ]}
                  value={hospitalFacilities.timelyFood}
                  onChange={(val) => setHospitalFacilities((prev) => ({ ...prev, timelyFood: val }))}
                />
              </div>
            </div>

            {/* ═══════════════════════════════════════════════
                CARD 6: समग्र अनुभव एवं सुझाव (Overall & Suggestions)
               ═══════════════════════════════════════════════ */}
            <div className="fb-card">
              <div className="fb-card-header">
                <div className="fb-card-header-left">
                  <div className="fb-card-icon-box" style={{ background: '#bd171c' }}>
                    <Sparkles size={24} color="#ffffff" />
                  </div>
                  <div>
                    <h2 className="fb-card-title-hi">6. समग्र अनुभव एवं सुझाव (Overall Experience &amp; Suggestions)</h2>
                    <p className="fb-card-desc-en">अस्पताल बिलिंग पारदर्शिता, सिफारिश एवं सुधार के लिए आपके विचार।</p>
                  </div>
                </div>
              </div>

              <div className="fb-grid-2">
                <TogglePills
                  labelHi="क्या बिलिंग प्रक्रिया पारदर्शी और स्पष्ट थी?"
                  labelEn="Was billing process transparent & clear?"
                  options={[
                    { value: 'हाँ', labelHi: 'हाँ', labelEn: 'Yes' },
                    { value: 'नहीं', labelHi: 'नहीं', labelEn: 'No' }
                  ]}
                  value={overallAndSuggestions.billingTransparency}
                  onChange={(val) => setOverallAndSuggestions((prev) => ({ ...prev, billingTransparency: val }))}
                />
                <TogglePills
                  labelHi="आपका हमारे अस्पताल में अनुभव कैसा था?"
                  labelEn="How was your overall experience with NIMS?"
                  options={[
                    { value: 'अच्छा', labelHi: 'अच्छा', labelEn: 'Good' },
                    { value: 'खराब', labelHi: 'खराब', labelEn: 'Poor' }
                  ]}
                  value={overallAndSuggestions.overallExperience}
                  onChange={(val) => setOverallAndSuggestions((prev) => ({ ...prev, overallExperience: val }))}
                />
                <TogglePills
                  labelHi="आप इस अस्पताल की सिफारिश दोस्तों/रिश्तेदारों से करेंगे?"
                  labelEn="Would you recommend this hospital to family & friends?"
                  options={[
                    { value: 'हाँ', labelHi: 'हाँ', labelEn: 'Yes' },
                    { value: 'नहीं', labelHi: 'नहीं', labelEn: 'No' }
                  ]}
                  value={overallAndSuggestions.recommendHospital}
                  onChange={(val) => setOverallAndSuggestions((prev) => ({ ...prev, recommendHospital: val }))}
                />
                <TogglePills
                  labelHi="Facebook/Instagram चैनल लाइक या सब्सक्राइब?"
                  labelEn="Liked or Subscribed to our Social Channels?"
                  options={[
                    { value: 'हाँ', labelHi: 'हाँ', labelEn: 'Yes' },
                    { value: 'नहीं', labelHi: 'नहीं', labelEn: 'No' }
                  ]}
                  value={overallAndSuggestions.socialFollow}
                  onChange={(val) => setOverallAndSuggestions((prev) => ({ ...prev, socialFollow: val }))}
                />
              </div>

              {/* Suggestions Textarea (Full Width) */}
              <div style={{ marginTop: '1.5rem' }}>
                <label className="fb-field-label" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.9rem' }}>
                  <MessageSquare size={18} color="#bd171c" />
                  <span>सुधार के लिए आपके बहुमूल्य सुझाव (Your Suggestions for Improvement):</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="कृपया अपने विचार या कोई असुविधा हो तो यहाँ लिखें (Write any suggestions, feedback or remarks here)..."
                  value={overallAndSuggestions.suggestions}
                  onChange={(e) => setOverallAndSuggestions((prev) => ({ ...prev, suggestions: e.target.value }))}
                  className="fb-textarea"
                />
              </div>
            </div>

            {/* ═══════════════════════════════════════════════
                SUBMIT BUTTON
               ═══════════════════════════════════════════════ */}
            <div className="fb-submit-box">
              <button
                type="submit"
                disabled={isSubmitting}
                className="fb-submit-btn"
              >
                {isSubmitting ? (
                  <div className="fb-submit-btn-content">
                    <div className="fb-submit-btn-primary">
                      <RefreshCw size={19} className="animate-spin fb-submit-btn-icon" />
                      <span className="fb-submit-btn-hi">फीडबैक दर्ज किया जा रहा है...</span>
                    </div>
                    <span className="fb-submit-btn-en">(Submitting...)</span>
                  </div>
                ) : (
                  <div className="fb-submit-btn-content">
                    <div className="fb-submit-btn-primary">
                      <Send size={19} className="fb-submit-btn-icon" />
                      <span className="fb-submit-btn-hi">फीडबैक जमा करें</span>
                    </div>
                    <span className="fb-submit-btn-en">(Submit Patient Feedback)</span>
                  </div>
                )}
              </button>

              <div className="fb-privacy-note">
                🔒 आपकी प्रतिक्रिया पूर्णतः सुरक्षित है और इसका उपयोग केवल स्वास्थ्य सेवाओं के सुधार हेतु किया जाएगा।
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
