import { combineReducers } from 'redux'
import userReducer from './UserSlice'
import clientsReducer from './ClientsSlice'
import chatReducer from './ChatSlice'

const rootReducer = combineReducers({
  user: userReducer,
  clients: clientsReducer,
  chat: chatReducer
})

export default rootReducer
