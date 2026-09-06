import express from "express";

import {
  createUniversity,
  getUniversities,
  getUniversityById,
  updateUniversity,
  deleteUniversity,
} from "./university.controller.js";

import authMiddleware from "../../middleware/authMiddleware.js";
import adminMiddleware from "../../middleware/adminMiddleware.js";

const router = express.Router();

// ============================================================
// ADMIN UNIVERSITY ROUTES
// ============================================================

// All university management routes require authentication
// and admin privileges.

router.use(authMiddleware);
router.use(adminMiddleware);


// ============================================================
// UNIVERSITY CRUD
// ============================================================

// Create university
router.post("/", createUniversity);

// Get all universities
router.get("/", getUniversities);

// Get university by ID
router.get("/:id", getUniversityById);

// Update university
router.patch("/:id", updateUniversity);

// Deactivate university
router.delete("/:id", deleteUniversity);


export default router;