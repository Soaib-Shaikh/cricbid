import React, {
  useEffect,
  useState,
} from "react";

import { io } from "socket.io-client";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useParams,
} from "react-router-dom";

import {
  getSingleTournament,
} from "../features/tournament/tournamentSlice";

import {
  getAllTeams,
} from "../features/team/teamSlice";

import AuctionStatus from "../components/auction/AuuctionStatus";
import LivePlayerDisplay from "../components/auction/LivePlayerDisplay";
import LiveAuctionTeams from "../components/auction/LiveAuctionTeams";
import SoldBanner from "../components/auction/SoldBanner";
import UnsoldBanner from "../components/auction/UnsoldBanner";

import {
  Clock3,
  BadgeIndianRupee,
  Gavel,
  Users,
} from "lucide-react";

const socket = io(
  "http://localhost:5000"
);

const PublicLiveAuction = () => {
  const dispatch =
    useDispatch();

  const { tournamentId } =
    useParams();

  const {
    selectedTournament,
  } = useSelector(
    (state) =>
      state.tournament
  );

  const [auctionData, setAuctionData] =
    useState(null);

  const [soldData, setSoldData] =
    useState(null);

  const [unsoldData, setUnsoldData] =
    useState(null);

  const [status, setStatus] =
    useState("waiting");

  const [time, setTime] =
    useState(
      new Date()
    );

  const [
    completedData,
    setCompletedData,
  ] = useState(null);

  const [
    remainingPlayers,
    setRemainingPlayers,
  ] = useState(0);

  useEffect(() => {
    dispatch(
      getSingleTournament(
        tournamentId
      )
    );

    dispatch(
      getAllTeams(
        tournamentId
      )
    );

    socket.emit(
      "joinAuction",
      tournamentId
    );
  }, [
    dispatch,
    tournamentId,
  ]);

  useEffect(() => {
    const interval =
      setInterval(() => {
        setTime(
          new Date()
        );
      }, 1000);

    return () =>
      clearInterval(
        interval
      );
  }, []);

  useEffect(() => {
    socket.on(
      "auctionStart",
      (data) => {
        setAuctionData({
          player:
            data.player,
          currentBid:
            data.basePrice,
          highestBidder:
            null,
        });

        setSoldData(null);
        setUnsoldData(
          null
        );
        setCompletedData(
          null
        );
        setStatus(
          "live"
        );
      }
    );

    socket.on(
      "bidUpdate",
      (data) => {
        setAuctionData(
          (prev) => ({
            ...prev,
            currentBid:
              data.currentBid,
            highestBidder:
              data.teamId,
          })
        );
      }
    );

    socket.on(
      "playerSold",
      (data) => {
        setSoldData(data);
        setAuctionData(
          null
        );
        setStatus(
          "sold"
        );

        dispatch(
          getAllTeams(
            tournamentId
          )
        );
      }
    );

    socket.on(
      "playerUnsold",
      (data) => {
        setUnsoldData(
          data
        );

        setAuctionData(
          null
        );

        setStatus(
          "unsold"
        );
      }
    );

    socket.on(
      "remainingPlayersUpdate",
      (count) => {
        setRemainingPlayers(
          count
        );
      }
    );

    socket.on(
      "auctionCompleted",
      (data) => {
        setCompletedData(
          data
        );

        setAuctionData(
          null
        );

        setSoldData(null);
        setUnsoldData(
          null
        );

        setRemainingPlayers(
          0
        );

        setStatus(
          "completed"
        );
      }
    );

    return () => {
      socket.off(
        "auctionStart"
      );

      socket.off(
        "bidUpdate"
      );

      socket.off(
        "playerSold"
      );

      socket.off(
        "playerUnsold"
      );

      socket.off(
        "remainingPlayersUpdate"
      );

      socket.off(
        "auctionCompleted"
      );
    };
  }, [
    dispatch,
    tournamentId,
  ]);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-slate-950/85" />

      <div className="relative z-10 min-h-screen p-6">

        {/* HEADER */}
        <div className="max-w-7xl mx-auto bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl px-8 py-5 shadow-2xl">

          <div className="flex items-center justify-between">

            <div>
              <h1 className="text-3xl font-black text-white">
                CricBid Live Auction
              </h1>

              <p className="text-gray-300 mt-2">
                {
                  selectedTournament?.tournamentName
                }
              </p>
            </div>

            <div className="flex items-center gap-5">

              <div className="bg-red-500/15 border border-red-400/20 rounded-2xl px-5 py-3 flex items-center gap-3">
                <Users className="text-red-300" />
                <span className="text-white font-bold">
                  Remaining:
                  {" "}
                  {
                    remainingPlayers
                  }
                </span>
              </div>

              <AuctionStatus
                status={
                  status
                }
              />

              <div className="bg-white/10 border border-white/10 rounded-2xl px-5 py-3 flex items-center gap-3">
                <Clock3 className="text-cyan-300" />
                <span className="text-white font-bold">
                  {time.toLocaleTimeString()}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* BODY */}
        <div className="max-w-7xl mx-auto mt-6">

          {status ===
            "live" &&
            auctionData && (
              <div className="grid grid-cols-12 gap-6">

                <div className="col-span-3">
                  <LivePlayerDisplay
                    auctionData={
                      auctionData
                    }
                  />
                </div>

                <div className="col-span-5">
                  <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl h-full flex flex-col justify-center">

                    <div className="text-center">

                      <div className="inline-flex items-center gap-3 bg-yellow-400/20 border border-yellow-300/20 px-5 py-3 rounded-2xl">
                        <BadgeIndianRupee className="text-yellow-300" />
                        <span className="text-yellow-200 font-bold">
                          CURRENT BID
                        </span>
                      </div>

                      <h1 className="text-7xl font-black text-white mt-8">
                        ₹ {
                          auctionData.currentBid
                        }
                      </h1>

                      <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-5">
                        <div className="flex items-center justify-center gap-3">
                          <Gavel className="text-cyan-300" />
                          <span className="text-white font-semibold">
                            Next Minimum Bid:
                            ₹{" "}
                            {
                              auctionData.currentBid +
                              1000
                            }
                          </span>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

                <div className="col-span-4">
                  <LiveAuctionTeams
                    highestBidder={
                      auctionData.highestBidder
                    }
                  />
                </div>

              </div>
            )}

          {status ===
            "waiting" && (
            <div className="mt-10 bg-white/10 border border-white/10 rounded-3xl p-20 text-center">
              <h2 className="text-5xl font-black text-white">
                Waiting For Auction Start
              </h2>
            </div>
          )}

          {status ===
            "sold" &&
            soldData && (
              <SoldBanner
                soldData={
                  soldData
                }
              />
            )}

          {status ===
            "unsold" &&
            unsoldData && (
              <UnsoldBanner
                unsoldData={
                  unsoldData
                }
              />
            )}

          {status ===
            "completed" &&
            completedData && (
              <div className="mt-8 bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-14 text-center shadow-2xl">

                <div className="text-7xl mb-6">
                  🏆
                </div>

                <h1 className="text-6xl font-black text-white">
                  AUCTION COMPLETED
                </h1>

                <p className="text-gray-300 mt-4 text-xl">
                  Tournament auction finished successfully
                </p>

                <div className="grid grid-cols-4 gap-6 mt-10">

                  <div className="bg-white/10 rounded-3xl p-6">
                    <p className="text-gray-400">
                      Total Players
                    </p>

                    <h2 className="text-4xl font-black text-white mt-3">
                      {
                        completedData.totalPlayers
                      }
                    </h2>
                  </div>

                  <div className="bg-green-500/15 rounded-3xl p-6">
                    <p className="text-green-200">
                      Sold
                    </p>

                    <h2 className="text-4xl font-black text-green-300 mt-3">
                      {
                        completedData.soldCount
                      }
                    </h2>
                  </div>

                  <div className="bg-red-500/15 rounded-3xl p-6">
                    <p className="text-red-200">
                      Unsold
                    </p>

                    <h2 className="text-4xl font-black text-red-300 mt-3">
                      {
                        completedData.unsoldCount
                      }
                    </h2>
                  </div>

                  <div className="bg-yellow-500/15 rounded-3xl p-6">
                    <p className="text-yellow-200">
                      Revenue
                    </p>

                    <h2 className="text-4xl font-black text-yellow-300 mt-3">
                      ₹ {
                        completedData.revenue
                      }
                    </h2>
                  </div>

                </div>

              </div>
            )}

        </div>

      </div>

    </div>
  );
};

export default PublicLiveAuction;