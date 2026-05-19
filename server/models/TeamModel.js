import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        default: 100000
    },
    spent: {
        type: Number,
        default: 0
    },
    remaining: {
        type: Number,
        default: 100000
    },
    players: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player"

        }
    ],
    tournamentId: {
        type: String,
        required: true,
    }
},{
    timestamps: true
})

const Team = mongoose.model("Team", teamSchema);
export default Team;