import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

//gets all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch(baseUrl + 'users');
  if (!response.ok) {
    return Promise.reject('Unable to fetch, status: ' + response.status);
  }
  const data = await response.json();
  return data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isLoading: true,
    errMsg: null,
    usersArray: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMsg = null;
        state.usersArray = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.errMsg = action.error ? action.error.message : 'Fetch failed';
      });
  }
});

export const usersReducer = usersSlice.reducer;
