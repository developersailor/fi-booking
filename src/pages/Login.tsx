import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store';
import { login } from '../slice/authSlice';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const resultAction = await dispatch(login({ username, password }));
    if (login.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
          />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
