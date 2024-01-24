import React from 'react';
import pizzaImage from '../images/image1.webp'; // Replace with the actual path to your image

const About = () => (
  <div className="about-container">
    <div className="text-container">
      <h2>HELLO</h2>
      <p>"Welcome to our innovative pizza ordering application! Our app provides a seamless and enjoyable experience for pizza enthusiasts to explore a variety of delicious options. Whether you're a fan of classic favorites or adventurous toppings, our app connects you with a diverse selection of pizzas from different restaurants. With user-friendly navigation and an intuitive interface, you can effortlessly browse through pizza lists, discover new restaurants, and even customize your own pizza using our convenient form. We aim to simplify the pizza ordering process, making it a delightful and hassle-free experience for every user. Join us on a flavorful journey, exploring the world of pizzas with our easy-to-use and visually appealing application."</p>
    </div>
    <div className="image-container">
      <img src={pizzaImage} alt="Pizza" className="pizza-image" />
    </div>
  </div>
);

export default About;
