import React from "react";
import { useEffect,useState } from "react";
import ReviewCard from "./ReviewCard";
import styles from './Review.module.css'


const Review = () => {
    const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Mock data, replace this with API/database call
    const mockReviews = [
      { id: 1, name: 'Sarah M.', rating: 5, review: "I'm blown away by the quality and style of the clothes I received from ShopQ. From casual wear to elegant dresses, every piece I’ve bought has exceeded my expectations." },
      { id: 2, name: 'Alex K.', rating: 5, review: "Finding clothes that align with my personal style used to be a challenge until I discovered ShopQ. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions." },
      { id: 3, name: 'James L.', rating: 4, review: "As someone who’s always on the lookout for unique fashion pieces, I’m thrilled to have stumbled upon ShopQ. The selection of clothes is not only diverse but also on point with the latest trends." },
      { id: 4, name: 'Moen F.', rating: 5, review: "ShopQ has quickly become my go-to for fashion. Their quality, style, and variety are unmatched. I've recommended them to all my friends!" }
    ];
    
    setReviews(mockReviews);
  }, []);
    
    
    return(
        
        <div className={styles.review}>
            <div className={styles.title}> OUR HAPPY CUSTOMERS</div>

            <div className={styles.review_container}>
                <div className={styles.reviewContainer}>
                {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
                </div>
            </div>
        </div>
    );
}
export default Review;