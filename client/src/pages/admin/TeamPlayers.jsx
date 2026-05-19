import React, { useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getSingleTeam,
} from "../../features/team/teamSlice";

import {
  ArrowLeft,
  Users,
  IndianRupee,
  Trophy,
  Download,
} from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const TeamPlayers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teamId } =
    useParams();

  const {
    singleTeam,
    loading,
  } = useSelector(
    (state) => state.team
  );

  useEffect(() => {
    dispatch(
      getSingleTeam(teamId)
    );
  }, [dispatch, teamId]);

  const downloadSquadPDF =
    () => {
      const doc = new jsPDF();

      doc.setFontSize(20);
      doc.text(
        "CricBid Team Squad Report",
        14,
        20
      );

      doc.setFontSize(12);

      doc.text(
        `Team: ${singleTeam.name}`,
        14,
        35
      );

      doc.text(
        `Budget: ₹ ${singleTeam.budget}`,
        14,
        45
      );

      doc.text(
        `Spent: ₹ ${singleTeam.spent}`,
        14,
        55
      );

      doc.text(
        `Remaining: ₹ ${singleTeam.remaining}`,
        14,
        65
      );

      doc.text(
        `Players Bought: ${singleTeam.players.length}`,
        14,
        75
      );

      autoTable(doc, {
        startY: 90,
        head: [[
          "Index",
          "Player",
          "Role",
          "Batting",
          "Bowling",
          "Phone",
          "Sold Price",
        ]],
        body:
          singleTeam.players.map(
            (player) => [
              player.indexNumber || "-",
              player.name,
              player.role,
              player.battingStyle,
              player.bowlingStyle,
              player.phone || "-",
              `₹ ${player.soldPrice}`,
            ]
          ),
      });

      doc.save(
        `${singleTeam.name}-Squad.pdf`
      );
    };

  if (loading || !singleTeam) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">

      {/* TOP BAR */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">

        <button
          onClick={() =>
            navigate("/teams")
          }
          className="flex items-center gap-2 text-green-700 font-semibold"
        >
          <ArrowLeft size={20} />
          Back To Teams
        </button>

        {singleTeam.players.length >
          0 && (
            <button
              onClick={
                downloadSquadPDF
              }
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2 font-medium shadow-lg"
            >
              <Download size={18} />
              Download Squad PDF
            </button>
          )}

      </div>

      {/* HERO */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 rounded-3xl px-8 py-6 shadow-xl">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              {
                singleTeam.name
              }
            </h1>

            <p className="text-green-100 mt-2 text-base">
              Premium Team Overview
            </p>
          </div>

          <img
            src={singleTeam.logo}
            alt={singleTeam.name}
            className="w-28 h-28 lg:w-32 lg:h-32 rounded-3xl object-contain bg-white p-2 border-4 border-white shadow-xl"
          />

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

        <StatCard
          title="Budget"
          value={`₹ ${singleTeam.budget}`}
          icon={
            <IndianRupee size={28} />
          }
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Spent"
          value={`₹ ${singleTeam.spent}`}
          icon={
            <Trophy size={28} />
          }
          color="bg-red-100 text-red-600"
        />

        <StatCard
          title="Remaining"
          value={`₹ ${singleTeam.remaining}`}
          icon={
            <IndianRupee size={28} />
          }
          color="bg-green-100 text-green-600"
        />

        <StatCard
          title="Players"
          value={
            singleTeam.players
              ?.length
          }
          icon={
            <Users size={28} />
          }
          color="bg-yellow-100 text-yellow-600"
        />

      </div>

      {/* PLAYERS TABLE */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm mt-8 overflow-hidden">

        <div className="p-6 border-b border-gray-100">

          <h2 className="text-2xl font-black text-gray-900">
            Team Players 🏏
          </h2>

        </div>

        {
          singleTeam.players
            ?.length === 0 ? (
            <div className="p-12 text-center">
              <h3 className="text-2xl font-bold text-gray-700">
                No Players Bought Yet
              </h3>
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50">

                  <tr>
                    <th className="text-left p-4">
                      Index
                    </th>

                    <th className="text-left p-4">
                      Player
                    </th>

                    <th className="text-left p-4">
                      Role
                    </th>

                    <th className="text-left p-4">
                      Batting
                    </th>

                    <th className="text-left p-4">
                      Bowling
                    </th>

                    <th className="text-left p-4">
                      Phone
                    </th>

                    <th className="text-left p-4">
                      Sold Price
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {
                    singleTeam.players.map(
                      (
                        player
                      ) => (
                        <tr
                          key={
                            player._id
                          }
                          className="border-t hover:bg-gray-50"
                        >

                          <td className="p-4 font-bold text-gray-700">
                            {
                              player.indexNumber ||
                              "-"
                            }
                          </td>

                          <td className="p-4">

                            <div className="flex items-center gap-4">

                              <img
                                src={
                                  player.image
                                }
                                alt=""
                                className="w-14 h-14 rounded-xl object-cover"
                              />

                              <span className="font-semibold">
                                {
                                  player.name
                                }
                              </span>

                            </div>

                          </td>

                          <td className="p-4">
                            {
                              player.role
                            }
                          </td>

                          <td className="p-4">
                            {
                              player.battingStyle
                            }
                          </td>

                          <td className="p-4">
                            {
                              player.bowlingStyle
                            }
                          </td>

                          <td className="p-4">
                            {
                              player.phone ||
                              "-"
                            }
                          </td>

                          <td className="p-4 font-bold text-green-600">
                            ₹ {
                              player.soldPrice
                            }
                          </td>

                        </tr>
                      )
                    )
                  }

                </tbody>

              </table>

            </div>
          )
        }

      </div>

    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon,
  color,
}) => (
  <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">

    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}
    >
      {icon}
    </div>

    <h2 className="text-3xl font-black text-gray-900 mt-5">
      {value}
    </h2>

    <p className="text-gray-500 mt-2">
      {title}
    </p>

  </div>
);

export default TeamPlayers;