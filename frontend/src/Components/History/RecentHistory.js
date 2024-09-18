import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography } from '@mui/material'; // Material-UI components
import { useGlobalContext } from '../../context/globalContext';

function History({ isDarkMode }) {
    const { transactionHistory } = useGlobalContext();  // Getting transaction history from context

    const [...history] = transactionHistory();  // Destructuring the history items from transactionHistory()

    return (
        <Card className="history-card">
            <CardContent>
                <Typography variant="h6" className="history-title">
                    Recent History
                </Typography>

                <HistoryStyled isDarkMode={isDarkMode}>
                    {history.map((item) => {
                        const { _id, title, amount, type } = item;
                        return (
                            <div key={_id} className="history-item transition-transform transform hover:scale-105">
                                <p style={{
                                    color: type === 'expense' ? 'red' : 'var(--color-green)'
                                }}>
                                    {title}
                                </p>
                                <p style={{
                                    color: type === 'expense' ? 'red' : 'var(--color-green)'
                                }}>
                                    {type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0 : amount}`}
                                </p>
                            </div>
                            
                        );
                    })}
                </HistoryStyled>
            </CardContent>
        </Card>
    );
}

// Styled Component for History Item
const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .history-item {
        background: ${(props) => (props.isDarkMode ? '#2a2746' : '#FCF6F9')};
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.05);
        }

        p {
            font-size: 1rem;
            font-weight: 600;
            color: ${(props) => (props.isDarkMode ? '#fff' : '#333')};
        }
    }

    .dark-mode-text {
        color: #fff;
    }
`;

export default History;
