import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// payload: { userId, imageFile, userDetails }
const updateUserDetails = createAsyncThunk(
    "user/updateUserDetails",
    async ({ userId, imageFile, userDetails }, { rejectWithValue }) => {
        let imageUploadResult = null;

        // 1. If imageFile exists, upload it first
        if (imageFile) {
            try {
                const formData = new FormData();
                formData.append("image", imageFile);
                formData.append("userId", userId);
                const response = await axios.post("http://localhost:8080/user/uploadImage", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                // Check if response.data is a string
                if (typeof response.data === "string") {
                    imageUploadResult = response.data;
                } else {
                    imageUploadResult = JSON.stringify(response.data);
                }
            } catch (error) {
                return rejectWithValue(error.response?.data?.message || error.message);
            }
        }

        // 2. Update other user details
        try {
            const response = await axios.put(`http://localhost:8080/user/update/${userId}`, userDetails);
            // Optionally, you can return both results
            return { userDetails: response.data, imageUploadResult };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export default updateUserDetails;