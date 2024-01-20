import React, { createContext, useState, useContext } from "react";

const EntityConfigContext = createContext<any>({})

const EntityConfigProvider: React.FC = ({ children }) => {
    const [entityConfig, setEntityConfig] = useState({});

    return (
        <EntityConfigContext.Provider value={{ entityConfig, setEntityConfig }} >
            {children}
        </EntityConfigContext.Provider>
    );
};

export const useEntityConfig = () => {
    const context = useContext(EntityConfigContext);
    if (!context) throw new Error("useEntityConfig must be used within a EntityConfigProvider");
    const { entityConfig, setEntityConfig } = context;
    return { entityConfig, setEntityConfig };
};

export default EntityConfigProvider;