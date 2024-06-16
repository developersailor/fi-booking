import axios from 'axios';
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/contact', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.data;
      if (data && data.success) {
        setResponse('Message sent successfully!');
      } else {
        setResponse('Failed to send message.');
      }
    } catch (error) {
      setResponse('An error occurred.');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">Please fill out the form below to get in touch with us.</p>
      
      <a href="https://forms.gle/1Ln4yVcMqx2U5AZX9" className="p-4 bg-blue rounded shadow-md"  > Bize ulaşın</a>
        
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
      {response && <p>{response}</p>}
    </div>
  );
};

export default Contact;
