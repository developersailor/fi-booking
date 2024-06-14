import React from 'react';

const Review: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100 rounded">
      <div className="flex items-center">
        <img src="/src/assets/5677.jpg" alt="Reviewer" className="w-16 h-12 rounded-full mr-4" />
        <div>
          <h4 className="font-bold">Kaveh</h4>
          <p className="text-gray-500">April 2023</p>
        </div>
      </div>
      <p className="mt-4">Everything was great. Sabina was very kind and responsive.
        She alaways answered our questions and helped us with everything we needed.
        Check in was very smooth.
      </p>
    </div>
  );
};

export default Review;
