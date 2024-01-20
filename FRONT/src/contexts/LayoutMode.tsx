import React, { createContext, useState, useContext, useEffect } from "react";
import { getLayoutMode, setLayoutMode as setLayoutModeLocalStorage, removeLayoutMode } from '../utils/localStorage';

const LayoutModeContext = createContext<any>({})

const LayoutModeProvider: React.FC = ({ children }) => {
    const [layoutMode, setLayoutMode] = useState(getLayoutMode() || 'overlay');

    useEffect(() => {
        layoutMode ? setLayoutModeLocalStorage(layoutMode) : removeLayoutMode();
    },[layoutMode]);

    return (
        <LayoutModeContext.Provider value={{ layoutMode, setLayoutMode }}>{children}</LayoutModeContext.Provider>
    );
};

export const useLayoutMode = () => {
    const context = useContext(LayoutModeContext);
    if (!context) throw new Error("useLayoutMode must be used within a LayoutModeProvider");
    const { layoutMode, setLayoutMode } = context;
    return { layoutMode, setLayoutMode };
};

export default LayoutModeProvider;