import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";
import { useState } from "react";

function Expenses(props) {
  const [filtteredYear, setFiltteredYear] = useState("2021");
  const selectYearHandler = (selectedYear) => {
    setFiltteredYear(selectedYear);
  };

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selected={filtteredYear}
          onSelected={selectYearHandler}
        />
        {/* dynamic JSX */}
        {props.expenses
          .filter(
            (expense) => String(expense.date.getFullYear()) === filtteredYear
          )
          .map((expense) => (
            <ExpenseItem
              key={expense.id}
              title={expense.title}
              amount={expense.amount}
              date={expense.date}
            />
          ))}
      </Card>
    </div>
  );
}

export default Expenses;
