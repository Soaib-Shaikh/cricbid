import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  Trophy,
  CalendarDays,
  MapPin,
} from "lucide-react";

import apiInstance from "../api/apiInstance";

const PlayerRegistration = () => {
  const { tournamentId } =
    useParams();

  const [tournament, setTournament] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      role: "",
      battingStyle: "",
      bowlingStyle: "",
      address: "",
      phone: "",
      basePrice: 1000,
      image: null,
    });

  // DATE FORMAT
  const formatDate = (
    dateString
  ) => {
    if (!dateString)
      return "";

    const date =
      new Date(dateString);

    return date.toLocaleDateString(
      "en-GB"
    );
  };

  // GET TOURNAMENT
  useEffect(() => {
    const fetchTournament =
      async () => {
        try {
          const res =
            await apiInstance.get(
              `/tournament/${tournamentId}`
            );

          setTournament(
            res.data.tournament
          );
        } catch (error) {
          console.log(error);
        }
      };

    fetchTournament();
  }, [tournamentId]);

  const handleChange = (
    e
  ) => {
    if (
      e.target.name ===
      "image"
    ) {
      setFormData({
        ...formData,
        image:
          e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    }
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const data =
          new FormData();

        Object.keys(
          formData
        ).forEach((key) => {
          data.append(
            key,
            formData[key]
          );
        });

        await apiInstance.post(
          `/players/${tournamentId}`,
          data
        );

        alert(
          "Player Registered 🏏"
        );

        setFormData({
          name: "",
          role: "",
          battingStyle: "",
          bowlingStyle: "",
          address: "",
          phone: "",
          basePrice: 1000,
          image: null,
        });

      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
          "Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-[#EEF2F7] py-6 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <div className="relative rounded-[24px] overflow-hidden shadow-xl min-h-[220px] md:min-h-[320px] bg-gradient-to-r from-slate-900 to-slate-800">

          <div className="grid md:grid-cols-2 h-full">

            {/* LEFT CONTENT */}
            <div className="flex flex-col justify-center px-5 md:px-10 py-6 text-white z-20">

              <div className="bg-green-600 w-fit px-4 py-2 rounded-full text-xs font-bold mb-4 shadow-md">
                Registration Open 🏏
              </div>

              <h1 className="text-3xl md:text-5xl font-black leading-tight drop-shadow-xl">
                {tournament?.tournamentName}
              </h1>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">

                <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl flex items-center gap-2 border border-white/10 w-fit">
                  <MapPin size={14} />
                  <span className="text-sm font-medium">
                    {tournament?.groundName}
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl flex items-center gap-2 border border-white/10 w-fit">
                  <CalendarDays size={14} />
                  <span className="text-sm font-medium">
                    {formatDate(tournament?.startDate)} - {formatDate(tournament?.endDate)}
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl flex items-center gap-2 border border-white/10 w-fit">
                  <Trophy size={14} />
                  <span className="text-sm font-medium">
                    {tournament?.overs} Overs
                  </span>
                </div>

              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="hidden md:flex items-center justify-center p-6">
              <img
                src={
                  tournament?.logo ||
                  "https://via.placeholder.com/800x500?text=CricBid+Tournament"
                }
                alt={tournament?.tournamentName}
                className="max-w-full max-h-[280px] object-contain rounded-2xl shadow-2xl"
              />
            </div>

          </div>

          {/* MOBILE IMAGE BG */}
          <div
            className="md:hidden absolute inset-0 bg-center bg-cover opacity-30"
            style={{
              backgroundImage: `url(${tournament?.logo})`,
            }}
          />
        </div>

        {/* FORM */}
        <div className="bg-white rounded-[24px] shadow-lg p-6 md:p-8 mt-6 border border-gray-100">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900">
              Player Registration 🏏
            </h2>

            <p className="text-gray-500 mt-2">
              Fill your cricket details carefully
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <input
              type="text"
              name="name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              placeholder="Full Name"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-800"
            />

            <input
              type="text"
              name="phone"
              value={
                formData.phone
              }
              onChange={
                handleChange
              }
              placeholder="Phone Number"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-800"
            />

            <select
              name="role"
              value={
                formData.role
              }
              onChange={
                handleChange
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-800"
            >
              <option value="">
                Select Role
              </option>
              <option>
                Batsman
              </option>
              <option>
                Bowler
              </option>
              <option>
                All-Rounder
              </option>
              <option>
                Wicket-Keeper
              </option>
            </select>

            <input
              type="number"
              name="basePrice"
              value={
                formData.basePrice
              }
              onChange={
                handleChange
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-800"
            />

            <select
              name="battingStyle"
              value={
                formData.battingStyle
              }
              onChange={
                handleChange
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-800"
            >
              <option value="">
                Batting Style
              </option>
              <option>
                Right Handed
              </option>
              <option>
                Left Handed
              </option>
            </select>

            <select
              name="bowlingStyle"
              value={
                formData.bowlingStyle
              }
              onChange={
                handleChange
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-800"
            >
              <option value="">
                Bowling Style
              </option>
              <option>
                Right Arm Fast
              </option>
              <option>
                Left Arm Fast
              </option>
              <option>
                Right Arm Medium
              </option>
              <option>
                Left Arm Medium
              </option>
              <option>
                Off Spin
              </option>
              <option>
                Leg Spin
              </option>
            </select>

            <textarea
              rows={4}
              name="address"
              value={
                formData.address
              }
              onChange={
                handleChange
              }
              placeholder="Address"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            />

            <input
              type="file"
              name="image"
              onChange={
                handleChange
              }
              className="w-full bg-gray-50 border border-dashed border-gray-300 rounded-xl px-4 py-3 cursor-pointer"
            />

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 w-fit mx-auto px-10 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-bold text-sm shadow-lg transition-all"
            >
              {loading
                ? "Registering..."
                : "Register Player 🏏"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default PlayerRegistration;