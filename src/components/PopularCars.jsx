// src/components/PopularCars.js
import React from 'react';
import CarCard from './CarCard';
import '../CSS/PopularCars.css';

const PopularCars = () => {
  return (
    <div className="popular-cars">
      <h3>Popular Car</h3>
      <div className="car-list">
        <CarCard
          name="Koenigsegg"
          type="Sport"
          price="99.00"
          imgUrl="/images/car1.png" // Replace with actual paths
          fuel="90L"
          transmission="Manual"
          capacity="2 People"
          liked={true}
        />
        <CarCard
          name="Nissan GT - R"
          type="Sport"
          price="80.00"
          oldPrice="100.00"
          imgUrl="/images/car2.png"
          fuel="80L"
          transmission="Manual"
          capacity="2 People"
          liked={false}
        />
        <CarCard
          name="Rolls - Royce"
          type="Sedan"
          price="96.00"
          imgUrl="/images/car3.png"
          fuel="70L"
          transmission="Manual"
          capacity="4 People"
          liked={true}
        />
      </div>
    </div>
  );
};

export default PopularCars;
