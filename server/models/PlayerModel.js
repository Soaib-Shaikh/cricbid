import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper']
    },
    battingStyle: {
        type: String,
        required: true
    },
    bowlingStyle: {
        type: String,
        required: true
    },
    basePrice: {
        type: Number,
        default: 1000,
    },
    soldPrice: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ["unsold", "sold", "available"],
        default: "available"
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        default: null
    },
    image: {
        type: String,
    },
    tournamentId: {
        type: String,
        required: true,
    }

}, {
    timestamps: true
})

const Player = mongoose.model("Player", playerSchema);
export default Player;