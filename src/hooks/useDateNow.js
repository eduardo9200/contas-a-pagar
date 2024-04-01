import { useState, useEffect } from "react";

//const DIA_EM_MS = 10000;
const DIA_EM_MS = 24 * 60 * 60 * 1000;

const useDateNow = () => {
  const [dataAtual, setDataAtual] = useState(new Date());

  const calculaTempoParaProximaMeiaNoite = () => {
    const agora = new Date();
    const meiaNoite = new Date(agora);
    meiaNoite.setHours(24, 0, 0, 0);
    return meiaNoite - agora;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const intervalId = setInterval(() => {
        setDataAtual(new Date());
      }, DIA_EM_MS);

      return () => { clearInterval(intervalId) }
    }, calculaTempoParaProximaMeiaNoite);

    return () => { clearTimeout(timer) }
  }, []);

  return { dataAtual };
};

export default useDateNow;