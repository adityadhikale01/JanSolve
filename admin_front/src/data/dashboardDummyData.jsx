/* =========================================================
   JAN SOLVE
   ADMIN DASHBOARD DUMMY DATA

   NOTE:
   This dataset is for UI/demo development.
   Values are illustrative and are NOT official statistics.
========================================================= */


/* =========================================================
   OVERALL DASHBOARD STATS
========================================================= */

export const dashboardStats = {
  totalReports: 1248,
  pendingReview: 143,
  validatedReports: 891,
  masterProblems: 312,
  activeProjects: 86,
  solutionsDeployed: 27,
};


/* =========================================================
   PROBLEM INNOVATION PIPELINE
========================================================= */

export const problemPipeline = [
  {
    key: "submitted",
    label: "Submitted",
    value: 1248,
  },

  {
    key: "underReview",
    label: "Under Review",
    value: 143,
  },

  {
    key: "validated",
    label: "Validated",
    value: 891,
  },

  {
    key: "masterProblems",
    label: "Master Problems",
    value: 312,
  },

  {
    key: "assigned",
    label: "Assigned",
    value: 174,
  },

  {
    key: "activeProjects",
    label: "Active Projects",
    value: 86,
  },

  {
    key: "deployed",
    label: "Deployed",
    value: 27,
  },
];


/* =========================================================
   PROBLEMS BY DOMAIN
========================================================= */

export const domainData = [
  {
    name: "Water & Sanitation",
    count: 218,
    percentage: 17.5,
  },

  {
    name: "Infrastructure",
    count: 196,
    percentage: 15.7,
  },

  {
    name: "Education",
    count: 174,
    percentage: 13.9,
  },

  {
    name: "Healthcare",
    count: 143,
    percentage: 11.5,
  },

  {
    name: "Agriculture",
    count: 137,
    percentage: 11.0,
  },

  {
    name: "Environment",
    count: 102,
    percentage: 8.2,
  },

  {
    name: "Energy",
    count: 78,
    percentage: 6.3,
  },

  {
    name: "Accessibility",
    count: 75,
    percentage: 6.0,
  },

  {
    name: "Public Administration",
    count: 65,
    percentage: 5.2,
  },

  {
    name: "Rural Livelihoods",
    count: 60,
    percentage: 4.8,
  },
];


/* =========================================================
   MAHARASHTRA CITY PROBLEM DISTRIBUTION
=========================================================

   Total = 1248

   These are illustrative demo numbers.
========================================================= */

export const cityProblemData = [
  {
    id: "mumbai",
    city: "Mumbai",
    district: "Mumbai",
    reports: 220,

    latitude: 19.076,
    longitude: 72.8777,

    masterProblems: 58,

    topDomain: "Infrastructure",

    severity: "high",
  },

  {
    id: "pune",
    city: "Pune",
    district: "Pune",
    reports: 185,

    latitude: 18.5204,
    longitude: 73.8567,

    masterProblems: 49,

    topDomain: "Education",

    severity: "high",
  },

  {
    id: "nagpur",
    city: "Nagpur",
    district: "Nagpur",
    reports: 125,

    latitude: 21.1458,
    longitude: 79.0882,

    masterProblems: 32,

    topDomain: "Water & Sanitation",

    severity: "medium",
  },

  {
    id: "thane",
    city: "Thane",
    district: "Thane",
    reports: 120,

    latitude: 19.2183,
    longitude: 72.9781,

    masterProblems: 29,

    topDomain: "Infrastructure",

    severity: "high",
  },

  {
    id: "nashik",
    city: "Nashik",
    district: "Nashik",
    reports: 110,

    latitude: 20.0059,
    longitude: 73.791,

    masterProblems: 27,

    topDomain: "Water & Sanitation",

    severity: "medium",
  },

  {
    id: "chhatrapati-sambhajinagar",
    city: "Chhatrapati Sambhajinagar",
    district: "Chhatrapati Sambhajinagar",
    reports: 85,

    latitude: 19.8762,
    longitude: 75.3433,

    masterProblems: 22,

    topDomain: "Infrastructure",

    severity: "medium",
  },

  {
    id: "solapur",
    city: "Solapur",
    district: "Solapur",
    reports: 80,

    latitude: 17.6599,
    longitude: 75.9064,

    masterProblems: 19,

    topDomain: "Water & Sanitation",

    severity: "high",
  },

  {
    id: "kolhapur",
    city: "Kolhapur",
    district: "Kolhapur",
    reports: 65,

    latitude: 16.705,
    longitude: 74.2433,

    masterProblems: 16,

    topDomain: "Agriculture",

    severity: "medium",
  },

  {
    id: "amravati",
    city: "Amravati",
    district: "Amravati",
    reports: 60,

    latitude: 20.9374,
    longitude: 77.7796,

    masterProblems: 15,

    topDomain: "Agriculture",

    severity: "medium",
  },

  {
    id: "nanded",
    city: "Nanded",
    district: "Nanded",
    reports: 52,

    latitude: 19.1383,
    longitude: 77.321,

    masterProblems: 13,

    topDomain: "Healthcare",

    severity: "medium",
  },

  {
    id: "sangli",
    city: "Sangli",
    district: "Sangli",
    reports: 48,

    latitude: 16.8524,
    longitude: 74.5815,

    masterProblems: 12,

    topDomain: "Agriculture",

    severity: "low",
  },

  {
    id: "jalgaon",
    city: "Jalgaon",
    district: "Jalgaon",
    reports: 45,

    latitude: 21.0077,
    longitude: 75.5626,

    masterProblems: 11,

    topDomain: "Agriculture",

    severity: "medium",
  },

  {
    id: "satara",
    city: "Satara",
    district: "Satara",
    reports: 28,

    latitude: 17.6805,
    longitude: 74.0183,

    masterProblems: 6,

    topDomain: "Agriculture",

    severity: "low",
  },

  {
    id: "ahilyanagar",
    city: "Ahilyanagar",
    district: "Ahilyanagar",
    reports: 25,

    latitude: 19.0952,
    longitude: 74.7496,

    masterProblems: 6,

    topDomain: "Water & Sanitation",

    severity: "low",
  },
];


