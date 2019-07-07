import { combineReducers } from 'redux';
import movieReducer from './movie-reducer';

const reducer = combineReducers({ movieReducer });

export default reducer;