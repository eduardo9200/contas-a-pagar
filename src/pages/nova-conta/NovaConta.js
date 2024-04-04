import React, { useState } from "react";
import Header from "../../components/header/Header";
import { MenuItem, TextField } from "@mui/material";
import { ButtonsContainer, FieldsContainerCol, FieldsContainerRow } from "./styles";
import { PrimaryButton, SecondaryButton } from "../dashboard/styles";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { post } from "../../services/ApiService";

//Retorna a data no formato yyyy-MM-dd
const getDataAtual = () => {
  const date = new Date();
  let ano = date.getFullYear();
  let mes = date.getMonth() + 1;
  let dia = date.getDate();

  if (mes < 10) mes = '0' + mes;
  if (dia < 10) dia = '0' + dia;

  return `${ano}-${mes}-${dia}`;
};

export default function NovaConta() {
  const periodos = [
    {value: 'AD', label: 'a.d.'},
    {value: 'AM', label: 'a.m.'},
    {value: 'AA', label: 'a.a.'},
  ];

  const valorPadraoPeriodo = periodos[1].value;

  const navigate = useNavigate();

  const [conta, setConta] = useState("");
  const [valor, setValor] = useState(0.0);
  const [vencimento, setVencimento] = useState(getDataAtual());
  const [taxaJuros, setTaxaJuros] = useState(0.0);
  const [periodoJuros, setPeriodoJuros] = useState(valorPadraoPeriodo);

  const validaCampos = () => {
    return !!conta && !!vencimento;
  };

  const handleSalvar = () => {
    if (!validaCampos()) {
      toast.warn('Há campos vazios');
      return;
    }

    const dto = {
      conta: conta,
      valor: valor,
      vencimento: vencimento,
      juros: taxaJuros,
      periodoJuros: periodoJuros,
      paga: false
    };

    post(`contas/salvar`, dto)
    .then(() => {
      toast.success('Conta salva com sucesso!');
      navigate("/");
    })
    .catch((err) => toast.error('Falha ao salvar conta. ', err));
  };

  const handleCancelar = () => {
    setConta("");
    setValor(0.0);
    setVencimento(getDataAtual());
    setTaxaJuros(0.0);
    setPeriodoJuros(valorPadraoPeriodo);

    navigate("/");
  };

  return (
    <div>
      <Header />
      <h3>Nova conta</h3>
      <FieldsContainerCol>
        <FieldsContainerRow>
          <TextField id="conta" label="Conta" variant="outlined" type="text" value={conta} onChange={e => setConta(e.target.value)} />
          <TextField id="valor" label="Valor R$" variant="outlined" type="number" value={valor} onChange={e => setValor(e.target.value)} />
          <TextField id="vencimento" label="Vencimento" variant="outlined" type="date" value={vencimento} onChange={e => setVencimento(e.target.value)} />
        </FieldsContainerRow>
        <FieldsContainerRow>
          <TextField id="taxa_juros" label="Taxa de Juros %" variant="outlined" type="number" value={taxaJuros} onChange={e => setTaxaJuros(e.target.value)} />
          <TextField id="periodo_juros" select label="Periodo de Juros" variant="outlined" defaultValue={periodoJuros} value={periodoJuros} onChange={e => setPeriodoJuros(e.target.value)} style={{ width: '150px' }}>
            {periodos.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FieldsContainerRow>
      </FieldsContainerCol>
      <ButtonsContainer>
        <PrimaryButton onClick={handleSalvar}>
          Salvar
        </PrimaryButton>
        <SecondaryButton onClick={handleCancelar}>
          Cancelar
        </SecondaryButton>
      </ButtonsContainer>
      
    </div>
  );
}