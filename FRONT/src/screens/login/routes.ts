import Index from './index';

export const entitySymbol  = ``;
export const service       = `kanbansystemapi`;
export const routeMain     = `/login`;

export const routes = [
    { exact: true, mainpath: routeMain, entityConfig: entitySymbol, service, path: routeMain, permissionAttribute: "", component: Index }
];