import {applyMiddleware, combineReducers, createStore} from 'redux';
import HostsReducer from './HostsReducer';


const reducers = combineReducers({
    HostsReducer
})

const store = createStore(reducers)

export default store;