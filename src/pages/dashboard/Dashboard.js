import React, { useState } from "react";
import { DashboardContainer, Data, InfoTabela, MyButtonGroup, PrimaryButton, TableCellHeader, TableCellStatus, TableContainerMod, TableRowContent } from "./styles";
import { FaCalendarAlt, FaCalendarCheck, FaCalendarTimes, FaCalendarPlus, FaEdit, FaTrash, FaDollarSign } from "react-icons/fa";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; 
import useDateNow from "../../hooks/useDateNow";
import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useListaContas from "../../hooks/useListaContas";
import { deleteResource, patch } from "../../services/ApiService";
import ConfirmDialog from "../../components/Modal/ConfirmDialog";
import Header from "../../components/header/Header";

const Status = {
  PAGO: 'PAGO',
  VENCIDA: 'VENCIDA',
  ABERTA: 'ABERTA',
  ABERTA_PERTO_VENCER: 'ABERTA_PERTO_VENCER'
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { dataAtual } = useDateNow();
  const { rows } = useListaContas();
  const [openDialog, setOpenDialog] = useState(false);
  const [contaId, setContaId] = useState(null);
    
  const getValorEmReais = (valor) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const ajustarData = (data) => {
    const str = data.split("-");
    const novaData = `${str[2]}-${str[1]}-${str[0]}`;
    return novaData;
  };

  const getTextJuros = (juros, periodoJuros) => {
    const ajustaPeriodoJuros = (periodoJuros) => {
      const letra_1 = periodoJuros.charAt(0).toLowerCase();
      const letra_2 = periodoJuros.charAt(1).toLowerCase();
      return `${letra_1}.${letra_2}.`;
    }
    return juros + '% ' + ajustaPeriodoJuros(periodoJuros);
  };

  const getInfoByStatus = (status) => {
    let color = '#000';
    let backgroundColor = '#FFF';
    let component = <FaCalendarAlt />;
    let text = '';

    switch(status) {
      case Status.PAGO:
        component = <FaCalendarCheck />;
        text = 'Quitada';
        color = '#2C6153';
        backgroundColor = '#C6EFCE';
        break;
      case Status.VENCIDA:
        component = <FaCalendarTimes />;
        text = 'Vencida';
        color = '#AD0055';
        backgroundColor = '#FFC7CE';
        break;
      case Status.ABERTA_PERTO_VENCER:
        component = <FaCalendarPlus />;
        text = 'Próx. Vencer *'
        color = '#AD573E';
        backgroundColor = '#FFEB9C';
        break;
      default:
        component = <FaCalendarAlt />;
        text = 'Aberta';
        color = '#000';
        backgroundColor = '#F2F2F2';
      }

      return { component, text, color, backgroundColor };
  };

  const handleAlterarConta = (id) => {
    navigate(`/conta/${id}`);
  };

  const handlePagarConta = (id) => {
    patch(`contas/pagar/${id}`)
    .then(() => {
      toast.success('Conta paga com sucesso!');
      
      const indexToChangeStatus = rows.findIndex(row => row.id === id);

      if (indexToChangeStatus !== -1) {
        rows[indexToChangeStatus].status = Status.PAGO;
      }
    })
    .catch((err) => toast.error('Falha ao pagar conta. ', err));
  };

  const handleOpenDialog = (id) => {
    setOpenDialog(true);
    setContaId(id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setContaId(null);
  };

  const handleConfirmDelete = () => {
    deleteResource(`contas/excluir/${contaId}`)
    .then(() => {
      toast.success('Removido com sucesso!')
      
      const indexToRemove = rows.findIndex(row => row.id === contaId);

      if (indexToRemove !== -1) {
        rows.splice(indexToRemove, 1);
      }
    })
    .catch((err) => toast.error('Falha ao excluir conta. ', err))
    .finally(() => setOpenDialog(false));
  };

  const navigateToNovaConta = () => {
    navigate('/nova-conta');
  };

  function BasicTable() {
    return (
      <TableContainerMod component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: '#F2F2F2' }}>
              <TableCellHeader>#</TableCellHeader>
              <TableCellHeader>Conta</TableCellHeader>
              <TableCellHeader align="center">Valor</TableCellHeader>
              <TableCellHeader align="center">Vencimento</TableCellHeader>
              <TableCellHeader align="center">Taxa de Juros</TableCellHeader>
              <TableCellHeader align="center">Valor atualizado</TableCellHeader>
              <TableCellHeader align="center">Situação</TableCellHeader>
              <TableCellHeader align="center">Opções</TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              const { component, text, color, backgroundColor } = getInfoByStatus(row.status);
              return (
                <TableRowContent
                  key={`row_${row.id}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell component="th" scope="row" style={{ color, backgroundColor }}>
                    {row.conta}
                  </TableCell>
                  <TableCell align="center" style={{ color, backgroundColor }}>{getValorEmReais(row.valor)}</TableCell>
                  <TableCell align="center" style={{ color, backgroundColor }}>{ajustarData(row.vencimento)}</TableCell>
                  <TableCell align="center" style={{ color, backgroundColor }}>{getTextJuros(row.juros, row.periodoJuros)}</TableCell>
                  <TableCell align="center" style={{ color, backgroundColor }}>{getValorEmReais(row.valorAtualizado)}</TableCell>
                  <TableCell align="center" style={{ color, backgroundColor }}>
                    <TableCellStatus>
                      {component} {text}
                    </TableCellStatus>
                  </TableCell>
                  <TableCell align="center" style={{ color, backgroundColor }}>
                    <ButtonGroup variant="contained" size="small">
                      <Button color="warning" startIcon={<FaDollarSign size={12} />} onClick={() => handlePagarConta(row.id)} disabled={row.status === Status.PAGO}>
                        Pagar
                      </Button>
                      <Button color="primary" startIcon={<FaEdit size={12} />} onClick={() => handleAlterarConta(row.id)}>
                        Alterar
                      </Button>
                      <Button color="error" startIcon={<FaTrash size={12} />} onClick={() => handleOpenDialog(row.id)}>
                        Excluir
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRowContent>
              )
            })}
          </TableBody>
        </Table>
      </TableContainerMod>
    );
  }

  return (
    <div>
      <Header />
      <DashboardContainer>
        <Data>{dataAtual.toLocaleDateString()}</Data>
        <MyButtonGroup>
          <PrimaryButton onClick={navigateToNovaConta}>Nova Conta</PrimaryButton>
        </MyButtonGroup>
        <BasicTable />
        <InfoTabela>* Faltam menos de 07 dias para o vencimento.</InfoTabela>
        <ConfirmDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmDelete}
          title="Confirmar Exclusão"
          message="Tem certeza que deseja excluir este item?"
        />
      </DashboardContainer>
    </div>
  );
}