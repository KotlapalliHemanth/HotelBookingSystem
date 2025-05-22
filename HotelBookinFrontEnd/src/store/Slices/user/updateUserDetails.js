import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateUserDetails = createAsyncThunk(
    "user/updateUserDetails",
    async ({ imageFile, userDetails }, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        let imageUploadResult = null;

        // 1. Upload image if present
        if (imageFile) {
            try {
                const formData = new FormData();
                formData.append("image", imageFile);
                const response = await axios.post(
                    "http://localhost:8080/customer/upload-image",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                imageUploadResult = response.data;
            } catch (error) {
                return rejectWithValue(error.response?.data?.message || error.message);
            }
        }

        // 2. Update user details
        try {
            const response = await axios.put(
                "http://localhost:8080/customer",
                userDetails,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            return { userDetails: response.data, imageUploadResult };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export default updateUserDetails;