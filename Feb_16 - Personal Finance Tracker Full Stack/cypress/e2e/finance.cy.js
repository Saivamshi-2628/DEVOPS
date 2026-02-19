describe("Personal Finance Tracker - E2E Test", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Loads dashboard correctly", () => {
    cy.contains("Personal Finance Tracker");

    cy.get("#totalIncome")
      .should("not.have.text", "0");

    cy.get("#totalExpenses")
      .should("exist");

    cy.get("#balance")
      .should("exist");
  });

  it("Adds a new expense and updates dashboard", () => {

    cy.get("#totalExpenses")
      .invoke("text")
      .then((initialText) => {

        const initialExpense = Number(initialText);

        cy.get("#expenseTitle").type("Cypress Test Expense");
        cy.get("#expenseAmount").type("250");
        cy.get("#expenseForm").submit();

        cy.contains("Cypress Test Expense");

        cy.get("#totalExpenses")
          .invoke("text")
          .then((newText) => {
            const newExpense = Number(newText);
            expect(newExpense).to.be.greaterThan(initialExpense);
          });
      });
  });

  it("Adds a new income and updates dashboard", () => {

    cy.get("#totalIncome")
      .invoke("text")
      .then((initialText) => {

        const initialIncome = Number(initialText);

        cy.get("#incomeSource").type("Cypress Bonus");
        cy.get("#incomeAmount").type("500");
        cy.get("#incomeForm").submit();

        cy.contains("Cypress Bonus");

        cy.get("#totalIncome")
          .invoke("text")
          .then((newText) => {
            const newIncome = Number(newText);
            expect(newIncome).to.be.greaterThan(initialIncome);
          });
      });
  });

});