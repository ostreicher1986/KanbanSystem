import React, { createContext, useContext, useEffect, useState } from "react";
import { getMenuLocalStorage, removeMenuLocalStorage, setMenuLocalStorage } from '../utils/localStorage';

const MenuContext = createContext<any>({});

const MenuProvider: React.FC = ({ children }) => {
    const [menu, setMenu] = useState(getMenuLocalStorage() || []);

    useEffect(() => {
        menu ? setMenuLocalStorage(menu) : removeMenuLocalStorage();
    },[menu]);

    return (
        <MenuContext.Provider value={{ menu, setMenu }}>{children}</MenuContext.Provider>
    );
};

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) throw new Error("useMenu must be used within a MenuProvider");
    const { menu, setMenu } = context;
    return { menu, setMenu };
};

export default MenuProvider;