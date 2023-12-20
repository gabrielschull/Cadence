import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeChatId: null,
  conversationHistory: null,
  currentDocument: null,
  login: null,
  openDraw: false
}

export const ChatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChatId: (state, action) => {
      state.activeChatId = action.payload
    },
    clearActiveChat: (state) => {
      state.activeChatId = null
    },
    setCurrentDocument: (state, action) => {
      state.currentDocument = action.payload
    },
    clearCurrentDocument: (state) => {
      state.currentDocument = null
    },
    setOpenDraw: (state, action) => {
      state.openDraw = action.payload
    },
    setConversationHistory: (state, action) => {
      state.conversationHistory = action.payload
    },
    updateConversationTitle: (state, action) => {
      const index = state.conversationHistory.findIndex((item) => item.checksum === action.payload.chatId)
      if (index !== -1) {
        state.conversationHistory[index].title = action.payload.title
      }
    }
  }
})
export const {
  setActiveChatId,
  setCurrentDocument,
  setOpenDraw,
  setConversationHistory,
  clearCurrentDocument,
  clearActiveChat,
  updateConversationTitle
} = ChatSlice.actions

export default ChatSlice.reducer
