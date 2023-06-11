import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

// selects all prompts from prompts array
export const fetchPrompts = createAsyncThunk(
  'prompts/fetchPrompts/',
  async () => {
    const response = await fetch(baseUrl + 'prompts');
    if (!response) {
      return Promise.reject('Unable to fetch, status: ' + response.status);
    }
    const data = await response.json();
    return data;
  }
);

const promptsSlice = createSlice({
  name: 'prompts',
  initialState: {
    isLoading: true,
    errMsg: null,
    promptsArray: [],
    promptEntriesArray: []
  },
  reducers: {
    savePromptEntry: (state, action) => {
      state.promptEntriesArray.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrompts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPrompts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMsg = null;
        state.promptsArray = action.payload;
      })
      .addCase(fetchPrompts.rejected, (state, action) => {
        state.isLoading = false;
        state.errMsg = action.error ? action.error.message : 'Fetch failed';
      });
  }
});

export const { savePromptEntry } = promptsSlice.actions;
export const promptsReducer = promptsSlice.reducer;
