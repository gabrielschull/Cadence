import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
        state.user = action.payload
        }
  },
});
export const {
    setUserInfo,
} = UserSlice.actions;
export default UserSlice.reducer;