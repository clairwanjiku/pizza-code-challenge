// Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import PizzaList from '../components/PizzaList';
import RestaurantList from '../components/RestaurantList';
import pizzaImage from '../images/image1.webp';


function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    console.log('Fetching restaurants...');
    fetch('/restaurants')
      .then((r) => r.json())
      .then((data) => {
        console.log('Fetched data:', data);
        setRestaurants(data);
      })
      .catch((error) => {
        console.error('Error fetching restaurants:', error);
      });
  }, []);

  function handleDelete(id) {
    fetch(`/restaurants/${id}`, {
      method: 'DELETE',
    }).then((r) => {
      if (r.ok) {
        setRestaurants((restaurants) =>
          restaurants.filter((restaurant) => restaurant.id !== id)
        );
      }
    });
  }

  return (
    <div>
      <LandingPage />
      <div className="image-container">
              <img src={pizzaImage} alt="Pizza" className="pizza-image" />
            </div>
      <PizzaList pizzas={[]} />
      <RestaurantList restaurants={restaurants} />
      <section className="container">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="card">
            <h2>
              <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
            </h2>
            <p>Address: {restaurant.address}</p>
            <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
            
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
