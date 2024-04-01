import React from 'react';

import './App.css';
import Contas from './pages/dashboard/Contas';
import Header from './components/header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Contas />
    </div>
  );
}

export default App;
