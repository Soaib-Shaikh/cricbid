import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import apiInstance from "../../api/apiInstance";

export const registerUser =
  createAsyncThunk(
    "auth/register",
    async (
      user,
      { rejectWithValue }
    ) => {
      try {
        const res =
          await apiInstance.post(
            "/auth/register",
            user
          );

        return res.data;

      } catch (error) {
        return rejectWithValue(
          error.response?.data
        );
      }
    }
  );

export const loginUser =
  createAsyncThunk(
    "auth/login",
    async (
      user,
      { rejectWithValue }
    ) => {
      try {
        const res =
          await apiInstance.post(
            "/auth/login",
            user
          );

        // SAVE TOKEN
        localStorage.setItem(
          "token",
          res.data.token
        );

        // SAVE USER
        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        return res.data;

      } catch (error) {
        return rejectWithValue(
          error.response?.data
        );
      }
    }
  );

const authSlice =
  createSlice({
    name: "auth",

    initialState: {
      user:
        JSON.parse(
          localStorage.getItem(
            "user"
          )
        ) || null,

      token:
        localStorage.getItem(
          "token"
        ) || null,

      loading: false,
      error: null,
    },

    reducers: {
      logout: (state) => {
        state.user = null;
        state.token = null;

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );
      },
    },

    extraReducers: (
      builder
    ) => {
      builder

        // REGISTER
        .addCase(
          registerUser.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          }
        )

        .addCase(
          registerUser.fulfilled,
          (state, action) => {
            state.loading = false;
            state.user =
              action.payload.user;
          }
        )

        .addCase(
          registerUser.rejected,
          (state, action) => {
            state.error =
              action.payload;

            state.loading = false;
          }
        )

        // LOGIN
        .addCase(
          loginUser.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          }
        )

        .addCase(
          loginUser.fulfilled,
          (state, action) => {
            state.loading = false;

            state.user =
              action.payload.user;

            state.token =
              action.payload.token;
          }
        )

        .addCase(
          loginUser.rejected,
          (state, action) => {
            state.error =
              action.payload;

            state.loading = false;
          }
        );
    },
  });

export const {
  logout,
} = authSlice.actions;

export default authSlice.reducer;