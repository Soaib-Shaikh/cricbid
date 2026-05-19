import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../api/apiInstance";

export const getCurrentAuction = createAsyncThunk(
    "auction/current",
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiInstance.get("/auction/current");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

// 🔥 START AUCTION
export const startAuction = createAsyncThunk(
    "auction/start",
    async ({ playerId, tournamentId }, { rejectWithValue }) => {
        try {
            const res = await apiInstance.post("/auction/start", {
                playerId,
                tournamentId,
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

// 🔥 BID
export const placeBid = createAsyncThunk(
    "auctions/bid",
    async ({ teamId, amount, tournamentId }, { rejectWithValue }) => {
        try {
            const res = await apiInstance.post("/auction/bid", {
                teamId,
                amount,
                tournamentId
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

// 🔥 SELL
export const sellPlayer = createAsyncThunk(
    "auction/sell",
    async (tournamentId, { rejectWithValue }) => {
        try {
            const res = await apiInstance.post("/auction/sell", {
                tournamentId,
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

export const unsoldPlayer = createAsyncThunk(
    "auction/unsold",
    async (tournamentId, { rejectWithValue }) => {
        try {
            const res = await apiInstance.post(
                "/auction/unsold",
                { tournamentId }
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data
            );
        }
    }
);

export const getAuctionHistory =
    createAsyncThunk(
        "auction/history",
        async (
            tournamentId,
            { rejectWithValue }
        ) => {
            try {
                const res =
                    await apiInstance.get(
                        `/auction/history/${tournamentId}`
                    );

                return res.data.history;

            } catch (err) {
                return rejectWithValue(
                    err.response?.data
                );
            }
        }
    );

const auctionSlice = createSlice({
    name: "auction",
    initialState: {
        current: null,
        loading: false,
        error: null,
        history: [],
    },
    reducers: {
        updateBid: (state, action) => {
            if (state.current) {
                state.current.currentBid = action.payload.currentBid;
                state.current.highestBidder = action.payload.teamId;
            }
        },
        playerSold: (state) => {
            state.current = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // get CurrentAuction
            .addCase(getCurrentAuction.pending, (state) => {
                state.loading = true;
                state.error = null
            })

            .addCase(getCurrentAuction.fulfilled, (state, action) => {
                state.current = action.payload;
            })

            .addCase(getCurrentAuction.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            //  START
            .addCase(startAuction.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(startAuction.fulfilled, (state, action) => {
                state.current = action.payload;
            })

            .addCase(startAuction.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            //  BID
            .addCase(placeBid.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(placeBid.fulfilled, (state, action) => {
                state.current = action.payload;
            })

            .addCase(placeBid.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            //  SELL
            .addCase(sellPlayer.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(sellPlayer.fulfilled, (state) => {
                state.current = null;
            })

            .addCase(sellPlayer.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            //Unsold
            .addCase(unsoldPlayer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(unsoldPlayer.fulfilled, (state) => {
                state.loading = false;
                state.current = null;
            })

            .addCase(unsoldPlayer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //History
            .addCase(
                getAuctionHistory.pending,
                (state) => {
                    state.loading = true;
                }
            )

            .addCase(
                getAuctionHistory.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.history =
                        action.payload;
                }
            )

            .addCase(
                getAuctionHistory.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error =
                        action.payload;
                }
            )
    },
});

export const { updateBid, playerSold } = auctionSlice.actions;
export default auctionSlice.reducer;