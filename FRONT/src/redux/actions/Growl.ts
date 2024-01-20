import { CALL_GROWL } from "../types/Growl";
import { Growl } from '../interfaces/Growl';

export const callGrowl = (growl: Growl) => {
    return {
        type: CALL_GROWL,
        payload: growl
    } as const;
}

export type Actions =
  | ReturnType<typeof callGrowl>;