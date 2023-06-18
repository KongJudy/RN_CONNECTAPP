import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchRandomWord = createAsyncThunk(
  'word/fetchRandomWord',
  async () => {
    const response = await fetch(baseUrl + 'words');
    if (!response.ok) {
      return Promise.reject('Unable to fetch, status: ' + response.status);
    }
    const words = await response.json();
    const randomWordIdx = Math.floor(Math.random() * words.length);
    const randomWord = words[randomWordIdx].word;
    return randomWord;
  }
);

const wordsSlice = createSlice({
  name: 'words',
  initialState: {
    isLoading: true,
    errMsg: null,
    wordsArray: [],
    answeredArray: [],
    score: 0
  },
  reducers: {
    answeredWord: (state, action) => {
      const word = action.payload;
      state.wordsArray = state.wordsArray.filter(
        (currentWord) => currentWord !== word
      );
      state.answeredArray.push(word);
      console.log(answeredArray);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomWord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRandomWord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMsg = null;
        state.wordsArray.push(action.payload);
      })
      .addCase(fetchRandomWord.rejected, (state, action) => {
        state.isLoading = false;
        state.errMsg = action.error ? action.error.message : 'Fetch failed';
      });
  }
});

export const { answeredWord } = wordsSlice.actions;
export const wordsReducer = wordsSlice.reducer;
