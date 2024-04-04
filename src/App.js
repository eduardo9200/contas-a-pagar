import React from 'react';

import './App.css';
import Header from './components/header/Header';
import Dashboard from './pages/dashboard/Dashboard';
import AppRoutes from './Routes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <AppRoutes>
        <Header />
        <Dashboard />
      </AppRoutes>
    </div>
  );
}

export default App;
