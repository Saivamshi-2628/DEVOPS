import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/transactions`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, [API_URL]);

  return (
    <div>
      <h1>Transactions</h1>
      {data.map(item => (
        <div key={item.id}>
          {item.description} - ₹{item.amount}
        </div>
      ))}
    </div>
  );
}

export default App;