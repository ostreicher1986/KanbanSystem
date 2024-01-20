import React, { createContext, useState, useContext, useEffect } from "react";
import { getLoginLocalStorage, setLoginLocalStorage, removeLoginLocalStorage } from '../utils/localStorage';

const LocalStorageLoginContext = createContext<any>({})

const LocalStorageLoginProvider: React.FC = ({ children }) => {
    const [localStorageLogin, setLocalStorageLogin] = useState(getLoginLocalStorage() || '');

    useEffect(() => {
        localStorageLogin ? setLoginLocalStorage(localStorageLogin) : removeLoginLocalStorage()
    },[localStorageLogin]);

    return (
        <LocalStorageLoginContext.Provider value={{ localStorageLogin, setLocalStorageLogin }}>{children}</LocalStorageLoginContext.Provider>
    );
};

export const useLocalStorageLogin = () => {
    const context = useContext(LocalStorageLoginContext);
    if (!context) throw new Error("useLocalStorageLogin must be used within a LocaStorageLoginProvider");
    const { localStorageLogin, setLocalStorageLogin } = context;
    return { localStorageLogin, setLocalStorageLogin };
};

export default LocalStorageLoginProvider;