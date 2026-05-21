import React, {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getPlayers,
  setSelectedAuctionPlayer
} from "../../features/player/playerSlice";

import {
  getAllTeams,
} from "../../features/team/teamSlice";

import {
  Search,
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
} from "../../features/auction/auctionSlice";

const Auction = () => {
  const dispatch =
    useDispatch();

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
    }
  }, [
    dispatch,
    selectedTournament,
  ]);

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

      setHighestBidder(null);
      setBidHistory([]);
      setAuctionStarted(false);

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

  // SEARCH PLAYER
  const handleSearchPlayer = () => {
    const player =
      players[
      Number(playerNumber) - 1
      ];

    if (!player) {
      alert("Player Not Found");
      return;
    }

    if (
      player.status === "sold" ||
      player.teamId
    ) {
      alert(
        "Player already sold"
      );
      return;
    }

    setCurrentPlayer({
      ...player,
      index: playerNumber,
    });

    setCurrentBid(
      player.basePrice
    );

    setHighestBidder(null);
    setBidHistory([]);
    setAuctionStarted(false);
  };

  // START AUCTION
  const handleStartAuction =
    async () => {
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
        setAuctionStarted(true);
      }
    };

  // QUICK BID (+1000)
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
        currentBid + 1000;

      const res =
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

      if (
        res.meta
          .requestStatus ===
        "fulfilled"
      ) {
        setCurrentBid(
          bidAmount
        );

        setHighestBidder(
          team
        );

        setBidHistory(
          (prev) => [
            ...prev,
            {
              team,
              amount:
                bidAmount,
            },
          ]
        );
      }
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

      const bidAmount =
        Number(
          customBidAmount
        );

      if (
        !bidAmount ||
        bidAmount <=
        currentBid
      ) {
        alert(
          "Enter higher bid amount"
        );
        return;
      }

      const res =
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

      if (
        res.meta
          .requestStatus ===
        "fulfilled"
      ) {
        setCurrentBid(
          bidAmount
        );

        setHighestBidder(
          selectedTeam
        );

        setBidHistory(
          (prev) => [
            ...prev,
            {
              team:
                selectedTeam,
              amount:
                bidAmount,
            },
          ]
        );

        setCustomBidAmount(
          ""
        );

        setSelectedTeam(
          null
        );
      }
    };

  // SOLD
  const handleSold =
    async () => {
      if (
        !highestBidder
      ) {
        alert(
          "No bids placed"
        );
        return;
      }

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
        alert(
          `${currentPlayer.name} sold to ${highestBidder.name}`
        );

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

        setAuctionStarted(
          false
        );
      }
    };

  // UNSOLD
  const handleUnsold =
    async () => {
      if (
        !currentPlayer
      ) {
        alert(
          "No player selected"
        );
        return;
      }

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
        alert(
          `${currentPlayer.name} marked unsold`
        );

        dispatch(
          getPlayers(
            selectedTournament.tournamentId
          )
        );

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

        setBidHistory(
          []
        );

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
      setPlayerNumber("");
      setAuctionStarted(
        false
      );
    };

  return (
    <div className="min-h-screen bg-[#F3F6FB] p-6">

      {/* HEADER */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 mb-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>
            <h1 className="text-4xl font-black text-gray-900">
              Auction Command Center 🏏
            </h1>

            <p className="text-gray-500 mt-2">
              Real-time cricket auction management
            </p>
          </div>

          <div className="flex gap-3">

            <input
              type="number"
              value={playerNumber}
              onChange={(e) =>
                setPlayerNumber(e.target.value)
              }
              placeholder="Enter Player No."
              className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none w-[220px]"
            />

            <button
              onClick={handleSearchPlayer}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-2xl flex items-center gap-2 font-bold shadow-lg"
            >
              <Search size={18} />
              Search
            </button>

          </div>

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
            currentBid={currentBid}
            highestBidder={highestBidder}
          />

          <AuctionControls
            onStart={handleStartAuction}
            onSold={handleSold}
            onUnsold={handleUnsold}
            onReset={handleReset}
            disabled={!currentPlayer}
          />

          {/* CUSTOM BID */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200">

            <h3 className="text-2xl font-black text-gray-900 mb-5">
              Custom Bid 💰
            </h3>

            <select
              value={selectedTeam?._id || ""}
              onChange={(e) => {
                const team = teams.find(
                  (t) => t._id === e.target.value
                );
                setSelectedTeam(team);
              }}
              className="w-full border border-gray-200 rounded-2xl px-4 py-4 mb-4 bg-gray-50"
            >
              <option value="">
                Select Team
              </option>

              {teams.map((team) => (
                <option
                  key={team._id}
                  value={team._id}
                >
                  {team.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={customBidAmount}
              onChange={(e) =>
                setCustomBidAmount(
                  e.target.value
                )
              }
              placeholder="Enter higher bid amount"
              className="w-full border border-gray-200 rounded-2xl px-4 py-4 mb-4 bg-gray-50"
            />

            <button
              onClick={handleCustomBid}
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

              {teams?.map((team) => (
                <TeamCard
                  key={team._id}
                  team={team}
                  onBid={() =>
                    handleQuickBid(team)
                  }
                />
              ))}

            </div>

          </div>

        </div>

      </div>

      {/* HISTORY */}
      <div className="mt-6">
        <LiveBidHistory
          bidHistory={bidHistory}
        />
      </div>

    </div>
  );
};

export default Auction;