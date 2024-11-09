import React from 'react';
import './ReviewCard.css';

function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-rating">
        {'⭐'.repeat(review.rating)} {/* Display star ratings */}
      </div>
      <h3>{review.name}</h3>
      <p>{review.review}</p>
    </div>
  );
}

export default ReviewCard;
