import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    axios.get(`/restaurants/${id}`)
      .then(response => setRestaurant(response.data))
      .catch(error => console.error('Error fetching restaurant details:', error));
  }, [id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <p>Address: {restaurant.address}</p>

      <h3>Pizzas</h3>
      <ul>
        {restaurant.pizzas.map(pizza => (
          <li key={pizza.id}>
            <strong>{pizza.name}</strong> - {pizza.ingredients}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantDetail;
