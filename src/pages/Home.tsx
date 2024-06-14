import React from 'react';
import { Link } from 'react-router-dom';
import ImageGallery from '../components/ImageGallery';
import HomeDetails from '../components/HomeDetails';
import Review from '../components/Review';

const Home: React.FC = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="flex-1">
          <ImageGallery />
        </div>
        <div className="flex-1 mt-4 lg:mt-0">
          <HomeDetails />
          <Link to="/check-availability">
            <button className="mt-4 px-6 py-2 bg-black text-white rounded">
              Check Availability
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">4.82 · 55 reviews</h2>
        <Review />
      </div>
    </>
  );
};

export default Home;
