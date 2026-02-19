const express = require("express");
const cors = require("cors");

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Default expenses
let expenses = [
  { id: 1, name: "Groceries", amount: 50 },
  { id: 2, name: "Fuel", amount: 30 },
  { id: 3, name: "Internet Bill", amount: 999 },
];

// GET expenses
app.get("/api/expenses", (req, res) => {
  res.json(expenses);
});

// ADD expense
app.post("/api/expenses", (req, res) => {
  const { name, amount } = req.body;

  if (!name || !amount) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const newExpense = {
    id: expenses.length + 1,
    name,
    amount: Number(amount),
  };

  expenses.push(newExpense);
  res.json(newExpense);
});

// Start server
app.listen(port, () => {
  console.log("Backend running on http://localhost:5001");
});
