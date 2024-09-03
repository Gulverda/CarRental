// src/components/CarCard.js
import React, { useState } from 'react';
import '../CSS/CarCard.css';
import profile from '../assets/icons/profile.svg';
import Transmission from '../assets/icons/Car.svg';
import GasStation from '../assets/icons/gasStation.svg';

const CarCard = ({ name, type, price, oldPrice, imgUrl, fuel, transmission, capacity, initialLiked = false }) => {
  // Manage the liked state
  const [liked, setLiked] = useState(initialLiked);

  // Toggle the liked state on click
  const toggleLiked = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <div className="car-card">
      <img src={imgUrl} alt={name} />
      <div className="car-info">
        <h4>{name}</h4>
        <p>{type}</p>
        <div className="car-details">
          <span>
            <img src={GasStation} alt="GasStation" />
            {fuel}
          </span>
          <span>
            <img src={Transmission} alt="Transmission" />
            {transmission}
          </span>
          <span>
            <img src={profile} alt="Profile" />
            {capacity}
          </span>
        </div>
        <div className="price_button" style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="car-price">
            <span className="price">${price}/day</span>
            {oldPrice && <span className="old-price">${oldPrice}</span>}
          </div>
          <div className="rent_button">
            <button>Rent Now</button>
          </div>
        </div>
        <div className="heart-icon" onClick={toggleLiked}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={liked ? "red" : "none"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.62 20.8096C12.28 20.9296 11.72 20.9296 11.38 20.8096C8.48 19.8196 2 15.6896 2 8.68961C2 5.59961 4.49 3.09961 7.56 3.09961C9.38 3.09961 10.99 3.97961 12 5.33961C13.01 3.97961 14.63 3.09961 16.44 3.09961C19.51 3.09961 22 5.59961 22 8.68961C22 15.6896 15.52 19.8196 12.62 20.8096Z"
              stroke={liked ? "red" : "#90A3BF"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
