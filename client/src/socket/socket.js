import { io } from "socket.io-client";

const SOCKET_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://cricbid-backend.onrender.com";

const socket = io(SOCKET_URL);

export default socket;