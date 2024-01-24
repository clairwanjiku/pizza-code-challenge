// RestaurantPizzaForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantPizzaForm = () => {
  const [formData, setFormData] = useState({ price: '', pizza_id: '', restaurant_id: '' });
  const [errors, setErrors] = useState([]);
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    console.log('Fetching pizzas...');
    axios.get('/api/pizzas')
      .then(response => {
        console.log('Pizzas response:', response.data);
        const responseData = response.data ? response.data : [];
        setPizzas(responseData);
      })
      .catch(error => {
        console.error('Error fetching pizzas:', error.response || error.message || error);
        setPizzas([]);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Name: ${name}, Value: ${value}`);

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === 'pizza_id' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/restaurant_pizzas', formData)
      .then(response => console.log('RestaurantPizza created:', response.data))
      .catch(error => {
        console.error('Error creating RestaurantPizza:', error.response || error.message || error);
        setErrors(error.response.data.errors || []);
      });
  };

  return (
    <div>
      <h2>Create RestaurantPizza</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Pizza ID:
          <select
            name="pizza_id"
            value={formData.pizza_id}
            onChange={handleChange}
          >
            <option value="" disabled>Select Pizza</option>
            {pizzas && pizzas.length > 0 && pizzas.map(pizza => (
              <option key={pizza.id} value={pizza.id}>{pizza.name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Restaurant ID:
          <input
            type="number"
            name="restaurant_id"
            value={formData.restaurant_id}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Create RestaurantPizza</button>
      </form>
      {errors.length > 0 && (
        <div>
          <h3>Errors:</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RestaurantPizzaForm;