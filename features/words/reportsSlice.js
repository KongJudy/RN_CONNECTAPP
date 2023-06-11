import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const reportWord = createAsyncThunk(
  'report/reportsWord',
  async (word) => {
    const response = await fetch(baseUrl + 'reports', {
      method: 'POST',
      body: JSON.stringify({ word }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Report failed');
    }
    const reports = await response.json();
    return reports;
  }
);

const reportsSlice = createSlice({
  name: 'reports',
  initialState: {
    isLoading: false,
    errMsg: null,
    reportsArray: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reportWord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reportWord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMsg = null;
        state.reportsArray.push(action.payload);
      })
      .addCase(reportWord.rejected, (state, action) => {
        state.isLoading = false;
        state.errMsg = action.error.message;
      });
  }
});

export const reportsReducer = reportsSlice.reducer;
