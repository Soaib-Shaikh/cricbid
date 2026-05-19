import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getAuctionHistory, getCurrentAuction, placeBid, sellPlayer, startAuction, unsoldPlayer } from "../controllers/AuctionController.js";


const router = express.Router();

router.post("/start", authMiddleware, startAuction);
router.post("/bid", authMiddleware, placeBid);
router.post("/sell", authMiddleware, sellPlayer);
router.get("/current", authMiddleware, getCurrentAuction);
router.post(
    "/unsold",
    authMiddleware,
    unsoldPlayer
);
router.get(
  "/history/:tournamentId",
  authMiddleware,
  getAuctionHistory
);

export default router;