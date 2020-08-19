import productReducer from './productReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    userReducer,
    productReducer,
    cartReducer
})

export default rootReducer;