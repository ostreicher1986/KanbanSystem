import { LoadingFull } from "../interfaces/LoadingFull";
import { Actions } from "../actions/LoadingFull";
import { SET_LOADING_FULL } from "../types/LoadingFull";

export const initialState: LoadingFull = {
    items: []
};

function neverReached(never: Actions) {}

function loadingFullReducer(state: LoadingFull = initialState, action: Actions) {
    switch (action.type) {
        case SET_LOADING_FULL:
            return action.payload;
        default:
            neverReached(action);
    }
    return state;
}

export default loadingFullReducer;