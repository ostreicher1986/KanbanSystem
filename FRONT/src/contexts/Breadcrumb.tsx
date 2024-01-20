import React, { createContext, useState, useContext } from "react";

const BreadcrumbContext = createContext<any>({})

const BreadcrumbProvider: React.FC = ({ children }) => {
    const [breadcrumb, setBreadcrumb] = useState([]);

    return (
        <BreadcrumbContext.Provider value={{ breadcrumb, setBreadcrumb }}>{children}</BreadcrumbContext.Provider>
    );
};

export const useBreadcrumb = () => {
    const context = useContext(BreadcrumbContext);
    if (!context) throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
    const { breadcrumb, setBreadcrumb } = context;
    return { breadcrumb, setBreadcrumb };
};

export default BreadcrumbProvider;