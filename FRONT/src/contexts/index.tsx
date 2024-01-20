import React from "react";
import ActionProvider from './Action';
import BreadcrumbProvider from './Breadcrumb';
import EntityConfigProvider from './EntityConfig';
import LayoutColorModeProvider from './LayoutColorMode';
import LayoutModeProvider from './LayoutMode';
import MenuProvider from './Menu';
import RolesProvider from './Roles';
import LocaStorageTokenProvider from './LocalStorageToken';
import LocaStorageLoginProvider from './LocalStorageLogin';
import HomeCardsInfosProvider from './HomeCardsInfos';

const Providers = [
    <LocaStorageLoginProvider />,
    <LocaStorageTokenProvider />,
    <LayoutModeProvider />,
    <LayoutColorModeProvider />,
    <MenuProvider />,
    <ActionProvider />,
    <BreadcrumbProvider />,
    <RolesProvider />,
    <EntityConfigProvider />,
    <HomeCardsInfosProvider />
];

export default Providers;