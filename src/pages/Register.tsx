import axios from 'axios';
import React, { useState } from 'react';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hotelId, setHotelId] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await axios.post('http://localhost:3000/register', 
      { username, password, hotelId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.data;
    console.log(data);
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;