import React, {
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  createTournament,
} from "../../features/tournament/tournamentSlice";

const CreateTournament = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.tournament
  );

  const [formData, setFormData] =
    useState({
      tournamentName: "",
      organizerName: "",
      groundName: "",
      city: "",
      overs: "",
      startDate: "",
      endDate: "",
      totalTeams: "",
      playersPerTeam: "",
      teamBudget: "",
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
        [e.target.name]:
          e.target.value,
      });
    }
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (
        new Date(formData.endDate) <
        new Date(formData.startDate)
      ) {
        alert(
          "End date cannot be before start date"
        );
        return;
      }

      const data = new FormData();

      Object.keys(formData).forEach(
        (key) => {
          data.append(
            key,
            formData[key]
          );
        }
      );

      const res = await dispatch(
        createTournament(data)
      );

      if (
        res.meta.requestStatus ===
        "fulfilled"
      ) {
        alert(
          "Tournament Created Successfully 🔥"
        );

        setFormData({
          tournamentName: "",
          organizerName: "",
          groundName: "",
          city: "",
          overs: "",
          startDate: "",
          endDate: "",
          totalTeams: "",
          playersPerTeam: "",
          teamBudget: "",
          logo: null,
        });
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#EEF2FF] p-6">
      <div className="max-w-6xl mx-auto">
        {/* TOP */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900">
            Create Tournament 🏏
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Setup your cricket league professionally
          </p>
        </div>

        <div className="bg-white rounded-[32px] shadow-xl border border-gray-200 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* LEFT */}
            <div className="bg-gradient-to-br from-green-600 via-green-500 to-orange-500 p-12 text-white flex flex-col justify-center">
              <h2 className="text-5xl font-black leading-tight">
                Launch Your Cricket Tournament 🚀
              </h2>

              <p className="mt-6 text-green-100 leading-8 text-lg">
                Manage teams, players, auction and reports from one dashboard.
              </p>
            </div>

            {/* RIGHT */}
            <div className="p-10">
              <form
                onSubmit={
                  handleSubmit
                }
                className="space-y-5"
              >
                <input
                  type="text"
                  name="tournamentName"
                  value={
                    formData.tournamentName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Tournament Name"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                />

                <input
                  type="text"
                  name="organizerName"
                  value={
                    formData.organizerName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Organizer Name"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                />

                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="groundName"
                    value={
                      formData.groundName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Ground Name"
                    className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                  />

                  <input
                    type="text"
                    name="city"
                    value={
                      formData.city
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="City"
                    className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                  />
                </div>

                <input
                  type="number"
                  name="overs"
                  value={
                    formData.overs
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Match Overs"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                />

                {/* NEW */}
                <div className="grid md:grid-cols-3 gap-5">
                  <input
                    type="number"
                    name="totalTeams"
                    value={
                      formData.totalTeams
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Total Teams"
                    className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                  />

                  <input
                    type="number"
                    name="playersPerTeam"
                    value={
                      formData.playersPerTeam
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Players / Team"
                    className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                  />

                  <input
                    type="number"
                    name="teamBudget"
                    value={
                      formData.teamBudget
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Team Budget"
                    className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="date"
                    name="startDate"
                    value={
                      formData.startDate
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                  />

                  <input
                    type="date"
                    name="endDate"
                    value={
                      formData.endDate
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                  />
                </div>

                <input
                  type="file"
                  name="logo"
                  onChange={
                    handleChange
                  }
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg"
                >
                  {loading
                    ? "Creating..."
                    : "Create Tournament 🏏"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTournament;