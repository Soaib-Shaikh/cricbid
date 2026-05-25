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

  }, []);

  const handleChange = (e) => {

    if (e.target.name === "image") {

      setFormData({
        ...formData,
        image: e.target.files[0],
      });

    } else {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });

    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data =
        new FormData();

      Object.keys(formData).forEach(
        (key) => {

          data.append(
            key,
            formData[key]
          );
        }
      );

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
        basePrice: "",
        image: null,
      });
      setLoading(false)
    } catch (error) {
      
      alert(
        error.response?.data
          ?.message ||
        "Failed"
      );

    } 
  };

  return (
    <div className="min-h-screen bg-[#EEF2F7] py-6 px-4">

      <div className="max-w-5xl mx-auto">

        {/* HERO */}
        <div className="relative rounded-[28px] overflow-hidden shadow-lg">

          {/* IMAGE */}
          <img
            src={
              tournament?.logo
            }
            alt=""
            className="w-full h-[230px] object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* CONTENT */}
          <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end text-white">

            <div className="bg-green-600 w-fit px-4 py-1.5 rounded-full text-xs font-semibold mb-4">

              Registration Open 🏏

            </div>

            <h1 className="text-3xl lg:text-5xl font-black leading-tight">

              {
                tournament?.tournamentName
              }

            </h1>

            {/* INFO */}
            <div className="flex flex-wrap items-center gap-5 mt-4 text-sm text-gray-200">

              <div className="flex items-center gap-2">

                <MapPin size={16} />

                {
                  tournament?.groundName
                }

              </div>

              <div className="flex items-center gap-2">

                <CalendarDays
                  size={16}
                />

                {
                  tournament?.tournamentDate?.slice(
                    0,
                    10
                  )
                }

              </div>

              <div className="flex items-center gap-2">

                <Trophy size={16} />

                {
                  tournament?.overs
                } Overs

              </div>

            </div>

          </div>

        </div>

        {/* FORM */}
        <div className="bg-white rounded-[28px] shadow-lg p-6 lg:p-8 mt-6">

          {/* TOP */}
          <div className="mb-8">

            <h2 className="text-3xl font-black text-gray-900">
              Player Registration
            </h2>

            <p className="text-gray-500 mt-2 text-sm">
              Fill your cricket details carefully
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            {/* NAME */}
            <div>

              <label className="text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={
                  handleChange
                }
                placeholder="Enter name"
                className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-green-500 text-sm"
              />

            </div>

            {/* PHONE */}
            <div>

              <label className="text-sm font-semibold text-gray-700">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={
                  handleChange
                }
                placeholder="Enter phone"
                className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-green-500 text-sm"
              />

            </div>

            {/* ROLE */}
            <div>

              <label className="text-sm font-semibold text-gray-700">
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={
                  handleChange
                }
                className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-green-500 text-sm"
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

            </div>

            {/* PRICE */}
            <div>

              <label className="text-sm font-semibold text-gray-700">
                Base Price
              </label>

              <input
                type="number"
                name="basePrice"
                value={
                  formData.basePrice || 1000
                }
                onChange={
                  handleChange
                }
                placeholder="Enter price"
                className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-green-500 text-sm"
              />

            </div>

            {/* BATTING */}
            <div>

              <label className="text-sm font-semibold text-gray-700">
                Batting Style
              </label>

              <select
                name="battingStyle"
                value={
                  formData.battingStyle
                }
                onChange={
                  handleChange
                }
                className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-green-500 text-sm"
              >

                <option value="">
                  Select Style
                </option>

                <option>
                  Right Handed
                </option>

                <option>
                  Left Handed
                </option>

              </select>

            </div>

            {/* BOWLING */}
            <div>

              <label className="text-sm font-semibold text-gray-700">
                Bowling Style
              </label>

              <select
                name="bowlingStyle"
                value={formData.bowlingStyle}
                onChange={handleChange}
                className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-green-500 text-sm"
              >

                <option value="">
                  Select Bowling Style
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

            </div>

            {/* ADDRESS */}
            <div>

              <label className="text-sm font-semibold text-gray-700">
                Address
              </label>

              <textarea
                rows={3}
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-green-500 resize-none text-sm"
              />

            </div>

            {/* IMAGE */}
            <div>

              <label className="text-sm font-semibold text-gray-700">
                Upload Image
              </label>

              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full mt-2 border border-dashed border-gray-300 rounded-2xl px-4 py-3 bg-gray-50 text-sm"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 transition-all text-white py-3 rounded-2xl text-sm font-semibold shadow-md"
            >

              {
                loading
                  ? "Registering..."
                  : "Register Player 🏏"
              }

            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default PlayerRegistration;