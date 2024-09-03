import React, { useState, useEffect } from 'react';
import CarCard from './CarCard';
import '../CSS/PopularCars.css';
import useIsMobile from '../hooks/useIsMobile';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const PopularCars = () => {
  const [popularCars, setPopularCars] = useState([]);
  const [recommendationCars, setRecommendationCars] = useState([]);
  const [displayedRecommendations, setDisplayedRecommendations] = useState([]);
  const [recommendationIndex, setRecommendationIndex] = useState(0);
  const isMobile = useIsMobile(550); // Set your mobile breakpoint here

  // Set the number of cars to display initially and on each load
  const CARS_TO_LOAD = 4;

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
        setDisplayedRecommendations(data.recommendationCars.slice(0, CARS_TO_LOAD) || []);
        setRecommendationIndex(CARS_TO_LOAD);
      })
      .catch(error => console.error('Error fetching car data:', error));
  }, []);

  const renderSwiper = (cars) => (
    <Swiper
      spaceBetween={16}
      slidesPerView={1.2} // Shows 1.2 slides at a time
      pagination={{ clickable: true }}
      modules={[Pagination]}
    >
      {cars.map(car => (
        <SwiperSlide key={car.id}>
          <CarCard
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
        </SwiperSlide>
      ))}
    </Swiper>
  );

  const renderCarList = (cars) => (
    <div className="car-list">
      {cars.map(car => (
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
  );

  const handleLoadMore = () => {
    const nextIndex = recommendationIndex + CARS_TO_LOAD;
    setDisplayedRecommendations(recommendationCars.slice(0, nextIndex));
    setRecommendationIndex(nextIndex);
  };

  return (
    <div className="cars-container">
      <div className="popular-cars">
        <h3>Popular Cars</h3>
        {isMobile ? renderSwiper(popularCars) : renderCarList(popularCars)}
      </div>

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

export default PopularCars;
