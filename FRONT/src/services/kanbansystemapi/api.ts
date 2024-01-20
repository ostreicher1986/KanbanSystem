import axios, { Method } from 'axios';
import Store from '../../redux/store';
import { callGrowl } from "../../redux/actions/Growl";
import { routeMain as routeLogin } from '../../screens/login/routes';
import { getTokenLocalStorage, removeMenuLocalStorage, removeTokenLocalStorage, setLayoutColorMode, setLayoutMode } from '../../utils/localStorage';

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

const logout = async() => {    
    removeTokenLocalStorage();
    removeMenuLocalStorage();
    setLayoutMode('overley');
    setLayoutColorMode('dark');
    window.location.href = routeLogin;
}

const request = async ({ method, url, headers, data, showMessage } : IRequest) => {

    const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;
    const TOKEN = getTokenLocalStorage();
    
    /**
     * Definição da chamada das requests axios
     */
    const api = axios.create({
        baseURL: BASE_URL_API,
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            ...headers
        },
        maxRedirects: 0
    });

    try {        
        
        const response = await api({
            method,
            url,
            data
        });

        if ( TOKEN && !response.data.success) {

            /* Logout application if invalid token */
            await logout();

        } else {

            /* Ligic to show messages */
            if ( response.data.success && showMessage?.success )
                Store.dispatch(callGrowl({
                    show: true,
                    severity: "success",
                    summary: response.data.message,
                    detail: "",
                    life: lifeTime
                }));
            else if ( !response.data.success && showMessage?.warn )
                Store.dispatch(callGrowl({
                    show: true,
                    severity: "warn",
                    summary: response.data.message,
                    detail: "",
                    life: lifeTime
                }));

        }

        return response.data;
        
    } catch (error) {

        const typedError: any = error;

        Store.dispatch(callGrowl({
            show: true,
            severity: "warn",
            summary: typedError.message,
            detail: error === "Network Error" ? "O servidor não está respondendo." : "",
            life: lifeTime
        }));

        await logout();

        return { success: false, message: typedError.message };
        
    }

}

export default request;