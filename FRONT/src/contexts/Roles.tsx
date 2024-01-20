import React, { createContext, useState, useContext } from "react";

const RolesContext = createContext<any>({})

const RolesProvider: React.FC = ({ children }) => {
    const [roles, setRoles] = useState({});

    return (
        <RolesContext.Provider value={{ roles, setRoles }}>{children}</RolesContext.Provider>
    );
};

export const useRoles = () => {
    const context = useContext(RolesContext);
    if (!context) throw new Error("useRoles must be used within a RolesProvider");
    const { roles, setRoles } = context;
    return { roles, setRoles };
};

export default RolesProvider;