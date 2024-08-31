import React, { useState, useEffect } from 'react';
import CarCard from './CarCard';
import '../CSS/PopularCars.css';

const PopularCars = () => {
  const [popularCars, setPopularCars] = useState([]);
  const [recommendationCars, setRecommendationCars] = useState([]);

  useEffect(() => {
    fetch('/json/cars.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPopularCars(data.popularCars || []);
        setRecommendationCars(data.recommendationCars || []);
      })
      .catch(error => console.error('Error fetching car data:', error));
  }, []);

  return (
    <div>
      <div className="popular-cars">
        <h3>Popular Cars</h3>
        <div className="car-list">
          {popularCars.map(car => (
            <CarCard
              key={car.id}
              name={car.name}
              type={car.type}
              price={car.price}
              oldPrice={car.oldPrice}
              imgUrl={car.imgUrl}
              fuel={car.fuel}
              transmission={car.transmission}
              capacity={car.capacity}
              liked={car.liked}
            />
          ))}
        </div>
      </div>

      <div className="recommendation-cars">
        <h3>Recommended Cars</h3>
        <div className="car-list">
          {recommendationCars.map(car => (
            <CarCard
              key={car.id}
              name={car.name}
              type={car.type}
              price={car.price}
              oldPrice={car.oldPrice}
              imgUrl={car.imgUrl}
              fuel={car.fuel}
              transmission={car.transmission}
              capacity={car.capacity}
              liked={car.liked}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCars;
