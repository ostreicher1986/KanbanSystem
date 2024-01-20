import React from 'react';
import styled from "styled-components";

interface Props {
    onToggleMenu: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const StyleMultSelect: any = styled.div`
    & .p-multiselect-close {
        display: none !important;
    }
    & .p-multiselect-panel {
        top: 43px !important;
        margin-left: -21px !important;
    }
    & .p-multiselect {
        background-color: transparent !important;
        border: solid 1px #fff !important;
    }
    & .p-multiselect-trigger {
        background-color: transparent !important;
    }
    & .p-multiselect-trigger-icon {
        color: #fff !important;
    }
    & .p-multiselect-label {
        color: transparent !important;
        text-shadow: 0 0 0 #fff !important;
    }
`;

const AppTopbar: React.FC<Props> = (props) => {

    React.useEffect(() => {
        
    });

    return (
        <div className="layout-topbar clearfix">
            <button className="p-link layout-menu-button" onClick={props.onToggleMenu}>
                <span className="pi pi-bars"/>
            </button>
            <div className="layout-topbar-icons">
                
            </div>
        </div>
    )
}

export default AppTopbar