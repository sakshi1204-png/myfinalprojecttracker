import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyle } from "./styles/GlobalStyle";
import { GlobalProvider } from "./context/globalContext";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
// import { AuthContextProvider } from './context/AuthContext'; // Make sure this is correctly imported
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import userReducer from "./slices/userSlice"; // Adjust the path as needed
import { AuthContextProvider } from "./context/authContext";

// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <GlobalProvider>
        <AuthContextProvider> {/* Add this wrapper */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthContextProvider>
      </GlobalProvider>
    </Provider>
  </React.StrictMode>
);
