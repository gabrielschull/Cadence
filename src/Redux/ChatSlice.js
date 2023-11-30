import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChatId: null,
  conversationHistory: null,
  currentDocument: null,
  login: null,
  openDraw: false,
};

export const ChatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChatId: (state, action) => {
        state.activeChatId = action.payload
        },
    setCurrentDocument: (state, action) => {
        state.currentDocument = action.payload
        },
    setOpenDraw: (state, action) => {    
        state.openDraw = action.payload
        },
    setConversationHistory: (state, action) => {
        state.conversationHistory = action.payload
        }
  },
});
export const {
    setActiveChatId,
    setCurrentDocument,
    setOpenDraw,
    setConversationHistory,
} = ChatSlice.actions;
export default ChatSlice.reducer;