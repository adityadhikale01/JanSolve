import express from "express";

// import {
//   getAdminReports,
//   getAdminReportStats,
//   getAdminReportById,
//   reviewReport,
//   verifyReport,
//   rejectReport,
//   requestReportInformation,
// } from "./adminReport.controllers.js";
import {
  getAdminReports,
  getAdminReportStats,
  getAdminReportById,
  reviewReport,
  verifyReport,
  rejectReport,
  requestReportInformation,
  linkReportToMasterProblem,
  unlinkReportFromMasterProblem,
} from "./adminReport.controllers.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import adminMiddleware from "../../middleware/adminMiddleware.js";

const router = express.Router();


// ------------------------------------------------------
// All routes below require authentication + admin role
// ------------------------------------------------------

router.use(authMiddleware);
router.use(adminMiddleware);


// ------------------------------------------------------
// Statistics
// IMPORTANT: /stats must come before /:id
// ------------------------------------------------------

router.get("/stats", getAdminReportStats);


// ------------------------------------------------------
// Reports
// ------------------------------------------------------

router.get("/", getAdminReports);

router.get("/:id", getAdminReportById);


// ------------------------------------------------------
// Workflow
// ------------------------------------------------------

router.patch("/:id/review", reviewReport);

router.patch("/:id/verify", verifyReport);

router.patch("/:id/reject", rejectReport);

router.patch(
  "/:id/request-info",
  requestReportInformation
);

// ------------------------------------------------------
// Master Problem linking and unlinking
// ------------------------------------------------------
router.patch(
  "/:id/link-master-problem",
  linkReportToMasterProblem
);
router.patch(
  "/:id/unlink-master-problem",
  unlinkReportFromMasterProblem
);

export default router;