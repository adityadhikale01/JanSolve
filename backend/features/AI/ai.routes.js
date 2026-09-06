import express from "express";

import {
  findMasterProblemMatches,
  recommendUniversities,
} from "./ai.controllers.js";

import authMiddleware from "../../middleware/authMiddleware.js";
import adminMiddleware from "../../middleware/adminMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get(
  "/reports/:reportId/master-matches",
  findMasterProblemMatches
);

router.get(
  "/master-problems/:masterProblemId/universities",
  recommendUniversities
);

export default router;