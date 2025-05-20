import { createSlice } from "@reduxjs/toolkit";
import getHotels from "./getHotels";
import getHotelDetails from "./getHotelDetails";

const HotelSlice = createSlice({
    name: "hotels",
    initialState: {
        hotels: [],
        hotelDetails: {},
        hotelsError: null,
        hotelsLoading: false,
        hoteldetailsError: null,
        hoteldetailsLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get Hotels
            .addCase(getHotels.pending, (state) => {
                state.hotelsLoading = true;
                state.hotelsError = null;
            })
            .addCase(getHotels.fulfilled, (state, action) => {
                state.hotels = action.payload;
                state.hotelsLoading = false;
            })
            .addCase(getHotels.rejected, (state, action) => {
                state.hotelsError = action.payload;
                state.hotelsLoading = false;
            })
            // Get Hotel Details
            .addCase(getHotelDetails.pending, (state) => {
                state.hoteldetailsLoading = true;
                state.hoteldetailsError = null;
            })
            .addCase(getHotelDetails.fulfilled, (state, action) => {
                state.hotelDetails = action.payload;
                state.hoteldetailsLoading = false;
            })
            .addCase(getHotelDetails.rejected, (state, action) => {
                state.hoteldetailsError = action.payload;
                state.hoteldetailsLoading = false;
            });
    }
});


export const {getHotelDetails, getHotels} = HotelSlice.actions;
export default HotelSlice.reducer;