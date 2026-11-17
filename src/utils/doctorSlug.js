/**
 * Utilities for Doctor URLs, Slugs, and Matching
 */

/**
 * Generates an SEO and user-friendly URL slug for a doctor based on their name.
 * e.g. "Dr. Amitesh Agarwal" -> "dr-amitesh-agarwal"
 * e.g. "Prof. (Dr.) Balvir S. Tomar" -> "dr-balvir-s-tomar"
 */
export function getDoctorSlug(doctorOrName) {
  if (!doctorOrName) return '';
  const rawName = typeof doctorOrName === 'string'
    ? doctorOrName
    : (doctorOrName.name || doctorOrName.id || '');

  if (!rawName) return '';

  // Clean titles & brackets: Prof, Dr, etc.
  const cleaned = rawName
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[()]/g, '');

  // Strip leading honorifics to get root name
  const nameWithoutTitle = cleaned
    .replace(/^(dr\.|dr|prof\.|prof|\(dr\.\))\s*/i, '')
    .trim();

  // Create clean hyphenated slug
  let slug = nameWithoutTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  // Always ensure 'dr-' prefix for consistency and clean branding
  if (!slug.startsWith('dr-')) {
    slug = `dr-${slug}`;
  }

  return slug;
}

/**
 * Checks if a given idOrSlug matches a doctor record
 */
export function isDoctorMatch(doctor, idOrSlug) {
  if (!doctor || !idOrSlug) return false;
  const target = String(idOrSlug).toLowerCase().trim();

  // 1. Direct ID / code matches
  if (doctor.id && String(doctor.id).toLowerCase() === target) return true;
  if (doctor.doctorId && String(doctor.doctorId).toLowerCase() === target) return true;
  if (doctor._id && String(doctor._id).toLowerCase() === target) return true;

  // 2. Check aliases if defined (e.g. ["DR-012", "doc-amitesh-agarwal"])
  if (Array.isArray(doctor.aliases)) {
    if (doctor.aliases.some(a => String(a).toLowerCase().trim() === target)) return true;
  }

  // 3. Generated doctor slug match (e.g. "dr-amitesh-agarwal")
  const doctorSlug = getDoctorSlug(doctor);
  if (doctorSlug && doctorSlug === target) return true;

  // 4. Slug without "dr-" prefix
  const targetWithoutDr = target.replace(/^dr-/, '');
  const slugWithoutDr = doctorSlug ? doctorSlug.replace(/^dr-/, '') : '';
  if (slugWithoutDr && slugWithoutDr === targetWithoutDr) return true;

  // 5. Clean name match (e.g. "amitesh-agarwal" or "amitesh-nagarwal")
  const cleanDocName = (doctor.name || '')
    .toLowerCase()
    .replace(/^(dr\.|dr|prof\.|prof|\(dr\.\))\s*/i, '')
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

  if (cleanDocName && (cleanDocName === target || cleanDocName === targetWithoutDr)) {
    return true;
  }

  // 6. Support minor surname spelling variations (e.g. agarwal vs nagarwal)
  const targetParts = targetWithoutDr.split('-');
  const docParts = cleanDocName.split('-');
  if (targetParts.length >= 2 && docParts.length >= 2) {
    if (targetParts[0] === docParts[0] && (targetParts[1].includes(docParts[1]) || docParts[1].includes(targetParts[1]))) {
      return true;
    }
  }

  return false;
}

