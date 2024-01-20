import { Button } from 'primereact/button';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useLocalStorageToken } from '../../../contexts/LocalStorageToken';
import { routeMain } from '../../../screens/board/routes';
import { routeMain as routeMainLogin } from '../../../screens/login/routes';
import { h1, h2, p } from '../../../layout/styles/pageNotFound';

const PageNotFound: React.FC = () => {

    const { localStorageToken } = useLocalStorageToken();

    if ( localStorageToken ) {
        return (
            <>
                <h1 style={h1}>404</h1>
                <h2 style={h2}>Página não encontrada.</h2>
                <p style={p}>Entre em contato com o suporte para maiores informações. 
                    Use o botão abaixo para voltar à página inicial.</p>
                <Link to={routeMain}><Button icon="pi pi-board" label="Board" /></Link>
            </>
        )
    } else {
        return <Redirect to={routeMainLogin} />
    }

}

export default PageNotFound;