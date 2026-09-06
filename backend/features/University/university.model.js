import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    expertise: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const universitySchema = new mongoose.Schema(
  {
    // ==========================================================
    // BASIC INSTITUTION INFORMATION
    // ==========================================================

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    shortName: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    type: {
      type: String,
      enum: [
        "university",
        "institute_of_national_importance",
        "research_institute",
        "innovation_center",
      ],
      default: "university",
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    website: {
      type: String,
      trim: true,
    },

    // ==========================================================
    // LOCATION
    // ==========================================================

    location: {
      district: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        default: "Jharkhand",
        trim: true,
      },

      address: {
        type: String,
        trim: true,
      },

      coordinates: {
        type: [Number],
        default: undefined,
      },
    },

    // ==========================================================
    // ACADEMIC DOMAINS
    // ==========================================================

    domains: {
      type: [String],
      default: [],
    },

    subdomains: {
      type: [String],
      default: [],
    },

    expertise: {
      type: [String],
      default: [],
    },

    researchAreas: {
      type: [String],
      default: [],
    },

    // ==========================================================
    // DEPARTMENTS
    // ==========================================================

    departments: {
      type: [departmentSchema],
      default: [],
    },

    // ==========================================================
    // INFRASTRUCTURE & FACILITIES
    // ==========================================================

    facilities: {
      type: [String],
      default: [],
    },

    innovationCapabilities: {
      type: [String],
      default: [],
    },

    // ==========================================================
    // INNOVATION / INDUSTRY CAPABILITIES
    // ==========================================================

    incubation: {
      type: Boolean,
      default: false,
    },

    startupSupport: {
      type: Boolean,
      default: false,
    },

    industryCollaboration: {
      type: Boolean,
      default: false,
    },

    // ==========================================================
    // PLATFORM STATUS
    // ==========================================================

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const University = mongoose.model(
  "University",
  universitySchema
);

export default University;