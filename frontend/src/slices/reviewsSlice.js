import { createSlice } from '@reduxjs/toolkit';

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {},
  reducers: {
    setReviews: (state, action) => {
      state[action.payload.bookId] = action.payload.reviews;
    },
    addReview: (state, action) => {
      state[action.payload.bookId] = state[action.payload.bookId] || [];
      state[action.payload.bookId].push(action.payload.review);
    },
  },
});

export const { setReviews, addReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;