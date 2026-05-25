import Team from "../models/TeamModel.js";
import Tournament from "../models/TournamentModel.js";

export const addTeam = async (req, res) => {
  try {
    const { name, tournamentId } = req.body;

    if (!name || !tournamentId) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Logo is required",
      });
    }

    const tournament = await Tournament.findOne({
      tournamentId,
    });

    if (!tournament) {
      return res.status(404).json({
        message: "Tournament not found",
      });
    }

    const existingTeams = await Team.countDocuments({
      tournamentId,
    });

    if (existingTeams >= tournament.totalTeams) {
      return res.status(400).json({
        message: `Only ${tournament.totalTeams} teams allowed`,
      });
    }

    const alreadyExists = await Team.findOne({
      name,
      tournamentId,
    });

    if (alreadyExists) {
      return res.status(400).json({
        message: "Team already exists",
      });
    }

    const team = await Team.create({
      name,
      logo: req.file.path,
      remaining: tournament.teamBudget,
      tournamentId,
    });

    return res.status(201).json({
      message: "Team created successfully 🔥",
      team,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const teams = await Team.find({ tournamentId });

    return res.status(200).json({
      teams,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleTeam = async (req, res) => {
  try {
    const { teamId } = req.params;

    const team = await Team.findById(teamId).populate("players");

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    return res.status(200).json({
      team,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};