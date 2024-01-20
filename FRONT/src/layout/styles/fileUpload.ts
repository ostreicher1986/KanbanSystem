import styled from "styled-components";

export const label: any = (disabled: boolean) => {
    return {
        // marginTop: "10px",
        backgroundColor:"#607D8B",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "4px",
        lineHeight: "1.8",
        cursor: "pointer",
        opacity: disabled ? "0.5" : "1",
        pointerEvents: disabled ? "none" : "all"
    }
};

export const inputFile: any = {
    display: "none"
};

export const DivFileName: any = styled.div`
    font-size: initial;
    display: inline-block;
    font-weight: bold;
`;

export const DivIcon: any = styled.div`
    margin-left: 5px;
    display: inline-block;
    cursor: pointer;
`;

export const PanelStyle: any = styled.div`
    & .p-panel-titlebar {
        padding-left: 3px !important;
    }
`;