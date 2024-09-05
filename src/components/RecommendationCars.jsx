import React, { useState, useEffect } from 'react';
import CarCard from './CarCard';
import '../CSS/PopularCars.css';

const RecommendationCars = () => {
  const [recommendationCars, setRecommendationCars] = useState([]);
  const [displayedRecommendations, setDisplayedRecommendations] = useState([]);
  const [recommendationIndex, setRecommendationIndex] = useState(0);

  // Set the number of cars to display initially and on each load
  const CARS_TO_LOAD = 4;

  useEffect(() => {
    fetch('/Json/cars.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRecommendationCars(data.recommendationCars || []);
        setDisplayedRecommendations(data.recommendationCars.slice(0, CARS_TO_LOAD) || []);
        setRecommendationIndex(CARS_TO_LOAD);
      })
      .catch(error => console.error('Error fetching car data:', error));
  }, []);

  const renderCarList = (cars) => (
    <div className="car-list">
      {cars.map(car => (
                <CarCard 
                key={car.id} 
                id={car.id} 
                name={car.name} 
                type={car.type} 
                price={car.price} 
                oldPrice={car.oldPrice}
                imgUrl={car.imgUrl}
                fuel={car.fuel}
                transmission={car.transmission}
                capacity={car.capacity}
                initialLiked={car.liked}
              />
      
      ))}
    </div>
  );

  const handleLoadMore = () => {
    const nextIndex = recommendationIndex + CARS_TO_LOAD;
    setDisplayedRecommendations(recommendationCars.slice(0, nextIndex));
    setRecommendationIndex(nextIndex);
  };

  return (
    <div className="cars-container">
      <div className="recommendation-cars">
        <h3>Recommended Cars</h3>
        {renderCarList(displayedRecommendations)}
        {recommendationIndex < recommendationCars.length && (
          <div className="for_load_more_button">
            <button className="load-more-button" onClick={handleLoadMore}>
              Show More Cars
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationCars;
