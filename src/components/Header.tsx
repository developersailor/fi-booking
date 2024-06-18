import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../slice/authSlice';

const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.authStore);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Home
        </Link>
        <nav>
          <Link to="/about" className="mr-4">
            About
          </Link>
          <Link to="/contact" className="mr-4">
            Contact
          </Link>
          {user ? (
            <>
              <span className="mr-4">{user.username}</span>
              <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                Login
              </Link>
              <Link to="/register">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
