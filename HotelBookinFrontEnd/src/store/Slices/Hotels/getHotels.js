import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getHotels = createAsyncThunk(
    "hotels/getHotels",
    async ({ location, checkIn, checkOut, sortBy }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                "http://localhost:8080/hotel/getHotels/",
                {
                    location,
                    checkIn,
                    checkOut,
                    sortBy
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export default getHotels;