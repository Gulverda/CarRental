import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/CarDetailPage.css';
// import PopularCars from '../components/PopularCars';
import RecommendationCars from '../components/RecommendationCars';

const CarDetailPage = ({ carsData }) => {
  const { id } = useParams();
  const allCars = [...carsData.popularCars, ...carsData.recommendationCars];
  const car = allCars.find(car => car.id === parseInt(id));
  
  const [mainImage, setMainImage] = useState(car ? car.imgUrl : '');

  if (!car) {
    return <div className="not-found">Car not found</div>;
  }

  // Function to change the main image
  const handleSubImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  return (
<>
<div className="car-detail-container">
      <div className="car-image-section">
        {/* <div className="car_img_section_text">
          <p className="car-tagline">Sports car with the best design and acceleration</p>
          <p className="car-description">Safety and comfort while driving a futuristic and elegant sports car</p>
        </div> */}
        <div className="img_slider_for_details">
            <div className="main_img">
            <img src={mainImage} alt={car.name} className="car-main-image" />
            </div>
          <div className="car-sub-images">
           <div className="car_sub">
           <img 
              src={car.subImage1} 
              alt={`${car.name} 1`} 
              onClick={() => handleSubImageClick(car.subImage1)} 
            />
           </div>
            <div className="car_sub">
            <img 
              src={car.subImage2} 
              alt={`${car.name} 2`} 
              onClick={() => handleSubImageClick(car.subImage2)} 
            />
            </div>
            <div className="car_sub">
            <img 
              src={car.subImage3} 
              alt={`${car.name} 3`} 
              onClick={() => handleSubImageClick(car.subImage3)} 
            />
            </div>
          </div>
        </div>
      </div>
      <div className="car-details-section">
        <h2 className="car-title">{car.name}</h2>

        <div className="rating_description">
        <div className="car-rating">
          <span className="car-rating-stars">⭐⭐⭐⭐</span>
          <span className="car-reviewer-count">440+ Reviewer</span>
        </div>
        <p className="car-details-description">
          NISMO has become the embodiment of Nissan's outstanding performance, inspired by the most unforgiving proving ground, the "race track".
        </p>
        </div>
        <div className="car-specs">
          <p>Type Car: <strong>{car.type}</strong></p>
          <p>Steering: <strong>{car.transmission}</strong></p>
          <p>Capacity: <strong>{car.capacity} Person</strong></p>
          <p>Gasoline: <strong>{car.fuel}L</strong></p>
        </div>
        <div className="car-pricing">
          <p className="car-price">${car.price}.00/day</p>
          {car.oldPrice && <p className="car-old-price">${car.oldPrice}.00</p>}
          <button className="rent-now-button">Rent Now</button>
        </div>
      </div>
    </div>
          <RecommendationCars carsData={carsData} />

</>
  );
};

export default CarDetailPage;
