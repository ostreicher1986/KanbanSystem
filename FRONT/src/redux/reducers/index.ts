import { combineReducers } from "redux";
import AppState from "../interfaces";
import growlReducer from "../reducers/Growl";
import loadingFullReducer from '../reducers/LoadingFull';

const rootReducer = combineReducers<AppState>({
    growl: growlReducer,
    loadingFull: loadingFullReducer
});

export default rootReducer;