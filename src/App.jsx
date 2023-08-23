import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Dropdown from "./components/Dropdown";
import fetchProducts from "./services/product";

function App() {
  const [options, setOptions] = useState([]);
  const [data, setData] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchProducts(selectedPrices);
        setData(data);
        const uniquePrices = [...new Set(data.map((elem) => elem.price))];
        setOptions(uniquePrices);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchProduct();
  }, [selectedPrices]);

  const handleDropdownChange = (selectedOptions) => {
    setSelectedPrices(selectedOptions);
  };

  const filteredData = data.filter((elem) =>
    selectedPrices.includes(elem.price)
  );

  return (
    <>
      <div className="App">
        <Dropdown options={options} onChange={handleDropdownChange} />
        <h1>Data</h1>
      </div>
      <hr />
      <div style={{ display: "flex" }}>
        {filteredData.length === 0 ? (
          <h3>No data...</h3>
        ) : (
          filteredData.map((elem) => <Card key={elem._id} data={elem} />)
        )}
      </div>
    </>
  );
}

export default App;
