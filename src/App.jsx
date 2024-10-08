import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import RentalOptions from './components/RentalOptions';
import PopularCars from './components/PopularCars';
import RecommendationCars from './components/RecomendationCars';
import CarRentPage from './pages/CarRentPage/index';
import Footer from './components/Footer/index';
import CarDetailPage from './pages/CarDetails/index';
import SearchDetails from './pages/SearchDetails/index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  const [carsData, setCarsData] = useState({ popularCars: [], recommendationCars: [] });

  useEffect(() => {
    fetch('/Json/cars.json')
      .then(response => response.json())
      .then(data => setCarsData(data))
      .catch(error => console.error('Error fetching car data:', error));
  }, []);

  return (
    <div className="container">
      <Router>
        <Header />
        <div className="app" style={{ maxWidth: "1440px", width: "100%" }}>
          <main className="main-content" style={{ padding: "32px 64px" }}>
            <Routes>
            <Route path="/search-details" element={<SearchDetails />} />
              <Route 
                path="/" 
                element={
                  <>
                    <Banner />
                    <RentalOptions />
                    <PopularCars carsData={carsData} />
                    <RecommendationCars carsData={carsData} />
                  </>
                } 
              />
              <Route 
                path="/car/:id" 
                element={<CarDetailPage carsData={carsData} />} 
              />
                      <Route path="/rent/:id" element={<CarRentPage />} /> {/* Rent form page */}

            </Routes>
          </main>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
