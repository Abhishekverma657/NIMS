// Helper to convert job titles into clean, shareable URL slugs
export const generateJobSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove special characters like /, (, ), &
    .trim()
    .replace(/\s+/g, '-')     // replace spaces with hyphens
    .replace(/-+/g, '-');     // remove duplicate hyphens
};

export const vacanciesData = [
  {
    id: "v1",
    slug: "staff-nurse-icu-ot-general-wards",
    title: "Staff Nurse (ICU / OT / General Wards)",
    department: "Nursing & Critical Care",
    category: "Nursing",
    type: "Full-Time",
    location: "NIMS Hospital, Jaipur Campus",
    experience: "1 - 5 Years",
    openings: 25,
    requiresCouncilReg: true,
    qualification: "B.Sc Nursing / GNM with RN / RM Council Registration",
    skills: ["Critical Care", "IV Cannulation", "Vitals Monitoring", "NABH Protocols", "Emergency Triage", "Infection Control"],
    description: "Responsible for patient care in ICU, Emergency, and Inpatient wards, monitoring vitals, medication administration, and compassionate bedside nursing in Rajasthan's premier 2,400-bed hospital.",
    responsibilities: [
      "Provide round-the-clock bedside patient care, intravenous medication administration, and critical vitals tracking.",
      "Manage critical life-support setups including ventilators, syringe pumps, cardiac monitors, and defibrillators.",
      "Strictly implement NABH nursing protocols, hand hygiene, and biomedical waste segregation.",
      "Coordinate admissions, inter-department transfers, shift handovers, and discharge medication counseling.",
      "Participate actively during code blues, CPR resuscitation, and rapid clinical escalation protocols."
    ],
    benefits: [
      "High clinical case exposure across 40+ medical & surgical specialities",
      "Subsidized hospital healthcare coverage for self and dependent family",
      "Furnished residential hostel & staff quarters on campus (Jaipur-Delhi NH-11C)",
      "Continuous Medical Education (CME), BLS/ACLS training, and university advancement"
    ]
  },
  {
    id: "v2",
    slug: "resident-doctor-md-ms-dnb",
    title: "Resident Doctor (MD / MS / DNB)",
    department: "General Medicine & Emergency",
    category: "Doctors",
    type: "Full-Time",
    location: "NIMS Hospital, Jaipur Campus",
    experience: "0 - 4 Years Post MD/MS",
    openings: 12,
    requiresCouncilReg: true,
    qualification: "MD / MS / DNB in General Medicine or Allied with MCI/NMC Registration",
    skills: ["Emergency Triage", "IPD Care", "Clinical Diagnosis", "Patient Counseling", "Critical Care Management"],
    description: "Provide comprehensive medical evaluations, coordinate clinical rounds, attend acute medical emergencies, and participate in teaching programs across tertiary medical wards.",
    responsibilities: [
      "Conduct daily inpatient ward rounds, clinical assessments, and evaluate treatment progress.",
      "Manage acute emergency admissions, trauma cases, and ICU consultations under senior faculty guidance.",
      "Supervise resident medical officers (RMOs), interns, and postgraduate clinical trainees.",
      "Ensure prompt and meticulous clinical documentation, investigation orders, and discharge summaries.",
      "Attend departmental clinical audits, mortality/morbidity meetings, and academic presentations."
    ],
    benefits: [
      "Unmatched quaternary clinical exposure in a 2,400+ bed medical university campus",
      "Competitive compensation package matching leading national healthcare institutions",
      "Campus faculty accommodation, dining amenities, and recreational sports club",
      "Access to high-impact research, indexed journals, and conference sponsorships"
    ]
  },
  {
    id: "v3",
    slug: "senior-pathology-lab-technician",
    title: "Senior Pathology Lab Technician",
    department: "Pathology & Biochemistry",
    category: "Allied Health",
    type: "Full-Time",
    location: "NIMS Hospital, Jaipur Campus",
    experience: "1 - 4 Years",
    openings: 8,
    requiresCouncilReg: true,
    qualification: "DMLT / BMLT from recognized state medical council institute",
    skills: ["Hematology", "Biochemistry", "Quality Control", "Automated Analyzers", "NABL Standards", "Blood Banking"],
    description: "Operating automated analyzers, processing hematology, biochemistry, and microbiology samples with high analytical precision in our NABL accredited laboratories.",
    responsibilities: [
      "Operate and calibrate automated biochemistry, hematology, and chemiluminescence analyzers.",
      "Maintain daily internal and external quality control (IQC/EQAS) records per NABL guidelines.",
      "Process urgent STAT samples from Emergency and ICUs with strict turn-around-time compliance.",
      "Verify critical panic test values and promptly notify treating consultants and ICU teams.",
      "Ensure proper biological specimen preservation, labeling, barcode management, and cold-chain storage."
    ],
    benefits: [
      "Hands-on work with state-of-the-art diagnostic machinery and automated tracks",
      "Structured career growth pathways and NABL accreditation audit training",
      "Transport facility and campus living amenities on Delhi-Jaipur highway",
      "Comprehensive healthcare benefits for self and direct dependents"
    ]
  },
  {
    id: "v4",
    slug: "ot-anesthesia-technician",
    title: "OT & Anesthesia Technician",
    department: "Surgical OT Services",
    category: "Allied Health",
    type: "Full-Time",
    location: "NIMS Hospital, Jaipur Campus",
    experience: "2 - 5 Years",
    openings: 6,
    requiresCouncilReg: false,
    qualification: "Diploma / B.Sc in Operation Theatre Technology",
    skills: ["Sterilization", "Anesthesia Assistance", "Laparoscopy Setup", "Cardiac OT", "Infection Control"],
    description: "Preparing modular operation theatres, assisting surgeons and anesthetists during complex tertiary surgical procedures including neuro, cardiac, and laparoscopic surgeries.",
    responsibilities: [
      "Prepare modular surgical suites, sterile drapes, surgical trays, and specialized laparoscopic towers.",
      "Assist consultant anesthesiologists in endotracheal intubations, spinal blocks, and gas pipeline checks.",
      "Maintain strict sterility monitoring, autoclave records, and infection control protocols in operating rooms.",
      "Ensure proper functioning of electrocautery units, heart-lung bypass setups, and surgical monitors.",
      "Manage surgical specimen tagging, safe disposal, and post-operative theatre turnover."
    ],
    benefits: [
      "Experience with advanced tertiary surgeries (Cath lab, Neuro, Organ Transplants)",
      "Attractive pay scale with overtime incentives and surgical allowances",
      "Full family healthcare coverage at NIMS Multi-Speciality Hospital",
      "Campus quarters and dining facilities"
    ]
  },
  {
    id: "v5",
    slug: "clinical-pharmacist",
    title: "Clinical Pharmacist",
    department: "Pharmacy & Hospital Formulary",
    category: "Pharmacy",
    type: "Full-Time",
    location: "NIMS Hospital, Jaipur Campus",
    experience: "1 - 3 Years",
    openings: 5,
    requiresCouncilReg: true,
    qualification: "B.Pharm / M.Pharm / Pharm.D with State Pharmacy Council Registration",
    skills: ["Dispensing", "Drug Interactions", "Inventory Management", "NABH Documentation", "Formulary Review"],
    description: "Inpatient and OPD drug dispensing, auditing prescription compliance, and maintaining hospital pharmacy inventory in central hospital dispensaries.",
    responsibilities: [
      "Review physician medication orders to prevent adverse drug interactions, contraindications, and dose errors.",
      "Manage round-the-clock dispensing for critical inpatient wards, ICUs, and 24x7 emergency pharmacies.",
      "Conduct regular physical inventory audits, track expiry dates, and manage cold-chain biologics.",
      "Ensure strict compliance with Schedule X, H, and NDPS high-alert narcotics regulations.",
      "Counsel discharged patients regarding medicine dosages, routes, and dietary restrictions."
    ],
    benefits: [
      "Exposure to hospital formulary management and clinical pharmacovigilance",
      "Recognized work culture with modern computerized Hospital Information Systems (HIS)",
      "Comprehensive medical cover and subsidized pharmacy perks",
      "Campus residence and transport facilities"
    ]
  },
  {
    id: "v6",
    slug: "front-desk-executive-patient-experience-officer",
    title: "Front Desk Executive & Patient Experience Officer",
    department: "Hospital Administration",
    category: "Administration",
    type: "Full-Time",
    location: "NIMS Hospital, Jaipur Campus",
    experience: "1 - 3 Years",
    openings: 6,
    requiresCouncilReg: false,
    qualification: "Graduate / BBA / MHA with fluent English & Hindi communication",
    skills: ["HIS Software", "Patient Delight", "Billing Coordination", "Queue Management", "Public Relations"],
    description: "Welcoming patients and family members, managing OPD queue registrations, handling telephone inquiries, and delivering high patient delight across admission desks.",
    responsibilities: [
      "Welcome OPD and IPD patients, register patient demographics in Hospital Information System (HIS).",
      "Coordinate appointment schedules, doctor OPD tokens, and billing desk handoffs.",
      "Guide patients regarding central and state government healthcare schemes (RGHS, Ayushman Bharat, MAA Yojana).",
      "Address patient inquiries, handle telephone call board routing, and resolve attendant feedback.",
      "Maintain a warm, patient-first atmosphere reflecting NIMS Hospital service excellence."
    ],
    benefits: [
      "Professional corporate healthcare administrative exposure",
      "Continuous training on customer experience, communication, and hospital software",
      "Free medical checkups and subsidized treatment for family members",
      "Dynamic career progression into hospital operations and healthcare management"
    ]
  }
];
