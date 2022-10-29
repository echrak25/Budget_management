import Container from 'react-bootstrap/Container';
import {Stack , Button} from "react-bootstrap";
import BudgetCard from './Components/BudgetCard';
import AddBudgetModal from './Components/AddBudgetModal';
import { useState } from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext';
import viewExpensesModal from './Components/ViewExpensesModal';
import AddExpenseModal from './Components/AddExpenseModal';
import UncategorizedBudgetCard from './Components/UncategorizedBudgetCard';
import TotalBudgetCard from './Components/TotalBudgetCard';
import ViewExpensesModal from './Components/ViewExpensesModal';
function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const {budgets,getBudgetExpenses}=useBudgets()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }
  return (
    <>
 <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            )
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() =>
                  setViewExpensesModalBudgetId(budget.id)
                }
              />
            )
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
 </>
  );
}

export default App;
