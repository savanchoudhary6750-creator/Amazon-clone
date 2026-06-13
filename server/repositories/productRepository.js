import Product from "../models/Product.js";

class ProductRepository {
  async find(query, options = {}) {
    const { select, sort, skip, limit, lean = true } = options;
    let mQuery = Product.find(query);
    
    if (select) mQuery = mQuery.select(select);
    if (sort) mQuery = mQuery.sort(sort);
    if (skip) mQuery = mQuery.skip(skip);
    if (limit) mQuery = mQuery.limit(limit);
    if (lean) mQuery = mQuery.lean();
    
    return mQuery;
  }

  async count(query) {
    return Product.countDocuments(query);
  }

  async findById(id) {
    return Product.findById(id);
  }

  async findByIdAndUpdate(id, updateData, options = {}) {
    return Product.findByIdAndUpdate(id, updateData, { new: true, ...options });
  }

  async create(productData) {
    const product = new Product(productData);
    return product.save();
  }
}

export default new ProductRepository();
