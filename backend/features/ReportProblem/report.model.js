import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const reportSchema = new mongoose.Schema(
  {
    // -------------------------
    // Citizen submitted data
    // -------------------------

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },

    media: {
      type: [mediaSchema],
      default: [],
    },

    impact: {
      affectedRange: {
        type: String,
        enum: [
          "just_me",
          "few",
          "10_50",
          "50_100",
          "100_plus",
          "unknown",
        ],
        default: "unknown",
      },
    },

    duration: {
      type: String,
      enum: [
        "today",
        "few_days",
        "1_4_weeks",
        "more_than_month",
        "unknown",
      ],
      default: "unknown",
    },

    urgency: {
      type: String,
      enum: ["normal", "attention", "urgent"],
      default: "normal",
    },

    // -------------------------
    // Location
    // -------------------------

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },

      coordinates: {
        type: [Number],
        required: true,
      },

      address: {
        type: String,
        trim: true,
      },
    },

    // -------------------------
    // System data
    // -------------------------

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "submitted",
        "under_review",
        "assigned",
        "in_progress",
        "resolved",
        "rejected",
      ],
      default: "submitted",
    },

    // -------------------------
    // AI processing
    // -------------------------

    classification: {
      domain: {
        type: String,
      },

      subdomain: {
        type: String,
      },

      problemType: {
        type: String,
      },

      confidence: {
        type: Number,
        min: 0,
        max: 1,
      },
    },

    masterProblemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MasterProblem",
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

// Required for radius-based geographic queries
reportSchema.index({
  location: "2dsphere",
});

const Report = mongoose.model("Report", reportSchema);

export default Report;