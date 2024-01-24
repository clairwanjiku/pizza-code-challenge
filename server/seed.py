from app import app, db
from models import Restaurant, Pizza, RestaurantPizza
from faker import Faker

fake = Faker()

def seed():
    # Restaurants
    for _ in range(10):
        restaurant = Restaurant(name=fake.company(), address=fake.address())
        db.session.add(restaurant)
        db.session.commit()
    
    # Pizzas
    for _ in range(10):
        pizza = Pizza(name=fake.name(), ingredients=fake.text())
        db.session.add(pizza)
        db.session.commit()
    
    # RestaurantPizzas
    for _ in range(10):
        restaurant_pizza = RestaurantPizza(price=fake.random_int(min=1, max=30), pizza_id=fake.random_int(min=1, max=10), restaurant_id=fake.random_int(min=1, max=10))
        db.session.add(restaurant_pizza)
        db.session.commit()
        
if __name__ == '__main__':
    with app.app_context():
        print("Seeding Started ...")
        
        seed()
        
        print("Seeding Completed.")
