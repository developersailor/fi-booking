import React from 'react';

const About: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-700 mb-4">
        Welcome to Mirror House Sud! We are nestled in the heart of the South Tyrolean Dolomites, surrounded by stunning apple orchards. Our modern architecture blends seamlessly with the natural beauty of the landscape, providing a unique and tranquil escape for our guests.
      </p>
      <p className="text-gray-700 mb-4">
        Our mission is to offer an unparalleled experience where luxury meets nature. Each of our properties is designed with comfort and style in mind, ensuring that every stay is memorable. Whether you are here for a peaceful retreat or an adventurous holiday, Mirror House Sud is your perfect home away from home.
      </p>
      <p className="text-gray-700">
        We look forward to welcoming you!
      </p>
    </div>
  );
};

export default About;
