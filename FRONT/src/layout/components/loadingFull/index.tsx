import React from 'react';
import { useSelector } from "react-redux";
import AppState from "../../../redux/interfaces";
import { LoadingFull as LoadingFullInterface } from "../../../redux/interfaces/LoadingFull";
import { FullDiv, Text } from '../../../layout/styles/loadingFull';

const LoadingFull: React.FC = () => {

    const loadingFull: LoadingFullInterface = useSelector((state: AppState) => state.loadingFull);

    if ( loadingFull.items.length )

        return (
            <FullDiv>
                <i className="pi pi-spin pi-spinner" style={{'fontSize': '3em'}}></i><br />
                <Text>Carregando...</Text>
            </FullDiv>
        )

    else

        return null;

}

export default LoadingFull;