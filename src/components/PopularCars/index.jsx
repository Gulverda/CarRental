import React, { useState, useEffect } from 'react';
import CarCard from '../CarCard/CarCard';
import './PopularCars.css';
import useIsMobile from '../../hooks/useIsMobile';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const PopularCars = () => {
  const [popularCars, setPopularCars] = useState([]);
  const isMobile = useIsMobile(550); // Set your mobile breakpoint here

  useEffect(() => {
    fetch('/Json/cars.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPopularCars(data.popularCars || []);
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
          rating={car.rating || 2} // Ensure rating is passed
          initialLiked={car.liked}
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
                id={car.id} 
                name={car.name} 
                type={car.type} 
                price={car.price} 
                oldPrice={car.oldPrice}
                imgUrl={car.imgUrl}
                fuel={car.fuel}
                transmission={car.transmission}
                capacity={car.capacity}
                rating={car.rating || 2} // Ensure rating is passed
                initialLiked={car.liked}
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
    </div>
  );
};

export default PopularCars;
