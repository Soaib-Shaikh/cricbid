import React, {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getAllTeams,
} from "../../features/team/teamSlice";

import {
  useNavigate,
} from "react-router-dom";

import {
  Plus,
  Wallet,
  TrendingUp,
  Users,
} from "lucide-react";

const Teams = () => {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const {
    teams,
    loading,
  } = useSelector(
    (state) => state.team
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
        getAllTeams(
          selectedTournament.tournamentId
        )
      );
    }
  }, [
    selectedTournament,
    dispatch,
  ]);

  return (
    <div className="min-h-screen bg-[#F5F7FB] p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-4xl font-black text-gray-900">
            Teams 🏏
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Manage all tournament teams
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/create-team")
          }
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg transition-all"
        >
          <Plus size={20} />
          Add Team
        </button>

      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center text-xl text-gray-500 mt-20">
          Loading teams...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

          {teams?.map(
            (team) => (
              <div
                key={team._id}
                className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >

                {/* LOGO */}
                <div className="h-[150px] bg-white flex items-center justify-center p-4 border-b border-gray-100">

                  <img
                    src={team.logo}
                    alt={team.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-all duration-300"
                  />

                </div>

                {/* CONTENT */}
                <div className="p-4">

                  <h2 className="text-xl font-black text-gray-900 mb-5">
                    {team.name}
                  </h2>

                  <div className="space-y-3">

                    <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-2.5">

                      <div className="flex items-center gap-2 text-gray-600">
                        <Wallet size={18} />
                        <span>
                          Budget
                        </span>
                      </div>

                      <span className="font-bold text-gray-900">
                        ₹ {team.budget}
                      </span>

                    </div>

                    <div className="flex items-center justify-between bg-green-50 rounded-2xl px-4 py-3">

                      <div className="flex items-center gap-2 text-green-500">
                        <TrendingUp size={18} />
                        <span>
                          Spent
                        </span>
                      </div>

                      <span className="font-bold text-green-600">
                        ₹ {team.spent}
                      </span>

                    </div>

                    <div className="flex items-center justify-between bg-green-50 rounded-2xl px-4 py-3">

                      <div className="flex items-center gap-2 text-green-600">
                        <Wallet size={18} />
                        <span>
                          Remaining
                        </span>
                      </div>

                      <span className="font-bold text-green-600">
                        ₹ {team.remaining}
                      </span>

                    </div>

                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() =>
                      navigate(
                        `/team-players/${team._id}`
                      )
                    }
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2"
                  >

                    <Users size={18} />

                    View Players (
                    {
                      team.players
                        ?.length || 0
                    }
                    )

                  </button>

                </div>

              </div>
            )
          )}

        </div>
      )}
    </div>
  );
};

export default Teams;