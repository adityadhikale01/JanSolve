// seed/data.js

/*
  IMPORTANT:
  These are SYNTHETIC development/demo records.

  They are designed around realistic Jharkhand
  locations and documented societal problem themes.

  They are NOT real citizen complaints.
*/


// ============================================================
// MASTER PROBLEMS
// ============================================================

export const masterProblems = [

  // ----------------------------------------------------------
  // 1. WATER
  // ----------------------------------------------------------

  {
    key: "water-supply-simdega",

    title:
      "Unreliable Drinking Water Supply in Rural Simdega Villages",

    summary:
      "Multiple rural settlements in the Simdega region experience unreliable household water supply and dependence on community hand pumps during periods of reduced availability. The challenge involves supply reliability, source sustainability and maintenance of local water infrastructure.",

    domain: "Water Resources",

    subdomain: "Rural Drinking Water",

    problemType: "Water Supply Reliability",

    location: {
      type: "Point",
      coordinates: [84.511, 22.615],
      address: "Simdega district, Jharkhand",
    },

    status: "active",

    severity: "high",
  },


  // ----------------------------------------------------------
  // 2. AGRICULTURE
  // ----------------------------------------------------------

  {
    key: "agriculture-irrigation-gumla",

    title:
      "Low Farm Productivity Due to Limited Irrigation in Gumla",

    summary:
      "Small and marginal farmers in parts of Gumla remain highly dependent on rainfall. Limited irrigation infrastructure, seasonal water availability and difficulty accessing farm technologies constrain crop productivity and diversification.",

    domain: "Agriculture",

    subdomain: "Irrigation and Farm Productivity",

    problemType: "Rainfall Dependency",

    location: {
      type: "Point",
      coordinates: [84.537, 23.043],
      address: "Gumla district, Jharkhand",
    },

    status: "active",

    severity: "critical",
  },


  // ----------------------------------------------------------
  // 3. HEALTHCARE
  // ----------------------------------------------------------

  {
    key: "healthcare-latehar",

    title:
      "Limited Access to Primary Healthcare in Remote Latehar Villages",

    summary:
      "Residents of remote and forest-adjacent settlements face difficulty reaching primary healthcare services because of long travel distances, limited transport availability and poor accessibility during emergencies.",

    domain: "Healthcare",

    subdomain: "Primary Healthcare",

    problemType: "Healthcare Accessibility",

    location: {
      type: "Point",
      coordinates: [84.888, 23.744],
      address: "Latehar district, Jharkhand",
    },

    status: "active",

    severity: "high",
  },


  // ----------------------------------------------------------
  // 4. EDUCATION
  // ----------------------------------------------------------

  {
    key: "education-dumka",

    title:
      "Digital Learning and Internet Connectivity Gap in Rural Dumka Schools",

    summary:
      "Rural schools face difficulties in consistently using digital learning resources because of limited ICT infrastructure, device availability and unreliable internet connectivity.",

    domain: "Education",

    subdomain: "Digital Education",

    problemType: "ICT Infrastructure Gap",

    location: {
      type: "Point",
      coordinates: [87.25, 24.27],
      address: "Dumka district, Jharkhand",
    },

    status: "active",

    severity: "moderate",
  },


  // ----------------------------------------------------------
  // 5. LIVELIHOODS
  // ----------------------------------------------------------

  {
    key: "livelihoods-pakur",

    title:
      "Limited Market Access for Rural Artisans and Forest-Based Livelihoods in Pakur",

    summary:
      "Small producers, artisans and households dependent on local livelihood activities face difficulties reaching larger markets, accessing reliable price information and establishing consistent buyer connections.",

    domain: "Rural Livelihoods",

    subdomain: "Market Access",

    problemType: "Market Connectivity",

    location: {
      type: "Point",
      coordinates: [87.85, 24.63],
      address: "Pakur district, Jharkhand",
    },

    status: "active",

    severity: "high",
  },


  // ----------------------------------------------------------
  // 6. ENVIRONMENT / HUMAN-WILDLIFE
  // ----------------------------------------------------------

  {
    key: "human-elephant-conflict-east-singhbhum",

    title:
      "Recurring Human-Elephant Conflict Affecting Forest-Edge Communities",

    summary:
      "Forest-edge settlements face recurring encounters between people and elephants, creating risks to crops, homes, livelihoods and human safety. Communities require better early warning, communication and preventive response mechanisms.",

    domain: "Environment",

    subdomain: "Human-Wildlife Conflict",

    problemType: "Human-Elephant Conflict",

    location: {
      type: "Point",
      coordinates: [86.202, 22.804],
      address: "East Singhbhum district, Jharkhand",
    },

    status: "active",

    severity: "critical",
  },


  // ----------------------------------------------------------
  // 7. SANITATION
  // ----------------------------------------------------------

  {
    key: "sanitation-ranchi-periphery",

    title:
      "Unmanaged Solid Waste Accumulation in Peri-Urban Ranchi Settlements",

    summary:
      "Rapidly growing settlements around Ranchi face localized waste accumulation because of irregular collection, insufficient segregation and limited community-level waste management infrastructure.",

    domain: "Sanitation",

    subdomain: "Solid Waste Management",

    problemType: "Waste Collection and Segregation",

    location: {
      type: "Point",
      coordinates: [85.34, 23.39],
      address: "Peri-urban Ranchi, Jharkhand",
    },

    status: "active",

    severity: "moderate",
  },
    // ----------------------------------------------------------
  // 8. FOREST / LIVELIHOOD — SARAIKELA-KHARSAWAN
  // ----------------------------------------------------------

  {
    key: "forest-livelihood-saraikela",

    title:
      "Unstable Forest-Based Livelihoods in Forest-Dependent Villages",

    summary:
      "Forest-dependent households face difficulties in accessing organized markets, storage facilities and value-addition opportunities for minor forest produce, limiting household income.",

    domain: "Rural Livelihoods",

    subdomain: "Forest Produce",

    problemType: "Value Chain and Market Access",

    location: {
      type: "Point",
      coordinates: [85.97, 22.70],
      address: "Seraikela-Kharsawan district, Jharkhand",
    },

    status: "active",

    severity: "high",
  },


  // ----------------------------------------------------------
  // 9. WATER / QUALITY — EAST SINGHBHUM
  // ----------------------------------------------------------

  {
    key: "water-quality-east-singhbhum",

    title:
      "Drinking Water Quality Concerns in Rural Settlements",

    summary:
      "Some rural communities depend heavily on local groundwater and hand pumps and report concerns regarding water quality, testing availability and timely maintenance of drinking-water sources.",

    domain: "Water Resources",

    subdomain: "Water Quality",

    problemType: "Drinking Water Quality",

    location: {
      type: "Point",
      coordinates: [86.18, 22.76],
      address: "Rural East Singhbhum, Jharkhand",
    },

    status: "active",

    severity: "high",
  },


  // ----------------------------------------------------------
  // 10. TRANSPORT — CHATRA
  // ----------------------------------------------------------

  {
    key: "rural-transport-chatra",

    title:
      "Limited Rural Transport Connectivity Affecting Access to Services",

    summary:
      "Residents of remote settlements face difficulty reaching markets, schools, healthcare facilities and government offices because affordable and reliable transport options are limited.",

    domain: "Accessibility",

    subdomain: "Rural Mobility",

    problemType: "Transport Connectivity",

    location: {
      type: "Point",
      coordinates: [84.87, 24.21],
      address: "Chatra district, Jharkhand",
    },

    status: "active",

    severity: "high",
  },


  // ----------------------------------------------------------
  // 11. ENERGY — WEST SINGHBHUM
  // ----------------------------------------------------------

  {
    key: "energy-west-singhbhum",

    title:
      "Unreliable Electricity Supply Affecting Rural Services",

    summary:
      "Some remote settlements experience interruptions in electricity supply that affect household activities, small businesses, education and access to digital services.",

    domain: "Energy",

    subdomain: "Rural Electrification",

    problemType: "Power Supply Reliability",

    location: {
      type: "Point",
      coordinates: [85.37, 22.56],
      address: "West Singhbhum district, Jharkhand",
    },

    status: "active",

    severity: "moderate",
  },


  // ----------------------------------------------------------
  // 12. URBAN INFRASTRUCTURE — DHANBAD
  // ----------------------------------------------------------

  {
    key: "urban-drainage-dhanbad",

    title:
      "Urban Drainage and Waterlogging in Dhanbad Localities",

    summary:
      "Several built-up localities experience localized waterlogging during intense rainfall because drainage capacity and maintenance are insufficient for existing runoff conditions.",

    domain: "Urban Development",

    subdomain: "Drainage",

    problemType: "Urban Waterlogging",

    location: {
      type: "Point",
      coordinates: [86.45, 23.80],
      address: "Dhanbad district, Jharkhand",
    },

    status: "active",

    severity: "high",
  },


  // ----------------------------------------------------------
  // 13. AGRICULTURE — KHUNTI
  // ----------------------------------------------------------

  {
    key: "postharvest-khunti",

    title:
      "Post-Harvest Losses and Weak Market Linkages for Small Farmers",

    summary:
      "Small farmers face difficulties in storing and transporting perishable agricultural produce, resulting in distress sales and post-harvest losses.",

    domain: "Agriculture",

    subdomain: "Post-Harvest Management",

    problemType: "Storage and Market Linkage",

    location: {
      type: "Point",
      coordinates: [85.27, 23.08],
      address: "Khunti district, Jharkhand",
    },

    status: "active",

    severity: "high",
  },


  // ----------------------------------------------------------
  // 14. EDUCATION — WEST SINGHBHUM
  // ----------------------------------------------------------

  {
    key: "school-attendance-west-singhbhum",

    title:
      "Difficulty Maintaining Regular School Attendance in Remote Settlements",

    summary:
      "Schools serving remote communities face attendance challenges associated with distance, seasonal livelihood activities, transport constraints and household responsibilities.",

    domain: "Education",

    subdomain: "School Access",

    problemType: "Attendance and Accessibility",

    location: {
      type: "Point",
      coordinates: [85.39, 22.59],
      address: "West Singhbhum district, Jharkhand",
    },

    status: "active",

    severity: "moderate",
  },


  // ----------------------------------------------------------
  // 15. PUBLIC ADMINISTRATION — GIRIDIH
  // ----------------------------------------------------------

  {
    key: "public-services-giridih",

    title:
      "Difficulty Accessing Government Services in Remote Giridih Areas",

    summary:
      "Residents in remote areas face difficulties travelling to service centres and tracking the status of applications for selected public services.",

    domain: "Public Administration",

    subdomain: "Citizen Services",

    problemType: "Service Accessibility",

    location: {
      type: "Point",
      coordinates: [86.30, 24.19],
      address: "Giridih district, Jharkhand",
    },

    status: "active",

    severity: "moderate",
  },
];


