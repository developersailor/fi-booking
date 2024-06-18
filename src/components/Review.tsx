import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';

import  {
  fetchReview
}
 from '../slice/reviewSlice';


interface ReviewProps {
  hotelId: number;
}

const Review: React.FC<ReviewProps> = ({ hotelId }) => {

  const dispatch: AppDispatch = useDispatch();
  const review = useSelector((state: RootState) => state.reviewStore);
  const { reviews } = review;
useState(() => {
    dispatch(fetchReview(hotelId));
  });


  return (
    reviews.map((review) => (
      <div key={review.id}>
        <h3>{review.author}</h3>
        <p>{review.content}</p>
        <p>{review.rating}</p>
      </div>
    ))
  );
};

export default Review;
