import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { Checkbox, MenuItem, TextField } from "@mui/material";
import { ButtonsContainer, FieldsContainerCol, FieldsContainerRow } from "./styles";
import { PrimaryButton, SecondaryButton } from "../dashboard/styles";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { change, getById } from "../../services/ApiService";

export default function Conta() {
  const periodos = [
    {value: 'AD', label: 'a.d.'},
    {value: 'AM', label: 'a.m.'},
    {value: 'AA', label: 'a.a.'},
  ];
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    id: 0,
    conta: '',
    valor: '',
    vencimento: '',
    juros: '',
    periodoJuros: 'AM',
    paga: false,
  });

  useEffect(() => {
    getById('contas/buscar', id)
    .then((response) =>
      setData({
        id: response.id,
        conta: response.conta,
        valor: response.valor,
        vencimento: response.vencimento,
        juros: response.juros,
        periodoJuros: response.periodoJuros,
        paga: response.paga
      })
    )
    .catch((err) => toast.error('Falha ao buscar dados da conta. ', err));
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setData({
      ...data,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAlterar = () => {
    const dto = {
      id: data.id,
      conta: data.conta,
      valor: data.valor,
      vencimento: data.vencimento,
      juros: data.juros,
      periodoJuros: data.periodoJuros,
      paga: data.paga
    };
    
    change(`contas/alterar`, dto)
    .then(() => {
      toast.success('Conta salva com sucesso!');
      navigate("/");
    })
    .catch((err) => toast.error('Falha ao salvar conta. ', err));
  };

  const handleVoltar = () => {
    navigate("/");
  };

  return (
    <div>
      <Header />
      <h3>Detalhes da conta</h3>
      <FieldsContainerCol>
        <FieldsContainerRow>
          <TextField id="conta" name="conta" label="Conta" variant="outlined" type="text" value={data.conta} onChange={handleChange} />
          <TextField id="valor" name="valor" label="Valor R$" variant="outlined" type="number" value={data.valor} onChange={handleChange} />
          <TextField id="vencimento" name="vencimento" label="Vencimento" variant="outlined" type="date" value={data.vencimento} onChange={handleChange} />
        </FieldsContainerRow>
        <FieldsContainerRow>
          <TextField id="juros" name="juros" label="Taxa de Juros %" variant="outlined" type="number" value={data.juros} onChange={handleChange} />
          <TextField id="periodoJuros" name="periodoJuros" select label="Periodo de Juros" variant="outlined" defaultValue={data.periodoJuros} value={data.periodoJuros} onChange={handleChange} style={{ width: '150px' }}>
            {periodos.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          Conta paga: <Checkbox name="paga" checked={data.paga} onChange={handleChange} />
        </FieldsContainerRow>
      </FieldsContainerCol>
      <ButtonsContainer>
        <PrimaryButton onClick={handleAlterar}>
          Salvar
        </PrimaryButton>
        <SecondaryButton onClick={handleVoltar}>
          Voltar
        </SecondaryButton>
      </ButtonsContainer>
      
    </div>
  );
}