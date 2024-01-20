import Index from './index';

export const entitySymbol                          = `R_PLATFORM_BOARD`;
export const service                               = `kanbansystemapi`;
export const routeMain                             = `/`;

export const breadcrumbMain = [{label: 'Início'}];

export const routes = [
    { exact: true, mainpath: routeMain, entityConfig: entitySymbol, service, path: routeMain, permissionAttribute: "search", component: Index, breadcrumb: breadcrumbMain }
];