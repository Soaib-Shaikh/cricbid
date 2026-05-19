import mongoose from "mongoose";

const historySchema =
  new mongoose.Schema(
    {
      playerId: {
        type:
          mongoose.Schema
            .Types.ObjectId,
        ref: "Player",
      },

      teamId: {
        type:
          mongoose.Schema
            .Types.ObjectId,
        ref: "Team",
        default: null,
      },

      price: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,
        enum: [
          "sold",
          "unsold",
        ],
      },

      tournamentId: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

const AuctionHistory =
  mongoose.model(
    "AuctionHistory",
    historySchema
  );

export default AuctionHistory;