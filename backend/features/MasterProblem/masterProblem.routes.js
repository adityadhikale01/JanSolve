import express from "express";

import {
  createMasterProblem,
  getMasterProblems,
  getMasterProblemById,
  updateMasterProblem,
} from "./masterProblem.controllers.js";

import authMiddleware from "../../middleware/authMiddleware.js";
import adminMiddleware from "../../middleware/adminMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.post("/", createMasterProblem);

router.get("/", getMasterProblems);

router.get("/:id", getMasterProblemById);

router.patch("/:id", updateMasterProblem);

export default router;