import mongoose from "mongoose";

const teamSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      logo: {
        type: String,
        required: true,
      },

      budget: {
        type: Number,
        required: true,
      },

      spent: {
        type: Number,
        default: 0,
      },

      remaining: {
        type: Number,
        required: true,
      },

      players: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref: "Player",
        },
      ],

      tournamentId: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

teamSchema.index(
  {
    name: 1,
    tournamentId: 1,
  },
  {
    unique: true,
  }
);

const Team =
  mongoose.model(
    "Team",
    teamSchema
  );

export default Team;