import React from 'react';

const HomeDetails: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Mirror House Sud</h1>
      <p className="text-gray-600">Bolzano, Trentino-Alto Adige/South Tyrol, Italy</p>
      <p className="text-2xl font-bold mt-4">$1,600 / night</p>
      <div className="flex space-x-4 mt-4">
        <div>4 Guests</div>
        <div>2 Bedrooms</div>
        <div>1 Bathroom</div>
      </div>
      <p className="mt-4">Mirror Houses are two small houses immersed in a beautiful scenery...</p>
    </div>
  );
};

export default HomeDetails;
