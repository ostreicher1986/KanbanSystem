import { Button } from 'primereact/button';
import React from 'react';
import { h1, h2, p } from '../../../layout/styles/networkError';
import { routeMain } from '../../../screens/board/routes';

const NetworkError: React.FC = () => {

    return (
        <>
            <h1 style={h1}>504</h1>
            <h2 style={h2}>Ops! O servidor não está respondendo.</h2>
            <p style={p}>Recarregue a página para tentar novamente.</p>
            <Button onClick={() => window.location.href = routeMain } icon="pi pi-refresh" label="Recarregar" />
        </>
    )

}

export default NetworkError;