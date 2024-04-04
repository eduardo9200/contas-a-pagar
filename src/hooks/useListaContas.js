import { useEffect, useState } from "react";
import { get } from "../services/ApiService";

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
    .catch(err => console.error(err));
  }, []);

  return { rows };
};

export default useListaContas;