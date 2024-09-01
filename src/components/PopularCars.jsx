// src/components/PopularCars.jsx

import React, { useState, useEffect } from 'react';
import CarCard from './CarCard';
import '../CSS/PopularCars.css';
import useIsMobile from '../hooks/useIsMobile';

// Import Swiper modules and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

// Optional: Import Pagination if needed
import { Pagination } from 'swiper/modules';

const PopularCars = () => {
  const [popularCars, setPopularCars] = useState([]);
  const [recommendationCars, setRecommendationCars] = useState([]);
  const isMobile = useIsMobile(768); // Set your mobile breakpoint here

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

  return (
    <div className="cars-container">
      <div className="popular-cars">
        <h3>Popular Cars</h3>
        {isMobile ? renderSwiper(popularCars) : renderCarList(popularCars)}
      </div>

      <div className="recommendation-cars">
        <h3>Recommended Cars</h3>
        {isMobile ? renderSwiper(recommendationCars) : renderCarList(recommendationCars)}
      </div>
    </div>
  );
};

export default PopularCars;
