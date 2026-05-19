import React, {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import {
  getAuctionHistory,
  startAuction,
} from "../../features/auction/auctionSlice";

import {
  getPlayers,
} from "../../features/player/playerSlice";

import {
  Search,
  Trophy,
  RotateCcw,
  XCircle,
  CheckCircle2,
} from "lucide-react";

const AuctionHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    history,
    loading,
  } = useSelector(
    (state) => state.auction
  );

  const {
    players,
  } = useSelector(
    (state) => state.player
  );

  const {
    selectedTournament,
  } = useSelector(
    (state) => state.tournament
  );

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  useEffect(() => {
    if (
      selectedTournament?.tournamentId
    ) {
      dispatch(
        getAuctionHistory(
          selectedTournament.tournamentId
        )
      );

      dispatch(
        getPlayers(
          selectedTournament.tournamentId
        )
      );
    }
  }, [dispatch, selectedTournament]);

  const handleReAuction =
    async (player) => {
      const res =
        await dispatch(
          startAuction({
            playerId:
              player._id,
            tournamentId:
              selectedTournament.tournamentId,
          })
        );

      if (
        res.meta.requestStatus ===
        "fulfilled"
      ) {
        alert(
          `${player.name} re-auction started`
        );

        navigate("/auction");
      }
    };

  const filteredHistory =
    history?.filter((item) => {
      const playerName =
        item.playerId?.name
          ?.toLowerCase() || "";

      const teamName =
        item.teamId?.name
          ?.toLowerCase() || "";

      const matchesSearch =
        playerName.includes(
          search.toLowerCase()
        ) ||
        teamName.includes(
          search.toLowerCase()
        );

      const matchesFilter =
        filter === "all"
          ? true
          : item.status ===
            filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">

      {/* TOP */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-4xl font-black text-gray-900">
            Auction History 🏏
          </h1>

          <p className="text-gray-500 mt-2">
            Complete auction records & re-auction panel
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex gap-3">

          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search player/team..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-3 outline-none w-[280px]"
            />
          </div>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value
              )
            }
            className="bg-white border border-gray-200 rounded-2xl px-5 py-3 outline-none"
          >
            <option value="all">
              All
            </option>

            <option value="sold">
              Sold
            </option>

            <option value="unsold">
              Unsold
            </option>
          </select>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left p-5">
                  Player
                </th>

                <th className="text-left p-5">
                  Team
                </th>

                <th className="text-left p-5">
                  Price
                </th>

                <th className="text-left p-5">
                  Status
                </th>

                <th className="text-left p-5">
                  Date
                </th>

                <th className="text-left p-5">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {
                loading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center p-10"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : filteredHistory
                    ?.length ===
                  0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center p-10"
                    >
                      No history found
                    </td>
                  </tr>
                ) : (
                  filteredHistory.map(
                    (item) => (
                      <tr
                        key={
                          item._id
                        }
                        className="border-t hover:bg-gray-50"
                      >

                        <td className="p-5">

                          <div className="flex items-center gap-4">

                            <img
                              src={
                                item
                                  .playerId
                                  ?.image
                              }
                              alt=""
                              className="w-14 h-14 rounded-xl object-cover"
                            />

                            <div>
                              <h3 className="font-bold text-gray-900">
                                {
                                  item
                                    .playerId
                                    ?.name
                                }
                              </h3>

                              <p className="text-sm text-gray-500">
                                {
                                  item
                                    .playerId
                                    ?.role
                                }
                              </p>
                            </div>

                          </div>

                        </td>

                        <td className="p-5 font-semibold text-gray-800">
                          {
                            item.teamId
                              ?.name ||
                            "-"
                          }
                        </td>

                        <td className="p-5 font-bold text-green-600">
                          ₹ {item.price}
                        </td>

                        <td className="p-5">

                          {
                            item.status ===
                            "sold" ? (
                              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
                                <CheckCircle2 size={16} />
                                Sold
                              </span>
                            ) : (
                              <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
                                <XCircle size={16} />
                                Unsold
                              </span>
                            )
                          }

                        </td>

                        <td className="p-5 text-gray-600">
                          {
                            new Date(
                              item.createdAt
                            ).toLocaleString()
                          }
                        </td>

                        <td className="p-5">

                          {
                            item.status ===
                            "unsold" && (
                              <button
                                onClick={() =>
                                  handleReAuction(
                                    item.playerId
                                  )
                                }
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-semibold"
                              >
                                <RotateCcw size={16} />
                                Re-Auction
                              </button>
                            )
                          }

                        </td>

                      </tr>
                    )
                  )
                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AuctionHistory;