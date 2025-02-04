from flask import request, jsonify
from app import app, db
from models import Product, Cart

# API to get all products
@app.route("/api/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    product_list = [{"id": p.id, "name": p.name, "price": p.price, "image": p.image} for p in products]
    return jsonify(product_list)

# API to add a new product
@app.route("/api/products", methods=["POST"])
def add_product():
    data = request.get_json()
    new_product = Product(name=data["name"], price=data["price"], image=data["image"])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"message": "Product added successfully"}), 201

# API to delete a product
@app.route("/api/products/<int:id>", methods=["DELETE"])
def delete_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"})

# API to get items in the cart
@app.route("/api/cart", methods=["GET"])
def get_cart():
    cart_items = Cart.query.all()
    cart_list = [{"id": item.id, "product_id": item.product_id, "name": item.product.name, "price": item.product.price} for item in cart_items]
    return jsonify(cart_list)

# API to add a product to the cart
@app.route("/api/cart", methods=["POST"])
def add_to_cart():
    data = request.get_json()
    product_id = data.get("product_id")
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    new_cart_item = Cart(product_id=product_id)
    db.session.add(new_cart_item)
    db.session.commit()
    return jsonify({"message": "Product added to cart"}), 201

# API to remove a product from the cart
@app.route("/api/cart/<int:id>", methods=["DELETE"])
def remove_from_cart(id):
    cart_item = Cart.query.get(id)
    if not cart_item:
        return jsonify({"error": "Cart item not found"}), 404
    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"message": "Product removed from cart"})
