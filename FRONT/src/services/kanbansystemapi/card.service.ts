import request from './api';

const BASE_URL = '/Cards';

export const save = async (data: object) => {

    const response = await request({
        method: "POST",
        url: BASE_URL,
        data: { ...data },
        showMessage: { success: true, warn: true }
    });

    return response;

}

export const update = async (id: string, data: object) => {

    const response = await request({
        method: "PUT",
        url: `${BASE_URL}/${id}`,
        data: { ...data },
        showMessage: { success: true, warn: true }
    });

    return response;

}

export const remove = async (id: string) => {

    const response = await request({
        method: "DELETE",
        url: `${BASE_URL}/${id}`,
        data: null,
        showMessage: { success: true, warn: true }
    });

    return response;

}

export const getall = async () => {

    const response = await request({
        method: "GET",
        url: BASE_URL,
        data: null,
        showMessage: { success: false, warn: true }
    });

    return response;

}