import express from 'express';
import upload from '../middlewares/upload.js';
import { addTeam, getAllTeams, getSingleTeam,  } from '../controllers/TeamController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/",authMiddleware ,upload.single("logo"), addTeam)

router.get("/:tournamentId",authMiddleware ,getAllTeams)
router.get(
  "/single/:teamId",
  getSingleTeam
);

export default router;