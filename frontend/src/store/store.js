// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice'; // Adjust path as needed

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
