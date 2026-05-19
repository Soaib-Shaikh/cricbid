import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./configs/db.js";
import { Server } from "socket.io";
import http from "http";

import playerRoutes from "./routes/PlayerRoutes.js";
import teamRoutes from "./routes/TeamRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import auctionRoutes from "./routes/AuctionRoutes.js";
import tournamentRoutes from "./routes/TournamentRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);

app.use(
  cors({
    origin:
      process.env.CLIENT_URL,
    credentials: true,
  })
);

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("joinAuction", (tournamentId) => {
    socket.join(tournamentId);
    console.log(
      `Socket ${socket.id} joined room ${tournamentId}`
    );
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

app.use(cors());
app.use(express.json());

app.use("/api/players", playerRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auction", auctionRoutes);
app.use("/api/tournament", tournamentRoutes);

server.listen(port, () => {
  console.log(
    `Server running on http://localhost:${port}`
  );
  db();
});