import moment from 'moment';
import React, { createContext, useContext, useState } from "react";

const HomeCardsInfosContext = createContext<any>({})

const HomeCardsInfosProvider: React.FC = ({ children }) => {
    const [homeCardsInfos, setHomeCardsInfos] = useState({data: [], date: moment(), period: "M"});

    return (
        <HomeCardsInfosContext.Provider value={{ homeCardsInfos, setHomeCardsInfos }}>{children}</HomeCardsInfosContext.Provider>
    );
};

export const useHomeCardsInfos = () => {
    const context = useContext(HomeCardsInfosContext);
    if (!context) throw new Error("useHomeCardsInfos must be used within a HomeCardsInfosProvider");
    const { homeCardsInfos, setHomeCardsInfos } = context;
    return { homeCardsInfos, setHomeCardsInfos };
};

export default HomeCardsInfosProvider;