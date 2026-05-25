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
import auctionEventRoutes from "./routes/AuctionEventRoutes.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
];

export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin:allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

io.on("connection", (socket) => {
  console.log(
    "User Connected:",
    socket.id
  );

  socket.on(
    "joinAuction",
    (tournamentId) => {
      socket.join(
        tournamentId
      );

      console.log(
        `Socket: ${socket.id} joined room ${tournamentId}`
      );
    }
  );

  socket.on(
    "disconnect",
    () => {
      console.log(
        "User Disconnected"
      );
    }
  );
});

app.use("/api/players", playerRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auction", auctionRoutes);
app.use("/api/tournament", tournamentRoutes);
app.use("/api/auction-event", auctionEventRoutes);

app.get("/", (req, res) => {
  res.send(
    "CricBid Backend Running 🚀"
  );
});

server.listen(port, () => {
  console.log(
    `Server running on port ${port}`
  );

  db();
});