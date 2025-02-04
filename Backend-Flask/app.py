from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# SQLite Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Product Model
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image = db.Column(db.String(200), nullable=False)  # Store image URL

# Cart Model
class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    product = db.relationship('Product', backref='cart', lazy=True)  # Relationship to get product details easily

with app.app_context():
    db.create_all()

# Routes
@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{'id': p.id, 'name': p.name, 'price': p.price, 'image': p.image} for p in products])

@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.get_json()
    new_product = Product(name=data['name'], price=data['price'], image=data['image'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product added'})

@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    # Remove associated cart items
    Cart.query.filter_by(product_id=id).delete()
    
    # Now delete the product
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted'})

@app.route('/api/cart', methods=['GET'])
def get_cart():
    cart_items = Cart.query.all()
    products = [item.product for item in cart_items]  # Get product details using the relationship
    return jsonify([{'id': p.id, 'name': p.name, 'price': p.price, 'image': p.image} for p in products])

@app.route('/api/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    product = Product.query.get(data['product_id'])
    if not product:
        return jsonify({'error': 'Product not found'}), 404  # Ensure product exists before adding to cart
    new_cart_item = Cart(product_id=data['product_id'])
    db.session.add(new_cart_item)
    db.session.commit()
    return jsonify({'message': 'Product added to cart'})

@app.route('/api/cart/<int:id>', methods=['DELETE'])
def remove_from_cart(id):
    cart_item = Cart.query.filter_by(product_id=id).first()  # Find the first cart item with the given product_id
    if not cart_item:
        return jsonify({'error': 'Item not in cart'}), 404
    
    db.session.delete(cart_item)  # Delete the cart item
    db.session.commit()  # Commit the transaction
    return jsonify({'message': 'Product removed from cart'})

if __name__ == '__main__':
    app.run(debug=True)
