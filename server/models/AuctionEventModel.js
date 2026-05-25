import mongoose from "mongoose";

const auctionEventSchema =
  new mongoose.Schema(
    {
      auctionName: {
        type: String,
        required: true,
      },

      auctionDate: {
        type: Date,
        required: true,
      },

      auctionTime: {
        type: String,
        required: true,
      },

      venue: {
        type: String,
        required: true,
      },

      tournamentId: {
        type: String,
        required: true,
        unique: true,
      },

      status: {
        type: String,
        enum: [
          "scheduled",
          "live",
          "completed",
        ],
        default: "scheduled",
      },

      createdBy: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const AuctionEvent =
  mongoose.model(
    "AuctionEvent",
    auctionEventSchema
  );

export default AuctionEvent;