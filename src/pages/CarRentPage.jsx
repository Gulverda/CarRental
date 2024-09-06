// RentForm.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StarRating from '../components/StarRating'; // Import the StarRating component
import '../CSS/RentForm.css';

const RentForm = () => {
    const location = useLocation();
    const { car } = location.state || {}; // Handle case where location.state might be undefined

    const [cities, setCities] = useState([]);
    const [pickUp, setPickUp] = useState({
        city: '',
        date: '',
        time: ''
    });

    const [dropOff, setDropOff] = useState({
        city: '',
        date: '',
        time: ''
    });

    useEffect(() => {
        // Fetch city data from the JSON file
        fetch('/Json/cities.json')
            .then(response => response.json())
            .then(data => setCities(data))
            .catch(error => console.error('Error fetching cities:', error));
    }, []);

    useEffect(() => {
        // Debugging: Log the car object and its rating
        console.log('Car object:', car);
        console.log('Car rating:', car.rating);
    }, [car]);

    return (
        <div className="rent-form-container">
            {/* Left Section - Form */}
            <div className="form-section">
                {/* Billing Info */}
                <h2 className="section-title">Billing Info</h2>
                <div className="input-row">
                    <div>
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Your name" />
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <input type="tel" name="phone" placeholder="Phone number" />
                    </div>
                </div>
                <div className="input-row">
                    <div>
                        <label>Address</label>
                        <input type="text" name="address" placeholder="Address" />
                    </div>
                    <div>
                        <label>Town / City</label>
                        <input type="text" name="city" placeholder="Town or City" />
                    </div>
                </div>

                {/* Rental Info */}
                <h2 className="section-title">Rental Info</h2>
                <div className="input-row">
                    <div>
                        <label>Pick-Up Location</label>
                        <select
                            value={pickUp.city}
                            onChange={(e) => setPickUp({ ...pickUp, city: e.target.value })}
                        >
                            <option value="" disabled>Select City</option>
                            {cities.map(city => (
                                <option key={city.id} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Pick-Up Date</label>
                        <input
                            type="date"
                            value={pickUp.date}
                            onChange={(e) => setPickUp({ ...pickUp, date: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Pick-Up Time</label>
                        <input
                            type="time"
                            value={pickUp.time}
                            onChange={(e) => setPickUp({ ...pickUp, time: e.target.value })}
                        />
                    </div>
                </div>

                <div className="input-row">
                    <div>
                        <label>Drop-Off Location</label>
                        <select
                            value={dropOff.city}
                            onChange={(e) => setDropOff({ ...dropOff, city: e.target.value })}
                        >
                            <option value="" disabled>Select City</option>
                            {cities.map(city => (
                                <option key={city.id} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Drop-Off Date</label>
                        <input
                            type="date"
                            value={dropOff.date}
                            onChange={(e) => setDropOff({ ...dropOff, date: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Drop-Off Time</label>
                        <input
                            type="time"
                            value={dropOff.time}
                            onChange={(e) => setDropOff({ ...dropOff, time: e.target.value })}
                        />
                    </div>
                </div>

                <button className="submit-button" type="submit">Submit</button>
            </div>

            {/* Right Section - Rental Summary */}
            <div className="summary-section">
                <div className="main_summary">
                    <h3 className="summary_section_title">Rental Summary</h3>
                    <p className="summary_description">Prices may change depending on the length of the rental and the price of your rental car.</p>
                    <div className="rental-summary">
                        <img src={car?.imgUrl || '/default-image.jpg'} alt={car?.name || 'Car'} />
                        <div className="for_rental_text">
                            <h3 className="summary-title">{car?.name || 'Car Name'}</h3>
                            <div className="car-rating">
                                <StarRating rating={car?.rating || 0} /> {/* Dynamic rating here */}
                                <span className="car-reviewer-count">440+ Reviewers</span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="subtotal_tax">
                        <p>Type: {car?.type || 'Unknown'}</p>
                        <p>Price: ${car?.price || '0'}/day</p>
                    </div>
                </div>
                <div className="apply-code">
                    <input type="text" placeholder="Apply promo code" />
                    <button>Apply now</button>
                </div>
                <div className="total-price">
                    <div className="rigth_text_for_total">
                        <h2>Total Rent Price</h2>
                        <p>Overall price and includes rental discount</p>
                    </div>
                    ${car?.price || '0'}
                </div>
            </div>
        </div>
    );
};

export default RentForm;
