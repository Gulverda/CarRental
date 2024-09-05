import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/CarDetailPage.css';
import RecommendationCars from '../components/RecommendationCars';
import ProfileImg from '../assets/Profile.png';

const CarDetailPage = ({ carsData }) => {
  const { id } = useParams();
  const allCars = [...carsData.popularCars, ...carsData.recommendationCars];
  const car = allCars.find(car => car.id === parseInt(id));

  const [mainImage, setMainImage] = useState('');
  const [showAllReviews, setShowAllReviews] = useState(false); // State to track if all reviews should be shown

  // Update the mainImage only when the car data is available
  useEffect(() => {
    if (car) {
      setMainImage(car.imgUrl);
    }
  }, [car]);

  if (!car) {
    return <div className="not-found">Car not found</div>;
  }

  // Function to change the main image
  const handleSubImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  // Function to toggle between showing 2 reviews and all reviews
  const toggleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  // Determine how many reviews to show based on `showAllReviews` state
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
                    <span>21 July 2022</span> {/* Replace with dynamic date if available */}
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

        {/* Show All Button */}
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
