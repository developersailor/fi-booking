import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();

    if (response.ok) {
      setStatus('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setStatus(result.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
            rows={4}
            required
          ></textarea>
        </div>
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Send Message
        </button>
      </form>
      {status && <p className="mt-4 text-red-500">{status}</p>}
    </div>
  );
};

export default Contact;
