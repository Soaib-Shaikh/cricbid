import AuctionHistory from "../models/AuctionHistory.js";
import Auction from "../models/AuctionModel.js";
import Player from "../models/PlayerModel.js";
import Team from "../models/TeamModel.js";
import { io } from "../server.js";

// helper
const emitRemainingPlayers = async (tournamentId) => {
  const remainingPlayers =
    await Player.countDocuments({
      tournamentId,
      status: "available",
    });

  io.to(tournamentId).emit(
    "remainingPlayersUpdate",
    remainingPlayers
  );

  return remainingPlayers;
};

// Start Auction
export const startAuction = async (
  req,
  res
) => {
  try {
    const {
      playerId,
      tournamentId,
    } = req.body;

    const player =
      await Player.findById(
        playerId
      );

    if (!player) {
      return res
        .status(404)
        .json({
          message:
            "Player not found",
        });
    }

    const auction =
      await Auction.findOneAndUpdate(
        { tournamentId },
        {
          tournamentId,
          currentPlayer:
            playerId,
          currentBid:
            player.basePrice ||
            1000,
          highestBidder:
            null,
          status: "running",
        },
        {
          new: true,
          upsert: true,
        }
      );

    io.to(tournamentId).emit(
      "auctionStart",
      {
        player,
        basePrice:
          auction.currentBid,
      }
    );

    await emitRemainingPlayers(
      tournamentId
    );

    res.json(auction);
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// Place Bid
export const placeBid = async (req, res) => {
  try {
    const {
      teamId,
      amount,
      tournamentId,
    } = req.body;

    const auction = await Auction.findOne({
      tournamentId,
    });

    if (!auction) {
      return res.status(404).json({
        message: "Auction not found",
      });
    }

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    const bidAmount = Number(amount);

    if (team.remaining < bidAmount) {
      return res.status(400).json({
        message: "Not enough budget",
      });
    }

    const isFirstBid = !auction.highestBidder;

    if (
      !isFirstBid &&
      bidAmount <= auction.currentBid
    ) {
      return res.status(400).json({
        message: "Bid must be higher",
      });
    }

    auction.currentBid = bidAmount;
    auction.highestBidder = teamId;

    await auction.save();

    const updatedAuction = await Auction.findById(
      auction._id
    )
      .populate(
        "highestBidder",
        "name logo remaining"
      )
      .populate("currentPlayer");

    io.to(tournamentId).emit("bidUpdate", {
      currentBid: updatedAuction.currentBid,
      highestBidder: updatedAuction.highestBidder,
      player: updatedAuction.currentPlayer,
    });

    res.json(updatedAuction);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// SOLD
export const sellPlayer = async (
  req,
  res
) => {
  try {
    const {
      tournamentId,
    } = req.body;

    const auction =
      await Auction.findOne({
        tournamentId,
      });

    if (
      !auction ||
      !auction.currentPlayer
    ) {
      return res
        .status(400)
        .json({
          message:
            "No active auction",
        });
    }

    if (
      !auction.highestBidder
    ) {
      return res
        .status(400)
        .json({
          message:
            "No bids placed",
        });
    }

    const player =
      await Player.findById(
        auction.currentPlayer
      );

    const team =
      await Team.findById(
        auction.highestBidder
      );

    const finalPrice =
      auction.currentBid;

    player.status = "sold";
    player.soldPrice =
      finalPrice;
    player.teamId =
      team._id;

    await player.save();

    team.players.push(
      player._id
    );
    team.spent +=
      finalPrice;
    team.remaining =
      team.remaining -
      finalPrice;

    await team.save();

    await AuctionHistory.create({
      playerId:
        player._id,
      teamId: team._id,
      price: finalPrice,
      status: "sold",
      tournamentId,
    });

    auction.currentPlayer =
      null;
    auction.currentBid = 0;
    auction.highestBidder =
      null;
    auction.status = "idle";

    await auction.save();

    io.to(tournamentId).emit(
      "playerSold",
      {
        player,
        team,
        price:
          finalPrice,
      }
    );

    const remaining =
      await emitRemainingPlayers(
        tournamentId
      );

    if (remaining === 0) {
      const soldPlayers =
        await Player.find({
          tournamentId,
          status: "sold",
        });

      const unsoldPlayers =
        await Player.find({
          tournamentId,
          status: "unsold",
        });

      const totalRevenue =
        soldPlayers.reduce(
          (
            sum,
            player
          ) =>
            sum +
            (player.soldPrice ||
              0),
          0
        );

      io.to(
        tournamentId
      ).emit(
        "auctionCompleted",
        {
          totalPlayers:
            soldPlayers.length +
            unsoldPlayers.length,
          soldCount:
            soldPlayers.length,
          unsoldCount:
            unsoldPlayers.length,
          revenue:
            totalRevenue,
        }
      );
    }

    res.json({
      message:
        "Player Sold",
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// Current
export const getCurrentAuction =
  async (req, res) => {
    try {
      const auction =
        await Auction.findOne(
          {
            tournamentId:
              req.user
                .tournamentId,
          }
        )
          .populate(
            "currentPlayer"
          )
          .populate(
            "highestBidder"
          );

      res.json(auction);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// UNSOLD
export const unsoldPlayer =
  async (req, res) => {
    try {
      const {
        tournamentId,
      } = req.body;

      const auction =
        await Auction.findOne(
          {
            tournamentId,
          }
        ).populate(
          "currentPlayer"
        );

      if (
        !auction ||
        !auction.currentPlayer
      ) {
        return res
          .status(400)
          .json({
            message:
              "No active auction",
          });
      }

      const player =
        auction.currentPlayer;

      player.status =
        "unsold";
      player.teamId = null;
      player.soldPrice = 0;

      await player.save();

      await AuctionHistory.create(
        {
          playerId:
            player._id,
          teamId: null,
          price: 0,
          status:
            "unsold",
          tournamentId,
        }
      );

      io.to(
        tournamentId
      ).emit(
        "playerUnsold",
        {
          player,
        }
      );

      auction.currentPlayer =
        null;
      auction.currentBid = 0;
      auction.highestBidder =
        null;
      auction.status =
        "idle";

      await auction.save();

      const remaining =
        await emitRemainingPlayers(
          tournamentId
        );

      if (remaining === 0) {
        const soldPlayers =
          await Player.find({
            tournamentId,
            status: "sold",
          });

        const unsoldPlayers =
          await Player.find({
            tournamentId,
            status:
              "unsold",
          });

        const totalRevenue =
          soldPlayers.reduce(
            (
              sum,
              player
            ) =>
              sum +
              (player.soldPrice ||
                0),
            0
          );

        io.to(
          tournamentId
        ).emit(
          "auctionCompleted",
          {
            totalPlayers:
              soldPlayers.length +
              unsoldPlayers.length,
            soldCount:
              soldPlayers.length,
            unsoldCount:
              unsoldPlayers.length,
            revenue:
              totalRevenue,
          }
        );
      }

      res.json({
        message:
          "Player Unsold",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const getAuctionHistory =
  async (req, res) => {
    try {
      const {
        tournamentId,
      } = req.params;

      const history =
        await AuctionHistory.find(
          {
            tournamentId,
          }
        )
          .populate(
            "playerId"
          )
          .populate(
            "teamId"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        history,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };