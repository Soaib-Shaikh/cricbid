import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

import {
  createAuctionEvent,
  getAuctionEvents,
  getSingleAuctionEvent,
  startAuctionEvent,
  completeAuctionEvent,
} from "../controllers/AuctionEventController.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createAuctionEvent
);

router.get(
  "/all",
  authMiddleware,
  getAuctionEvents
);

router.get(
  "/:tournamentId",
  authMiddleware,
  getSingleAuctionEvent
);

router.post(
  "/start",
  authMiddleware,
  startAuctionEvent
);

router.post(
  "/complete",
  authMiddleware,
  completeAuctionEvent
);

export default router;