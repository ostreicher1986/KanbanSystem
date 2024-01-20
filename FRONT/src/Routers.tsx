import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PageForbidden from './layout/components/pageForbidden';
import PageNotFound from './layout/components/pageNotFound';
import SkeletonRouters from './layout/components/skeletonRouters';
import { useLocalStorageToken } from './contexts/LocalStorageToken';
import { useRoles } from './contexts/Roles';
import { routeMain as routeMainHome, routes as homeRoutes } from './screens/board/routes';
import { routeMain as routeMainLogin, routes as loginRoutes } from './screens/login/routes';

interface PrivateRouteProps {
  component: React.FC;
  mainpath: string;
  entityConfig: string;
  service: string | undefined;
  path: string;
  permissionAttribute: string;
  exact: boolean;
  breadcrumb?: object[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = props => {

  const { localStorageToken } = useLocalStorageToken();
  const { roles, setRoles } = useRoles();

  const permission = async (path: string) => {

    let value = ( path === "/") ? true : false;    

    const role = {
      search: value,      
      viewMenu: value
    };

  return role;

}

  useEffect(() => {
    
  },[]);

  useEffect(() => {
    const checkRoles = async () => {
      if (props.mainpath !== routeMainLogin) {
        const response = await permission(props.mainpath);
        setRoles(response)
      }
    };
    checkRoles();
  },[props.mainpath, setRoles, props.permissionAttribute]);


  useEffect(() => {
  })

  if (props.path === routeMainLogin) {
    if ( localStorageToken ) {
      return <Redirect to={routeMainHome} />
    } else {
      return <Route path={props.path} exact={props.exact} component={props.component} />
    }
  } else if ( !localStorageToken ) {
    return <Redirect to={routeMainLogin} />
  } else if ( roles && Object.keys(roles).length && !roles[props.permissionAttribute] ) {
    return <PageForbidden />
  } else if ( roles && Object.keys(roles).length && roles[props.permissionAttribute] ) {
    return <Route path={props.path} exact={props.exact} component={props.component} />
  } else {
    return <SkeletonRouters />
  }

};

const Routers: React.FC = () => (
  
  <Switch>
    
    {  homeRoutes.map((props, key) => <PrivateRoute key={key} { ...props } />)  }
    { loginRoutes.map((props, key) => <PrivateRoute key={key} { ...props } />)  }    
    
    <Route path="*" component={PageNotFound} />
    
  </Switch>
  
)

export default Routers;