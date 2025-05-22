import { createSlice } from '@reduxjs/toolkit';
import getUserDetails from './getUserDetails';
import updateUserDetails from './updateUserDetails';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      userdetails: {},
      error: null,
      profileUpdateError: null,
    },
    updating: false,
    login: false,
  },
  reducers: {
    setLogout: (state) => {
      state.user = {
        userdetails: {},
        error: null,
        profileUpdateError: null,
        imageUploadResult: null,
      };
      state.updating = false;
      state.login = false;
    },
    setLoggedin: (state, action) => {
      state.login = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // On successful login, user details are set in the state
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.user.userdetails = action.payload;
        state.user.error = null;
        state.login = true;
      })
      // On login pending, clear error
      .addCase(getUserDetails.pending, (state) => {
        state.user.error = null;
      })
      // On login failure, set error
      .addCase(getUserDetails.rejected, (state, action) => {
        state.user.error = action.payload;
      })
      // Update user details
      .addCase(updateUserDetails.pending, (state) => {
        state.updating = true;
        state.user.profileUpdateError = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        // action.payload may contain userDetails and imageUploadResult
        if (action.payload) {
          if (action.payload.userDetails) {
            state.user.userdetails = action.payload.userDetails;
          }
        }
        state.user.profileUpdateError = null;
        state.updating = false;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.user.profileUpdateError = action.payload;
        state.updating = false;
      });
  }
});

export const { setLogout, setLoggedin } = UserSlice.actions;
export default UserSlice.reducer;


