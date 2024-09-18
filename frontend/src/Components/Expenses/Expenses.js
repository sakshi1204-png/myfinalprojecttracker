import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import { useGlobalContext } from "../../context/globalContext";
import ExpenseForm from "../Expenses/ExpenseForm";
import { FaTrash } from "react-icons/fa";

const Expenses = ({ isDarkMode }) => {
  const {
    getExpenses,
    expenses,
    deleteExpense,
    totalExpenses,
  } = useGlobalContext();

  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    getExpenses();
  }, []);

  useEffect(() => {
    filterExpenses();
  }, [expenses, selectedYear, selectedMonth]);

  const filterExpenses = () => {
    let filtered = expenses;

    if (selectedYear) {
      filtered = filtered.filter(
        (expense) => new Date(expense.date).getFullYear() === parseInt(selectedYear)
      );
    }

    if (selectedMonth) {
      filtered = filtered.filter(
        (expense) => new Date(expense.date).getMonth() + 1 === parseInt(selectedMonth)
      );
    }

    setFilteredExpenses(filtered);
  };

  return (
    <ExpenseStyled isDarkMode={isDarkMode}>
      <InnerLayout isDarkMode={isDarkMode}>
        <h1 className={isDarkMode ? "dark-mode-text font-serif font-extrabold text-4xl m-5" : "font-serif font-extrabold text-4xl m-5"}>
          Expenses
        </h1>

        <div className="expense-content">
          <div className="form-container">
            <ExpenseForm isDarkMode={isDarkMode} />
          </div>

          <div className="expenses">
            <h2 className={isDarkMode ? "dark-mode-text" : ""}>Expense History</h2>

            <div className="filter-total-container">
              <div className="filters">
                <div>
                  <label htmlFor="year">Year:</label>
                  <select
                    id="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="">Select Year</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="month">Month:</label>
                  <select
                    id="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="">Select Month</option>
                    {[...Array(12).keys()].map((i) => (
                      <option key={i} value={i + 1}>
                        {new Date(0, i).toLocaleString("default", { month: "long" })}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={`total-expense ${isDarkMode ? "dark-mode-text" : ""}`}>
                Total Expense: <span>Rs. {totalExpenses()}</span>
              </div>
            </div>

            <table className="scrollable-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense) => {
                  const { _id, title, amount, date, category, description, type } = expense;
                  return (
                    <tr key={_id}>
                      <td>{title}</td>
                      <td>{description}</td>
                      <td>Rs. {amount}</td>
                      <td>{new Date(date).toLocaleDateString()}</td>
                      <td>{category}</td>
                      <td>{type}</td>
                      <td>
                        <FaTrash
                          className="action-icon"
                          onClick={() => deleteExpense(_id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
};

const ExpenseStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 1rem;

  .expense-content {
    display: flex;
    gap: 2rem;
    margin: 1rem 0;
    flex-wrap: wrap;

    .form-container {
      flex: 0;
      border: 1px solid ${({ isDarkMode }) => (isDarkMode ? "#444" : "#ddd")};
      border-radius: 10px;
      padding: 1rem;
      background-color: ${({ isDarkMode }) => (isDarkMode ? "#2a2746" : "#f9f9f9")};
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05);

      select {
        width: 100%;
        margin-bottom: 1rem;
      }

      input[type="text"] {
        width: 100%;
        margin-bottom: 1rem;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
      }
    }

    .expenses {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      border: 1px solid ${({ isDarkMode }) => (isDarkMode ? "#444" : "#ddd")};
      border-radius: 10px;
      padding: 1rem;
      background-color: ${({ isDarkMode }) => (isDarkMode ? "#2a2746" : "#f9f9f9")};
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05);

      .filter-total-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;

        .filters {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;

          label {
            margin-right: 0.5rem;
          }

          select {
            padding: 0.5rem;
            border-radius: 5px;
            border: 1px solid ${({ isDarkMode }) => (isDarkMode ? "#444" : "#ddd")};
            background-color: ${({ isDarkMode }) => (isDarkMode ? "#333" : "#fff")};
            color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "#000")};
            width: 150px;
          }
        }

        .total-expense {
          border: 1px solid ${({ isDarkMode }) => (isDarkMode ? "#444" : "#ddd")};
          padding: 0.5rem;
          border-radius: 5px;
          font-size: 1rem;
          display: flex;
          align-items: center;
          width: 300px;
          height: 88%;

          span {
            font-size: 1.2rem;
            font-weight: 800;
            color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#333")};
            margin-left: 0.5rem;
          }
        }
      }

      h2 {
        font-size: 1.75rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 1rem;
        color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "#333")};
      }

      .scrollable-table {
        width: 100%;
        border-collapse: collapse;

        thead {
          background-color: ${({ isDarkMode }) => (isDarkMode ? "#333" : "#f4f4f4")};
        }

        th,
        td {
          padding: 0.75rem;
          border: 1px solid ${({ isDarkMode }) => (isDarkMode ? "#444" : "#ddd")};
          text-align: left;
        }

        tbody {
          display: block;
          max-height: 220px;
          overflow-y: auto;
          width: 100%;

          tr {
            display: table;
            width: 100%;
          }

          td {
            white-space: nowrap;
          }

          &:hover {
            background-color: ${({ isDarkMode }) =>
              isDarkMode ? "#444" : "#f1f1f1"};
          }
        }

        thead,
        tr {
          display: table;
          width: 100%;
          table-layout: fixed;
        }
      }

      .action-icon {
        cursor: pointer;
        margin: 0 0.5rem;
        color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "#333")};

        &:hover {
          color: ${({ isDarkMode }) => (isDarkMode ? "#e63946" : "#ff6f61")};
        }
      }
    }
  }
`;

export default Expenses;
