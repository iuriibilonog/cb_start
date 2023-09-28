import { createSlice } from '@reduxjs/toolkit';
import { userLogin, userLogout, removeAuthError } from './operations';

const initialState = {
  userinfo: {
    name: null,
    email: null,
    isLoggedIn: false,
  },
  token: null,
  refresh: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.userinfo = action.payload.user;
      state.token = action.payload.accessToken;
      state.refresh = action.payload.refreshToken;
      state.userinfo.isLoggedIn = true;
      state.error = null;
    }),
      builder.addCase(userLogin.rejected, (state, action) => {
        state.error = {
          message: action.payload.response.data.message,
        };
      });
    builder.addCase(userLogout.fulfilled, (state, action) => initialState),
      builder.addCase(userLogout.rejected, (state, action) => {
        state.error = {
          status: action.payload.requestStatus,
          message: action.payload,
        };
      });
    builder.addCase(removeAuthError.fulfilled, (state, action) => {
      state.error = null;
    });
  },
});

export default userSlice.reducer;
