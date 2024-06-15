import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CheckAvailability from './pages/CheckAvailability';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/check-availability/:hotelId" element={<CheckAvailability />} />
      </Routes>
    </Router>
  );
};

export default App;
