// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import Home from './pages/Home';
import About from './pages/About'; 
import Contact from './pages/Contact'; 
import RestaurantPizzaForm from './pages/RestaurantPizzaForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/restaurant" element={<RestaurantPizzaForm />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
