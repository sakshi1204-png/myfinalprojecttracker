import React from 'react';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

function Chart() {
    const { incomes, expenses } = useGlobalContext();

    // Prepare chart data
    const data = {
        labels: incomes.map((inc) => {
            const { date } = inc;
            return dateFormat(date);  // Format date for the X-axis labels
        }),
        datasets: [
            {
                label: 'Income',
                data: incomes.map((income) => income.amount), // Y-axis: Income amounts
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Light green for Income
                borderColor: 'rgba(75, 192, 192, 1)', // Green border
                borderWidth: 2,
                fill: true, // Fill below the line
                tension: 0.2, // Smooth line curve
            },
            {
                label: 'Expenses',
                data: expenses.map((expense) => expense.amount), // Y-axis: Expense amounts
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light red for Expenses
                borderColor: 'rgba(255, 99, 132, 1)', // Red border
                borderWidth: 2,
                fill: true,
                tension: 0.2,
            },
        ],
    };

    // Chart configuration
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Position the legend at the top
            },
            title: {
                display: true,
                text: 'Income vs Expenses Over Time', // Title of the chart
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date', // Label for X-axis
                },
            },
            y: {
                beginAtZero: true, // Y-axis should start at zero
                title: {
                    display: true,
                    text: 'Amount ($)', // Label for Y-axis
                },
            },
        },
    };

    return (
        <ChartStyled>
            <Line data={data} options={options} />
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 90%;
`;

export default Chart;
