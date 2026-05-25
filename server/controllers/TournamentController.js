import Tournament from "../models/TournamentModel.js";

// CREATE
export const createTournament =
  async (req, res) => {
    try {
      const {
        tournamentName,
        organizerName,
        groundName,
        city,
        overs,
        startDate,
        endDate,
        totalTeams,
        playersPerTeam,
        teamBudget,
      } = req.body;

      if (
        !tournamentName ||
        !organizerName ||
        !groundName ||
        !city ||
        !overs ||
        !startDate ||
        !endDate ||
        !totalTeams ||
        !playersPerTeam ||
        !teamBudget
      ) {
        return res.status(400).json({
          message: "All fields required",
        });
      }

      if (
        new Date(endDate) <
        new Date(startDate)
      ) {
        return res.status(400).json({
          message:
            "End date cannot be before start date",
        });
      }

      if (Number(totalTeams) < 2) {
        return res.status(400).json({
          message:
            "Minimum 2 teams required",
        });
      }

      if (Number(playersPerTeam) < 1) {
        return res.status(400).json({
          message:
            "Players per team must be at least 1",
        });
      }

      if (Number(teamBudget) < 1000) {
        return res.status(400).json({
          message:
            "Team budget too low",
        });
      }

      const logo = req.file
        ? req.file.path
        : null;

      const tournamentId = `CRIC${Math.floor(
        100000 +
          Math.random() * 900000
      )}`;

      const tournament =
        await Tournament.create({
          tournamentId,
          tournamentName,
          organizerName,
          groundName,
          city,
          overs,
          startDate,
          endDate,
          logo,
          totalTeams,
          playersPerTeam,
          teamBudget,
          auctionCreated: false,
          createdBy: req.user._id,
        });

      res.status(201).json({
        message:
          "Tournament created successfully",
        tournament,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// GET ALL
export const getTournaments =
  async (req, res) => {
    try {
      const tournaments =
        await Tournament.find({
          createdBy: req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        tournaments,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// GET SINGLE
export const getSingleTournament =
  async (req, res) => {
    try {
      const { tournamentId } =
        req.params;

      const tournament =
        await Tournament.findOne({
          tournamentId,
        });

      if (!tournament) {
        return res.status(404).json({
          message:
            "Tournament not found",
        });
      }

      res.status(200).json({
        tournament,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// UPDATE
export const updateTournament =
  async (req, res) => {
    try {
      const { tournamentId } =
        req.params;

      const {
        tournamentName,
        organizerName,
        groundName,
        city,
        overs,
        startDate,
        endDate,
        totalTeams,
        playersPerTeam,
        teamBudget,
      } = req.body;

      if (
        new Date(endDate) <
        new Date(startDate)
      ) {
        return res.status(400).json({
          message: "Invalid dates",
        });
      }

      const tournament =
        await Tournament.findOne({
          tournamentId,
        });

      if (!tournament) {
        return res.status(404).json({
          message:
            "Tournament not found",
        });
      }

      tournament.tournamentName =
        tournamentName;
      tournament.organizerName =
        organizerName;
      tournament.groundName =
        groundName;
      tournament.city = city;
      tournament.overs = overs;
      tournament.startDate =
        startDate;
      tournament.endDate =
        endDate;
      tournament.totalTeams =
        totalTeams;
      tournament.playersPerTeam =
        playersPerTeam;
      tournament.teamBudget =
        teamBudget;

      if (req.file) {
        tournament.logo =
          req.file.path;
      }

      await tournament.save();

      res.status(200).json({
        message:
          "Tournament updated successfully",
        tournament,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };