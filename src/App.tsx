import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter and Route components
import Home from './pages/Home';
import CheckAvailability from './pages/CheckAvailability';// Import Admin component
import Headers from './components/Header'; // Import Headers component
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import AdminPanel from './pages/Admin';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
            <main className="max-w-6xl mx-auto p-4">
              <Headers />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/check-availability" element={<CheckAvailability />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/about' element={<About />} />
              </Routes>
            </main>
        </div>
    </Router>
     
  );
};

export default App;
