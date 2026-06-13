import Wishlist from "../models/Wishlist.js";

class WishlistRepository {
  async findOneByUserId(userId, populateProducts = true) {
    const query = Wishlist.findOne({ userId });
    if (populateProducts) {
      query.populate({
        path: "products.productId",
        select: "name price thumbnail rating reviews discount",
      });
    }
    return query;
  }

  async create(wishlistData) {
    const wishlist = new Wishlist(wishlistData);
    return wishlist.save();
  }

  async save(wishlistDocument) {
    return wishlistDocument.save();
  }
}

export default new WishlistRepository();
