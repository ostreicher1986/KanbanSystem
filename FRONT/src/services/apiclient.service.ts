import axios from 'axios';

const request = async (method: any, url: string, data: object, headers: object ) => {
    
    /**
     * Definição da chamada das requests axios
     */
    const api = axios.create({
        headers
    });

    try {

        const response = await api({
            method,
            url,
            data
        });

        return response.data;

    } catch (e) {

        return { success: false, message: e };

    }

}

export default request;