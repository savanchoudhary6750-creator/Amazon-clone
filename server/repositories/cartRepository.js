import Cart from "../models/Cart.js";

class CartRepository {
  async findOneByUserId(userId, populateItems = true) {
    const query = Cart.findOne({ userId });
    if (populateItems) {
      query.populate({
        path: "items.productId",
        select: "name price thumbnail discount stock",
      });
    }
    return query;
  }

  async create(cartData) {
    const cart = new Cart(cartData);
    return cart.save();
  }

  async save(cartDocument) {
    return cartDocument.save();
  }
}

export default new CartRepository();
