import React from 'react';
import { Link } from 'react-router-dom';
import { useBreadcrumb } from '../../../contexts/Breadcrumb';
import { useLocalStorageToken } from '../../../contexts/LocalStorageToken';
import { routeMain } from '../../../screens/board/routes';

const BreadCrumb: React.FC = () => {

    const { localStorageToken } = useLocalStorageToken();
    const { breadcrumb } = useBreadcrumb();

    return localStorageToken && breadcrumb?.length ? (
        <div style={{paddingBottom: "10px"}}>
            <Link to={routeMain} className="pi pi-home" style={{color: "#848484"}} /> <span className="pi pi-chevron-right" style={{marginLeft: "5px", color: "#848484"}} />
            {breadcrumb.map((item: any, key: number) =>
                <span key={key}>
                    {
                        item.url
                        ?
                        <Link to={item.url} style={{fontSize: "initial", marginLeft: "5px", color: "#333333"}}> {item.label} </Link>
                        :
                        <span style={{fontSize: "initial", marginLeft: "5px", color: "#333333"}}> {item.label} </span>
                    }
                    { key+1 < breadcrumb.length && <span className="pi pi-chevron-right" style={{marginLeft: "5px", color: "#848484"}} /> }
                </span>
            )}
        </div>
    ) : null
}

export default BreadCrumb;