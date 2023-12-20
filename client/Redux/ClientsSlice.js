import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  clients: null
}

export const ClientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload
    }
  }
})
export const {
  setClients
} = ClientsSlice.actions
export default ClientsSlice.reducer
