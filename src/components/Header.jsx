import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import '../CSS/Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const searchRef = useRef(null); // Reference to the search bar container
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Fetch all car data once when the component mounts
  useEffect(() => {
    fetch('/Json/cars.json')
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

  // Handle click on a search result item
  const handleResultClick = (id) => {
    // Navigate to the car detail page using the car's id
    navigate(`/car/${id}`);
    setSearchTerm(''); // Clear the search term
    setResults([]); // Clear the search results
  };

  // Handle logo click to navigate to the home page
  const handleLogoClick = () => {
    navigate('/'); // Navigate to the main page
  };

  const handleDetailSearchClick = () => {
    navigate('/search-details'); // Navigate to new search details page
  };
  

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick}>MORENT</div>
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
              <div 
                key={result.id} 
                className="search-result-item" 
                onClick={() => handleResultClick(result.id)} // Add click handler
              >
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
      <div className="detail_search">
      <button onClick={handleDetailSearchClick}>
    Detail Search
  </button>
      </div>
    </header>
  );
};

export default Header;
