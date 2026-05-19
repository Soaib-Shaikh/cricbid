import express from 'express';
import upload from '../middlewares/upload.js';
import { addPlayer, getAllPlayers } from '../controllers/PlayerController.js';


const router = express.Router();

router.post("/:tournamentId", upload.single("image"), addPlayer)

router.get("/:tournamentId" ,getAllPlayers)

export default router;