import styled from "styled-components";

export const MenuBar: any = styled.div`
    margin-bottom: 5px;
    border: 1px solid #c8c8c8;
    padding: 8px;
    padding-bottom: 0px;
`;

export const BtnConfirmationNo: any = {
    border: "solid 1px #ccc"
}

export const TableExportPDF: any = {
    margin: {
        margin: "50px"
    },
    table: {
        fontFamily: "Arial, Helvetica, sans-serif",
        borderCollapse: "collapse",
        width: "100%"
    },
    td_th: {
        border: "1px solid #ddd",
        padding: "8px"
    },
    th: {
        paddingTop: "12px",
        paddingBottom: "12px",
        textAlign: "left",
        backgroundColor: "#0388E5",
        color: "white",
    },
    striped: {
        backgroundColor: "#f2f2f2"
    },
    dateExported: {
        marginTop: "30px",
        fontFamily: "Arial, Helvetica, sans-serif",
        textAlign: "right"
    }
}