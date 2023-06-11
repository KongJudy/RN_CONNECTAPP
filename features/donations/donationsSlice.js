import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchDonations = createAsyncThunk(
  'donations/fetchDonations/',
  async () => {
    const response = await fetch(baseUrl + 'donations');
    if (!response.ok) {
      return Promise.reject('Unable to fetch, status: ' + response.status);
    }
    const data = await response.json();
    return data;
  }
);

const donationsSlice = createSlice({
  name: 'donations',
  initialState: {
    isLoading: true,
    errMsg: null,
    donationsArray: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDonations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMsg = null;
        state.donationsArray = action.payload;
      })
      .addCase(fetchDonations.rejected, (state, action) => {
        state.isLoading = false;
        state.errMsg = action.error ? action.error.message : 'Fetch failed';
      });
  }
});

export const donationsReducer = donationsSlice.reducer;
