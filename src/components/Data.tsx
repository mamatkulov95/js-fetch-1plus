import { useState, useEffect } from "react";

import "./Data.css";

interface CurrencyData {
  id: number;
  symbol: string;
  name: string;
}

export default function Data() {
  const [data, setData] = useState<CurrencyData[]>([]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1"
    )
      .then((response) => response.json())
      .then((jsonData: CurrencyData[]) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, []);

  return (
    <div>
      <h1>Data</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Symbol</th>
            <th>Name</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className={index < 5 ? "green-bg" : ""}>
              <td>{item.id}</td>
              <td>{item.symbol}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
