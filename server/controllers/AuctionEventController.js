import AuctionEvent from "../models/AuctionEventModel.js";
import Tournament from "../models/TournamentModel.js";
import Team from "../models/TeamModel.js";


// CREATE AUCTION EVENT
export const createAuctionEvent =
  async (req, res) => {
    try {
      const {
        auctionName,
        auctionDate,
        auctionTime,
        venue,
        tournamentId,
      } = req.body;

      if (
        !auctionName ||
        !auctionDate ||
        !auctionTime ||
        !venue ||
        !tournamentId
      ) {
        return res.status(400).json({
          message: "All fields required",
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

      const existingAuction =
        await AuctionEvent.findOne({
          tournamentId,
        });

      if (existingAuction) {
        return res.status(400).json({
          message:
            "Auction already created for this tournament",
        });
      }

      const teamCount =
        await Team.countDocuments({
          tournamentId,
        });

      if (
        teamCount <
        tournament.totalTeams
      ) {
        return res.status(400).json({
          message: `Create all ${tournament.totalTeams} teams first`,
        });
      }

      const auction =
        await AuctionEvent.create({
          auctionName,
          auctionDate,
          auctionTime,
          venue,
          tournamentId,
          createdBy:
            req.user._id,
        });

      tournament.auctionCreated =
        true;

      await tournament.save();

      res.status(201).json({
        message:
          "Auction created successfully 🔥",
        auction,
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };


// GET ALL AUCTIONS
export const getAuctionEvents =
  async (req, res) => {
    try {
      const auctions =
        await AuctionEvent.find({
          createdBy:
            req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        auctions,
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };


// GET SINGLE AUCTION
export const getSingleAuctionEvent =
  async (req, res) => {
    try {
      const {
        tournamentId,
      } = req.params;

      const auction =
        await AuctionEvent.findOne({
          tournamentId,
        });

      if (!auction) {
        return res.status(404).json({
          message:
            "Auction not found",
        });
      }

      res.status(200).json({
        auction,
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };


// START AUCTION EVENT
export const startAuctionEvent =
  async (req, res) => {
    try {
      const {
        tournamentId,
      } = req.body;

      const auction =
        await AuctionEvent.findOne({
          tournamentId,
        });

      if (!auction) {
        return res.status(404).json({
          message:
            "Create auction first",
        });
      }

      auction.status = "live";

      await auction.save();

      res.status(200).json({
        message:
          "Auction is now live 🔥",
        auction,
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };


// COMPLETE AUCTION
export const completeAuctionEvent =
  async (req, res) => {
    try {
      const {
        tournamentId,
      } = req.body;

      const auction =
        await AuctionEvent.findOne({
          tournamentId,
        });

      if (!auction) {
        return res.status(404).json({
          message:
            "Auction not found",
        });
      }

      auction.status =
        "completed";

      await auction.save();

      res.status(200).json({
        message:
          "Auction completed",
        auction,
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };