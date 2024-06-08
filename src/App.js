// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuildingPlan from './BuildingPlan/BuildingPlan';
import Emergency from './Emergency/Emergency';
import NewCard from './NewCard/Cards';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuildingPlan />} />
        <Route path="/new-card" element={<NewCard />} />
        <Route path="/emergency" element={<Emergency />} />
      </Routes>
    </Router>
  );
}

export default App;