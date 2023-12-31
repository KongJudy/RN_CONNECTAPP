import { configureStore } from '@reduxjs/toolkit';
import { wordsReducer } from '../features/words/wordsSlice';
import { quotesReducer } from '../features/quotes/quotesSlice';
import { favoritesReducer } from '../features/quotes/favoritesSlice';
import { usersReducer } from '../features/users/usersSlice';
import { reportsReducer } from '../features/words/reportsSlice';
import { donationsReducer } from '../features/donations/donationsSlice';
import { promptsReducer } from '../features/prompts/promptsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    words: wordsReducer,
    quotes: quotesReducer,
    favorites: favoritesReducer,
    reports: reportsReducer,
    donations: donationsReducer,
    prompts: promptsReducer
  }
});
