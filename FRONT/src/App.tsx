import { Suspense  } from 'react';
import classNames from 'classnames';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Toast as GrowlPrimereact } from "primereact/toast";
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import './App.scss';
import { useLayoutColorMode } from './contexts/LayoutColorMode';
import { useLayoutMode } from './contexts/LayoutMode';
import { useLocalStorageToken } from './contexts/LocalStorageToken';
import './layout/layout.scss';
import { callGrowl } from "./redux/actions/Growl";
import AppState from "./redux/interfaces";
import { Growl } from "./redux/interfaces/Growl";
import { initialState as growlInitialState } from './redux/reducers/Growl';
import Routers from './Routers';

import AppMenu from './layout/components/AppMenu';
import AppProfile from './layout/components/AppProfile';
import AppTopbar from './layout/components/AppTopbar';
import AppFooter from './layout/components/AppFooter';
import BreadCrumb from './layout/components/breadcrumb';
import LoadingFull from './layout/components/loadingFull';

const App: React.FC = () => {

  const {layoutMode} = useLayoutMode();
  const {layoutColorMode} = useLayoutColorMode();
  const {localStorageToken} = useLocalStorageToken();
  const growlPrimereact = useRef<GrowlPrimereact>(null);
  const growl: Growl = useSelector((state: AppState) => state.growl);
  const dispatch = useDispatch();
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  
  let menuClick: boolean = false;

  useEffect(() => {
    
    if (mobileMenuActive)
        addClass(document.body, 'body-overflow-hidden');
    else
        removeClass(document.body, 'body-overflow-hidden');

  }, [mobileMenuActive])

  useEffect(() => {
    const { show, ...message } = growl;
    if ( show ) {
      growlPrimereact.current?.show(message);
      dispatch(callGrowl(growlInitialState));
    }
  },[growl, dispatch])

  const isDesktop = () => {
    return window.innerWidth > 1024;
  }

  const onWrapperClick = () => {
    if (!menuClick) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
    menuClick = false;
  }

  const onToggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {

    menuClick = true

    if (isDesktop()) {
      if (layoutMode === 'overlay') {
        setOverlayMenuActive(!overlayMenuActive);
      } else if (layoutMode === 'static') {
        setStaticMenuInactive(!staticMenuInactive);
      }
    } else {
      setMobileMenuActive(!mobileMenuActive);
    }
   
    event.preventDefault();
  }

  const onSidebarClick = () => {
    menuClick = true;
  }

  const onMenuItemClick = (event: any) => {
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  }

  const addClass = (element: any, className: String) => {
    if (element.classList)
      element.classList.add(className);
    else
      element.className += ` ${className}`;
  }

  const removeClass = (element: any, className: String) =>{
      if (element.classList)
          element.classList.remove(className);
      else
          element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }

  const wrapperClass = classNames('layout-wrapper', {
    'layout-overlay': layoutMode === 'overlay',
    'layout-static': layoutMode === 'static',
    'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
    'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
    'layout-mobile-sidebar-active': mobileMenuActive
  });

  const sidebarClassName = classNames("layout-sidebar", {
    'layout-sidebar-dark': layoutColorMode === 'dark',
    'layout-sidebar-light': layoutColorMode === 'light'
  });

  // const logo = `${process.env.PUBLIC_URL}/favicon.ico`;

  return (

    <Suspense fallback={<div>Carregando...</div>}>
      <div className={wrapperClass} onClick={() => onWrapperClick()}>

          { localStorageToken &&
            <>
              <AppTopbar onToggleMenu={onToggleMenu} />
              <div className={sidebarClassName} onClick={() => onSidebarClick()} >
                <div className="layout-logo" style={{ color: layoutColorMode === "dark" ? "#fff" : "#000", fontWeight: "bold", fontSize: "xx-large"}}>                  
                  
                </div>
                <div style={{ color: layoutColorMode === "dark" ? "#fff" : "#000", fontSize: "smaller", textAlign: "center"}}>
                  
                </div>
                <AppProfile />
                <AppMenu onMenuItemClick={onMenuItemClick} />
              </div>
            </>
          }
      
        <div className="layout-main">
          {/* Rotas aqui */}
          <BreadCrumb />
          <Routers />
        </div>

        <GrowlPrimereact ref={growlPrimereact} />

        <LoadingFull />
      
        { localStorageToken && <AppFooter /> }

        <div className="layout-mask"></div>
        
      </div>
    </Suspense>    
  )

}

export default App
