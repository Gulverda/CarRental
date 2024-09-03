// src/components/RentalOptions.js
import React, { useState, useEffect } from 'react';
import '../CSS/RentalOptions.css';

const RentalOptions = () => {
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
    fetch('/json/cities.json')
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error('Error fetching cities:', error));
  }, []);

  const handleSwap = () => {
    const temp = { ...pickUp };
    setPickUp(dropOff);
    setDropOff(temp);
  };

  return (
    <div className="rental-options">
      <div className="option">
        <label>Pick-Up</label>
        <div className="fields">
          <select
            value={pickUp.city}
            onChange={(e) => setPickUp({ ...pickUp, city: e.target.value })}
          >
            <option value="" disabled>Select your city</option>
            {cities.map(city => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          <div className="vertical_line"></div>
          <input
            type="date"
            value={pickUp.date}
            onChange={(e) => setPickUp({ ...pickUp, date: e.target.value })}
            placeholder="Select date"
          />
          <div className="vertical_line"></div>
          <input
            type="time"
            value={pickUp.time}
            onChange={(e) => setPickUp({ ...pickUp, time: e.target.value })}
            placeholder="Select time"
          />
        </div>
      </div>

      <div className="swap-icon" onClick={handleSwap}>
        <i className="icon swap">
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.16124 0.836324L5.16124 14.4541" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1.0837 4.93262L5.16148 0.83595L9.23926 4.93262" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.089 17.167L15.089 3.54921" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19.167 13.0713L15.0892 17.168L11.0114 13.0713" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </i>
      </div>

      <div className="option">
        <label>Drop-Off</label>
        <div className="fields">
          <select
            value={dropOff.city}
            onChange={(e) => setDropOff({ ...dropOff, city: e.target.value })}
          >
            <option value="" disabled>Select your city</option>
            {cities.map(city => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          <div className="vertical_line"></div>
          <input
            type="date"
            value={dropOff.date}
            onChange={(e) => setDropOff({ ...dropOff, date: e.target.value })}
            placeholder="Select date"
          />
          <div className="vertical_line"></div>
          <input
            type="time"
            value={dropOff.time}
            onChange={(e) => setDropOff({ ...dropOff, time: e.target.value })}
            placeholder="Select time"
          />
        </div>
      </div>
    </div>
  );
};

export default RentalOptions;
