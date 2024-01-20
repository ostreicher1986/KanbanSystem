import React, { createContext, useState, useContext, useEffect } from "react";
import { getTokenLocalStorage, setTokenLocalStorage, removeTokenLocalStorage } from '../utils/localStorage';

const LocalStorageTokenContext = createContext<any>({})

const LocalStorageTokenProvider: React.FC = ({ children }) => {
    const [localStorageToken, setLocalStorageToken] = useState(getTokenLocalStorage() || '');

    useEffect(() => {
        localStorageToken ? setTokenLocalStorage(localStorageToken) : removeTokenLocalStorage()
    },[localStorageToken]);

    return (
        <LocalStorageTokenContext.Provider value={{ localStorageToken, setLocalStorageToken }}>{children}</LocalStorageTokenContext.Provider>
    );
};

export const useLocalStorageToken = () => {
    const context = useContext(LocalStorageTokenContext);
    if (!context) throw new Error("useLocalStorageToken must be used within a LocalStorageTokenProvider");
    const { localStorageToken, setLocalStorageToken } = context;
    return { localStorageToken, setLocalStorageToken };
};

export default LocalStorageTokenProvider;