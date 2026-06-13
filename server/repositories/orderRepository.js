import Order from "../models/Order.js";

class OrderRepository {
  async findById(id, populateOptions = []) {
    let query = Order.findById(id);
    populateOptions.forEach((option) => {
      query = query.populate(option);
    });
    return query;
  }

  async find(query, options = {}) {
    const { sort = { createdAt: -1 }, skip = 0, limit = 10, populateOptions = [] } = options;
    let mQuery = Order.find(query).sort(sort).skip(skip).limit(limit);
    
    populateOptions.forEach((option) => {
      mQuery = mQuery.populate(option);
    });
    
    return mQuery;
  }

  async count(query) {
    return Order.countDocuments(query);
  }

  async create(orderData) {
    const order = new Order(orderData);
    return order.save();
  }

  async save(orderDocument) {
    return orderDocument.save();
  }
}

export default new OrderRepository();
