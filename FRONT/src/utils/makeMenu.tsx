import sortArrayObject from './sortAnArrayOfObjects';

/**
 * Função responsável por montar o menu
 * @param menu array retornado da api com as permissõess de acesso
 */
export const makeMenu = (menu: Array<Object>) => {

    const viewMenu = menu.filter((item:any) => item.viewMenu);
        //const viewMenu = menu.filter((item:any) => item.ViewMenu);

    return viewMenu.reduce((accum: any, item: any) => {
        let exists = accum.find((i: any) => i.label === item.routerMenuName)
        if ( !exists ) {            
            if ( item.routerMenuName ) {
                accum.push({
                    label: item.routerMenuName,
                    icon: item.routerMenuIconSymbol,
                    items: viewMenu.reduce((accum2: any, item2: any) => {
                        if ( item2.routerMenuSymbol === item.routerMenuSymbol )
                            accum2.push({
                                label: item2.routerName,
                                icon: item2.routerIconSymbol,
                                to: item2.routerUrl
                            });
                        return accum2;
                    }, []),
                })
            } else {
                accum.push({
                    label: item.routerName,
                    icon: item.routerIconSymbol ? item.routerIconSymbol : item.routerMenuIconSymbol,
                    to: item.routerUrl
                });
            }
        }
        return accum;
    }, []).sort(sortArrayObject("label"));

}