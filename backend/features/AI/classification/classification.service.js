const CLASSIFICATION_SCHEMA = {
  Agriculture: [
    "Irrigation",
    "Crop Productivity",
    "Soil Health",
    "Farm Mechanization",
    "Agricultural Technology",
  ],

  Healthcare: [
    "Primary Healthcare",
    "Healthcare Accessibility",
    "Medical Infrastructure",
    "Digital Health",
  ],

  Education: [
    "School Infrastructure",
    "Digital Education",
    "Teacher Availability",
    "Learning Outcomes",
  ],

  Water: [
    "Water Supply",
    "Water Quality",
    "Groundwater",
    "Irrigation",
    "Water Conservation",
  ],

  Environment: [
    "Waste Management",
    "Air Pollution",
    "Water Pollution",
    "Deforestation",
    "Climate Resilience",
  ],

  Energy: [
    "Electricity Access",
    "Renewable Energy",
    "Energy Efficiency",
  ],

  "Urban Development": [
    "Roads",
    "Drainage",
    "Traffic",
    "Public Infrastructure",
  ],

  Accessibility: [
    "Physical Accessibility",
    "Digital Accessibility",
    "Assistive Technology",
  ],

  "Rural Livelihoods": [
    "Employment",
    "Skill Development",
    "MSME",
    "Self Employment",
  ],

  "Public Administration": [
    "Service Delivery",
    "Digital Governance",
    "Public Services",
  ],
};

export function getClassificationContext() {
  return CLASSIFICATION_SCHEMA;
}