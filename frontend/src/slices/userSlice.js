import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    updateUser: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;