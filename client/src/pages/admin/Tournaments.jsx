import React, {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getTournaments,
  setSelectedTournament,
} from "../../features/tournament/tournamentSlice";

import {
  useNavigate,
} from "react-router-dom";

import {
  Plus,
  CalendarDays,
  MapPin,
  PenSquare,
  Trophy,
} from "lucide-react";

const Tournaments =
  () => {
    const dispatch =
      useDispatch();

    const navigate =
      useNavigate();

    const {
      tournaments,
      loading,
    } = useSelector(
      (state) =>
        state.tournament
    );

    useEffect(() => {
      dispatch(
        getTournaments()
      );
    }, [dispatch]);

    const handleSelectTournament =
      (
        tournament
      ) => {
        dispatch(
          setSelectedTournament(
            tournament
          )
        );

        navigate("/teams");
      };

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#EEF2FF] to-[#F1F5F9] p-6">

        <div className="max-w-7xl mx-auto">

          {/* TOP */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

            <div>
              <h1 className="text-4xl font-black text-gray-900">
                My Tournaments 🏏
              </h1>

              <p className="text-gray-500 mt-3 text-lg">
                Manage all your cricket tournaments professionally
              </p>
            </div>

            <button
              onClick={() =>
                navigate(
                  "/create-tournament"
                )
              }
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg"
            >
              <Plus size={20} />
              Add Tournament
            </button>

          </div>

          {/* LOADING */}
          {loading ? (
            <div className="text-center text-gray-500 text-lg">
              Loading tournaments...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {tournaments?.map(
                (
                  tournament
                ) => (
                  <div
                    key={
                      tournament._id
                    }
                    className="bg-white rounded-[28px] shadow-xl border border-gray-200 overflow-hidden hover:-translate-y-2 transition-all duration-300"
                  >

                    {/* IMAGE */}
                    <div className="relative h-[220px]">

                      <img
                        src={
                          tournament.logo
                        }
                        alt={
                          tournament.tournamentName
                        }
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-xl text-sm font-bold">
                        {
                          tournament.overs
                        } Overs
                      </div>

                      <div className="absolute bottom-5 left-5">

                        <h2 className="text-2xl font-black text-white">
                          {
                            tournament.tournamentName
                          }
                        </h2>

                        <p className="text-gray-200 mt-2 flex items-center gap-2">
                          <MapPin
                            size={
                              16
                            }
                          />
                          {
                            tournament.city
                          }
                        </p>

                      </div>

                    </div>

                    {/* BODY */}
                    <div className="p-6">

                      <div className="space-y-4">

                        <div className="flex items-center gap-3 text-gray-600">
                          <CalendarDays
                            size={18}
                          />

                          <span className="font-medium">
                            {
                              new Date(
                                tournament.startDate
                              ).toLocaleDateString()
                            }

                            {" "}→{" "}

                            {
                              new Date(
                                tournament.endDate
                              ).toLocaleDateString()
                            }
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                          <Trophy
                            size={18}
                          />

                          <span className="font-semibold text-red-600">
                            {
                              tournament.tournamentId
                            }
                          </span>
                        </div>

                      </div>

                      {/* BUTTONS */}
                      <div className="grid grid-cols-2 gap-4 mt-8">

                        <button
                          onClick={() =>
                            navigate(
                              `/edit-tournament/${tournament.tournamentId}`
                            )
                          }
                          className="border border-gray-200 hover:bg-gray-50 py-3 rounded-2xl font-bold flex items-center justify-center gap-2"
                        >
                          <PenSquare
                            size={18}
                          />
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleSelectTournament(
                              tournament
                            )
                          }
                          className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-bold"
                        >
                          Open 🚀
                        </button>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>
      
    );
  };

export default
  Tournaments;