import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CarDetailPage.css';
import RecommendationCars from '../../components/RecomendationCars';
import ProfileImg from '../../assets/Profile.png';
import StarRating from '../../components/StarRating/index';

const CarDetailPage = ({ carsData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const allCars = [...carsData.popularCars, ...carsData.recommendationCars];
  const car = allCars.find(car => car.id === parseInt(id));

  const [mainImage, setMainImage] = useState('');
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    if (car) {
      setMainImage(car.imgUrl);
    }
  }, [car]);

  if (!car) {
    return <div className="not-found">Car not found</div>;
  }

  const handleSubImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const toggleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const handleRentNowClick = () => {
    navigate(`/rent/${id}`, { state: { car } });
  };

  const displayedTestimonials = showAllReviews ? car.testimonials : car.testimonials.slice(0, 2);

  return (
    <>
      <div className="car-detail-container">
        <div className="car-image-section">
          <div className="img_slider_for_details">
            <div className="main_img">
              <img src={mainImage} alt={car.name} className="car-main-image" />
            </div>
            <div className="car-sub-images">
              {[car.subImage1, car.subImage2, car.subImage3].map((subImg, index) => (
                <div className="car_sub" key={index}>
                  <img
                    src={subImg}
                    alt={`${car.name} ${index + 1}`}
                    onClick={() => handleSubImageClick(subImg)}
                    
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="car-details-section">
          <h2 className="car-title">{car.name}</h2>
          <div className="rating_description">
            <div className="car-rating">
              <StarRating rating={car.rating} /> {/* Dynamic rating here */}
              <span className="car-reviewer-count">440+ Reviewers</span>
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
            <button className="rent-now-button" onClick={handleRentNowClick}>Rent Now</button>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="car-testimonials-section">
        <div className="reviews-header">
          <h3>Reviews</h3>
          <span className="reviews-count">{car.testimonials ? car.testimonials.length : 0}</span>
        </div>

        {car.testimonials && car.testimonials.length > 0 ? (
          displayedTestimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-item">
              <div className="testimonial-avatar">
                <img src={ProfileImg} alt={testimonial.name} />
              </div>
              <div className="testimonial-content">
                <div className="testimonial-header">
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                  <div className="testimonial-date">
                    <span>21 July 2022</span> {/* Replace with dynamic date */}
                    <div className="testimonial-rating">{testimonial.rating}⭐</div>
                  </div>
                </div>
                <p className="testimonial-comment">{testimonial.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No testimonials available for this car.</p>
        )}

        {car.testimonials.length > 2 && (
          <div className="show-all-reviews">
            <button onClick={toggleShowAllReviews}>
              {showAllReviews ? 'Show Less' : 'Show All'}
            </button>
          </div>
        )}
      </div>

      <RecommendationCars carsData={carsData} />
    </>
  );
};

export default CarDetailPage;
