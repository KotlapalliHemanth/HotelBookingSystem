import { configureStore } from '@reduxjs/toolkit';
//import the recuders required for the store
import user from './Slices/user/UserSlice'; 


const store = configureStore({
  reducer: {
    user: user, // can add more slices here
     // can add more slices here
  },
});

export default store;