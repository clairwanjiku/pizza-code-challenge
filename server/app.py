from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate

from models import db, Restaurant, Pizza, RestaurantPizza

app = Flask(__name__)
CORS(app) 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
db.init_app(app)

# Enable CORS for all routes
CORS(app)

# GET /restaurants
@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    data = [{'id': r.id, 'name': r.name, 'address': r.address} for r in restaurants]
    return jsonify(data)

# GET /restaurants/:id
@app.route('/restaurants/<int:restaurant_id>', methods=['GET'])
def get_restaurant(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)

    if restaurant:
        pizzas = [{'id': pizza.id, 'name': pizza.name, 'ingredients': pizza.ingredients} for pizza in restaurant.pizzas]
        data = {'id': restaurant.id, 'name': restaurant.name, 'address': restaurant.address, 'pizzas': pizzas}
        return jsonify(data)
    else:
        return jsonify({'error': 'Restaurant not found'}), 404

# DELETE /restaurants/:id
@app.route('/restaurants/<int:restaurant_id>', methods=['DELETE'])
def delete_restaurant(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)

    if restaurant:
        # Delete associated RestaurantPizza instances
        RestaurantPizza.query.filter_by(restaurant_id=restaurant_id).delete()

        # Delete the restaurant
        db.session.delete(restaurant)
        db.session.commit()

        return jsonify({}), 204
    else:
        return jsonify({'error': 'Restaurant not found'}), 404

# GET /pizzas
@app.route('/pizzas', methods=['GET'])
def get_pizzas():
    pizzas = Pizza.query.all()
    data = [{'id': pizza.id, 'name': pizza.name, 'ingredients': pizza.ingredients} for pizza in pizzas]
    return jsonify(data)

# POST /restaurant_pizzas
@app.route('/restaurant_pizzas', methods=['POST'])
def create_restaurant_pizza():
    data = request.json

    price = data.get('price')
    pizza_id = data.get('pizza_id')
    restaurant_id = data.get('restaurant_id')

    # Validate price
    if not 1 <= price <= 30:
        return jsonify({'errors': ['Validation error: Price must be between 1 and 30']}), 400

    # Check if Pizza and Restaurant exist
    pizza = Pizza.query.get(pizza_id)
    restaurant = Restaurant.query.get(restaurant_id)

    if not (pizza and restaurant):
        return jsonify({'errors': ['Validation error: Pizza or Restaurant not found']}), 400

    # Create new RestaurantPizza
    restaurant_pizza = RestaurantPizza(pizza_id=pizza.id, restaurant_id=restaurant.id, price=price)
    db.session.add(restaurant_pizza)
    db.session.commit()

    # Return data related to the Pizza
    pizza_data = {'id': pizza.id, 'name': pizza.name, 'ingredients': pizza.ingredients}
    return jsonify(pizza_data), 201
if __name__ == '__main__':
    app.run(debug=True, port=5555)