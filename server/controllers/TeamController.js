import Team from "../models/TeamModel.js";

export const addTeam = async (req, res) => {

    try {

        const {
            name,
            tournamentId
        } = req.body;

        // ✅ VALIDATION
        if (!name || !tournamentId) {

            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // ✅ FILE CHECK
        if (!req.file) {

            return res.status(400).json({
                message: "Logo is required"
            });
        }

        const logo = req.file.path;

        const team = await Team.create({
            name,
            logo,
            tournamentId
        });

        return res.status(201).json({
            message: "Team add successfully.",
            team
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: error.message
        });
    }
};

export const getAllTeams = async (req, res) => {

    try {

        const { tournamentId } = req.params;

        const teams = await Team.find({
            tournamentId
        });

        return res.status(200).json({
            teams
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};

export const getSingleTeam =
  async (req, res) => {

    try {

      const { teamId } =
        req.params;

      const team =
        await Team.findById(teamId)
          .populate("players");

      if (!team) {

        return res.status(404).json({
          message: "Team not found"
        });

      }

      return res.status(200).json({
        team
      });

    } catch (error) {

      return res.status(500).json({
        message: error.message
      });

    }
  };