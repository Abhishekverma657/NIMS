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

export async function tryFetchWithFallback(path, options = {}) {
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

const DEFAULT_AVATAR = "/assets/icons/doctor-placeholder.svg";

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

  const rawName = (
    (typeof apiDoc.userId === 'object' && apiDoc.userId?.name) ||
    apiDoc.name ||
    'Doctor'
  ).trim();
  const cleanNameLower = rawName.toLowerCase().replace(/^(dr\.|dr|prof\.|prof|\(dr\.\))\s*/i, '').trim();

  // Check if we have a rich curated entry in static doctorsData for this doctor
  const curated = doctorsData.find(d => {
    if (apiDoc.doctorId && d.id === apiDoc.doctorId) return true;
    const curNameLower = d.name.toLowerCase().replace(/^(dr\.|dr|prof\.|prof|\(dr\.\))\s*/i, '').trim();
    return curNameLower === cleanNameLower || (cleanNameLower.length > 5 && curNameLower.includes(cleanNameLower));
  });

  const department = (apiDoc.department || apiDoc.dept || curated?.department || '').trim();
  const specialityId = curated?.specialityId || (department ? mapDepartmentToSpecialityId(department) : '');
  const doctorId = apiDoc.doctorId || curated?.id || `DR-${apiDoc._id?.slice(-4) || 'GEN'}`;
  const id = curated?.id || doctorId;

  // Parse specialization / expertise (only real data)
  let expertiseList = curated?.expertise || [];
  if (apiDoc.specialization || apiDoc.spec) {
    const fromApi = (apiDoc.specialization || apiDoc.spec).split(/[,;\n]+/).map(s => s.trim()).filter(Boolean);
    if (fromApi.length > 0) expertiseList = fromApi;
  }

  // Parse highlights (ONLY real data from database or curated, never invent dummy bullet points)
  let highlightsList = [];
  if (Array.isArray(apiDoc.highlights) && apiDoc.highlights.length > 0) {
    highlightsList = apiDoc.highlights.filter(h => h && h.trim());
  } else if (Array.isArray(apiDoc.bulletPoints) && apiDoc.bulletPoints.length > 0) {
    highlightsList = apiDoc.bulletPoints.filter(h => h && h.trim());
  } else if (curated?.highlights && curated.highlights.length > 0) {
    highlightsList = curated.highlights;
  }

  // Qualifications (ONLY real education, never fallback to 'MBBS')
  const qualification = (apiDoc.education || curated?.qualification || '').trim();
  let detailedQualifications = curated?.detailedQualifications || [];
  if ((!detailedQualifications || detailedQualifications.length === 0) && qualification) {
    const degrees = qualification.split(/[,/]+/).map(s => s.trim()).filter(Boolean);
    detailedQualifications = degrees.map(deg => ({
      title: deg,
      year: '',
      org: ''
    }));
  }

  // Experience (ONLY real experience from database bio or curated, never invent '10+ Years Experience')
  let experience = (curated?.experience || '').trim();
  if (!experience) {
    const bioText = (apiDoc.shortBio || apiDoc.longBio || apiDoc.shortDescription || apiDoc.longDescription || '').trim();
    if (bioText) {
      const expMatch = bioText.match(/(\d+\+?\s*Years?(?:\s+of)?(?:\s+Clinical)?(?:\s+Experience)?)/i);
      if (expMatch) {
        experience = expMatch[1].toLowerCase().includes('experience') ? expMatch[1] : `${expMatch[1]} Experience`;
      }
    }
  }

  // Photo (ensure dummy stock photos are never used as fallbacks)
  const candidateImage = (
    (typeof apiDoc.userId === 'object' && apiDoc.userId?.avatar) ||
    apiDoc.image ||
    apiDoc.avatar ||
    curated?.image ||
    ''
  ).trim();
  const isDummyImage = !candidateImage || 
    candidateImage.includes('unsplash') || 
    candidateImage.includes('male-doc') || 
    candidateImage.includes('female-doc');
  const image = isDummyImage ? DEFAULT_AVATAR : candidateImage;

  // Real OPD hours and room locations (never invent fake schedule or room)
  const opdSchedule = (apiDoc.opdOfflineHours || apiDoc.opdOffline || curated?.opdSchedule || '').trim();
  const roomNo = (apiDoc.room || apiDoc.sittingLocation || curated?.roomNo || '').trim();
  const block = (apiDoc.block || curated?.block || '').trim();
  const floor = (apiDoc.floor || curated?.floor || '').trim();

  // About bio (only real bio entered by admin, never auto-generate fake bio)
  const about = (apiDoc.longBio || apiDoc.shortBio || apiDoc.longDescription || apiDoc.shortDescription || curated?.about || '').trim();

  // Detailed Experience (only if curated has genuine entries, else empty array)
  const detailedExperience = curated?.detailedExperience || [];

  return {
    _id: apiDoc._id,
    id: id,
    doctorId: doctorId,
    name: rawName,
    title: (apiDoc.designation || curated?.title || '').trim(),
    department: department,
    specialityId: specialityId,
    qualification: qualification,
    experience: experience,
    opdSchedule: opdSchedule,
    roomNo: roomNo,
    block: block,
    floor: floor,
    image: image,
    fee: apiDoc.fee ?? curated?.fee ?? null,
    featured: curated?.featured ?? (apiDoc.designation?.toLowerCase().includes('hod') || false),
    isOpdAvailable: apiDoc.liveStatus ? (apiDoc.liveStatus !== 'Off Duty' && apiDoc.liveStatus !== 'On Leave') : (curated?.isOpdAvailable !== false),
    about: about,
    expertise: expertiseList,
    highlights: highlightsList,
    detailedQualifications: detailedQualifications,
    detailedExperience: detailedExperience,
    languages: curated?.languages || (apiDoc.languages ? [apiDoc.languages] : ['English', 'Hindi']),
    heroQualification: curated?.heroQualification || qualification,
    heroDesignation: curated?.heroDesignation || apiDoc.designation || '',
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

    // Map each API doctor - Backend Database is the single source of truth for active doctors
    const normalized = rawList.map(normalizeApiDoctor).filter(Boolean);
    return normalized;
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
