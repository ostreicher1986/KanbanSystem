import React, { createContext, useContext, useEffect, useState } from "react";
import { getLayoutColorMode, removeLayoutColorMode, setLayoutColorMode as setLayoutColorModeLocalStorage } from '../utils/localStorage';

const LayoutColorModeContext = createContext<any>({})

const LayoutColorModeProvider: React.FC = ({ children }) => {
    const [layoutColorMode, setLayoutColorMode] = useState(getLayoutColorMode() || 'dark');

    useEffect(() => {
        layoutColorMode ? setLayoutColorModeLocalStorage(layoutColorMode) : removeLayoutColorMode();
    },[layoutColorMode]);

    return (
        <LayoutColorModeContext.Provider value={{ layoutColorMode, setLayoutColorMode }}>{children}</LayoutColorModeContext.Provider>
    );
};

export const useLayoutColorMode = () => {
    const context = useContext(LayoutColorModeContext);
    if (!context) throw new Error("useLayoutColorMode must be used within a LayoutColorModeProvider");
    const { layoutColorMode, setLayoutColorMode } = context;
    return { layoutColorMode, setLayoutColorMode };
};

export default LayoutColorModeProvider;