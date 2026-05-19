import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
    currentPlayer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
    },

    currentBid: {
        type: Number,
        default: 0
    },

    highestBidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        default: null
    },

    status: {
        type: String,
        enum: ["idle", "running", "sold"],
        default: "idle"
    },

    tournamentId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const Auction = mongoose.model("Auction", auctionSchema)
export default Auction;