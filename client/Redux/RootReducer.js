import { combineReducers } from 'redux';
import userReducer from './UserSlice'
import clientsReducer from './ClientsSlice'
import chatReducer from './ChatSlice'

const rootReducer = combineReducers({
    User: userReducer,
    Clients: clientsReducer,
    Chat: chatReducer,
});

export default rootReducer;