import { createSlice } from '@reduxjs/toolkit';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getCurrentUserAction: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    authAction: (state, action) => {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.isLoggedIn = false;
    },
    loginAction: (state, action) => {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.isLoggedIn = true;
    },
    logoutAction: (state, action) => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    saveSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const {
  getCurrentUserAction,
  authAction,
  loginAction,
  logoutAction,
  saveSearchResults,
} = authSlice.actions;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Auth'],

  endpoints: builder => ({
    fetchCurrentUser: builder.query({
      query: () => `/api/current`,
      providesTags: ['Auth'],
    }),

    registerUser: builder.mutation({
      query: newUser => ({
        url: `/api/register`,
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Auth'],
    }),
    loginUser: builder.mutation({
      query: loginData => ({
        url: `api/login`,
        method: 'POST',
        body: loginData,
      }),
      invalidatesTags: ['Auth'],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: `/api/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
    searchItems: builder.query({
      query: searchQuery => `/api/search/${searchQuery}`,
      providesTags: ['Auth'],
    }),
  }),
});

export const {
  useFetchCurrentUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useLazySearchItemsQuery,
} = authApi;
