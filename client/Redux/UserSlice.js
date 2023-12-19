import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: null,
    authState: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
        state.userInfo = action.payload
        },
    setAuthState: (state, action) => {
        state.authState = action.payload
        },
    signOut: (state) => {
      state.authState = { event: 'SIGNED_OUT', session: null}
        state.userInfo = null
        },
  },
});
export const {
    setUserInfo,
    setAuthState,
    signOut,
} = UserSlice.actions;
export default UserSlice.reducer;