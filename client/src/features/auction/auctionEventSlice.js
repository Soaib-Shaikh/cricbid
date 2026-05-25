import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import apiInstance from "../../api/apiInstance";


// CREATE AUCTION
export const createAuctionEvent =
  createAsyncThunk(
    "auctionEvent/create",
    async (
      auctionData,
      { rejectWithValue }
    ) => {
      try {
        const res =
          await apiInstance.post(
            "/auction-event/create",
            auctionData
          );

        return res.data.auction;
      } catch (err) {
        return rejectWithValue(
          err.response?.data
        );
      }
    }
  );


// GET ALL
export const getAuctionEvents =
  createAsyncThunk(
    "auctionEvent/all",
    async (
      _,
      { rejectWithValue }
    ) => {
      try {
        const res =
          await apiInstance.get(
            "/auction-event/all"
          );

        return res.data.auctions;
      } catch (err) {
        return rejectWithValue(
          err.response?.data
        );
      }
    }
  );


// GET SINGLE
export const getSingleAuctionEvent =
  createAsyncThunk(
    "auctionEvent/single",
    async (
      tournamentId,
      { rejectWithValue }
    ) => {
      try {
        const res =
          await apiInstance.get(
            `/auction-event/${tournamentId}`
          );

        return res.data.auction;
      } catch (err) {
        return rejectWithValue(
          err.response?.data
        );
      }
    }
  );


// START EVENT
export const startAuctionEvent =
  createAsyncThunk(
    "auctionEvent/start",
    async (
      tournamentId,
      { rejectWithValue }
    ) => {
      try {
        const res =
          await apiInstance.post(
            "/auction-event/start",
            {
              tournamentId,
            }
          );

        return res.data.auction;
      } catch (err) {
        return rejectWithValue(
          err.response?.data
        );
      }
    }
  );


// COMPLETE EVENT
export const completeAuctionEvent =
  createAsyncThunk(
    "auctionEvent/complete",
    async (
      tournamentId,
      { rejectWithValue }
    ) => {
      try {
        const res =
          await apiInstance.post(
            "/auction-event/complete",
            {
              tournamentId,
            }
          );

        return res.data.auction;
      } catch (err) {
        return rejectWithValue(
          err.response?.data
        );
      }
    }
  );


const auctionEventSlice =
  createSlice({
    name: "auctionEvent",

    initialState: {
      auctions: [],
      selectedAuction: null,
      loading: false,
      error: null,
    },

    reducers: {},

    extraReducers: (
      builder
    ) => {
      builder

        // CREATE
        .addCase(
          createAuctionEvent.pending,
          (state) => {
            state.loading =
              true;
            state.error =
              null;
          }
        )

        .addCase(
          createAuctionEvent.fulfilled,
          (
            state,
            action
          ) => {
            state.loading =
              false;

            state.auctions.unshift(
              action.payload
            );
          }
        )

        .addCase(
          createAuctionEvent.rejected,
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

        // GET ALL
        .addCase(
          getAuctionEvents.pending,
          (state) => {
            state.loading =
              true;
          }
        )

        .addCase(
          getAuctionEvents.fulfilled,
          (
            state,
            action
          ) => {
            state.loading =
              false;

            state.auctions =
              action.payload;
          }
        )

        .addCase(
          getAuctionEvents.rejected,
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

        // SINGLE
        .addCase(
          getSingleAuctionEvent.pending,
          (state) => {
            state.loading =
              true;
          }
        )

        .addCase(
          getSingleAuctionEvent.fulfilled,
          (
            state,
            action
          ) => {
            state.loading =
              false;

            state.selectedAuction =
              action.payload;
          }
        )

        .addCase(
          getSingleAuctionEvent.rejected,
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

        // START
        .addCase(
          startAuctionEvent.pending,
          (state) => {
            state.loading =
              true;
          }
        )

        .addCase(
          startAuctionEvent.fulfilled,
          (
            state,
            action
          ) => {
            state.loading =
              false;

            state.selectedAuction =
              action.payload;
          }
        )

        .addCase(
          startAuctionEvent.rejected,
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

        // COMPLETE
        .addCase(
          completeAuctionEvent.pending,
          (state) => {
            state.loading =
              true;
          }
        )

        .addCase(
          completeAuctionEvent.fulfilled,
          (
            state,
            action
          ) => {
            state.loading =
              false;

            state.selectedAuction =
              action.payload;
          }
        )

        .addCase(
          completeAuctionEvent.rejected,
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

export default
  auctionEventSlice.reducer;