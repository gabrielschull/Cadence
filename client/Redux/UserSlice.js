import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    authState: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
        state.user = action.payload
        },
    setAuthState: (state, action) => {
        state.authState = action.payload
        },
    signOut: (state) => {
      state.authState = { event: 'SIGNED_OUT', session: null}
        state.user = null
        },
  },
});
export const {
    setUserInfo,
    setAuthState,
    signOut,
} = UserSlice.actions;
export default UserSlice.reducer;