/* =========================================================
   TOP DISTRICTS / CITIES
========================================================= */

export const districtData = cityProblemData
  .slice()
  .sort((a, b) => b.reports - a.reports)
  .map((city) => ({
    district: city.district,
    reports: city.reports,
    masterProblems: city.masterProblems,
  }));


/* =========================================================
   AI INTELLIGENCE
========================================================= */

export const aiInsights = {
  reportsProcessed: 1124,

  autoCategorized: 1087,

  duplicateReports: 217,

  problemClusters: 48,

  averageConfidence: 91.6,

  manualReviewRequired: 37,
};


/* =========================================================
   ADMIN ATTENTION
========================================================= */

export const attentionReports = [
  {
    id: "RPT-1048",

    title: "Unsafe drinking water near community school",

    district: "Pune",

    domain: "Water & Sanitation",

    priority: "Critical",

    status: "Pending Review",

    age: "18 min ago",
  },

  {
    id: "RPT-1042",

    title: "Large pothole near college entrance",

    district: "Nashik",

    domain: "Infrastructure",

    priority: "High",

    status: "Pending Review",

    age: "42 min ago",
  },

  {
    id: "RPT-1037",

    title: "Streetlights not working in residential area",

    district: "Nagpur",

    domain: "Energy",

    priority: "High",

    status: "Needs Verification",

    age: "1 hr ago",
  },

  {
    id: "RPT-1031",

    title: "Waste accumulation near weekly market",

    district: "Mumbai",

    domain: "Environment",

    priority: "Medium",

    status: "AI Review",

    age: "2 hrs ago",
  },

  {
    id: "RPT-1028",

    title: "School lacks accessible toilet facilities",

    district: "Solapur",

    domain: "Accessibility",

    priority: "High",

    status: "Pending Review",

    age: "3 hrs ago",
  },
];


/* =========================================================
   RECENT MASTER PROBLEMS
========================================================= */

export const recentMasterProblems = [
  {
    id: "MP-0312",

    title: "Water contamination in Ward 8",

    reports: 12,

    district: "Pune",

    priority: "High",
  },

  {
    id: "MP-0311",

    title: "Pothole cluster near college road",

    reports: 8,

    district: "Nashik",

    priority: "High",
  },

  {
    id: "MP-0310",

    title: "Streetlight failures in residential area",

    reports: 17,

    district: "Nagpur",

    priority: "Medium",
  },

  {
    id: "MP-0309",

    title: "Waste management around market area",

    reports: 9,

    district: "Mumbai",

    priority: "High",
  },

  {
    id: "MP-0308",

    title: "School infrastructure accessibility issues",

    reports: 14,

    district: "Solapur",

    priority: "Medium",
  },
];


/* =========================================================
   INNOVATION NETWORK
========================================================= */

export const innovationNetwork = {
  universities: 32,

  activeInstitutions: 24,

  facultyMentors: 147,

  studentParticipants: 624,
};


/* =========================================================
   SOCIAL IMPACT
========================================================= */

export const socialImpact = {
  peopleBenefited: 42800,

  communitiesReached: 136,

  solutionsDeployed: 27,

  districtsImpacted: 14,

  startupsCreated: 4,

  patentsFiled: 7,
};