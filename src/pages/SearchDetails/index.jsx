import React, { useState, useEffect, useCallback } from 'react';
import './SearchDetails.css';
import '../../CSS/CarCard.css'; // Ensure this path is correct
import CarCard from '../../components/CarCard';

const SearchDetails = () => {
  const [filters, setFilters] = useState({
    type: '',
    capacity: '',
    priceRange: [0, 100],
  });
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  // Fetch all car data when component mounts
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
        const combinedCars = [...(data.popularCars || []), ...(data.recommendationCars || [])];
        setAllCars(combinedCars); // Save to state
        setFilteredCars(combinedCars); // Initially, show all cars
      })
      .catch(error => console.error('Error fetching car data:', error));
  }, []);

  // Memoize the filterCars function to avoid unnecessary re-creations
  const filterCars = useCallback(() => {
    const filtered = allCars.filter(car => {
      const matchesType = filters.type ? car.type === filters.type : true;
      const matchesCapacity = filters.capacity ? car.capacity === parseInt(filters.capacity) : true;
      const matchesPrice = car.price <= filters.priceRange[1];

      return matchesType && matchesCapacity && matchesPrice;
    });
    setFilteredCars(filtered);
  }, [filters, allCars]); // Include dependencies

  // Run filterCars whenever filters or allCars change
  useEffect(() => {
    filterCars(); // Call the memoized function
  }, [filterCars]); // Add filterCars as a dependency

  return (
    <div className="search-details-container">
      {/* Filter Section */}
      <div className="filter-section">
        <h3>Filters</h3>
        <div className="filter-item">
          <label>Type</label>
          <select onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
            <option value="">All</option>
            <option value="Sport">Sport</option>
            <option value="SUV">SUV</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Capacity</label>
          <select onChange={(e) => setFilters({ ...filters, capacity: e.target.value })}>
            <option value="">Any</option>
            <option value="2">2 People</option>
            <option value="4">4 People</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Price Range</label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.priceRange[1]}
            onChange={(e) => setFilters({ ...filters, priceRange: [0, e.target.value] })}
          />
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Search Results Section */}
      <div className="results-section">
        <h3>Search Results</h3>
        <div className="car-list">
          {filteredCars.length > 0 ? (
            filteredCars.map(car => (
              <CarCard
                key={car.id}
                id={car.id}
                name={car.name}
                type={car.type}
                price={car.price}
                oldPrice={car.oldPrice}
                imgUrl={car.imgUrl}
                fuel={car.fuel}
              />
            ))
          ) : (
            <p>No cars found matching the selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDetails;
