import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

import {
  createTournament,
  getSingleTournament,
  getTournaments,
  updateTournament,
} from "../controllers/TournamentController.js";

const router =
  express.Router();

router.post(
  "/",
  authMiddleware,
  upload.single("logo"),
  createTournament
);

router.get(
  "/",
  authMiddleware,
  getTournaments
);

router.get(
  "/:tournamentId",
  getSingleTournament
);

router.put(
  "/:tournamentId",
  authMiddleware,
  upload.single("logo"),
  updateTournament
);

export default router;