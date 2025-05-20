import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getHotelDetails = createAsyncThunk(
    "hotels/getHotelDetails",
    async (hotelId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8080/hotel/details/${hotelId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export default getHotelDetails;