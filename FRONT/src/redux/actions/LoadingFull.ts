import { SET_LOADING_FULL } from "../types/LoadingFull";
import { LoadingFull } from '../interfaces/LoadingFull';

export const setLoadingFull = (loadingFull: LoadingFull) => {
    return {
        type: SET_LOADING_FULL,
        payload: loadingFull
    } as const;
}

export type Actions =
  | ReturnType<typeof setLoadingFull>;