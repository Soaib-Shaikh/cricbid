import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import apiInstance from "../../api/apiInstance";

export const getPlayers =
  createAsyncThunk(
    "player/getPlayers",
    async (
      tournamentId,
      {
        rejectWithValue,
      }
    ) => {
      try {
        const res =
          await apiInstance.get(
            `/players/${tournamentId}`
          );

        return res.data.players;
      } catch (err) {
        return rejectWithValue(
          err.response?.data
        );
      }
    }
  );

export const addPlayer =
  createAsyncThunk(
    "player/add",
    async (
      formData,
      {
        rejectWithValue,
      }
    ) => {
      try {
        const res =
          await apiInstance.post(
            "/players",
            formData
          );

        return res.data.player;
      } catch (err) {
        return rejectWithValue(
          err.response?.data
        );
      }
    }
  );

const playerSlice =
  createSlice({
    name: "player",

    initialState: {
      players: [],
      selectedAuctionPlayer:
        null,
      loading: false,
      error: null,
    },

    reducers: {
      setSelectedAuctionPlayer:
        (
          state,
          action
        ) => {
          state.selectedAuctionPlayer =
            action.payload;
        },
    },

    extraReducers: (
      builder
    ) => {
      builder
        .addCase(
          getPlayers.pending,
          (state) => {
            state.loading =
              true;
            state.error =
              null;
          }
        )

        .addCase(
          getPlayers.fulfilled,
          (
            state,
            action
          ) => {
            state.loading =
              false;
            state.players =
              action.payload;
          }
        )

        .addCase(
          getPlayers.rejected,
          (
            state,
            action
          ) => {
            state.loading =
              false;
            state.error =
              action.payload;
          }
        )

        .addCase(
          addPlayer.pending,
          (state) => {
            state.loading =
              true;
            state.error =
              null;
          }
        )

        .addCase(
          addPlayer.fulfilled,
          (
            state,
            action
          ) => {
            state.loading =
              false;
            state.players.push(
              action.payload
            );
          }
        )

        .addCase(
          addPlayer.rejected,
          (
            state,
            action
          ) => {
            state.loading =
              false;
            state.error =
              action.payload;
          }
        );
    },
  });

export const {
  setSelectedAuctionPlayer,
} =
  playerSlice.actions;

export default playerSlice.reducer;