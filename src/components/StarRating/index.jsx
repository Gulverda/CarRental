// StarRating.js
import React from 'react';
import './StarRating.css'; // Ensure this path is correct

const StarRating = ({ rating }) => {
    const starCount = 5; // Number of stars

    // Ensure rating is a number and clamp it between 0 and 5
    const normalizedRating = Math.max(0, Math.min(starCount, rating));

    return (
        <div className="star-rating">
            {[...Array(starCount)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <span
                        key={starValue}
                        className={`star ${starValue <= normalizedRating ? 'filled' : ''}`}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;
