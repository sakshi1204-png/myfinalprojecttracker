import React, { useState, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useGlobalContext } from './context/globalContext';
import Orb from './Components/Orb/Orb';
import Summary from './Components/Summary/summary';
import Help from './Components/Help/Help';
import Signup from './Components/SignUp/SignUp';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import Login from './Components/Login/Login';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const location = useLocation();
  const hideHeaderFooter = ['/login', '/signup'].includes(location.pathname);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false);
  };

  const global = useGlobalContext();

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <div>
      <AppContainer>
        {!hideHeaderFooter && <Header setIsLoggedIn={setIsLoggedIn} />}
        {orbMemo}
        <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/income" element={<Income />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/help" element={<Help />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/expense" element={<Expenses />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
        {!hideHeaderFooter && <Footer />}
        <GlobalStyle />
      </AppContainer>
    </div>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const GlobalStyle = createGlobalStyle`
  /* Global styles for light mode */
  body {
    background-color: #fff;
    color: #333;
    overflow-y: auto;
  }
`;

export default App;
