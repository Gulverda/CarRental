import React, { useState, useEffect, useCallback } from 'react';
import './SearchDetails.css';
import CarCard from '../../components/CarCard';
import useIsMobile from '../../hooks/useIsMobile';


const SearchDetails = () => {
  const [filters, setFilters] = useState({
    type: [],
    capacity: [],
    priceRange: [0, 100],
  });

  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const isMobile = useIsMobile(768); // Use hook to check if it's mobile (below 768px)


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
        console.log('Car data fetched:', combinedCars); // Log the fetched car data
        setAllCars(combinedCars); // Save to state
        setFilteredCars(combinedCars); // Initially, show all cars
      })
      .catch(error => console.error('Error fetching car data:', error));
  }, []);

  // Handle checkbox changes for types and capacities
  const handleCheckboxChange = (e, filterType) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setFilters(prevFilters => {
      const updatedFilter = checked
        ? [...prevFilters[filterType], value] // Add to filter if checked
        : prevFilters[filterType].filter(item => item !== value); // Remove from filter if unchecked

      return { ...prevFilters, [filterType]: updatedFilter };
    });
  };

  // Handle price range slider changes
  const handlePriceRangeChange = (e) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      priceRange: [0, Number(e.target.value)]
    }));
  };

  // Update slider background based on price range
  const updateSliderBackground = (value) => {
    const percentage = (value - 0) / (100 - 0) * 100;
    return `linear-gradient(to right, #367cff ${percentage}%, #90A3BF ${percentage}%, #90A3BF 100%)`;
  };

  useEffect(() => {
    const slider = document.querySelector('.price-range');
    if (slider) {
      slider.style.background = updateSliderBackground(filters.priceRange[1]);
    }
  }, [filters]);

  // Memoize the filterCars function to avoid unnecessary re-creations
  const filterCars = useCallback(() => {
    const filtered = allCars.filter(car => {
      const matchesType = filters.type.length > 0 ? filters.type.includes(car.type) : true;
      const matchesCapacity = filters.capacity.length > 0
        ? filters.capacity.includes(String(car.capacity)) // Convert car.capacity to string for comparison
        : true;
      const matchesPrice = car.price <= filters.priceRange[1];

      return matchesType && matchesCapacity && matchesPrice;
    });

    setFilteredCars(filtered);
  }, [filters, allCars]);

  // Run filterCars whenever filters or allCars change
  useEffect(() => {
    filterCars();
  }, [filterCars]);

   // Toggle the filter section
   const [isOpen, setIsOpen] = useState(false);

  const toggleFilters = () =>{
    setIsOpen(!isOpen);
  }

  return (
    <div className="search-details-container">
      {/* Filter Section */}
      <div className="filter-section">
      <h3 onClick={toggleFilters}>
        Filters 
        <span className={`arrow ${isOpen ? 'open' : ''}`}>
        <svg width="20px" height="20px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill="#000000" /></svg>        </span>
      </h3>

      {(isOpen || !isMobile) && (
        <>
          {/* Type Filter */}
          <div className="filter-item">
            <label>Type</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Sport"
                  onChange={(e) => handleCheckboxChange(e, 'type')}
                />
                Sport
              </label>
              <label>
                <input
                  type="checkbox"
                  value="SUV"
                  onChange={(e) => handleCheckboxChange(e, 'type')}
                />
                SUV
              </label>
            </div>
          </div>

          {/* Capacity Filter */}
          <div className="filter-item">
            <label>Capacity</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="2"
                  onChange={(e) => handleCheckboxChange(e, 'capacity')}
                />
                2 People
              </label>
              <label>
                <input
                  type="checkbox"
                  value="4"
                  onChange={(e) => handleCheckboxChange(e, 'capacity')}
                />
                4 People
              </label>
              <label>
                <input
                  type="checkbox"
                  value="6"
                  onChange={(e) => handleCheckboxChange(e, 'capacity')}
                />
                6 People
              </label>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-item">
            <label>Price Range</label>
            <input
              key={`price-range-${isOpen}`}               
              type="range"
              min="0"
              max="100"
              value={filters.priceRange[1]}
              onChange={handlePriceRangeChange}
              className="price-range"
            />
            <span>${filters.priceRange[1]}</span>
          </div>
        </>
      )}

      </div>

      {/* Search Results Section */}
      <div className="results-section">
        <h3>Search Results</h3>
        <div className="car-list for_details">
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
                capacity={car.capacity}
                transmission={car.transmission}
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
