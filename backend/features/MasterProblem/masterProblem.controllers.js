import mongoose from "mongoose";
import MasterProblem from "./masterProblem.model.js";
import Report from "../ReportProblem/report.model.js";

export const createMasterProblem = async (req, res) => {
  try {
    const {
      title,
      summary,
      domain,
      subdomain,
      problemType,
      location,
      severity,
    } = req.body;

    if (
      !title ||
      !summary ||
      !domain ||
      !location?.coordinates
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, summary, domain and location are required.",
      });
    }

    const masterProblem = await MasterProblem.create({
      title: title.trim(),
      summary: summary.trim(),
      domain: domain.trim(),
      subdomain: subdomain?.trim() || null,
      problemType: problemType?.trim() || null,
      location,
      severity: severity || "moderate",
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Master problem created successfully.",
      masterProblem,
    });
  } catch (error) {
    console.error(
      "createMasterProblem error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create master problem.",
    });
  }
};

export const getMasterProblems = async (req, res) => {
  try {
    const masterProblems = await MasterProblem.find({})
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email role")
      .lean();

    /* -------------------------------------------------------
       Find how many reports are linked to each master problem
    ------------------------------------------------------- */

    const masterProblemIds = masterProblems.map(
      (problem) => problem._id
    );

    let reportCounts = [];

    if (masterProblemIds.length > 0) {
      reportCounts = await Report.aggregate([
        {
          $match: {
            masterProblemId: {
              $in: masterProblemIds,
            },
          },
        },
        {
          $group: {
            _id: "$masterProblemId",
            count: {
              $sum: 1,
            },
          },
        },
      ]);
    }

    /* -------------------------------------------------------
       Convert aggregation result into easy lookup object
    ------------------------------------------------------- */

    const reportCountMap = new Map(
      reportCounts.map((item) => [
        String(item._id),
        item.count,
      ])
    );

    /* -------------------------------------------------------
       Add relatedReportsCount to every master problem
    ------------------------------------------------------- */

    const enrichedMasterProblems =
      masterProblems.map((problem) => ({
        ...problem,

        relatedReportsCount:
          reportCountMap.get(
            String(problem._id)
          ) || 0,
      }));

    return res.status(200).json({
      success: true,
      count: enrichedMasterProblems.length,
      masterProblems: enrichedMasterProblems,
    });
  } catch (error) {
    console.error(
      "getMasterProblems error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch master problems.",
    });
  }
};
// export const getMasterProblems = async (req, res) => {
//   try {
//     const masterProblems = await MasterProblem.find({})
//       .sort({ createdAt: -1 })
//       .populate("createdBy", "name email role")
//       .lean();

//     return res.status(200).json({
//       success: true,
//       count: masterProblems.length,
//       masterProblems,
//     });
//   } catch (error) {
//     console.error(
//       "getMasterProblems error:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch master problems.",
//     });
//   }
// };

export const getMasterProblemById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid master problem ID.",
      });
    }

    const masterProblem =
      await MasterProblem.findById(id)
        .populate("createdBy", "name email role")
        .lean();

    if (!masterProblem) {
      return res.status(404).json({
        success: false,
        message: "Master problem not found.",
      });
    }

    const reports = await Report.find({
      masterProblemId: id,
    })
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email role")
      .lean();

    return res.status(200).json({
      success: true,
      masterProblem,
      reports,
    });
  } catch (error) {
    console.error(
      "getMasterProblemById error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch master problem.",
    });
  }
};

export const updateMasterProblem = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid master problem ID.",
      });
    }

    const allowedFields = [
      "title",
      "summary",
      "domain",
      "subdomain",
      "problemType",
      "location",
      "severity",
      "status",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const masterProblem =
      await MasterProblem.findByIdAndUpdate(
        id,
        updates,
        {
          new: true,
          runValidators: true,
        }
      )
        .populate("createdBy", "name email role");

    if (!masterProblem) {
      return res.status(404).json({
        success: false,
        message: "Master problem not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Master problem updated successfully.",
      masterProblem,
    });
  } catch (error) {
    console.error(
      "updateMasterProblem error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update master problem.",
    });
  }
};