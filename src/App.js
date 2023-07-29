import { useState, useEffect } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState("07-13-2023");
  const [endDate, setEndDate] = useState("07-23-2023");

  const handleOlinda = () => {
    fetch(
      `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${startDate}'&@dataFinalCotacao='${endDate}'&$top=100&$format=json`
    )
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    handleOlinda();
  }, [startDate, endDate]);

  const parseDate = (date) => {
    let date_r = date.split("-");
    let finalDate = date_r[1] + "-" + date_r[2] + "-" + date_r[0];
    console.log("finalDate", finalDate, date_r);
    return finalDate;
  };

  return (
    <div className="container">
      <h1>Cotação Dólar por Período</h1>
      <div>
        <form className="form inicio">
          <div className="row mb-50">
            <div className="col-6">
              <label className="form-label text-left">Início:</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => {
                  setStartDate(parseDate(e.target.value));
                }}
              />
            </div>
            <div className="col-6">
              <label className="form-label  text-left">Fim:</label>
              <input
                className="form-control"
                type="date"
                onChange={(e) => {
                  setEndDate(parseDate(e.target.value));
                }}
              />
            </div>
          </div>
        </form>
      </div>
      <hr />
      <div>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr className="tr">
              <th className="th">Compra</th>
              <th className="th">Venda</th>
              <th className="th">Data</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.value.map((i) => {
                  return (
                    <tr>
                      <td>{i.cotacaoCompra}</td>
                      <td>{i.cotacaoVenda}</td>
                      <td>{i.dataHoraCotacao}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
