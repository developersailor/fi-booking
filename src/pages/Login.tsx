import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store';
import { login } from '../slice/authSlice';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hotelId, setHotelId] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const authError = useSelector((state: RootState) => state.auth.error);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login({ username, password, hotelId }))
      .unwrap()
      .then(() => {
        navigate('/dashboard'); // Navigate to dashboard after successful login
      })
      .catch((error) => {
        console.error('Failed to login:', error);
      });
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      {authStatus === 'failed' && <p className="text-red-500">{authError}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Hotel ID</label>
          <input
            type="text"
            value={hotelId}
            onChange={(e) => setHotelId(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;