import React, { useState, useEffect, useRef } from 'react';
import '../CSS/Header.css'; 
import heart from '../assets/icons/heart.svg';
import notification from '../assets/icons/notification.svg';
import settings from '../assets/icons/setting.svg';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const searchRef = useRef(null); // Reference to the search bar container

  // Fetch all car data once when the component mounts
  useEffect(() => {
    fetch('/json/cars.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Combine popular and recommendation cars into one list
        setAllCars([...data.popularCars || [], ...data.recommendationCars || []]);
      })
      .catch(error => console.error('Error fetching car data:', error));
  }, []);

  // Handle clicking outside the search results to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle search input and filter the cars based on the search term
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase(); // Get the search term
    setSearchTerm(query);

    // Filter the car list by name matching the search term
    const filteredCars = allCars.filter(car =>
      car.name.toLowerCase().includes(query)
    );

    setResults(filteredCars); // Update the results to display
  };

  return (
    <header className="header">
      <div className="logo">MORENT</div>
      <div className="search-bar" ref={searchRef}>
        <input 
          type="text" 
          placeholder="Search something here" 
          value={searchTerm} 
          onChange={handleSearch}
        />
        {results.length > 0 && (
          <div className="search-results">
            {results.map(result => (
              <div key={result.id} className="search-result-item">
                <img src={result.imgUrl} alt={result.name} />
                <div>
                  <div className="result-name">{result.name}</div>
                  <div className="result-price">${result.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="user-options">
        <i className="icon hearts">
          <img src={heart} alt="Favorite items" />
        </i>
        <i className="icon settings">
          <img src={settings} alt="Settings" />
        </i>
        <i className="icon notification">
          <img src={notification} alt="Notifications" />
        </i>
      </div>
    </header>
  );
};

export default Header;
