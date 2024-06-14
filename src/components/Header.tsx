import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-gray-100">
      <div className="text-xl font-bold">Logo</div>
      <nav className="space-x-4 hidden md:block">
        <Link to="/" className="text-gray-600">Home</Link>
        <Link to="/about" className="text-gray-600">About</Link>
        <Link to="/contact" className="text-gray-600">Contact</Link>
        <Link to="/check-availability" className="text-gray-600">Check Availability</Link>
      </nav>
      <button className="px-4 py-2 bg-black text-white rounded hidden md:block">Sign In</button>
      <div className="md:hidden">☰</div> {/* A simple icon for mobile menu */}
    </header>
  );
};

export default Header;
