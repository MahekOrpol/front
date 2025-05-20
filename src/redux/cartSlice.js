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
      console.log('response.data :>> ', response.data.data);
      let count = 0;
      for (const key in response.data.data) {
        const element = response.data.data[key];
         count += parseInt(response.data.data[key].selectedqty);

          console.log('element :>> ', element.selectedqty);
      }
      localStorage.setItem("cartCount", count);
      return count;
    } catch (error) {
      console.error('Error fetching cart count:', error);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    count: parseInt(localStorage.getItem('cartCount')) || 0,
    loading: false,
    error: null,
  },
  reducers: {
    updateCartCount: (state, action) => {
      state.count = action.payload;
      localStorage.setItem("cartCount", action.payload);
    },
    incrementCartCount: (state) => {
      state.count += 1;
      localStorage.setItem("cartCount", state.count);
    },
    decrementCartCount: (state) => {
      state.count = Math.max(0, state.count - 1);
      localStorage.setItem("cartCount", state.count);
    },
    resetCartCount: (state) => {
      state.count = 0;
      localStorage.setItem("cartCount", "0");
    }
  },
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
        // Keep the existing count if there's an error
        state.count = parseInt(localStorage.getItem('cartCount')) || 0;
      });
  },
});

export const { updateCartCount, incrementCartCount, decrementCartCount, resetCartCount } = cartSlice.actions;
export default cartSlice.reducer;
