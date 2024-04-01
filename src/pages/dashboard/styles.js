import styled from "@emotion/styled";
import { TableCell, TableRow } from "@mui/material";
import TableContainer from '@mui/material/TableContainer';

const sharedStyles = `
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:active {
    transform: translateY(1px);
  }
`;

export const MyButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

export const PrimaryButton = styled.button`
  ${sharedStyles}
  align-self: flex-start;
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;

// Botão secundário
export const SecondaryButton = styled.button`
  ${sharedStyles}
  background-color: #6c757d;
  color: white;

  &:hover {
    background-color: #5a6268;
  }
`;

export const SaveButton = styled.button`
  ${sharedStyles}
  background-color: #008000;
  color: white;

  &:hover {
    background-color: #006400;
  }
`;

export const DashboardContainer = styled.div`
  padding: 20px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TableContainerMod = styled(TableContainer)`
  margin: 15px 0;
`;

export const TableRowContent = styled(TableRow)`
  &:hover {
    background-color: #C0FFFF;
  }
`;

export const TableCellHeader = styled(TableCell)`
  font-weight: 700;
`;

export const TableCellStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

export const Data = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 700;
`;

export const InfoTabela = styled.span`
  width: 100%;
  text-align: left;
  font-size: 12px;
`;