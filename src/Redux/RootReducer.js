import { combineReducers } from 'redux';
import userReducer from './UserSlice.js'
import clientsReducer from './ClientsSlice.js'
import chatReducer from './ChatSlice.js'

const rootReducer = combineReducers({
    User: userReducer,
    Clients: clientsReducer,
    Chat: chatReducer,
});

export default rootReducer;