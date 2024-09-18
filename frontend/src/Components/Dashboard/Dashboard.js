import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';
import { Typography, Card, CardContent, Box } from '@mui/material';
import { InnerLayout } from '../../styles/Layout';
import History from '../History/RecentHistory';
import IncomeExpensePieChart from '../Chart/pie';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1 className="font-serif font-extrabold text-4xl m-5">Dashboard</h1>

                <div className="dashboard-content">
                    {/* KPIs section */}
                    <div className="kpi-and-chart-section">
                        <div className="kpi-section">
                            <Card className="card-stat">
                                <CardContent>
                                    <Typography variant="h6" color="textSecondary">
                                        Total Income
                                    </Typography>
                                    <Typography variant="h4" color="primary" className="stat-value">
                                        {dollar} {totalIncome()}
                                    </Typography>
                                </CardContent>
                            </Card>

                            <Card className="card-stat">
                                <CardContent>
                                    <Typography variant="h6" color="textSecondary">
                                        Total Expense
                                    </Typography>
                                    <Typography variant="h4" color="error" className="stat-value">
                                        {dollar} {totalExpenses()}
                                    </Typography>
                                </CardContent>
                            </Card>

                            <Card className="card-stat">
                                <CardContent>
                                    <Typography variant="h6" color="textSecondary">
                                        Total Balance
                                    </Typography>
                                    <Typography variant="h4" color="success" className="stat-value">
                                        {dollar} {totalBalance()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Chart section */}
                        {/* <div className="chart-section"> */}
                            <Chart />
                        {/* </div> */}
                    </div>

                    {/* Recent History section */}
                    <div className="history-section">
                        {/* <Card className="history-card"> */}
                            {/* <CardContent> */}
                                <History />
                            {/* </CardContent> */}
                        {/* </Card> */}

                        {/* Pie Chart below History */}
                        <IncomeExpensePieChart style={{ height: '1%'}}/>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    .dashboard-content {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        margin-bottom: 2rem;

        .kpi-and-chart-section {
            flex: 8;
            display: flex;
            flex-direction: column;
        }

        .kpi-section {
            display: flex;
            gap: 1.5rem;
            height: 120px;
            margin-bottom: 1.5rem; /* Space between KPIs and Chart */
        }

        .chart-section {
            flex: 1;
            height: 300px; /* Adjust chart height as needed */
            background-color: #fff;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 20px;
        }

        .history-section {
            flex: 1 1 26%;
        }
    }

    .card-stat {
        background-color: #f9f9f9;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
        flex: 1;

        &:hover {
            transform: scale(1.05);
        }

        .stat-value {
            margin-top: 0.5rem;
        }
    }

    .history-card {
        background-color: #fff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

        .salary-title {
            margin-top: 1rem;
            font-size: 1.2rem;
            display: flex;
            justify-content: space-between;

            span {
                color: #007BFF;
            }
        }

        .salary-item {
            display: flex;
            justify-content: space-between;
            margin-top: 1rem;
            padding: .5rem;
            background-color: #f0f0f0;
            border-radius: 10px;
        }
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
        .dashboard-content {
            flex-direction: column;

            .kpi-and-chart-section {
                margin-right: 0;
            }

            .history-section {
                margin-top: 1.5rem;
                flex: 1 1 100%; /* Full width on smaller screens */
            }
        }
    }

    @media (max-width: 768px) {
        .kpi-section {
            gap: 1rem;
            .card-stat {
                flex: 1 1 100%; /* Full width for each KPI card */
            }
        }

        .chart-section {
            height: 300px; /* Adjust chart height for smaller screens */
        }
    }

    @media (max-width: 480px) {
        .dashboard-content {
            gap: 1rem;
        }

        .kpi-section {
            gap: 1rem;
            .card-stat {
                flex: 1 1 100%;
            }
        }

        .chart-section {
            height: 250px;
        }
    }
`;

export default Dashboard;


















