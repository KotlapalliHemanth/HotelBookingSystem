import { createSlice } from '@reduxjs/toolkit';
import getUserDetails from './getUserDetails';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: {userdetails:{},
        error: null,},
    login: false
  },
  reducers: {
    // while logging out state is made to initial state
    setLogout: (state, action) => {
      state= {
        user: {userdetails:{},
            error: null,},
        login: false
      };
    },
  },
  extraReducers: (builder) => {
    builder
    //on sucessfull login, user details are set in the state
        .addCase(getUserDetails.fulfilled, (state, action)=>{
            state.user.userdetails = action.payload;
            state.login = true;
        })
    //on login failure, error is set in the state
        .addCase(getUserDetails.pending, (state, action)=>{
            state.user.error = null;
        })
        .addCase(getUserDetails.rejected, (state, action)=>{
            state.user.error = action.payload;
        })


  }
});


export const { setLogout, } = UserSlice.actions;
export default UserSlice.reducer;


