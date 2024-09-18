import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import { useGlobalContext } from "../../context/globalContext";
import Form from "../Form/IncomeForm";
import { FaTrash } from "react-icons/fa";

const Income = ({ isDarkMode }) => {
  const {
    addIncome,
    incomes,
    getIncomes,
    deleteIncome,
    updateIncome,
    totalIncome,
  } = useGlobalContext();

  const [filteredIncomes, setFilteredIncomes] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState("");
  const [editingIncome, setEditingIncome] = useState(null); // State for editing income

  useEffect(() => {
    getIncomes();
  }, []);

  useEffect(() => {
    filterIncomes();
  }, [incomes, selectedYear, selectedMonth]);

  const filterIncomes = () => {
    let filtered = incomes;

    if (selectedYear) {
      filtered = filtered.filter(
        (income) => new Date(income.date).getFullYear() === parseInt(selectedYear)
      );
    }

    if (selectedMonth) {
      filtered = filtered.filter(
        (income) => new Date(income.date).getMonth() + 1 === parseInt(selectedMonth)
      );
    }

    setFilteredIncomes(filtered);
  };

  const handleSaveClick = (updatedIncome) => {
    updateIncome(updatedIncome); // Call update function
    setEditingIncome(null); // Reset editing state
  };

  return (
    <IncomeStyled isDarkMode={isDarkMode}>
      <InnerLayout isDarkMode={isDarkMode}>
        <h1
          className={
            isDarkMode
              ? "dark-mode-text font-serif font-extrabold text-4xl m-5"
              : "font-serif font-extrabold text-4xl m-5"
          }
        >
          Incomes
        </h1>

        <div className="income-content">
          <div className="form-container">
            <Form
              isDarkMode={isDarkMode}
              editingIncome={editingIncome} // Pass editing income to form
              onSave={handleSaveClick} // Handle save from form
            />
          </div>

          <div className="incomes">
            <h2 className={isDarkMode ? "dark-mode-text" : ""}>Income History</h2>

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
                        {new Date(0, i).toLocaleString("default", {
                          month: "long",
                        })}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={`total-income ${isDarkMode ? "dark-mode-text" : ""}`}>
                Total Income: <span>Rs. {totalIncome()}</span>
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
                {filteredIncomes.map((income) => {
                  const { _id, title, amount, date, category, description, type } = income;
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
                          onClick={() => deleteIncome(_id)}
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
    </IncomeStyled>
  );
};

const IncomeStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 1rem;

  .income-content {
    display: flex;
    gap: 2rem;
    margin: 1rem 0;
    flex-wrap: wrap;

    .form-container {
      flex: 0;
      border: 1px solid ${(props) => (props.isDarkMode ? "#444" : "#ddd")};
      border-radius: 10px;
      padding: 1rem;
      background-color: ${(props) => (props.isDarkMode ? "#2a2746" : "#f9f9f9")};
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

    .incomes {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      border: 1px solid ${(props) => (props.isDarkMode ? "#444" : "#ddd")};
      border-radius: 10px;
      padding: 1rem;
      background-color: ${(props) => (props.isDarkMode ? "#2a2746" : "#f9f9f9")};
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
            border: 1px solid ${(props) => (props.isDarkMode ? "#444" : "#ddd")};
            background-color: ${(props) => (props.isDarkMode ? "#333" : "#fff")};
            color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};
            width: 150px;
          }
        }

        .total-income {
          border: 1px solid ${(props) => (props.isDarkMode ? "#444" : "#ddd")};
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
            color: ${(props) => (props.isDarkMode ? "#ffffff" : "#333")};
            margin-left: 0.5rem;
          }
        }
      }

      h2 {
        font-size: 1.75rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 1rem;
        color: ${(props) => (props.isDarkMode ? "#fff" : "#333")};
      }

      /* Table wrapper to limit height and enable scrolling */
      .scrollable-table {
        width: 100%;
        border-collapse: collapse;

        thead {
          background-color: ${(props) => (props.isDarkMode ? "#333" : "#f4f4f4")};
        }

        th,
        td {
          padding: 0.75rem;
          border: 1px solid ${(props) => (props.isDarkMode ? "#444" : "#ddd")};
          text-align: left;
        }

        tbody {
          display: block; /* Prevent automatic table layout */
          max-height: 220px; /* Set a fixed height */
          overflow-y: auto; /* Enable vertical scrolling */
          width: 100%; /* Ensure tbody takes full width */
          
          tr {
            display: table; /* Ensure rows behave as table rows */
            width: 100%; /* Ensure rows take full width */
          }

          td {
            white-space: nowrap; /* Prevent wrapping of table cells */
          }

          &:hover {
            background-color: ${(props) =>
              props.isDarkMode ? "#444" : "#f1f1f1"};
          }
        }

        thead,
        tr {
          display: table; /* Ensure thead and tr behave as table */
          width: 100%; /* Make sure they occupy full width */
          table-layout: fixed; /* Maintain proper table layout */
        }
      }

      .action-icon {
        cursor: pointer;
        margin: 0 0.5rem;
        color: ${(props) => (props.isDarkMode ? "#fff" : "#333")};

        &:hover {
          color: ${(props) => (props.isDarkMode ? "#aaa" : "#000")};
        }
      }
    }
  }
`;


export default Income;
