import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter and Route components
import Home from './pages/Home';
import CheckAvailability from './pages/CheckAvailability';
import Admin from './pages/Admin'; // Import Admin component

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CheckAvailability />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
