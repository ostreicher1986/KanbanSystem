export const setLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, value);
}

export const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
}

export const getLocalStorage = (key: string) => {
    return localStorage.getItem(key) || null;
}

export const setTokenLocalStorage = (token: string) => {
    localStorage.setItem('token', token);
}

export const removeTokenLocalStorage = () => {
    localStorage.removeItem('token');
}

export const getTokenLocalStorage = () => {
    return localStorage.getItem('token') || null;
}

export const setLoginLocalStorage = (login: string) => {
    localStorage.setItem('login', login);
}

export const removeLoginLocalStorage = () => {
    localStorage.removeItem('login');
}

export const getLoginLocalStorage = () => {
    return localStorage.getItem('login') || null;
}

export const setMenuLocalStorage = (menu: Array<object>) => {
    localStorage.setItem('menu', JSON.stringify(menu));
}

export const removeMenuLocalStorage = () => {
    localStorage.removeItem('menu');
}

export const getMenuLocalStorage = () => {
    const menu = localStorage.getItem('menu') || null;
    if (menu) return JSON.parse(menu)
    return menu
}

export const setLayoutMode = (mode: string) => {
    localStorage.setItem('layoutMode', mode);
};

export const getLayoutMode = () => {
    return localStorage.getItem('layoutMode') || null;
};

export const removeLayoutMode = () => {
    localStorage.removeItem('layoutMode');
};

export const setLayoutColorMode = (colorMode: string) => {
    localStorage.setItem('layoutColorMode', colorMode);
};

export const getLayoutColorMode = () => {
    return localStorage.getItem('layoutColorMode') || null;
};

export const removeLayoutColorMode = () => {
    localStorage.removeItem('layoutColorMode');
};

export const setClientBULocalStorage = (client: string) => {
    localStorage.setItem('clientBU', client);
}

export const removeClientBULocalStorage = () => {
    localStorage.removeItem('clientBU');
}