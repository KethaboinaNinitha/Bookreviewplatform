import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slices/booksSlice';
import reviewsReducer from './slices/reviewsSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    reviews: reviewsReducer,
    user: userReducer,
  },
});

export default store;