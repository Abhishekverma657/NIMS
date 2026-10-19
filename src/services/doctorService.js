import { doctorsData } from '../data/doctorsData.js';
import { specialitiesData } from '../data/specialitiesData.js';

function getApiCandidates() {
  const envUrl = (typeof import.meta !== 'undefined' && import.meta?.env)
    ? import.meta.env.VITE_API_BASE_URL
    : (typeof process !== 'undefined' ? process.env?.VITE_API_BASE_URL : null);
  const isLocal = typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  const candidates = [];
  if (isLocal) {
    candidates.push('http://localhost:5001/api');
  }
  if (envUrl && !candidates.includes(envUrl)) {
    candidates.push(envUrl);
  }
  if (!candidates.includes('https://api.nimshospitals.net/api')) {
    candidates.push('https://api.nimshospitals.net/api');
  }
  if (!candidates.includes('http://localhost:5001/api')) {
    candidates.push('http://localhost:5001/api');
  }
  return candidates;
}

let activeBaseUrl = null;

async function tryFetchWithFallback(path, options = {}) {
  if (activeBaseUrl) {
    try {
      const res = await fetch(`${activeBaseUrl}${path}`, options);
      if (res.ok) return res;
    } catch (e) {
      // If cached URL failed, try other candidates
      activeBaseUrl = null;
    }
  }

  const candidates = getApiCandidates();
  for (const base of candidates) {
    try {
      const res = await fetch(`${base}${path}`, options);
      if (res.ok) {
        activeBaseUrl = base;
        return res;
      }
    } catch (err) {
      // try next candidate
    }
  }
  throw new Error(`Failed to fetch from all API endpoints for ${path}`);
}

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80";

/**
 * Map raw department string to known speciality ID in specialitiesData
 */
export function mapDepartmentToSpecialityId(dept = '') {
  if (!dept) return 'general-medicine';
  const clean = dept.toLowerCase().trim();

  // Direct specialitiesData check
  const exact = specialitiesData.find(s => s.name.toLowerCase() === clean || s.id.toLowerCase() === clean);
  if (exact) return exact.id;

  // Keyword mappings
  if (clean.includes('cardio') || clean.includes('heart')) return 'cardiology';
  if (clean.includes('ctvs') || clean.includes('cardiothoracic')) return 'ctvs';
  if (clean.includes('paediatric') || clean.includes('pediatric')) return 'paediatrics';
  if (clean.includes('neonat')) return 'neonatology';
  if (clean.includes('ortho')) return 'orthopaedics';
  if (clean.includes('neuro-surgery') || clean.includes('neurosurgery') || (clean.includes('neuro') && clean.includes('surg'))) return 'neurosurgery';
  if (clean.includes('neuro')) return 'neurology';
  if (clean.includes('gastro') && clean.includes('surg')) return 'surgical-gastroenterology';
  if (clean.includes('gastro')) return 'gastroenterology';
  if (clean.includes('uro')) return 'urology';
  if (clean.includes('nephro') || clean.includes('renal')) return 'nephrology';
  if (clean.includes('gynae') || clean.includes('obstetric') || clean.includes('women')) return 'obstetrics-gynaecology';
  if (clean.includes('respiratory') || clean.includes('pulmon') || clean.includes('tb & resp') || clean.includes('chest')) return 'tb-resp-diseases';
  if (clean.includes('emergency') || clean.includes('trauma')) return 'emergency-medicine';
  if (clean.includes('general surg') || clean.includes('surgery')) return 'general-surgery';
  if (clean.includes('general med') || clean.includes('medicine')) return 'general-medicine';
  if (clean.includes('ent') || clean.includes('throat') || clean.includes('ear')) return 'ent';
  if (clean.includes('skin') || clean.includes('derma') || clean.includes('v.d')) return 'skin-vd';
  if (clean.includes('eye') || clean.includes('ophthalm')) return 'ophthalmology';
  if (clean.includes('dental') || clean.includes('teeth')) return 'dental';
  if (clean.includes('psychiat')) return 'psychiatry';
  if (clean.includes('endocrin') || clean.includes('diabet')) return 'endocrinology';
  if (clean.includes('plastic')) return 'plastic-surgery';
  if (clean.includes('ivf') || clean.includes('fertil')) return 'ivf';
  if (clean.includes('liver') || clean.includes('hpb')) return 'liver-transplant';
  if (clean.includes('spine')) return 'spine-surgery';
  if (clean.includes('physio')) return 'physiotherapy';
  if (clean.includes('bmt') || clean.includes('marrow')) return 'bmt';
  if (clean.includes('hematol')) return 'clinical-hematology';
  if (clean.includes('onco') && clean.includes('surg')) return 'surgical-oncology';
  if (clean.includes('onco') && clean.includes('rad')) return 'radiation-oncology';
  if (clean.includes('onco')) return 'medical-oncology';

  return 'general-medicine';
}

