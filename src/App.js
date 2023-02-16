import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';
import Details from './components/Detailspage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/country/:country" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
