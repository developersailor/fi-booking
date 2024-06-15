import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin: React.FC = () => {
  const [users, setUsers] = useState<Array<unknown>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users'); // Replace with your backend API endpoint
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users. Please try again later.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`); // Replace with your backend API endpoint for deleting users
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} - {user.email} 
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Admin;
