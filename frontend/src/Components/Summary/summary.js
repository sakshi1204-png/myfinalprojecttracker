import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { Pie } from 'react-chartjs-2';

const Summary = ({ isDarkMode }) => {
  const { incomes, expenses } = useGlobalContext();

  // Calculate total income
  const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);

  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  // Calculate total balance
  const totalBalance = totalIncome - totalExpenses;

  // Categorize income and expense transactions
  const categorizedIncome = {};
  incomes.forEach((income) => {
    const { category, amount } = income;
    if (categorizedIncome[category]) {
      categorizedIncome[category] += amount;
    } else {
      categorizedIncome[category] = amount;
    }
  });

  const categorizedExpenses = {};
  expenses.forEach((expense) => {
    const { category, amount } = expense;
    if (categorizedExpenses[category]) {
      categorizedExpenses[category] += amount;
    } else {
      categorizedExpenses[category] = amount;
    }
  });

  const incomePieChartData = {
    labels: Object.keys(categorizedIncome),
    datasets: [
      {
        data: Object.values(categorizedIncome),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
      },
    ],
  };

  const expensesPieChartData = {
    labels: Object.keys(categorizedExpenses),
    datasets: [
      {
        data: Object.values(categorizedExpenses),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Rs. ${tooltipItem.raw}`,
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: isDarkMode ? '#333' : '#fff',
      },
    },
  };

  return (
    <SummaryContainer isDarkMode={isDarkMode}>
      <h2 className={isDarkMode ? "dark-mode-text font-serif font-extrabold text-4xl m-5" : "font-serif font-extrabold text-4xl m-5"}>
        Summary
      </h2>

      <SectionContainer isDarkMode={isDarkMode}>
        <h3 className={isDarkMode ? "dark-mode-text font-serif font-extrabold text-xl m-5" : "font-serif font-extrabold text-xl m-5"}>
          Income
        </h3>
        <SummaryTable isDarkMode={isDarkMode}>
          <thead>
            <tr>
              <th className='text-purple-800'>Category</th>
              <th className='text-purple-800'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(categorizedIncome).map((category) => (
              <tr key={category}>
                <td className='text-black'>{category}</td>
                <td className='text-black'>Rs. {categorizedIncome[category]}</td>
              </tr>
            ))}
          </tbody>
        </SummaryTable>
      </SectionContainer>

      <SectionContainer isDarkMode={isDarkMode}>
        <h3 className={isDarkMode ? "dark-mode-text font-serif font-extrabold text-xl m-5" : "font-serif font-extrabold text-xl m-5"}>
          Expenses
        </h3>
        <SummaryTable isDarkMode={isDarkMode}>
          <thead>
            <tr>
              <th className='text-purple-800'>Category</th>
              <th className='text-purple-800'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(categorizedExpenses).map((category) => (
              <tr key={category}>
                <td className='text-black'>{category}</td>
                <td className='text-black'>Rs. {categorizedExpenses[category]}</td>
              </tr>
            ))}
          </tbody>
        </SummaryTable>
      </SectionContainer>

      <ChartRow isDarkMode={isDarkMode}>
        <PieChartContainer isDarkMode={isDarkMode}>
          <Pie data={incomePieChartData} options={pieChartOptions} />
        </PieChartContainer>
        <PieChartContainer isDarkMode={isDarkMode}>
          <Pie data={expensesPieChartData} options={pieChartOptions} />
        </PieChartContainer>
      </ChartRow>
    </SummaryContainer>
  );
};

const SummaryContainer = styled.div`
  background-color: ${(props) => (props.isDarkMode ? '#333' : '#fff')};
  color: ${(props) => (props.isDarkMode ? '#fff' : '#333')};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: ${(props) => (props.isDarkMode ? '0px 4px 8px rgba(0, 0, 0, 0.3)' : '0px 1px 15px rgba(0, 0, 0, 0.1)')};
  text-align: left;
  h2 {
    margin-bottom: 1.5rem;
  }
`;

const SectionContainer = styled.div`
  margin-bottom: 2rem;
`;

const SummaryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
  th:first-child,
  td:first-child {
    width: 60%;
  }
`;

const ChartRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PieChartContainer = styled.div`
  flex: 1;
  margin-top: 1rem;
  height: 500px; /* Adjust height to control the size of the charts */
`;

export default Summary;
