import {io} from 'socket.io-client'

const socket = io("https://cricbid-backend.onrender.com");

export default socket;