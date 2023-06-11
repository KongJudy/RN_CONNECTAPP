import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

//selects all quotes from quotes array
export const fetchQuotes = createAsyncThunk('quotes/fetchQuotes/', async () => {
  const response = await fetch(baseUrl + 'quotes');
  if (!response.ok) {
    return Promise.reject('Unable to fetch, status: ' + response.status);
  }
  const data = await response.json();
  return data;
});

const quotesSlice = createSlice({
  name: 'quotes',
  initialState: {
    isLoading: true,
    errMsg: null,
    quotesArray: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchQuotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMsg = null;
        state.quotesArray = action.payload;
      })
      .addCase(fetchQuotes.rejected, (state, action) => {
        state.isLoading = false;
        state.errMsg = action.error ? action.error.message : 'Fetch failed';
      });
  }
});

export const quotesReducer = quotesSlice.reducer;
