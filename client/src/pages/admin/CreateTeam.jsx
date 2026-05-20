import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTeam } from "../../features/team/teamSlice";

const CreateTeam = () => {

    const dispatch = useDispatch();
    const { selectedTournament } = useSelector(
        (state) => state.tournament
    );

    const fileInputRef = useRef(null);

    const { loading } = useSelector(
        (state) => state.team
    );

    const [formData, setFormData] = useState({
        name: "",
        logo: null,
    });

    const handleChange = (e) => {

        if (e.target.name === "logo") {

            setFormData({
                ...formData,
                logo: e.target.files[0],
            });

        } else {

            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });

        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!selectedTournament) {

            alert("Please select tournament first");

            return;
        }

        const data = new FormData();

        data.append("name", formData.name);
        data.append("logo", formData.logo);

        data.append(
            "tournamentId",
            selectedTournament.tournamentId
        );

        const res = await dispatch(addNewTeam(data));

        if (res.meta.requestStatus === "fulfilled") {

            alert("Team Created Successfully 🔥");

            setFormData({
                name: "",
                logo: null,
            });

            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F7FB] p-6">

            <div className="max-w-3xl mx-auto">

                {/* TOP */}
                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Create Team 🏏
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Add teams for your cricket auction
                    </p>

                </div>

                {/* CARD */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* TEAM NAME */}
                        <div>

                            <label className="text-sm font-medium text-gray-700">
                                Team Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter team name"
                                className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-500"
                            />

                        </div>

                        {/* TEAM LOGO */}
                        <div>

                            <label className="text-sm font-medium text-gray-700">
                                Team Logo
                            </label>

                            <input
                                ref={fileInputRef}
                                type="file"
                                name="logo"
                                onChange={handleChange}
                                className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3"
                            />

                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 hover:bg-green-700 transition-all text-white py-4 rounded-xl font-semibold"
                        >

                            {loading
                                ? "Creating..."
                                : "Create Team 🚀"}

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default CreateTeam;