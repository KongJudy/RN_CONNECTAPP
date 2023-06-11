import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoritesArray: []
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const isFavorite = state.favoritesArray.find(
        (favorite) => favorite.quote === action.payload.quote
      );
      if (isFavorite) {
        state.favoritesArray = state.favoritesArray.filter(
          (favorite) => favorite.quote !== action.payload.quote
        );
      } else {
        const newFavorite = { ...action.payload, timestamp: Date.now() };
        state.favoritesArray.push(newFavorite);
      }
    }
  }
});

export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
