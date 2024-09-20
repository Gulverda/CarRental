// src/components/Banner.js
import React from 'react';
import './Banner.css';
import LeftCar from '../../assets/LeftCar.png';
import RightCar from '../../assets/RightCar.png';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-item">
        <div className="banner_txt">
        <h2>The Best Platform for Car Rental</h2>
        <p>Ease of doing a car rental safely and reliably. Of course at a low price.</p>
        
        </div>
        <div className="button_with_img">
        <button>Rental Car</button>
        <img src={LeftCar} alt="SportCars" className="banner_img" />

        </div>
      </div>
      <div className="banner-item1">
        <div className="banner_txt">
        <h2>Easy way to rent a car at a low price</h2>
        <p>Providing cheap car rental services and safe and comfortable facilities.</p>
        
        </div>
        <div className="button_with_img">
        <button>Rental Car</button>
        <img src={RightCar} alt="SportCars" className="banner_img" />

        </div>
      </div>
    </div>
  );
};

export default Banner;
