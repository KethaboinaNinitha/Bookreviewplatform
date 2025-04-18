import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
  name: 'books',
  initialState: [],
  reducers: {
    setBooks: (state, action) => action.payload,
    addBook: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setBooks, addBook } = booksSlice.actions;
export default booksSlice.reducer;