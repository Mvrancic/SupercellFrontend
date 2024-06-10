// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuildingPlan from './BuildingPlan/BuildingPlan';
import Emergency from './Emergency/Emergency';
import PrisonLogs from './PrisonLogs/PrisonLogs';
import NewCard from './NewCard/Cards';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuildingPlan />} />
        <Route path="/new-card" element={<NewCard />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/prison-logs" element={<PrisonLogs />} />
      </Routes>
    </Router>
  );
}

export default App;