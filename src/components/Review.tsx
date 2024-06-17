import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchReviews } from '../slice/reviewSlice';
interface ReviewProps {
  hotelId: number;
  reviews: Review[];
}

export interface Review {
  id: number;
  author: string;
  content: string;
  rating: number;
}

export  interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}


const Review: React.FC<ReviewProps> = ({ hotelId }) => {
  const dispatch: AppDispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state: RootState) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews(hotelId));
  }, [dispatch, hotelId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews: {error}</p>;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Reviews</h3>
      {reviews.map(review => (
        <div key={review.id} className="mb-4">
          <p className="font-bold">{review.author}</p>
          <p>{review.content}</p>
          <p>Rating: {review.rating} ★</p>
        </div>
      ))}
    </div>
  );
};

export default Review;