/**
 * Normalizes a doctor from Backend API (/api/doctors) to match website's doctor shape
 */
export function normalizeApiDoctor(apiDoc) {
  if (!apiDoc) return null;

  const rawName = apiDoc.userId?.name || apiDoc.name || 'Doctor';
  const cleanNameLower = rawName.toLowerCase().replace(/^(dr\.|dr|prof\.|prof|\(dr\.\))\s*/i, '').trim();

  // Check if we have a rich curated entry in static doctorsData for this doctor
  const curated = doctorsData.find(d => {
    if (apiDoc.doctorId && d.id === apiDoc.doctorId) return true;
    const curNameLower = d.name.toLowerCase().replace(/^(dr\.|dr|prof\.|prof|\(dr\.\))\s*/i, '').trim();
    return curNameLower === cleanNameLower || (cleanNameLower.length > 5 && curNameLower.includes(cleanNameLower));
  });

  const department = apiDoc.department || curated?.department || 'General Medicine';
  const specialityId = curated?.specialityId || mapDepartmentToSpecialityId(department);
  const doctorId = apiDoc.doctorId || curated?.id || `DR-${apiDoc._id?.slice(-4) || 'GEN'}`;
  const id = curated?.id || doctorId;

  // Parse specialization / expertise
  let expertiseList = curated?.expertise || [];
  if (apiDoc.specialization) {
    const fromApi = apiDoc.specialization.split(/[,;\n]+/).map(s => s.trim()).filter(Boolean);
    if (fromApi.length > 0) expertiseList = fromApi;
  }

  // Parse highlights
  let highlightsList = (Array.isArray(apiDoc.highlights) && apiDoc.highlights.length > 0)
    ? apiDoc.highlights
    : (curated?.highlights || [
        `${apiDoc.designation || 'Senior Consultant'}, Department of ${department}`,
        `Comprehensive clinical care at NIMS Super Specialty Hospital`,
        `Available for in-person consultations and second opinions`
      ]);

  // Qualifications
  const qualification = apiDoc.education || curated?.qualification || 'MBBS';
  let detailedQualifications = curated?.detailedQualifications || [];
  if ((!detailedQualifications || detailedQualifications.length === 0) && qualification) {
    const degrees = qualification.split(/[,/]+/).map(s => s.trim()).filter(Boolean);
    detailedQualifications = degrees.map(deg => ({
      title: deg,
      year: 'Certified Degree',
      org: 'Medical Council of India'
    }));
  }

  // Experience
  let experience = curated?.experience || '';
  if (!experience) {
    const expMatch = (apiDoc.shortBio || apiDoc.longBio || '').match(/(\d+\+?\s*Years?)/i);
    experience = expMatch ? `${expMatch[1]} Experience` : '10+ Years Experience';
  }

  // Photo
  const image = apiDoc.userId?.avatar || apiDoc.image || curated?.image || DEFAULT_AVATAR;

  return {
    _id: apiDoc._id,
    id: id,
    doctorId: doctorId,
    name: rawName,
    title: apiDoc.designation || curated?.title || 'Senior Consultant',
    department: department,
    specialityId: specialityId,
    qualification: qualification,
    experience: experience,
    opdSchedule: apiDoc.opdOfflineHours || curated?.opdSchedule || 'Mon - Sat (09:00 AM - 01:00 PM)',
    roomNo: apiDoc.room || apiDoc.sittingLocation || curated?.roomNo || 'Main OPD Block',
    block: apiDoc.block || curated?.block || 'OPD Super Specialty Block',
    floor: apiDoc.floor || curated?.floor || '1st Floor',
    image: image,
    fee: apiDoc.fee || curated?.fee || 500,
    featured: curated?.featured ?? (apiDoc.designation?.toLowerCase().includes('hod') || false),
    isOpdAvailable: apiDoc.liveStatus ? (apiDoc.liveStatus !== 'Off Duty' && apiDoc.liveStatus !== 'On Leave') : (curated?.isOpdAvailable !== false),
    about: apiDoc.longBio || apiDoc.shortBio || curated?.about || `${rawName} is a highly accomplished specialist in the Department of ${department} at NIMS Super Specialty Hospital, committed to patient-first medical care.`,
    expertise: expertiseList,
    highlights: highlightsList,
    detailedQualifications: detailedQualifications,
    detailedExperience: curated?.detailedExperience || [
      {
        title: apiDoc.designation || 'Attending Senior Faculty',
        year: 'Current Appointment',
        org: 'NIMS Super Specialty Hospital, Jaipur'
      }
    ],
    languages: curated?.languages || ['English', 'Hindi'],
    heroQualification: curated?.heroQualification || qualification,
    heroDesignation: curated?.heroDesignation || apiDoc.designation,
    heroDepartment: curated?.heroDepartment || department,
    rawBackendData: apiDoc
  };
}

