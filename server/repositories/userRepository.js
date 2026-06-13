import User from "../models/User.js";

class UserRepository {
  async findByEmail(email, selectPassword = false) {
    const query = User.findOne({ email: email.toLowerCase() });
    if (selectPassword) {
      query.select("+password");
    }
    return query;
  }

  async findById(id) {
    return User.findById(id);
  }

  async findByIdWithWishlist(id) {
    return User.findById(id).populate({
      path: "wishlist",
      select: "name price images thumbnail",
    }).lean();
  }

  async create(userData) {
    const user = new User(userData);
    return user.save();
  }

  async updateById(id, updateData) {
    return User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async findAll() {
    return User.find({}).select("-password").lean();
  }
}

export default new UserRepository();
