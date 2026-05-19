import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlayers } from "../../features/player/playerSlice";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Players = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { players, loading } = useSelector(
    (state) => state.player
  );

  const { selectedTournament } = useSelector(
    (state) => state.tournament
  );

  const [currentPage, setCurrentPage] =
    useState(1);

  const [roleFilter, setRoleFilter] =
    useState("All");

  const playersPerPage = 8;

  useEffect(() => {
    if (!selectedTournament?.tournamentId)
      return;

    dispatch(
      getPlayers(
        selectedTournament.tournamentId
      )
    );
  }, [
    dispatch,
    selectedTournament?.tournamentId,
  ]);

  const downloadRegistrationPDF =
    () => {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text(
        "CricBid Player Registration List",
        14,
        20
      );

      doc.setFontSize(11);

      doc.text(
        `Tournament: ${
          selectedTournament?.tournamentName || "-"
        }`,
        14,
        35
      );

      autoTable(doc, {
        startY: 45,
        head: [[
          "Index",
          "Player",
          "Role",
          "Batting",
          "Bowling",
          "Phone",
        ]],
        body: players.map(
          (player, index) => [
            index + 1,
            player.name,
            player.role,
            player.battingStyle,
            player.bowlingStyle,
            player.phone,
          ]
        ),
      });

      doc.save(
        "players-list.pdf"
      );
    };

  const filteredPlayers =
    roleFilter === "All"
      ? players
      : players.filter(
          (player) =>
            player.role === roleFilter
        );

  const indexOfLastPlayer =
    currentPage * playersPerPage;

  const indexOfFirstPlayer =
    indexOfLastPlayer -
    playersPerPage;

  const currentPlayers =
    filteredPlayers.slice(
      indexOfFirstPlayer,
      indexOfLastPlayer
    );

  const totalPages = Math.ceil(
    filteredPlayers.length /
      playersPerPage
  );

  return (
    <div className="min-h-screen bg-[#F5F7FB] p-6">

      {/* TOP */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-3xl font-black text-gray-900">
            Players 🏏
          </h1>

          <p className="text-gray-500 mt-2">
            Manage tournament players
          </p>
        </div>

        <div className="flex gap-4 flex-wrap">

          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(
                e.target.value
              )
            }
            className="bg-white border border-gray-200 px-4 py-3 rounded-2xl"
          >
            <option>All</option>
            <option>Batsman</option>
            <option>Bowler</option>
            <option>All-Rounder</option>
            <option>Wicket-Keeper</option>
          </select>

          <button
            onClick={
              downloadRegistrationPDF
            }
            className="bg-green-600 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
          >
            <Download size={18} />
            Download PDF
          </button>

          <button
            onClick={() =>
              navigate(
                `/player-register/${selectedTournament?.tournamentId}`
              )
            }
            className="bg-red-600 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
          >
            <Plus size={18} />
            Add Player
          </button>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>
                <th className="p-4 text-left">
                  Index
                </th>
                <th className="p-4 text-left">
                  Player
                </th>
                <th className="p-4 text-left">
                  Role
                </th>
                <th className="p-4 text-left">
                  Phone
                </th>
                <th className="p-4 text-left">
                  Status
                </th>
              </tr>

            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-10 text-center"
                  >
                    Loading...
                  </td>
                </tr>
              ) : currentPlayers.length ===
                0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-10 text-center"
                  >
                    No Players Found
                  </td>
                </tr>
              ) : (
                currentPlayers.map(
                  (player, index) => (
                    <tr
                      key={
                        player._id
                      }
                      className="border-t"
                    >
                      <td className="p-4 font-bold">
                        {
                          index + 1
                        }
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              player.image
                            }
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover"
                          />

                          <div>
                            <h3 className="font-semibold">
                              {
                                player.name
                              }
                            </h3>

                            <p className="text-sm text-gray-500">
                              {
                                player.battingStyle
                              }
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        {
                          player.role
                        }
                      </td>

                      <td className="p-4">
                        {
                          player.phone
                        }
                      </td>

                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          player.status ===
                          "sold"
                            ? "bg-green-100 text-green-700"
                            : player.status ===
                              "unsold"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {
                            player.status
                          }
                        </span>
                      </td>
                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* PAGINATION */}
      <div className="flex justify-end items-center gap-3 mt-6">

        <button
          disabled={
            currentPage === 1
          }
          onClick={() =>
            setCurrentPage(
              currentPage - 1
            )
          }
          className="bg-white border px-4 py-2 rounded-xl"
        >
          <ChevronLeft size={18} />
        </button>

        <span>
          {currentPage} / {totalPages || 1}
        </span>

        <button
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            setCurrentPage(
              currentPage + 1
            )
          }
          className="bg-white border px-4 py-2 rounded-xl"
        >
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
};

export default Players;