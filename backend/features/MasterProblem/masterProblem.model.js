import mongoose from "mongoose";

const masterProblemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    summary: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    domain: {
      type: String,
      required: true,
      trim: true,
    },

    subdomain: {
      type: String,
      trim: true,
      default: null,
    },

    problemType: {
      type: String,
      trim: true,
      default: null,
    },

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
        default: null,
      },
    },

    status: {
      type: String,
      enum: [
        "active",
        "under_solution",
        "resolved",
        "archived",
      ],
      default: "active",
    },

    severity: {
      type: String,
      enum: [
        "low",
        "moderate",
        "high",
        "critical",
      ],
      default: "moderate",
    },
    universityRecommendations: [
     {
        universityId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "University",
        },

        score: {
          type: Number,
          min: 0,
          max: 1,
        },

        reasons: [
          {
            type: String,
          },
        ],

        generatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

masterProblemSchema.index({
  location: "2dsphere",
});

const MasterProblem = mongoose.model(
  "MasterProblem",
  masterProblemSchema
);

export default MasterProblem;