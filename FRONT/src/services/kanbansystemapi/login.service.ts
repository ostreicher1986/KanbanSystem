import request from './api';

const LOGIN_URL = '/Login';

export type filtersType = {
    name: string
    value:  string | boolean | number
    datatype:  string
}

export type filtersRequest = {
    filters: Array<filtersType>
    sortField: string
    sortType: string
}

export const auth = async (username: string, password: string) => {    

    const response = await request({
        method: "POST",
        url: LOGIN_URL,
        data: {
            login: username,
            password: password
        },
        showMessage: { success: true, warn: true }
    });

    return response;

}