// ============================================================
// REPORTS
// ============================================================

export const reports = [

  // ==========================================================
  // MASTER PROBLEM 1
  // WATER — SIMDEGA
  // ==========================================================

  {
    key: "simdega-water-001",

    description:
      "Our village pipeline supplies water irregularly. For several days at a time households depend on the nearby hand pump for drinking water.",

    impact: {
      affectedRange: "100_plus",
    },

    duration: "more_than_month",

    urgency: "urgent",

    location: {
      type: "Point",
      coordinates: [84.508, 22.618],
      address: "Rural settlement near Simdega town, Simdega district",
    },

    status: "verified",

    classification: {
      domain: "Water Resources",
      subdomain: "Rural Drinking Water",
      problemType: "Water Supply Reliability",
      confidence: 0.96,
    },

    masterProblemKey: "water-supply-simdega",
  },


  {
    key: "simdega-water-002",

    description:
      "The community hand pump is being used by many households because piped water is not available consistently. During busy hours people have to wait for water.",

    impact: {
      affectedRange: "100_plus",
    },

    duration: "more_than_month",

    urgency: "attention",

    location: {
      type: "Point",
      coordinates: [84.516, 22.611],
      address: "Village settlement, Simdega district",
    },

    status: "verified",

    classification: {
      domain: "Water Resources",
      subdomain: "Rural Drinking Water",
      problemType: "Water Accessibility",
      confidence: 0.92,
    },

    masterProblemKey: "water-supply-simdega",
  },


  {
    key: "simdega-water-003",

    description:
      "The village water infrastructure frequently needs repair. When the pump or pipeline develops a fault, the community waits several days before the supply is restored.",

    impact: {
      affectedRange: "50_100",
    },

    duration: "more_than_month",

    urgency: "urgent",

    location: {
      type: "Point",
      coordinates: [84.503, 22.621],
      address: "Rural Simdega district",
    },

    status: "verified",

    classification: {
      domain: "Water Resources",
      subdomain: "Rural Drinking Water",
      problemType: "Infrastructure Maintenance",
      confidence: 0.94,
    },

    masterProblemKey: "water-supply-simdega",
  },


  // ==========================================================
  // MASTER PROBLEM 2
  // AGRICULTURE — GUMLA
  // ==========================================================

  {
    key: "gumla-agriculture-001",

    description:
      "Most farmers in our area depend on rainfall for cultivation. When rainfall is delayed, farmers are unable to sow crops on time.",

    impact: {
      affectedRange: "100_plus",
    },

    duration: "more_than_month",

    urgency: "urgent",

    location: {
      type: "Point",
      coordinates: [84.531, 23.049],
      address: "Village near Gumla, Jharkhand",
    },

    status: "verified",

    classification: {
      domain: "Agriculture",
      subdomain: "Irrigation and Farm Productivity",
      problemType: "Rainfall Dependency",
      confidence: 0.97,
    },

    masterProblemKey: "agriculture-irrigation-gumla",
  },


  {
    key: "gumla-agriculture-002",

    description:
      "There is no reliable irrigation source for our farmland. Farmers mainly cultivate during the rainy season and leave parts of their land unused during the dry period.",

    impact: {
      affectedRange: "100_plus",
    },

    duration: "more_than_month",

    urgency: "urgent",

    location: {
      type: "Point",
      coordinates: [84.544, 23.038],
      address: "Rural Gumla district",
    },

    status: "verified",

    classification: {
      domain: "Agriculture",
      subdomain: "Irrigation and Farm Productivity",
      problemType: "Irrigation Gap",
      confidence: 0.96,
    },

    masterProblemKey: "agriculture-irrigation-gumla",
  },


  {
    key: "gumla-agriculture-003",

    description:
      "Small farmers are interested in using better irrigation and farm equipment but individual farmers cannot afford the equipment and do not know where shared machinery is available.",

    impact: {
      affectedRange: "50_100",
    },

    duration: "more_than_month",

    urgency: "attention",

    location: {
      type: "Point",
      coordinates: [84.526, 23.056],
      address: "Gumla district",
    },

    status: "verified",

    classification: {
      domain: "Agriculture",
      subdomain: "Irrigation and Farm Productivity",
      problemType: "Farm Technology Accessibility",
      confidence: 0.91,
    },

    masterProblemKey: "agriculture-irrigation-gumla",
  },


  {
    key: "gumla-agriculture-004",

    description:
      "Farmers have difficulty deciding which crops to grow after the monsoon because there is limited access to local irrigation and reliable agricultural advisory information.",

    impact: {
      affectedRange: "50_100",
    },

    duration: "more_than_month",

    urgency: "attention",

    location: {
      type: "Point",
      coordinates: [84.55, 23.031],
      address: "Gumla rural area",
    },

    status: "verified",

    classification: {
      domain: "Agriculture",
      subdomain: "Farm Advisory",
      problemType: "Agricultural Information Gap",
      confidence: 0.88,
    },

    masterProblemKey: "agriculture-irrigation-gumla",
  },


  // ==========================================================
  // MASTER PROBLEM 3
  // HEALTHCARE — LATEHAR
  // ==========================================================

  {
    key: "latehar-health-001",

    description:
      "Residents of our remote settlement have to travel a long distance to reach a healthcare centre. This becomes difficult for elderly people and pregnant women.",

    impact: {
      affectedRange: "100_plus",
    },

    duration: "more_than_month",

    urgency: "urgent",

    location: {
      type: "Point",
      coordinates: [84.874, 23.758],
      address: "Remote village, Latehar district",
    },

    status: "verified",

    classification: {
      domain: "Healthcare",
      subdomain: "Primary Healthcare",
      problemType: "Healthcare Accessibility",
      confidence: 0.97,
    },

    masterProblemKey: "healthcare-latehar",
  },


  {
    key: "latehar-health-002",

    description:
      "During emergencies it is difficult to arrange transportation to the nearest health facility. Families sometimes depend on private vehicles or informal transport.",

    impact: {
      affectedRange: "50_100",
    },

    duration: "more_than_month",

    urgency: "urgent",

    location: {
      type: "Point",
      coordinates: [84.901, 23.731],
      address: "Rural Latehar district",
    },

    status: "verified",

    classification: {
      domain: "Healthcare",
      subdomain: "Emergency Healthcare",
      problemType: "Emergency Transport",
      confidence: 0.94,
    },

    masterProblemKey: "healthcare-latehar",
  },


  {
    key: "latehar-health-003",

    description:
      "People from remote villages sometimes postpone visiting a doctor because the travel distance and transport cost are high compared with the severity of the initial symptoms.",

    impact: {
      affectedRange: "100_plus",
    },

    duration: "more_than_month",

    urgency: "attention",

    location: {
      type: "Point",
      coordinates: [84.862, 23.747],
      address: "Forest-edge settlement, Latehar district",
    },

    status: "verified",

    classification: {
      domain: "Healthcare",
      subdomain: "Primary Healthcare",
      problemType: "Access and Affordability",
      confidence: 0.91,
    },

    masterProblemKey: "healthcare-latehar",
  },


  // ==========================================================
  // MASTER PROBLEM 4
  // EDUCATION — DUMKA
  // ==========================================================

  {
    key: "dumka-education-001",

    description:
      "The school has some digital learning equipment but unreliable internet connectivity makes it difficult for teachers to use online educational resources regularly.",

    impact: {
      affectedRange: "50_100",
    },

    duration: "more_than_month",

    urgency: "attention",

    location: {
      type: "Point",
      coordinates: [87.247, 24.275],
      address: "Rural school area, Dumka district",
    },

    status: "verified",

    classification: {
      domain: "Education",
      subdomain: "Digital Education",
      problemType: "Internet Connectivity",
      confidence: 0.95,
    },

    masterProblemKey: "education-dumka",
  },


  {
    key: "dumka-education-002",

    description:
      "Students do not have equal access to digital devices at home. Teachers find it difficult to continue technology-supported learning outside school.",

    impact: {
      affectedRange: "100_plus",
    },

    duration: "more_than_month",

    urgency: "attention",

    location: {
      type: "Point",
      coordinates: [87.263, 24.264],
      address: "Dumka rural area",
    },

    status: "verified",

    classification: {
      domain: "Education",
      subdomain: "Digital Education",
      problemType: "Device Accessibility",
      confidence: 0.93,
    },

    masterProblemKey: "education-dumka",
  },


  {
    key: "dumka-education-003",

    description:
      "Teachers have limited technical support when digital classroom equipment stops working, so the equipment sometimes remains unused until maintenance is arranged.",

    impact: {
      affectedRange: "50_100",
    },

    duration: "more_than_month",

    urgency: "normal",

    location: {
      type: "Point",
      coordinates: [87.258, 24.281],
      address: "Rural Dumka school cluster",
    },

    status: "verified",

    classification: {
      domain: "Education",
      subdomain: "Digital Education",
      problemType: "ICT Maintenance",
      confidence: 0.9,
    },

    masterProblemKey: "education-dumka",
  },


  // ==========================================================
  // MASTER PROBLEM 5
  // RURAL LIVELIHOODS — PAKUR
  // ==========================================================

  {
    key: "pakur-livelihood-001",

    description:
      "Local producers have difficulty finding buyers outside nearby markets. Most sales happen through local intermediaries and producers have limited information about market prices.",

    impact: {
      affectedRange: "50_100",
    },

    duration: "more_than_month",

    urgency: "attention",

    location: {
      type: "Point",
      coordinates: [87.842, 24.636],
      address: "Pakur district, Jharkhand",
    },

    status: "verified",

    classification: {
      domain: "Rural Livelihoods",
      subdomain: "Market Access",
      problemType: "Market Connectivity",
      confidence: 0.94,
    },

    masterProblemKey: "livelihoods-pakur",
  },


  {
    key: "pakur-livelihood-002",

    description:
      "Small producers do not have a simple way to compare prices offered by different buyers. This reduces their ability to negotiate better prices.",

    impact: {
      affectedRange: "50_100",
    },

    duration: "more_than_month",

    urgency: "attention",

    location: {
      type: "Point",
      coordinates: [87.861, 24.622],
      address: "Rural Pakur district",
    },

    status: "verified",

    classification: {
      domain: "Rural Livelihoods",
      subdomain: "Market Access",
      problemType: "Price Information Gap",
      confidence: 0.92,
    },

    masterProblemKey: "livelihoods-pakur",
  },


  // ==========================================================
  // MASTER PROBLEM 6
  // HUMAN-ELEPHANT CONFLICT — EAST SINGHBHUM
  // ==========================================================

  {
    key: "elephant-conflict-001",

    description:
      "Residents of a forest-edge settlement report elephants entering agricultural areas during certain periods, damaging crops and creating fear among families travelling outside after dark.",

    impact: {
      affectedRange: "50_100",
    },

    duration: "more_than_month",

    urgency: "urgent",

    location: {
      type: "Point",
      coordinates: [86.198, 22.811],
      address: "Forest-edge village, East Singhbhum district",
    },

    status: "verified",

    classification: {
      domain: "Environment",
      subdomain: "Human-Wildlife Conflict",
      problemType: "Human-Elephant Conflict",
      confidence: 0.97,
    },

    masterProblemKey: "human-elephant-conflict-east-singhbhum",
  },


  {
    key: "elephant-conflict-002",

    description:
      "Farmers in our area are worried about crop damage caused by elephant movement. People often depend on word-of-mouth information about elephant locations.",

    impact: {
      affectedRange: "100_plus",
    },

    duration: "more_than_month",

    urgency: "urgent",

    location: {
      type: "Point",
      coordinates: [86.214, 22.795],
      address: "Rural East Singhbhum district",
    },

    status: "verified",

    classification: {
      domain: "Environment",
      subdomain: "Human-Wildlife Conflict",
      problemType: "Crop Damage",
      confidence: 0.95,
    },

    masterProblemKey: "human-elephant-conflict-east-singhbhum",
  },


  {
    key: "elephant-conflict-003",

    description:
      "Community members need faster warnings when elephants are reported near roads or settlements because people frequently travel between villages in the evening.",

    impact: {
      affectedRange: "100_plus",
    },

    duration: "more_than_month",

    urgency: "urgent",

    location: {
      type: "Point",
      coordinates: [86.189, 22.823],
      address: "Forest fringe area, East Singhbhum district",
    },

    status: "verified",

    classification: {
      domain: "Environment",
      subdomain: "Human-Wildlife Conflict",
      problemType: "Early Warning Gap",
      confidence: 0.96,
    },

    masterProblemKey: "human-elephant-conflict-east-singhbhum",
  },


  // ==========================================================
  // MASTER PROBLEM 7
  // SANITATION — RANCHI
  // ==========================================================

  {
    key: "ranchi-waste-001",

    description:
      "Waste accumulates near a peri-urban market after collection vehicles do not arrive regularly. Mixed waste is often left at the roadside.",

    impact: {
      affectedRange: "100_plus",
    },

    duration: "1_4_weeks",

    urgency: "attention",

    location: {
      type: "Point",
      coordinates: [85.344, 23.394],
      address: "Peri-urban market area, Ranchi",
    },

    status: "verified",

    classification: {
      domain: "Sanitation",
      subdomain: "Solid Waste Management",
      problemType: "Irregular Waste Collection",
      confidence: 0.94,
    },

    masterProblemKey: "sanitation-ranchi-periphery",
  },


  {
    key: "ranchi-waste-002",

    description:
      "Households in our locality generally mix wet and dry waste because there are no convenient collection or segregation points nearby.",

    impact: {
      affectedRange: "100_plus",
    },

    duration: "more_than_month",

    urgency: "attention",

    location: {
      type: "Point",
      coordinates: [85.337, 23.386],
      address: "Peri-urban Ranchi settlement",
    },

    status: "verified",

    classification: {
      domain: "Sanitation",
      subdomain: "Solid Waste Management",
      problemType: "Waste Segregation",
      confidence: 0.92,
    },

    masterProblemKey: "sanitation-ranchi-periphery",
  },


  // ==========================================================
  // UNLINKED REPORTS
  // THESE ARE IMPORTANT FOR TESTING THE ADMIN UI
  // ==========================================================

  {
    key: "unlinked-001",

    description:
      "A village road becomes difficult to use after heavy rainfall because water remains on the road surface for several hours.",

    impact: {
      affectedRange: "50_100",
    },

    duration: "few_days",

    urgency: "attention",

    location: {
      type: "Point",
      coordinates: [85.42, 23.31],
      address: "Rural Ranchi district",
    },

    status: "verified",

    classification: {
      domain: "Urban Development",
      subdomain: "Road Infrastructure",
      problemType: "Waterlogging",
      confidence: 0.89,
    },

    // Deliberately not linked
    masterProblemKey: null,
  },


  {
    key: "unlinked-002",

    description:
      "Farmers in our village are facing difficulty storing vegetables after harvesting because there is no nearby cold storage facility.",

    impact: {
      affectedRange: "50_100",
    },

    duration: "more_than_month",

    urgency: "attention",

    location: {
      type: "Point",
      coordinates: [85.65, 23.28],
      address: "Rural Ramgarh district",
    },

    status: "verified",

    classification: {
      domain: "Agriculture",
      subdomain: "Post-Harvest Management",
      problemType: "Storage Infrastructure",
      confidence: 0.93,
    },

    // Deliberately not linked
    masterProblemKey: null,
  },


  // ==========================================================
  // UNDER REVIEW
  // ==========================================================

  {
    key: "pending-001",

    description:
      "Residents say that the local drainage channel overflows during intense rainfall and affects houses close to the roadside.",

    impact: {
      affectedRange: "10_50",
    },

    duration: "few_days",

    urgency: "attention",

    location: {
      type: "Point",
      coordinates: [86.44, 23.8],
      address: "Dhanbad district, Jharkhand",
    },

    status: "under_review",

    classification: {
      domain: "Urban Development",
      subdomain: "Drainage",
      problemType: "Drainage Overflow",
      confidence: 0.87,
    },

    masterProblemKey: null,
  },


  {
    key: "pending-002",

    description:
      "The local health sub-centre reportedly does not have all commonly required medicines available throughout the month.",

    impact: {
      affectedRange: "50_100",
    },

    duration: "few_days",

    urgency: "attention",

    location: {
      type: "Point",
      coordinates: [84.18, 23.72],
      address: "Garhwa district, Jharkhand",
    },

    status: "submitted",

    classification: {
      domain: "Healthcare",
      subdomain: "Health Services",
      problemType: "Medicine Availability",
      confidence: 0.84,
    },

    masterProblemKey: null,
  },


  // ==========================================================
  // REJECTED
  // ==========================================================

  {
    key: "rejected-001",

    description:
      "There is a very big problem in our area. Please solve it immediately.",

    impact: {
      affectedRange: "unknown",
    },

    duration: "unknown",

    urgency: "normal",

    location: {
      type: "Point",
      coordinates: [85.32, 23.36],
      address: "Ranchi, Jharkhand",
    },

    status: "rejected",

    classification: {
      domain: "Unclassified",
      subdomain: null,
      problemType: null,
      confidence: 0.19,
    },

    masterProblemKey: null,
  },


  {
    key: "rejected-002",

    description:
      "Something is wrong near our locality and government should take action.",

    impact: {
      affectedRange: "unknown",
    },

    duration: "unknown",

    urgency: "normal",

    location: {
      type: "Point",
      coordinates: [87.26, 24.27],
      address: "Dumka, Jharkhand",
    },

    status: "rejected",

    classification: {
      domain: "Unclassified",
      subdomain: null,
      problemType: null,
      confidence: 0.13,
    },

    masterProblemKey: null,
  },
];