import { Growl } from "../interfaces/Growl";
import { Actions } from "../actions/Growl";
import { CALL_GROWL } from "../types/Growl";

export const initialState: Growl = {
    show: false,
    severity: undefined,
    summary: "",
    detail: "",
    life: 0
};

function neverReached(never: Actions) {}

function growlReducer(state: Growl = initialState, action: Actions) {
    switch (action.type) {
        case CALL_GROWL:
            return action.payload;
        default:
            neverReached(action);
    }
    return state;
}

export default growlReducer;