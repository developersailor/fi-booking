import React from 'react';

const ImageGallery: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="bg-gray-200 h-34 md:col-span-2 lg:col-span-3">
        <img src="/src/assets/1771.jpg" alt="Image 1" />
      </div>
      <div className="bg-gray-200 h-32">
        <img src="/src/assets/4008.jpg" alt="Image 2" />
      </div>
      <div className="bg-gray-200 h-32">
        <img src="/src/assets/2601.jpg" alt="Image 3" />
      </div>
      <div className="bg-gray-200 h-32">
        <img src="/src/assets/2072.jpg" alt="Image 4" />
      </div>
    </div>
  );
};

export default ImageGallery;
