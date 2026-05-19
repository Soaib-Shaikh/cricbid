import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiInstance from "../../api/apiInstance";

export const getAllTeams = createAsyncThunk(
    "teams/get",
    async (tournamentId, { rejectWithValue }) => {

        try {

            const res = await apiInstance.get(
                `/teams/${tournamentId}`
            );

            return res.data.teams;

        } catch (error) {

            return rejectWithValue(
                error.response?.data
            );

        }
    }
);

export const addNewTeam = createAsyncThunk(
    "teams/add",
    async (team, { rejectWithValue }) => {
        try {
            const res = await apiInstance.post("/teams", team);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const getSingleTeam =
    createAsyncThunk(

        "team/single",

        async (
            teamId,
            { rejectWithValue }
        ) => {

            try {

                const res =
                    await apiInstance.get(
                        `/teams/single/${teamId}`
                    );

                return res.data.team;

            } catch (error) {

                return rejectWithValue(
                    error.response?.data
                );

            }
        }
    );

const teamSlice = createSlice({
    name: "team",
    initialState: {
        loading: false,
        error: null,
        teams: [],
        singleTeam: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllTeams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTeams.fulfilled, (state, action) => {
                state.loading = false;
                state.teams = action.payload;
            })
            .addCase(getAllTeams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //  ADD TEAM
            .addCase(addNewTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(addNewTeam.fulfilled, (state, action) => {
                state.loading = false
                state.teams.push(action.payload.team);
            })

            .addCase(addNewTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(
                getSingleTeam.fulfilled,
                (state, action) => {

                    state.singleTeam =
                        action.payload;

                }
            )
    },
});

export default teamSlice.reducer;