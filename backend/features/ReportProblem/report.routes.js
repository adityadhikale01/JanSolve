import express from "express";
import { createReport, getMyReports, getReportById } from "./report.controllers.js";
import  authMiddleware  from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createReport
);
router.get(
  "/my",
  (req, res, next) => {
    console.log("Received request to get my reports");
    next();
  } ,
  authMiddleware,
  getMyReports
);
router.get("/:id", authMiddleware, getReportById);

// router.post("/", protect, createReport);

// router.get("/my", protect, getMyReports);

// router.get("/:id", protect, getReportById);

// router.patch("/:id", protect, updateReport);

// router.delete("/:id", protect, deleteReport);

export default router;