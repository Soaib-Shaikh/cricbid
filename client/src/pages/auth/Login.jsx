import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Trophy,
  ShieldCheck,
  Users,
} from "lucide-react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  loginUser,
} from "../../features/auth/authSlice";

export default function Login() {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const { loading } =
    useSelector(
      (state) =>
        state.auth
    );

  const [form, setForm] =
    useState({
      email: "",
      password: "",
      remember: false,
    });

  const handleChange = (
    e
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleLogin =
    async () => {
      const res =
        await dispatch(
          loginUser(form)
        );

      if (
        res.meta
          .requestStatus ===
        "fulfilled"
      ) {
        navigate(
          "/tournaments"
        );
      } else {
        alert(
          res.payload
            ?.message ||
            "Login Failed"
        );
      }
    };

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center px-4">

      <div className="w-full max-w-5xl bg-white rounded-[32px] overflow-hidden shadow-xl grid lg:grid-cols-2">

        {/* LEFT */}
        <div className="bg-gradient-to-br from-red-600 to-red-500 p-10 text-white flex flex-col justify-center relative overflow-hidden">

          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">

            <h1 className="text-4xl font-black tracking-tight">
              CricBid 🏏
            </h1>

            <p className="mt-4 text-red-100 text-[15px] leading-7 max-w-md">
              Professional cricket auction platform
            </p>

            <div className="mt-10 space-y-4">

              <div className="bg-white/10 rounded-2xl px-5 py-4 flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-white text-red-600 flex items-center justify-center">
                  <Trophy size={20} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Tournament Management
                  </h3>
                </div>

              </div>

              <div className="bg-white/10 rounded-2xl px-5 py-4 flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-white text-red-600 flex items-center justify-center">
                  <Users size={20} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Player Registration
                  </h3>
                </div>

              </div>

              <div className="bg-white/10 rounded-2xl px-5 py-4 flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-white text-red-600 flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Live Auction
                  </h3>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="p-10 lg:p-14 flex flex-col justify-center">

          <h2 className="text-4xl font-black text-gray-900">
            Welcome Back 👋
          </h2>

          <div className="mt-10 space-y-5">

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={
                handleChange
              }
              className="w-full border border-gray-200 rounded-2xl px-5 py-3.5"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={
                handleChange
              }
              className="w-full border border-gray-200 rounded-2xl px-5 py-3.5"
            />

            <button
              onClick={
                handleLogin
              }
              disabled={
                loading
              }
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-2xl font-semibold"
            >
              {loading
                ? "Logging in..."
                : "Login to CricBid 🏏"}
            </button>

            <p className="mt-5 text-center text-sm text-gray-500">
              Don’t have an account?{' '}
              <Link
                to="/signup"
                className="text-red-600 font-bold hover:underline"
              >
                Sign up
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}