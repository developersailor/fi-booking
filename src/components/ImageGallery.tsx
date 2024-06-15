import React from 'react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div>
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Gallery Image ${index}`} className="w-full h-auto" />
      ))}
    </div>
  );
};

export default ImageGallery;
