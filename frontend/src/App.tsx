
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Events from './HomePage';
import RewardPage from './pages/RewardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/reward" element={<RewardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
