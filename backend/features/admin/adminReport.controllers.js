import mongoose from "mongoose";
import Report from "../ReportProblem/report.model.js";
import MasterProblem from "../MasterProblem/masterProblem.model.js";

// ======================================================
// GET ALL REPORTS
// ======================================================

export const getAdminReports = async (req, res) => {
  const reports = await Report.find({})
    .sort({ createdAt: -1 })
    .populate("createdBy", "name email role")
    .lean();

  return res.status(200).json({
    success: true,
    count: reports.length,
    reports,
  });
};


// ======================================================
// GET REPORT STATISTICS
// ======================================================

export const getAdminReportStats = async (req, res) => {
  const stats = await Report.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const result = {
    total: 0,
    submitted: 0,
    under_review: 0,
    information_requested: 0,
    verified: 0,
    assigned: 0,
    in_progress: 0,
    resolved: 0,
    rejected: 0,
  };

  stats.forEach((item) => {
    result[item._id] = item.count;
    result.total += item.count;
  });

  return res.status(200).json({
    success: true,
    stats: result,
  });
};


// ======================================================
// GET SINGLE REPORT
// ======================================================

export const getAdminReportById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid report ID.",
    });
  }

  const report = await Report.findById(id)
    .populate("createdBy", "name email role avatar")
    .populate(
      "verification.verifiedBy",
      "name email role"
    )
    .lean();

  if (!report) {
    return res.status(404).json({
      success: false,
      message: "Report not found.",
    });
  }

  return res.status(200).json({
    success: true,
    report,
  });
};


// ======================================================
// START REVIEW
// ======================================================

export const reviewReport = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid report ID.",
    });
  }

  const report = await Report.findById(id);

  if (!report) {
    return res.status(404).json({
      success: false,
      message: "Report not found.",
    });
  }

  if (
    report.status !== "submitted" &&
    report.status !== "information_requested"
  ) {
    return res.status(400).json({
      success: false,
      message: `Report cannot be moved to review from '${report.status}'.`,
    });
  }

  report.status = "under_review";

  await report.save();

  return res.status(200).json({
    success: true,
    message: "Report moved to review.",
    report: {
      id: report._id,
      status: report.status,
    },
  });
};


// ======================================================
// VERIFY REPORT
// ======================================================

export const verifyReport = async (req, res) => {
  const { id } = req.params;
  const { note } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid report ID.",
    });
  }

  const report = await Report.findById(id);

  if (!report) {
    return res.status(404).json({
      success: false,
      message: "Report not found.",
    });
  }

  if (report.status !== "under_review") {
    return res.status(400).json({
      success: false,
      message: "Only reports under review can be verified.",
    });
  }

  report.status = "verified";

  report.verification = {
    verifiedBy: req.user.id,
    verifiedAt: new Date(),
    adminNote: note?.trim() || null,
    rejectionReason: null,
  };

  await report.save();

  return res.status(200).json({
    success: true,
    message: "Report verified successfully.",
    report: {
      id: report._id,
      status: report.status,
      verification: report.verification,
    },
  });
};


// ======================================================
// REJECT REPORT
// ======================================================

export const rejectReport = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid report ID.",
    });
  }

  if (!reason || !reason.trim()) {
    return res.status(400).json({
      success: false,
      message: "Rejection reason is required.",
    });
  }

  const report = await Report.findById(id);

  if (!report) {
    return res.status(404).json({
      success: false,
      message: "Report not found.",
    });
  }

  if (report.status !== "under_review") {
    return res.status(400).json({
      success: false,
      message: "Only reports under review can be rejected.",
    });
  }

  report.status = "rejected";

  report.verification = {
    verifiedBy: req.user.id,
    verifiedAt: new Date(),
    adminNote: null,
    rejectionReason: reason.trim(),
  };

  await report.save();

  return res.status(200).json({
    success: true,
    message: "Report rejected.",
    report: {
      id: report._id,
      status: report.status,
      verification: report.verification,
    },
  });
};


// ======================================================
// REQUEST MORE INFORMATION
// ======================================================

export const requestReportInformation = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid report ID.",
    });
  }

  if (!message || !message.trim()) {
    return res.status(400).json({
      success: false,
      message: "Information request message is required.",
    });
  }

  const report = await Report.findById(id);

  if (!report) {
    return res.status(404).json({
      success: false,
      message: "Report not found.",
    });
  }

  if (report.status !== "under_review") {
    return res.status(400).json({
      success: false,
      message: "Only reports under review can request information.",
    });
  }

  report.status = "information_requested";

  report.verification.adminNote = message.trim();

  await report.save();

  return res.status(200).json({
    success: true,
    message: "Additional information requested.",
    report: {
      id: report._id,
      status: report.status,
      adminNote: report.verification.adminNote,
    },
  });
};

export const linkReportToMasterProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const { masterProblemId } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid report ID.",
      });
    }

    if (!mongoose.isValidObjectId(masterProblemId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid master problem ID.",
      });
    }

    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    const masterProblem =
      await MasterProblem.findById(masterProblemId);

    if (!masterProblem) {
      return res.status(404).json({
        success: false,
        message: "Master problem not found.",
      });
    }

    if (report.status !== "verified") {
      return res.status(400).json({
        success: false,
        message:
          "Only verified reports can be linked to a master problem.",
      });
    }

    report.masterProblemId = masterProblem._id;

    await report.save();

    return res.status(200).json({
      success: true,
      message:
        "Report linked to master problem successfully.",
      report: {
        _id: report._id,
        status: report.status,
        masterProblemId: report.masterProblemId,
      },
    });
  } catch (error) {
    console.error(
      "linkReportToMasterProblem error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to link report to master problem.",
    });
  }
};

export const unlinkReportFromMasterProblem = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid report ID.",
      });
    }

    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    report.masterProblemId = null;

    await report.save();

    return res.status(200).json({
      success: true,
      message:
        "Report removed from master problem successfully.",
      report: {
        _id: report._id,
        masterProblemId: null,
      },
    });
  } catch (error) {
    console.error(
      "unlinkReportFromMasterProblem error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to unlink report from master problem.",
    });
  }
};