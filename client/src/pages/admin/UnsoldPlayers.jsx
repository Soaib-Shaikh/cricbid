import React, {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getPlayers,
  setSelectedAuctionPlayer,
} from "../../features/player/playerSlice";

import {
  useNavigate,
} from "react-router-dom";

import {
  RotateCcw,
} from "lucide-react";

const UnsoldPlayers = () => {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const {
    players,
    loading,
  } = useSelector(
    (state) =>
      state.player
  );

  const {
    selectedTournament,
  } = useSelector(
    (state) =>
      state.tournament
  );

  useEffect(() => {
    if (
      selectedTournament?.tournamentId
    ) {
      dispatch(
        getPlayers(
          selectedTournament.tournamentId
        )
      );
    }
  }, [dispatch, selectedTournament]);

  const unsoldPlayers =
    players.filter(
      (player) =>
        player.status ===
        "unsold"
    );

  const handleReAuction =
    (player) => {
      dispatch(
        setSelectedAuctionPlayer(
          player
        )
      );

      navigate("/auction");
    };

  return (
    <div className="min-h-screen bg-[#F5F7FB] p-6">

      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900">
          Unsold Players
        </h1>

        <p className="text-gray-500 mt-2">
          Ready for re-auction
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">
                  Player
                </th>
                <th className="p-4 text-left">
                  Role
                </th>
                <th className="p-4 text-left">
                  Base Price
                </th>
                <th className="p-4 text-left">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-10 text-center"
                  >
                    Loading...
                  </td>
                </tr>
              ) : unsoldPlayers.length ===
                0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-10 text-center"
                  >
                    No Unsold Players
                  </td>
                </tr>
              ) : (
                unsoldPlayers.map(
                  (player) => (
                    <tr
                      key={player._id}
                      className="border-t"
                    >
                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          <img
                            src={
                              player.image
                            }
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover"
                          />

                          <h3 className="font-semibold">
                            {
                              player.name
                            }
                          </h3>

                        </div>

                      </td>

                      <td className="p-4">
                        {
                          player.role
                        }
                      </td>

                      <td className="p-4 font-bold text-green-600">
                        ₹ {
                          player.basePrice
                        }
                      </td>

                      <td className="p-4">

                        <button
                          onClick={() =>
                            handleReAuction(
                              player
                            )
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                        >
                          <RotateCcw
                            size={16}
                          />
                          Re-Auction
                        </button>

                      </td>

                    </tr>
                  )
                )
              )}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default UnsoldPlayers;