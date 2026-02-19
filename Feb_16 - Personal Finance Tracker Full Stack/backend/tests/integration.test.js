const request = require("supertest");
const app = require("../app");
const { _internal } = require("../app");

describe("Integration Tests - Personal Finance Tracker APIs", () => {

  beforeEach(() => {
    // Reset in-memory data before every test
    _internal._resetData();
  });

  // -------------------------------
  // Dashboard API
  // -------------------------------
  test("GET /api/dashboard returns correct summary", async () => {
    const res = await request(app).get("/api/dashboard");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("totalIncome");
    expect(res.body).toHaveProperty("totalExpenses");
    expect(res.body).toHaveProperty("balance");

    // Based on initial seeded data:
    // income: 10000 + 2000 = 12000
    // expenses: 500 + 300 = 800
    expect(res.body.totalIncome).toBe(12000);
    expect(res.body.totalExpenses).toBe(800);
    expect(res.body.balance).toBe(11200);
  });

  // -------------------------------
  // Expenses API
  // -------------------------------
  test("GET /api/expenses returns array of expenses", async () => {
    const res = await request(app).get("/api/expenses");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  test("POST /api/expenses adds new expense", async () => {
    const newExpense = { title: "Internet Bill", amount: 999 };

    const postRes = await request(app)
      .post("/api/expenses")
      .send(newExpense);

    expect(postRes.statusCode).toBe(201);
    expect(postRes.body.title).toBe("Internet Bill");
    expect(postRes.body.amount).toBe(999);

    const getRes = await request(app).get("/api/expenses");
    expect(getRes.body.length).toBe(3);
  });

  // -------------------------------
  // Income API
  // -------------------------------
  test("GET /api/income returns array of income", async () => {
    const res = await request(app).get("/api/income");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  test("POST /api/income adds new income", async () => {
    const newIncome = { source: "Bonus", amount: 1500 };

    const postRes = await request(app)
      .post("/api/income")
      .send(newIncome);

    expect(postRes.statusCode).toBe(201);
    expect(postRes.body.source).toBe("Bonus");
    expect(postRes.body.amount).toBe(1500);

    const getRes = await request(app).get("/api/income");
    expect(getRes.body.length).toBe(3);
  });

});