import React, {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import {
  getPlayers,
  setSelectedAuctionPlayer,
} from "../../features/player/playerSlice";

import {
  getAllTeams,
} from "../../features/team/teamSlice";

import {
  Search,
  Link,
  Share2,
  Calendar,
  MapPin,
  Clock3,
} from "lucide-react";

import PlayerCard from "../../components/player/PlayerCard";
import TeamCard from "../../components/team/TeamCard";
import BidPanel from "../../components/auction/BidPanel";
import LiveBidHistory from "../../components/auction/LiveBidHistory";
import AuctionControls from "../../components/auction/AuctionControls";

import {
  placeBid,
  sellPlayer,
  startAuction,
  unsoldPlayer,
  getCurrentAuction,
} from "../../features/auction/auctionSlice";

import {
  getSingleAuctionEvent,
} from "../../features/auction/auctionEventSlice";

import socket from "../../socket/socket";

const Auction = () => {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const {
    players,
    selectedAuctionPlayer,
  } = useSelector(
    (state) =>
      state.player
  );

  const {
    teams,
  } = useSelector(
    (state) =>
      state.team
  );

  const {
    selectedTournament,
  } = useSelector(
    (state) =>
      state.tournament
  );

  const {
    current,
  } = useSelector(
    (state) =>
      state.auction
  );

  const {
    selectedAuction,
  } = useSelector(
    (state) =>
      state.auctionEvent
  );

  const [
    playerNumber,
    setPlayerNumber,
  ] = useState("");

  const [
    currentPlayer,
    setCurrentPlayer,
  ] = useState(null);

  const [
    currentBid,
    setCurrentBid,
  ] = useState(0);

  const [
    highestBidder,
    setHighestBidder,
  ] = useState(null);

  const [
    bidHistory,
    setBidHistory,
  ] = useState([]);

  const [
    auctionStarted,
    setAuctionStarted,
  ] = useState(false);

  const [
    customBidAmount,
    setCustomBidAmount,
  ] = useState("");

  const [
    selectedTeam,
    setSelectedTeam,
  ] = useState(null);


  // INITIAL LOAD
  useEffect(() => {
    if (
      selectedTournament?.tournamentId
    ) {
      dispatch(
        getPlayers(
          selectedTournament.tournamentId
        )
      );

      dispatch(
        getAllTeams(
          selectedTournament.tournamentId
        )
      );

      dispatch(
        getCurrentAuction()
      );

      dispatch(
        getSingleAuctionEvent(
          selectedTournament.tournamentId
        )
      );
    }
  }, [
    dispatch,
    selectedTournament,
  ]);


  // PLAYER SELECT
  useEffect(() => {
    if (
      selectedAuctionPlayer
    ) {
      const playerIndex =
        players.findIndex(
          (p) =>
            p._id ===
            selectedAuctionPlayer._id
        );

      setCurrentPlayer({
        ...selectedAuctionPlayer,
        index:
          playerIndex + 1,
      });

      setCurrentBid(
        selectedAuctionPlayer.basePrice
      );

      setHighestBidder(
        null
      );

      setBidHistory([]);

      setAuctionStarted(
        false
      );

      dispatch(
        setSelectedAuctionPlayer(
          null
        )
      );
    }
  }, [
    selectedAuctionPlayer,
    players,
    dispatch,
  ]);


  // CURRENT LIVE AUCTION
  useEffect(() => {
    if (
      current?.currentPlayer
    ) {
      setCurrentPlayer(
        (prev) => ({
          ...prev,
          ...current.currentPlayer,
        })
      );

      setCurrentBid(
        current.currentBid
      );

      setHighestBidder(
        current.highestBidder ||
          null
      );

      setAuctionStarted(
        current.status ===
          "running"
      );
    }
  }, [current]);


  // SOCKET
  useEffect(() => {
    if (
      !selectedTournament?.tournamentId
    )
      return;

    socket.emit(
      "joinAuction",
      selectedTournament.tournamentId
    );

    socket.on(
      "auctionStart",
      (data) => {
        setCurrentPlayer(
          data.player
        );

        setCurrentBid(
          data.basePrice
        );

        setHighestBidder(
          null
        );

        setBidHistory([]);

        setAuctionStarted(
          true
        );
      }
    );

    socket.on(
      "bidUpdate",
      (data) => {
        setCurrentBid(
          data.currentBid
        );

        setHighestBidder(
          data.highestBidder
        );

        setBidHistory(
          (prev) => [
            ...prev,
            {
              team: {
                name:
                  data
                    .highestBidder
                    ?.name ||
                  "Unknown",
                logo:
                  data
                    .highestBidder
                    ?.logo ||
                  "",
              },
              amount:
                data.currentBid,
            },
          ]
        );

        dispatch(
          getAllTeams(
            selectedTournament.tournamentId
          )
        );
      }
    );

    socket.on(
      "playerSold",
      () => {
        dispatch(
          getAllTeams(
            selectedTournament.tournamentId
          )
        );

        dispatch(
          getPlayers(
            selectedTournament.tournamentId
          )
        );
      }
    );

    return () => {
      socket.off(
        "auctionStart"
      );

      socket.off(
        "bidUpdate"
      );

      socket.off(
        "playerSold"
      );
    };
  }, [
    selectedTournament,
    dispatch,
  ]);

  // SEARCH PLAYER
  const handleSearchPlayer =
    () => {
      if (
        !selectedAuction
      ) {
        alert(
          "Create auction first"
        );
        return;
      }

      const player =
        players[
          Number(
            playerNumber
          ) - 1
        ];

      if (!player) {
        alert(
          "Player Not Found"
        );
        return;
      }

      if (
        player.status ===
          "sold" ||
        player.teamId
      ) {
        alert(
          "Player already sold"
        );
        return;
      }

      setCurrentPlayer({
        ...player,
        index:
          playerNumber,
      });

      setCurrentBid(
        player.basePrice
      );

      setHighestBidder(
        null
      );

      setBidHistory([]);

      setAuctionStarted(
        false
      );
    };


  // START
  const handleStartAuction =
    async () => {
      if (
        !selectedAuction
      ) {
        alert(
          "Create auction first"
        );
        return;
      }

      if (
        !currentPlayer
      ) {
        alert(
          "Select player first"
        );
        return;
      }

      const res =
        await dispatch(
          startAuction({
            playerId:
              currentPlayer._id,
            tournamentId:
              selectedTournament.tournamentId,
          })
        );

      if (
        res.meta
          .requestStatus ===
        "fulfilled"
      ) {
        setAuctionStarted(
          true
        );

        setCurrentBid(
          currentPlayer.basePrice ||
            1000
        );

        setHighestBidder(
          null
        );

        setBidHistory([]);
      }
    };


  // QUICK BID
  const handleQuickBid =
    async (team) => {
      if (
        !auctionStarted
      ) {
        alert(
          "Start auction first"
        );
        return;
      }

      const bidAmount =
        highestBidder
          ? currentBid +
            1000
          : currentBid;

      await dispatch(
        placeBid({
          teamId:
            team._id,
          amount:
            bidAmount,
          tournamentId:
            selectedTournament.tournamentId,
        })
      );
    };


  // CUSTOM BID
  const handleCustomBid =
    async () => {
      if (
        !auctionStarted
      ) {
        alert(
          "Start auction first"
        );
        return;
      }

      if (
        !selectedTeam
      ) {
        alert(
          "Select team first"
        );
        return;
      }

      const minimumBid =
        highestBidder
          ? currentBid +
            1000
          : currentBid;

      const bidAmount =
        Number(
          customBidAmount
        );

      if (
        !bidAmount ||
        bidAmount <
          minimumBid
      ) {
        alert(
          `Minimum bid is ₹${minimumBid}`
        );
        return;
      }

      await dispatch(
        placeBid({
          teamId:
            selectedTeam._id,
          amount:
            bidAmount,
          tournamentId:
            selectedTournament.tournamentId,
        })
      );

      setCustomBidAmount(
        ""
      );

      setSelectedTeam(
        null
      );
    };


  // SOLD
  const handleSold =
    async () => {
      const res =
        await dispatch(
          sellPlayer(
            selectedTournament.tournamentId
          )
        );

      if (
        res.meta
          .requestStatus ===
        "fulfilled"
      ) {
        setAuctionStarted(
          false
        );

        setCurrentPlayer(
          null
        );

        setCurrentBid(0);

        setHighestBidder(
          null
        );

        setBidHistory([]);

        setPlayerNumber(
          ""
        );
      }
    };


  // UNSOLD
  const handleUnsold =
    async () => {
      const res =
        await dispatch(
          unsoldPlayer(
            selectedTournament.tournamentId
          )
        );

      if (
        res.meta
          .requestStatus ===
        "fulfilled"
      ) {
        setAuctionStarted(
          false
        );

        setCurrentPlayer(
          null
        );

        setCurrentBid(0);

        setHighestBidder(
          null
        );

        setBidHistory([]);

        setPlayerNumber(
          ""
        );
      }
    };


  // RESET
  const handleReset =
    () => {
      setCurrentPlayer(
        null
      );

      setCurrentBid(0);

      setHighestBidder(
        null
      );

      setBidHistory([]);

      setPlayerNumber(
        ""
      );

      setAuctionStarted(
        false
      );
    };


  // COPY LINK
  const handleCopyLiveLink =
    async () => {
      const liveLink = `${window.location.origin}/live/${selectedTournament.tournamentId}`;

      await navigator.clipboard.writeText(
        liveLink
      );

      alert(
        "Live link copied 🔗"
      );
    };


  // SHARE
  const handleShareWhatsApp =
    () => {
      const liveLink = `${window.location.origin}/live/${selectedTournament.tournamentId}`;

      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          `🏏 Join Live CricBid Auction!\n${liveLink}`
        )}`,
        "_blank"
      );
    };


  // NO AUCTION GUARD
  if (
    !selectedAuction
  ) {
    return (
      <div className="min-h-screen bg-[#F3F6FB] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-12 text-center max-w-xl w-full">
          <h1 className="text-4xl font-black text-gray-900">
            No Auction Created 🏏
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Create auction setup first before starting live bidding.
          </p>

          <button
            onClick={() =>
              navigate(
                "/create-auction"
              )
            }
            className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-black"
          >
            Create Auction 🏏
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#F3F6FB] p-6">

      {/* HEADER */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 mb-6">

        <div className="flex justify-between items-start gap-6 flex-wrap">

          <div>
            <h1 className="text-4xl font-black text-gray-900">
              {selectedAuction.auctionName}
            </h1>

            <div className="flex gap-6 mt-4 flex-wrap text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                {new Date(
                  selectedAuction.auctionDate
                ).toLocaleDateString()}
              </div>

              <div className="flex items-center gap-2">
                <Clock3 size={18} />
                {selectedAuction.auctionTime}
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={18} />
                {selectedAuction.venue}
              </div>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={
                handleCopyLiveLink
              }
              className="bg-blue-600 text-white px-5 py-4 rounded-2xl font-bold flex items-center gap-2"
            >
              <Link size={18} />
              Copy Link
            </button>

            <button
              onClick={
                handleShareWhatsApp
              }
              className="bg-green-600 text-white px-5 py-4 rounded-2xl font-bold flex items-center gap-2"
            >
              <Share2 size={18} />
              Share
            </button>
          </div>

        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex flex-wrap gap-3 items-center">

          <input
            type="number"
            value={playerNumber}
            onChange={(e) =>
              setPlayerNumber(
                e.target.value
              )
            }
            placeholder="Enter Player No."
            className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none w-[220px]"
          />

          <button
            onClick={
              handleSearchPlayer
            }
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-2xl flex items-center gap-2 font-bold"
          >
            <Search size={18} />
            Search Player
          </button>

        </div>
      </div>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* PLAYER */}
        <div className="xl:col-span-5">
          <PlayerCard
            player={currentPlayer}
            currentBid={currentBid}
          />
        </div>

        {/* CENTER */}
        <div className="xl:col-span-3 space-y-6">

          <BidPanel
            currentBid={
              current?.currentBid ||
              currentBid
            }
            highestBidder={
              current?.highestBidder ||
              highestBidder
            }
          />

          <AuctionControls
            onStart={
              handleStartAuction
            }
            onSold={handleSold}
            onUnsold={
              handleUnsold
            }
            onReset={handleReset}
            disabled={
              !currentPlayer
            }
          />

          {/* CUSTOM BID */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200">

            <h3 className="text-2xl font-black text-gray-900 mb-5">
              Custom Bid 💰
            </h3>

            <select
              value={
                selectedTeam?._id ||
                ""
              }
              onChange={(e) => {
                const team =
                  teams.find(
                    (t) =>
                      t._id ===
                      e.target.value
                  );

                setSelectedTeam(
                  team
                );
              }}
              className="w-full border border-gray-200 rounded-2xl px-4 py-4 mb-4 bg-gray-50"
            >
              <option value="">
                Select Team
              </option>

              {teams.map(
                (team) => (
                  <option
                    key={
                      team._id
                    }
                    value={
                      team._id
                    }
                  >
                    {team.name}
                  </option>
                )
              )}
            </select>

            <input
              type="number"
              value={
                customBidAmount
              }
              onChange={(e) =>
                setCustomBidAmount(
                  e.target.value
                )
              }
              placeholder="Enter higher bid amount"
              className="w-full border border-gray-200 rounded-2xl px-4 py-4 mb-4 bg-gray-50"
            />

            <button
              onClick={
                handleCustomBid
              }
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-4 rounded-2xl font-black shadow-lg"
            >
              Place Custom Bid
            </button>

          </div>

        </div>

        {/* TEAM GRID */}
        <div className="xl:col-span-4">

          <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-5 h-full">

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-2xl font-black text-gray-900">
                Teams ⚡
              </h2>

              <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full font-bold text-sm">
                {teams.length} Teams
              </span>

            </div>

            <div className="grid grid-cols-2 gap-3 max-h-[700px] overflow-y-auto pr-2">

              {teams?.map(
                (team) => (
                  <TeamCard
                    key={team._id}
                    team={team}
                    onBid={() =>
                      handleQuickBid(
                        team
                      )
                    }
                  />
                )
              )}

            </div>

          </div>

        </div>

      </div>

      {/* HISTORY */}
      <div className="mt-6">
        <LiveBidHistory
          bidHistory={
            bidHistory
          }
        />
      </div>

    </div>
  );
};

export default Auction;