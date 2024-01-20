import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useLayoutColorMode } from '../../contexts/LayoutColorMode';
import { useLayoutMode } from '../../contexts/LayoutMode';
import { useLocalStorageToken } from '../../contexts/LocalStorageToken';
import { useMenu } from '../../contexts/Menu';
import decodeToken from '../../utils/decodeToken';
import getIcon from '../../utils/getIcon';

const AppProfile: React.FC = () => {
    
    const [ expanded, setExpanded ] = useState(false);
    const { setLayoutMode } = useLayoutMode();
    const { layoutColorMode, setLayoutColorMode } = useLayoutColorMode();
    const { localStorageToken, setLocalStorageToken } = useLocalStorageToken();
    const [ tokenInfos, setTokenInfos ] = useState<any>(null);
    const { menu, setMenu } = useMenu();
    const [ linkProfile, setLinkProfile ] = useState<any>(null);

    const history = useHistory();

    useEffect(() =>{
        const profile = menu.find((item: any) => item.to === "/profile");
        setLinkProfile(profile);
        setTokenInfos(decodeToken(localStorageToken));
    },[menu, localStorageToken]);

    const onClickExpanded = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setExpanded(!expanded);
    }

    const clearCacheData = () => {
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
        window.location.reload();
    };

    const onClickLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setMenu(null);
        setLocalStorageToken('');
        setLayoutMode('');
        setLayoutColorMode('');
        clearCacheData();
        history.push("/login");
    }

    return  (
        <div className="layout-profile">
            <div>
                {getIcon("BsKanban", "50", layoutColorMode === "dark" ? "#fff" : "")}
            </div>
            <br />
            <button className="p-link layout-profile-link" onClick={onClickExpanded}>
                <span className="username">{'Kanban System'}</span>
                <i className="pi pi-fw pi-cog"/>
            </button>
            
            <ul className={classNames({'layout-profile-expanded': expanded})}>
                {
                    linkProfile &&
                    <NavLink activeClassName="active-route" to={linkProfile?.to} exact>
                        <li><button className="p-link"><i className="pi pi-fw pi-user-edit"/><span>{linkProfile?.label}</span></button></li>
                    </NavLink>
                }
                <li><button className="p-link" onClick={onClickLogout}><i className="pi pi-fw pi-power-off"/><span>Sair</span></button></li>
            </ul>
        </div>
    );
}

export default AppProfile;