/**
 * Fetch all doctors from Backend API with static doctorsData fallback & merge
 */
export async function getDoctorsList() {
  try {
    const res = await tryFetchWithFallback('/doctors', {
      headers: { 'Accept': 'application/json' }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch doctors: HTTP ${res.status}`);
    }

    const json = await res.json();
    const rawList = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);

    if (rawList.length === 0) {
      return doctorsData;
    }

    // Map each API doctor
    const normalized = rawList.map(normalizeApiDoctor).filter(Boolean);

    // Merge static doctors that might not yet be in the backend DB (to ensure complete catalogue)
    const normalizedIds = new Set(normalized.map(d => d.id));
    const normalizedNames = new Set(normalized.map(d => d.name.toLowerCase().replace(/^(dr\.|dr|prof\.|prof|\(dr\.\))\s*/i, '').trim()));

    const missingStatic = doctorsData.filter(d => {
      const clean = d.name.toLowerCase().replace(/^(dr\.|dr|prof\.|prof|\(dr\.\))\s*/i, '').trim();
      return !normalizedIds.has(d.id) && !normalizedNames.has(clean);
    });

    return [...normalized, ...missingStatic];
  } catch (err) {
    console.warn('Backend Doctor API offline or unreachable, using static catalogue fallback:', err.message);
    return doctorsData;
  }
}

/**
 * Fetch single doctor by ID or Slug
 */
export async function getDoctorById(idOrSlug) {
  if (!idOrSlug) return null;

  // 1. Try fetching from Backend API directly
  try {
    const res = await tryFetchWithFallback(`/doctors/${idOrSlug}`, {
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      const json = await res.json();
      if (json.data) {
        return normalizeApiDoctor(json.data);
      }
    }
  } catch (err) {
    // Continue to fallback
  }

  // 2. Fallback to local doctorsData
  const localMatch = doctorsData.find(d => 
    d.id === idOrSlug || 
    d.id.toLowerCase() === String(idOrSlug).toLowerCase()
  );

  return localMatch || null;
}

/**
 * Submit an OPD Appointment Booking to Backend API
 */
export async function bookOpdAppointment(bookingPayload) {
  try {
    const res = await tryFetchWithFallback('/opd/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(bookingPayload)
    });

    const json = await res.json();
    return json;
  } catch (err) {
    console.error('Booking API call failed:', err);
    return {
      success: false,
      message: err.message || 'Network error while booking appointment.'
    };
  }
}
