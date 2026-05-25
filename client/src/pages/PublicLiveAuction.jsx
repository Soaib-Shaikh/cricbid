import React, {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";
import { useParams } from "react-router-dom";

import {
  getSingleTournament,
} from "../features/tournament/tournamentSlice";

import {
  getAllTeams,
} from "../features/team/teamSlice";

import {
  getCurrentAuction,
} from "../features/auction/auctionSlice";

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
  Sparkles,
  PlayCircle,
} from "lucide-react";
import socket from "../socket/socket";




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

  const { teams } =
    useSelector(
      (state) =>
        state.team
    );

  const [auctionData, setAuctionData] =
    useState(null);

  const [liveBids, setLiveBids] = useState([]);

  const [soldData, setSoldData] =
    useState(null);

  const [unsoldData, setUnsoldData] =
    useState(null);

  const [status, setStatus] =
    useState("waiting");

  const [time, setTime] =
    useState(new Date());

  const { current } = useSelector(
    (state) => state.auction
  );

  const [
    remainingPlayers,
    setRemainingPlayers,
  ] = useState(0);

  useEffect(() => {
    dispatch(getSingleTournament(tournamentId));
    dispatch(getAllTeams(tournamentId));
    dispatch(getCurrentAuction());

    const joinRoom = () => {
      socket.emit("joinAuction", tournamentId);
    };

    if (socket.connected) {
      joinRoom();
    } else {
      socket.on("connect", joinRoom);
    }

    return () => {
      socket.off("connect", joinRoom);
    };
  }, [dispatch, tournamentId]);



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
    socket.on("auctionStart", (data) => {
      setAuctionData({
        player: {
          ...data.player,
        },
        currentBid: data.basePrice,
        highestBidder: null,
      });

      setLiveBids([]);
      setSoldData(null);
      setUnsoldData(null);
      setStatus("live");
    });

    socket.on("bidUpdate", (data) => {
      setAuctionData((prev) => ({
        ...prev,
        player: data.player || prev?.player,
        currentBid: data.currentBid,
        highestBidder: data.highestBidder || null,
      }));

      if (data.highestBidder) {
        setLiveBids((prev) => [
          {
            team: data.highestBidder.name,
            logo: data.highestBidder.logo,
            amount: data.currentBid,
            time: new Date().toLocaleTimeString(),
          },
          ...prev,
        ]);
      }

      dispatch(getAllTeams(tournamentId));
      setStatus("live");
    });

    socket.on("playerSold", (data) => {

      setSoldData(data);
      setAuctionData(null);
      setStatus("sold");

      dispatch(getAllTeams(tournamentId));
    });

    socket.on(
      "playerUnsold",
      (data) => {
        setUnsoldData(data);
        setAuctionData(null);
        setStatus("unsold");
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
    };
  }, [
    dispatch,
    tournamentId,
  ]);

  const leadingTeam =
    auctionData?.highestBidder || null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50">

      <div className="max-w-7xl mx-auto p-4 lg:p-6">

        {/* TOP */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-6 mb-6">

          <div className="flex flex-col xl:flex-row justify-between gap-6">

            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-2xl font-bold text-sm">
                <Sparkles size={16} />
                LIVE AUCTION
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mt-4">
                CricBid Live Arena
              </h1>

              <p className="text-slate-500 text-lg mt-2">
                {
                  selectedTournament?.tournamentName
                }
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

              <div className="bg-red-50 border border-red-200 rounded-3xl p-5 text-center">
                <Users className="mx-auto text-red-500" />

                <p className="text-xs text-slate-500 mt-2 uppercase">
                  Remaining
                </p>

                <h3 className="text-2xl font-black text-slate-900">
                  {remainingPlayers}
                </h3>
              </div>

              <div className="bg-cyan-50 border border-cyan-200 rounded-3xl p-5 text-center">
                <Clock3 className="mx-auto text-cyan-500" />

                <p className="text-xs text-slate-500 mt-2 uppercase">
                  Time
                </p>

                <h3 className="text-sm font-black text-slate-900">
                  {time.toLocaleTimeString()}
                </h3>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-5 text-center">
                <p className="text-xs text-slate-500 uppercase">
                  Status
                </p>

                <div className="mt-3 flex justify-center">
                  <AuctionStatus
                    status={status}
                  />
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 text-center">
                <BadgeIndianRupee className="mx-auto text-emerald-500" />

                <p className="text-xs text-slate-500 mt-2 uppercase">
                  Min Increment
                </p>

                <h3 className="text-2xl font-black text-slate-900">
                  ₹1000
                </h3>
              </div>

            </div>

          </div>

        </div>

        {/* LIVE */}
        {
          status === "live" &&
          auctionData && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

              <div className="xl:col-span-3">
                <LivePlayerDisplay
                  auctionData={
                    auctionData
                  }
                />
              </div>

              <div className="xl:col-span-5">
                <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 h-full">

                  <div className="text-center">

                    <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-5 py-3 rounded-2xl font-bold">
                      <Gavel size={18} />
                      CURRENT HIGHEST BID
                    </div>

                    <div className="mt-8 flex justify-center">
                      <div className="relative bg-gradient-to-br from-slate-900 via-green-700 to-emerald-500 rounded-[30px] px-12 py-8 shadow-2xl min-w-[450px] overflow-hidden border border-white/20">

                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-300/20 rounded-full blur-2xl"></div>

                        <p className="text-white/80 uppercase tracking-[5px] text-xs font-bold text-center">
                          LIVE CURRENT BID
                        </p>

                        <h1 className="text-7xl font-black text-white mt-4 text-center">
                          ₹ {auctionData.currentBid?.toLocaleString()}
                        </h1>

                      </div>
                    </div>

                  </div>

                  {/* HIGHEST BIDDER */}
                  <div className="mt-8 bg-slate-50 border border-slate-200 rounded-3xl p-6">

                    <p className="text-xs uppercase tracking-wider text-slate-500 font-bold text-center">
                      Highest Bidder
                    </p>

                    <div className="mt-5 flex items-center justify-center gap-4">

                      <div className="w-20 h-20 rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden p-2 flex items-center justify-center">

                        {
                          leadingTeam ? (
                            <img
                              src={leadingTeam.logo}
                              alt={leadingTeam.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="text-3xl">👑</span>
                          )
                        }

                      </div>

                      <div>
                        {leadingTeam ? (
                          <>
                            <h3 className="text-2xl font-black text-slate-900">
                              {leadingTeam.name}
                            </h3>

                            <p className="text-slate-500 font-medium">
                              Remaining Purse ₹
                              {leadingTeam.remaining?.toLocaleString()}
                            </p>
                          </>
                        ) : (
                          <>
                            <h3 className="text-2xl font-black text-slate-900">
                              No Bids Yet
                            </h3>

                            <p className="text-slate-500 font-medium">
                              Waiting for first bid
                            </p>
                          </>
                        )}
                      </div>

                    </div>

                  </div>

                  {/* NEXT BID */}
                  <div className="mt-6 bg-cyan-50 border border-cyan-200 rounded-3xl p-5">

                    <div className="flex items-center justify-center gap-3">
                      <BadgeIndianRupee className="text-cyan-600" />

                      <span className="font-bold text-slate-700 text-lg">
                        Next Minimum Bid:
                        ₹ {
                          (
                            auctionData.currentBid +
                            1000
                          ).toLocaleString()
                        }
                      </span>
                    </div>

                  </div>

                  {/* LIVE BID FEED */}
                  <div className="mt-6 bg-white border border-gray-200 rounded-3xl p-5 h-[300px] overflow-hidden shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 mb-4">
                      🔴 Live Bidding Feed
                    </h3>

                    {liveBids.length > 0 ? (
                      <div className="space-y-3 max-h-[230px] overflow-y-auto pr-2">
                        {liveBids.map((bid, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-slate-50 border rounded-2xl p-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-white rounded-xl border p-2">
                                <img
                                  src={bid.logo}
                                  alt={bid.team}
                                  className="w-full h-full object-contain"
                                />
                              </div>

                              <div>
                                <p className="font-black text-slate-900">
                                  {bid.team}
                                </p>

                                <p className="text-xs text-slate-500">
                                  placed a bid
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="font-black text-green-600 text-xl">
                                ₹ {bid.amount.toLocaleString()}
                              </p>

                              <p className="text-xs text-slate-400">
                                {bid.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-[220px] flex items-center justify-center text-slate-400 font-bold">
                        Waiting for bids...
                      </div>
                    )}
                  </div>

                </div>
              </div>

              <div className="xl:col-span-4">
                <LiveAuctionTeams
                  highestBidder={
                    auctionData.highestBidder
                  }
                />
              </div>

            </div>
          )
        }

        {/* WAITING */}
        {
          status ===
          "waiting" && (
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-20 text-center">

              <div className="w-28 h-28 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
                <PlayCircle
                  size={50}
                  className="text-emerald-600"
                />
              </div>

              <h2 className="text-5xl font-black text-slate-900 mt-8">
                Ready For Auction
              </h2>

              <p className="text-slate-500 text-xl mt-4">
                Waiting for organizer to start live bidding
              </p>

            </div>
          )
        }

        {/* SOLD */}
        {
          status ===
          "sold" &&
          soldData && (
            <SoldBanner
              soldData={
                soldData
              }
            />
          )
        }

        {/* UNSOLD */}
        {
          status ===
          "unsold" &&
          unsoldData && (
            <UnsoldBanner
              unsoldData={
                unsoldData
              }
            />
          )
        }

      </div>

    </div>
  );
};

export default PublicLiveAuction;