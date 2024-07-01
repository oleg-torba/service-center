import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './AuthorizationApi';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  extraReducers: builder => {
    builder
      .addMatcher(
        authApi.endpoints.registerUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.token;
          state.isLoggedIn = false;
          state.error = null;
        }
      )
      .addMatcher(
        authApi.endpoints.loginUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.token;
          state.isLoggedIn = true;
          state.error = null;
        }
      )
      .addMatcher(authApi.endpoints.logoutUser.matchFulfilled, (state, _) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addMatcher(
        authApi.endpoints.fetchCurrentUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.isLoggedIn = true;
          state.error = null;
        }
      )
      .addMatcher(
        authApi.endpoints.registerUser.matchRejected,
        (state, { error }) => {
          state.error = error.message;
        }
      )
      .addMatcher(
        authApi.endpoints.loginUser.matchRejected,
        (state, { error }) => {
          state.error = error.message;
        }
      )
      .addMatcher(
        authApi.endpoints.logoutUser.matchRejected,
        (state, { error }) => {
          state.error = error.message;
        }
      )
      .addMatcher(
        authApi.endpoints.fetchCurrentUser.matchRejected,
        (state, { error }) => {
          state.error = error.message;
        }
      );
  },
});
