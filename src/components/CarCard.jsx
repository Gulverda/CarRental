// src/components/CarCard.js
import React from 'react';
import '../CSS/CarCard.css';

const CarCard = ({ name, type, price, oldPrice, imgUrl, fuel, transmission, capacity, liked }) => {
  return (
    <div className="car-card">
      <img src={imgUrl} alt={name} />
      <div className="car-info">
        <h4>{name}</h4>
        <p>{type}</p>
        <div className="car-details">
          <span>{fuel}</span>
          <span>{transmission}</span>
          <span>{capacity}</span>
        </div>
        <div className="price_button" style={{display: "flex", justifyContent: "space-between"}}>
        <div className="car-price">
          <span className="price">${price}/day</span>
          {oldPrice && <span className="old-price">${oldPrice}</span>}
        </div>
        <div className="rent_button">
          <button>Rent Now</button>
        </div>
        </div>
        <i className={`icon heart ${liked ? 'liked' : ''}`}></i>
      </div>
    </div>
  );
};

export default CarCard;
