import React, { useState } from "react";
import { DashboardContainer, Data, InfoTabela, MyButtonGroup, PrimaryButton, SaveButton, TableCellHeader, TableCellStatus, TableContainerMod, TableRowContent } from "./styles";
import { FaCalendarAlt, FaCalendarCheck, FaCalendarTimes, FaCalendarPlus, FaEdit, FaTrash } from "react-icons/fa";
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; 
import useDateNow from "../../hooks/useDateNow";
import { Button, ButtonGroup } from "@mui/material";

const Status = {
  PAGO: 'PG',
  VENCIDA: 'VC',
  ABERTA: 'AB',
  ABERTA_PERTO_VENCER: 'PV'
};

export default function Contas() {
  const { dataAtual } = useDateNow();
  
  const createData = (
    id, conta, valor, vencimento, juros, periodoJuros, valorAtualizado, status) => {
      return { id, conta, valor, vencimento, juros, periodoJuros, valorAtualizado, status };
  }
  
  //FIXME: Criar um hook para capturar o valor do array rows.
  const rows = [
    createData(1, 'Frozen yoghurt', 159, '15/01/2024', 24, 'a.m.', 4.0, 'PG'),
    createData(2, 'Ice cream sandwich', 237, '16/12/2032', 37, 'a.a.', 4.3, 'AB'),
    createData(3, 'Eclair', 262, '15/04/2024', 24, 'a.d.', 6.0, 'PV'),
    createData(4, 'Cupcake', 305, '17/05/2013', 67, 'a.m.', 4.3, 'VC'),
    createData(5, 'Gingerbread', 356, '19/12/1960', 49, 'a.a.', 3.9, 'VC')
  ];
  
  const [checkContasPagas, setCheckContasPagas] = useState(
    rows.map(r => ({
        id: r.id,
        isChecked: r.status === Status.PAGO
      }
    ))
  );
    
  const getValorEmReais = (valor) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const getTextJuros = (juros, periodoJuros) => {
    return juros + '% ' + periodoJuros;
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

  const handleCheckbox = (event, id) => {
    const isChecked = event.target.checked;

    let arr = [...checkContasPagas];
    let index = arr.findIndex(c => c.id === id);

    if (index !== -1) {
      arr[index].isChecked = isChecked;
    }

    setCheckContasPagas(arr);
  };

  const handleSalvarTodasContas = () => {
    console.log('executando salvar');
    //Filtra apenas as linhas onde houve alteração do checkbox
    const alteracoes = checkContasPagas.filter((check, index) => {
      const isChecked = check.isChecked;
      const conta = rows[index];

      return (
        conta.status === Status.PAGO && !isChecked ||
        conta.status !== Status.PAGO && isChecked
      );
    });

    //salva as alterações
    console.log(alteracoes);
  };

  const handleAlterarConta = (id) => {
    console.log('clicou alterar', id);
  };

  const handleExcluirConta = (id) => {
    console.log('clicou excluir', id);
  };

  const navigateToNovaConta = () => {
    console.log('navegando');
  };

  function BasicTable() {
    return (
      <TableContainerMod component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: '#F2F2F2' }}>
              <TableCellHeader>Conta</TableCellHeader>
              <TableCellHeader align="center">Valor</TableCellHeader>
              <TableCellHeader align="center">Vencimento</TableCellHeader>
              <TableCellHeader align="center">Taxa de Juros</TableCellHeader>
              <TableCellHeader align="center">Valor atualizado</TableCellHeader>
              <TableCellHeader align="center">Situação</TableCellHeader>
              <TableCellHeader align="center">Marcar como Paga</TableCellHeader>
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
                  <TableCell component="th" scope="row">
                    {row.conta}
                  </TableCell>
                  <TableCell align="center">{getValorEmReais(row.valor)}</TableCell>
                  <TableCell align="center">{row.vencimento}</TableCell>
                  <TableCell align="center">{getTextJuros(row.juros, row.periodoJuros)}</TableCell>
                  <TableCell align="center">{getValorEmReais(row.valorAtualizado)}</TableCell>
                  <TableCell align="center" style={{ color, backgroundColor }}>
                    <TableCellStatus>
                      {component} {text}
                    </TableCellStatus>
                  </TableCell>
                  <TableCell align="center"><Checkbox key={`check_${row.id}`} checked={checkContasPagas[index].isChecked} onChange={(e) => handleCheckbox(e, row.id)} /></TableCell>
                  <TableCell align="center">
                    <ButtonGroup>
                      <Button color="primary" startIcon={<FaEdit size={12} />} onClick={() => handleAlterarConta(row.id)}>
                        Alterar
                      </Button>
                      <Button color="error" startIcon={<FaTrash size={12} />} onClick={() => handleExcluirConta(row.id)}>
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
    <DashboardContainer>
      <Data>{dataAtual.toLocaleDateString()}</Data>
      <MyButtonGroup>
        <PrimaryButton onClick={navigateToNovaConta}>Nova Conta</PrimaryButton>
        <SaveButton onClick={handleSalvarTodasContas}>Salvar</SaveButton>
      </MyButtonGroup>
      <BasicTable />
      <InfoTabela>* Faltam menos de 07 dias para o vencimento.</InfoTabela>
    </DashboardContainer>
  );
}