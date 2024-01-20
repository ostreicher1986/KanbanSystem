import axios, { Method } from 'axios';
import Store from '../../redux/store';
import { callGrowl } from "../../redux/actions/Growl";
import { routeMain as routeLogin } from '../../screens/login/routes';
import { getTokenLocalStorage, removeMenuLocalStorage, removeTokenLocalStorage, setLayoutColorMode, setLayoutMode } from '../../utils/localStorage';
import { encrypt, decrypt } from '../../utils/hub369crypto';

export interface IShowMessage {
    success: boolean | false;
    warn: boolean | false;
}

export interface IRequest {
    method: Method;
    url: string;
    headers?: object | null;
    data: object | null;
    showMessage?: IShowMessage;
}

const lifeTime = process.env.REACT_APP_CALL_GROWL_LIFE ? Number(process.env.REACT_APP_CALL_GROWL_LIFE): 5000;

const request = async ({ method, url, headers, data, showMessage } : IRequest) => {

    /**
     * Definição da chamada das requests axios
     */
    const api = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL_API,
        timeout: process.env.API_TIMEOUT ? parseInt(process.env.API_TIMEOUT) : 0,
        headers: {'Content-Type': 'text/plain'}
    });

    const TOKEN = getTokenLocalStorage();

    const makeRequest = {
        method,
        url,
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            ...headers
        },
        data
    }

    const encryptRequest = encrypt(JSON.stringify(makeRequest));

    try {

        const r = await api({
            method: 'POST',
            url: '/',
            data: encryptRequest
        });

        const response = JSON.parse(decrypt(r.data));

        if ( TOKEN && !response.success && ["W177"].includes(response.symbol) ) {

            /* Logout application if invalid token */
            removeTokenLocalStorage();
            removeMenuLocalStorage();
            setLayoutMode('overley');
            setLayoutColorMode('dark');
            window.location.href = routeLogin;

        } else {

            /* Ligic to show messages */
            if ( response.success && showMessage?.success )
                Store.dispatch(callGrowl({
                    show: true,
                    severity: "success",
                    summary: response.message,
                    detail: "",
                    life: lifeTime
                }));
            else if ( !response.success && showMessage?.warn )
                Store.dispatch(callGrowl({
                    show: true,
                    severity: "warn",
                    summary: response.message,
                    detail: "",
                    life: lifeTime
                }));

        }

        return response;
        
    } catch (error) {

        //Store.dispatch(callGrowl({
        //    show: true,
        //    severity: "warn",
        //    summary: error.message,
        //    detail: error.message === "Network Error" ? "O servidor não está respondendo." : "",
        //    life: lifeTime
        //}));

        return { success: false, message: error };
        
    }

}

export default request;