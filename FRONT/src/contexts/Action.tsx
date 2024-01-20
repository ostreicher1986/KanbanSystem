import React, { createContext, useState, useContext } from "react";

const ActionContext = createContext<any>({})

const ActionProvider: React.FC = ({ children }) => {
    const [action, setAction] = useState(false);

    return (
        <ActionContext.Provider value={{ action, setAction }}>{children}</ActionContext.Provider>
    );
};

export const useAction = () => {
    const context = useContext(ActionContext);
    if (!context) throw new Error("useAction must be used within a ActionProvider");
    const { action, setAction } = context;
    return { action, setAction };
};

export default ActionProvider;