// src/App.js
import React from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import RentalOptions from './components/RentalOptions';
import PopularCars from './components/PopularCars';
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container">
            <Header />
      <div className="app" style={{maxWidth: "1440px", width: "100%"}}>
      <main className="main-content" style={{padding: "32px 64px"}}>
        <Banner />
        <RentalOptions />
        <PopularCars />
      </main>
    </div>
    <Footer />

    </div>
  );
}

export default App;
