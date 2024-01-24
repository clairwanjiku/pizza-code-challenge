from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates

db = SQLAlchemy()

class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    pizzas = db.relationship('Pizza', secondary = 'restaurant_pizza', back_populates = 'restaurants')
    
    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Name is required')
        return name
    
    @validates("address")
    def validate_address(self, key, address):
        if not address:
            raise ValueError('Address is required')
        return address
    
class Pizza(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    ingredients = db.Column(db.String(200), nullable=False)
    restaurants = db.relationship('Restaurant', secondary='restaurant_pizza', back_populates = 'pizzas')
    
    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Name is required')
        return name
    
    @validates("ingredients")
    def validate_ingredients(self, key, ingredients):
        if not ingredients:
            raise ValueError('Ingredients is required')
        return ingredients
    
class RestaurantPizza(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float, nullable=False)
    pizza_id = db.Column(db.Integer, db.ForeignKey('pizza.id'), nullable=False,primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False, primary_key=True)
    
    @validates('price')
    def validate_price(self, key, price):
        if not (1.0 <= price <= 30.0):
            raise ValueError('Price must be between 1.0 and 30.0')
        return price