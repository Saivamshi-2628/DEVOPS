import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:5001";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/expenses`)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setExpenses(data);
        setError("");
      })
      .catch(() => setError("Backend not reachable"));
  }, []);

  const addExpense = (e) => {
    e.preventDefault();

    if (!name || !amount) {
      setError("Please fill all fields");
      return;
    }

    fetch(`${API_BASE}/api/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, amount }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("POST failed");
        return res.json();
      })
      .then((data) => {
        setExpenses([...expenses, data]);
        setName("");
        setAmount("");
        setError("");
      })
      .catch(() => setError("Failed to add expense"));
  };

  return (
    <div className="card">
      {error && <div className="alert error">{error}</div>}

      <ul className="expense-list">
        {expenses.map((e) => (
          <li key={e.id} className="expense-item">
            <span>{e.name}</span>
            <span>₹{e.amount}</span>
          </li>
        ))}
      </ul>

      <form className="form" onSubmit={addExpense}>
        <input
          placeholder="Expense name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default Expenses;
