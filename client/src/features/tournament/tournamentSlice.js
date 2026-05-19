  import {
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";

  import apiInstance from "../../api/apiInstance";

  /* GET ALL */
  export const getTournaments =
    createAsyncThunk(
      "tournament/getAll",
      async (
        _,
        { rejectWithValue }
      ) => {
        try {
          const res =
            await apiInstance.get(
              "/tournament"
            );

          return res.data
            .tournaments;

        } catch (error) {
          return rejectWithValue(
            error.response?.data
          );
        }
      }
    );

  /* CREATE */
  export const createTournament =
    createAsyncThunk(
      "tournament/add",
      async (
        tournament,
        { rejectWithValue }
      ) => {
        try {
          const res =
            await apiInstance.post(
              "/tournament",
              tournament
            );

          return res.data
            .tournament;

        } catch (error) {
          return rejectWithValue(
            error.response?.data
          );
        }
      }
    );

  /* GET SINGLE */
  export const getSingleTournament =
    createAsyncThunk(
      "tournament/getSingle",
      async (
        tournamentId,
        { rejectWithValue }
      ) => {
        try {
          const res =
            await apiInstance.get(
              `/tournament/${tournamentId}`
            );

          return res.data
            .tournament;

        } catch (error) {
          return rejectWithValue(
            error.response?.data
          );
        }
      }
    );

  /* UPDATE */
  export const updateTournament =
    createAsyncThunk(
      "tournament/update",
      async (
        {
          tournamentId,
          formData,
        },
        {
          rejectWithValue,
        }
      ) => {
        try {
          const res =
            await apiInstance.put(
              `/tournament/${tournamentId}`,
              formData
            );

          return res.data
            .tournament;

        } catch (error) {
          return rejectWithValue(
            error.response?.data
          );
        }
      }
    );

  const tournamentSlice =
    createSlice({
      name: "tournament",

      initialState: {
        tournaments: [],
        selectedTournament:
          JSON.parse(
            localStorage.getItem(
              "selectedTournament"
            )
          ) || null,
        loading: false,
        error: null,
      },

      reducers: {
        setSelectedTournament: (
          state,
          action
        ) => {
          state.selectedTournament =
            action.payload;

          localStorage.setItem(
            "selectedTournament",
            JSON.stringify(
              action.payload
            )
          );
        },
      },

      extraReducers: (
        builder
      ) => {
        builder

          /* CREATE */
          .addCase(
            createTournament.pending,
            (state) => {
              state.loading = true;
              state.error = null;
            }
          )

          .addCase(
            createTournament.fulfilled,
            (
              state,
              action
            ) => {
              state.loading = false;

              state.tournaments.unshift(
                action.payload
              );
            }
          )

          .addCase(
            createTournament.rejected,
            (
              state,
              action
            ) => {
              state.loading = false;
              state.error =
                action.payload;
            }
          )

          /* GET ALL */
          .addCase(
            getTournaments.pending,
            (state) => {
              state.loading = true;
            }
          )

          .addCase(
            getTournaments.fulfilled,
            (
              state,
              action
            ) => {
              state.loading = false;
              state.tournaments =
                action.payload;
            }
          )

          .addCase(
            getTournaments.rejected,
            (
              state,
              action
            ) => {
              state.loading = false;
              state.error =
                action.payload;
            }
          )

          /* GET SINGLE */
          .addCase(
            getSingleTournament.pending,
            (state) => {
              state.loading = true;
            }
          )

          .addCase(
            getSingleTournament.fulfilled,
            (
              state,
              action
            ) => {
              state.loading = false;

              state.selectedTournament =
                action.payload;

              localStorage.setItem(
                "selectedTournament",
                JSON.stringify(
                  action.payload
                )
              );
            }
          )

          .addCase(
            getSingleTournament.rejected,
            (
              state,
              action
            ) => {
              state.loading = false;
              state.error =
                action.payload;
            }
          )

          /* UPDATE */
          .addCase(
            updateTournament.pending,
            (state) => {
              state.loading = true;
            }
          )

          .addCase(
            updateTournament.fulfilled,
            (
              state,
              action
            ) => {
              state.loading = false;

              state.tournaments =
                state.tournaments.map(
                  (
                    tournament
                  ) =>
                    tournament.tournamentId ===
                    action.payload.tournamentId
                      ? action.payload
                      : tournament
                );

              state.selectedTournament =
                action.payload;

              localStorage.setItem(
                "selectedTournament",
                JSON.stringify(
                  action.payload
                )
              );
            }
          )

          .addCase(
            updateTournament.rejected,
            (
              state,
              action
            ) => {
              state.loading = false;
              state.error =
                action.payload;
            }
          );
      },
    });

  export const {
    setSelectedTournament,
  } =
    tournamentSlice.actions;

  export default
    tournamentSlice.reducer;