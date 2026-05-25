import mongoose from "mongoose";

const tournamentSchema =
  new mongoose.Schema(
    {
      tournamentId: {
        type: String,
        required: true,
        unique: true,
      },

      tournamentName: {
        type: String,
        required: true,
      },

      organizerName: {
        type: String,
        required: true,
      },

      groundName: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      overs: {
        type: Number,
        required: true,
      },

      startDate: {
        type: Date,
        required: true,
      },

      endDate: {
        type: Date,
        required: true,
      },

      logo: {
        type: String,
      },

      /* NEW FIELDS */
      totalTeams: {
        type: Number,
        required: true,
        min: 2,
      },

      playersPerTeam: {
        type: Number,
        required: true,
        min: 1,
      },

      teamBudget: {
        type: Number,
        required: true,
        min: 1000,
      },

      auctionCreated: {
        type: Boolean,
        default: false,
      },

      createdBy: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

const Tournament =
  mongoose.model(
    "Tournament",
    tournamentSchema
  );

export default Tournament;