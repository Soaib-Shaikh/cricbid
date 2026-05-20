// MODERN PREMIUM SIGNUP 🏏

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/apiInstance";

import {
  Trophy,
  Users,
  ShieldCheck,
} from "lucide-react";

export default function Signup() {

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.password.trim()
    ) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await api.post(
        "/auth/register",
        form
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
      });

      alert("Registered Successfully 🎉");

      navigate("/");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Signup Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2F7] flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-4xl bg-white rounded-[28px] overflow-hidden shadow-xl grid lg:grid-cols-2">

        {/* LEFT */}
        <div className="bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E293B] p-8 lg:p-10 text-white relative overflow-hidden flex flex-col justify-center">

          {/* GLOW */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-red-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">

            {/* LOGO */}
            <h1 className="text-4xl font-black tracking-tight">
              CricBid 🏏
            </h1>

            <p className="mt-4 text-gray-300 text-sm leading-7 max-w-sm">
              Smart cricket auction platform for
              tournaments, teams & live bidding.
            </p>

            {/* FEATURES */}
            <div className="mt-8 space-y-4">

              {/* CARD */}
              <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-4 flex items-center gap-4 backdrop-blur-md">

                <div className="w-11 h-11 rounded-xl bg-green-500 flex items-center justify-center shrink-0">

                  <Trophy size={18} />

                </div>

                <div>

                  <h3 className="font-semibold text-[15px]">
                    Tournament Setup
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    Manage cricket leagues easily
                  </p>

                </div>

              </div>

              {/* CARD */}
              <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-4 flex items-center gap-4 backdrop-blur-md">

                <div className="w-11 h-11 rounded-xl bg-green-500 flex items-center justify-center shrink-0">

                  <Users size={18} />

                </div>

                <div>

                  <h3 className="font-semibold text-[15px]">
                    Teams & Players
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    Handle registrations smoothly
                  </p>

                </div>

              </div>

              {/* CARD */}
              <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-4 flex items-center gap-4 backdrop-blur-md">

                <div className="w-11 h-11 rounded-xl bg-green-500 flex items-center justify-center shrink-0">

                  <ShieldCheck size={18} />

                </div>

                <div>

                  <h3 className="font-semibold text-[15px]">
                    Live Auction
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    Real-time player bidding system
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="p-8 lg:p-10 flex flex-col justify-center">

          {/* TOP */}
          <div>

            <h2 className="text-4xl font-black text-gray-900">
              Create Account ✨
            </h2>

            <p className="text-gray-500 mt-3 text-sm">
              Join CricBid & start your auction
            </p>

          </div>

          {/* FORM */}
          <div className="mt-8 space-y-5">

            {/* NAME */}
            <div>

              <label className="text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                placeholder="Enter your full name"
                onChange={handleChange}
                className="w-full mt-2 border border-gray-200 rounded-2xl px-5 py-3 text-sm outline-none focus:border-green-500"
              />

            </div>

            {/* EMAIL */}
            <div>

              <label className="text-sm font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full mt-2 border border-gray-200 rounded-2xl px-5 py-3 text-sm outline-none focus:border-green-500"
              />

            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={form.phone}
                placeholder="Enter phone number"
                onChange={handleChange}
                className="w-full mt-2 border border-gray-200 rounded-2xl px-5 py-3 text-sm outline-none focus:border-green-500"
              />
            </div>

            {/* PASSWORD */}
            <div>

              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                placeholder="Create password"
                onChange={handleChange}
                className="w-full mt-2 border border-gray-200 rounded-2xl px-5 py-3 text-sm outline-none focus:border-green-500"
              />

            </div>

            {/* BUTTON */}
            <button
              type="button"
              disabled={loading}
              onClick={handleSignup}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 transition-all text-white py-3 rounded-2xl text-sm font-semibold shadow-lg shadow-green-500/20"
            >
              {loading
                ? "Creating Account..."
                : "Create Account 🏏"}
            </button>

          </div>

          {/* BOTTOM */}
          <p className="mt-7 text-gray-600 text-center text-sm">

            Already have an account?{" "}

            <Link
              to="/"
              className="text-green-600 font-bold hover:underline"
            >

              Login

            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}