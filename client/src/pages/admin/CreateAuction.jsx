import React, {
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  createAuctionEvent,
} from "../../features/auction/auctionEventSlice";

const CreateAuction = () => {
  const dispatch =
    useDispatch();

  const {
    selectedTournament,
  } = useSelector(
    (state) =>
      state.tournament
  );

  const { loading } =
    useSelector(
      (state) =>
        state.auctionEvent
    );

  const [formData, setFormData] =
    useState({
      auctionName: "",
      auctionDate: "",
      auctionTime: "",
      venue: "",
    });

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (
        !selectedTournament
      ) {
        alert(
          "Please select tournament first"
        );
        return;
      }

      const auctionData =
        {
          ...formData,
          tournamentId:
            selectedTournament.tournamentId,
        };

      const res =
        await dispatch(
          createAuctionEvent(
            auctionData
          )
        );

      if (
        res.meta
          .requestStatus ===
        "fulfilled"
      ) {
        alert(
          "Auction created successfully 🔥"
        );

        setFormData({
          auctionName:
            "",
          auctionDate:
            "",
          auctionTime:
            "",
          venue: "",
        });
      } else {
        alert(
          res.payload
            ?.message ||
            "Auction creation failed"
        );
      }
    };

  return (
    <div className="min-h-screen bg-[#F5F7FB] p-6">
      <div className="max-w-4xl mx-auto">
        {/* TOP */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900">
            Create Auction 🏏
          </h1>

          <p className="text-gray-500 mt-2">
            Setup your auction before going live
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-6"
          >
            <div>
              <label className="text-sm font-medium text-gray-700">
                Auction Name
              </label>

              <input
                type="text"
                name="auctionName"
                value={
                  formData.auctionName
                }
                onChange={
                  handleChange
                }
                placeholder="Enter auction name"
                className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Auction Date
                </label>

                <input
                  type="date"
                  name="auctionDate"
                  value={
                    formData.auctionDate
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Auction Time
                </label>

                <input
                  type="time"
                  name="auctionTime"
                  value={
                    formData.auctionTime
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Venue
              </label>

              <input
                type="text"
                name="venue"
                value={
                  formData.venue
                }
                onChange={
                  handleChange
                }
                placeholder="Auction venue"
                className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3"
              />
            </div>

            {/* TOURNAMENT INFO */}
            {selectedTournament && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                <h3 className="font-black text-green-700">
                  Selected Tournament
                </h3>

                <p className="mt-2 text-gray-700">
                  {
                    selectedTournament.tournamentName
                  }
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  ID:{" "}
                  {
                    selectedTournament.tournamentId
                  }
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={
                loading
              }
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold"
            >
              {loading
                ? "Creating..."
                : "Create Auction 🚀"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAuction;