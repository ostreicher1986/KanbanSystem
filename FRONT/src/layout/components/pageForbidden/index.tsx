import { Button } from 'primereact/button';
import React from 'react';
import { Link } from 'react-router-dom';
import { routeMain } from '../../../screens/board/routes';
import { h1, h2, p } from '../../../layout/styles/pageForbidden'

const PageForbidden: React.FC = () => {

    return(
        <>
            <h1 style={h1}>403</h1>
            <h2 style={h2}>OH OH! Você está acessando uma área restrita.</h2>
            <p style={p}>A página que você está tentando acessar é restrita a alguns usuários. 
            Para obter o acesso você deve solicitar permissão a um administrador do sistema.</p>
            <Link to={routeMain}><Button icon="pi pi-board" label="Board" /></Link>
        </>
    )

}

export default PageForbidden;