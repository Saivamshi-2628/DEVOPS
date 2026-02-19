const API_BASE = "http://localhost:5001/api";

// ----------------------------
// Fetch Dashboard Summary
// ----------------------------
async function loadDashboard() {
  const res = await fetch(`${API_BASE}/dashboard`);
  const data = await res.json();

  document.getElementById("totalIncome").textContent = data.totalIncome;
  document.getElementById("totalExpenses").textContent = data.totalExpenses;
  document.getElementById("balance").textContent = data.balance;
}

// ----------------------------
// Fetch Expenses
// ----------------------------
async function loadExpenses() {
  const res = await fetch(`${API_BASE}/expenses`);
  const expenses = await res.json();

  const list = document.getElementById("expenseList");
  list.innerHTML = "";

  expenses.forEach(exp => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${exp.title}</span><span>₹${exp.amount}</span>`;
    list.appendChild(li);
  });
}

// ----------------------------
// Fetch Income
// ----------------------------
async function loadIncome() {
  const res = await fetch(`${API_BASE}/income`);
  const income = await res.json();

  const list = document.getElementById("incomeList");
  list.innerHTML = "";

  income.forEach(inc => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${inc.source}</span><span>₹${inc.amount}</span>`;
    list.appendChild(li);
  });
}

// ----------------------------
// Add Expense
// ----------------------------
document.getElementById("expenseForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("expenseTitle").value;
  const amount = document.getElementById("expenseAmount").value;

  await fetch(`${API_BASE}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, amount })
  });

  e.target.reset();

  await loadExpenses();
  await loadDashboard();
});

// ----------------------------
// Add Income
// ----------------------------
document.getElementById("incomeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const source = document.getElementById("incomeSource").value;
  const amount = document.getElementById("incomeAmount").value;

  await fetch(`${API_BASE}/income`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source, amount })
  });

  e.target.reset();

  await loadIncome();
  await loadDashboard();
});

// ----------------------------
// Initial Load
// ----------------------------
loadDashboard();
loadExpenses();
loadIncome();