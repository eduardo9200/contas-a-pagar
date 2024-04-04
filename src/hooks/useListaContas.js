import { useEffect, useState } from "react";
import { get } from "../services/ApiService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const useListaContas = () => {
  const [rows, setRows] = useState([]);

  const createData = (
    id, conta, valor, vencimento, juros, periodoJuros, valorAtualizado, status) => {
      return { id, conta, valor, vencimento, juros, periodoJuros, valorAtualizado, status };
  }
  
  useEffect(() => {
    let arr = [];

    get('contas/todas')
    .then((result) => {
      result.forEach(res => {
        arr.push(
          createData(res.id, res.conta, res.valor, res.vencimento, res.juros, res.periodoJuros, res.valorAtualizado, res.status)
        );
      });

      setRows(arr);
    })
    .catch(err => toast.error('Falha ao buscar dados. ', err));
  }, []);

  return { rows };
};

export default useListaContas;