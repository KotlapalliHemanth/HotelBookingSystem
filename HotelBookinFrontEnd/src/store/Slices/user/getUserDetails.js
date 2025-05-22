import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:8080/customer',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export default getUserDetails;