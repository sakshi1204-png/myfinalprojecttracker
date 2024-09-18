import React from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import {
    Chart as ChartJs,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJs.register(ArcElement, Tooltip, Legend);

function IncomeExpensePieChart() {
    const { totalIncome, totalExpenses } = useGlobalContext();

    // Define the pie chart data
    const data = {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                label: 'Income vs Expenses',
                data: [totalIncome(), totalExpenses()],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'], // Green for income, red for expenses
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    // Define the options for the pie chart
    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allow size to be set manually
        plugins: {
            legend: {
                position: 'right', // Position the legend to the right of the chart
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    }
                }
            }
        }
    };

    return (
        <PieChartStyled>
            <h2>Total Income vs Total Expense</h2>
            <Pie data={data} options={options} />
        </PieChartStyled>
    );
}

const PieChartStyled = styled.div`
    background: #fff;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    margin-top: 1rem;
    height: 300px; /* Adjust the height as needed */
    width: 100%; /* Full width of the container */
    max-width: 500px; /* Limit the maximum width */
    display: flex;
    flex-direction: column; /* Arrange children vertically */
    align-items: center;
    justify-content: center;

    h2 {
        margin-bottom: 1rem; /* Space between the header and the pie chart */
        text-align: left;
    }
`;

export default IncomeExpensePieChart;
