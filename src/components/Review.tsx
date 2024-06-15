interface ReviewProps {
  hotelId: number;
}

const Review: React.FC<ReviewProps> = ({ hotelId }) => {
  // Fetch and display reviews based on hotel ID
  return (
    <div>
      {/* Reviews for hotel */}
      Reviews for hotel ID {hotelId}
    </div>
  );
};

export default Review;