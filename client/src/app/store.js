import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice.js'
import teamReducer from '../features/team/teamSlice.js'
import playerReducer from '../features/player/playerSlice.js'
import auctionReducer from '../features/auction/auctionSlice.js'
import tournamentReducer from '../features/tournament/tournamentSlice.js'

const store = configureStore({
    reducer:{
        auth: authReducer,
        team: teamReducer,
        player: playerReducer,
        auction: auctionReducer,
        tournament: tournamentReducer,

    }
})

export default store;