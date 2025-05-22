import { configureStore } from '@reduxjs/toolkit';
// import the reducers required for the store
import user from './Slices/user/UserSlice';
import hotels from './Slices/Hotels/HotelSlice'; // <-- import your hotel slice

const store = configureStore({
  reducer: {
    user: user,
    hotels: hotels, // <-- add the hotel slice reducer here
    // can add more slices here
  },
});

export default store;