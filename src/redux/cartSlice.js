import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCartCount = createAsyncThunk(
  'cart/fetchCartCount',
  async (_, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem('user_Id');
      if (!userId) return 0;

      const response = await axios.get(
        `https://dev.crystovajewels.com/api/v1/order-details/get/${userId}`
      );
      const count = response.data.data.length || 0;
      localStorage.setItem("cartCount", count);
      return count;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    count: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartCount.fulfilled, (state, action) => {
        state.loading = false;
        state.count = action.payload;
      })
      .addCase(fetchCartCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
