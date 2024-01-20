import styled from "styled-components";

export const PanelContent: any = styled.div`
    & .p-panel-content {
        padding: 0px !important;
    }
`

export const List: any = styled.div`
    height: 300px;
    overflow: auto;
`;

export const Item: any = styled.div`
    padding: 3px 7px;
    background-color: ${(props: any) => props.selected ? "#007ad9" : "#f4f4f4"};
    color: ${(props: any) => props.selected ? "#fff" : "#333333"};
    margin-bottom: 2px;
    font-size: initial;
    &:hover {
        background-color: ${(props: any) => props.selected ? "#00579b" : "#d8d8d8"};
        color: ${(props: any) => props.selected ? "#fff" : "#333333"};
        cursor: pointer;
    }
`;

export const Action: any = styled.div`
    text-align: center;
`;

export const Filter: any = styled.div`
    padding: 5px;
    & .p-inputgroup-addon {
        background-color: #fff !important;
    }
`