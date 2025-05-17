import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (userId, {rejectWithValue}) => {
    try {
        
        
      const response = await axios.get(`http://localhost:8080/api/user/${userId}`);// need to add the upi link accordingly
        return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
})

export default getUserDetails;