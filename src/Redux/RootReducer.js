import { combineReducers } from 'redux';
import userReducer from './UserSlice'
import clientsReducer from './ClientsSlice'

const rootReducer = combineReducers({
    User: userReducer,
    Clients: clientsReducer,
});

export default rootReducer;