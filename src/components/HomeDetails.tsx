import React from 'react';

interface HomeDetailsProps {
  id: number;
  name: string;
  reviews: number;
  rating: number;
  images: string[];
  description: string;
}

const HomeDetails: React.FC<HomeDetailsProps> = (props) => {
  // Component implementation
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <p>Rating: {props.rating}</p>
      <p>Reviews: {props.reviews}</p>
    </div>
  );
}

export default HomeDetails;