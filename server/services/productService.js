import productRepository from "../repositories/productRepository.js";
import User from "../models/User.js";
import { ApiError } from "../utils/errors.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";

/**
 * Product Service
 * Handles all product-related business logic
 */
export class ProductService {
  /**
   * Get All Products with Filtering and Pagination
   */
  async getAllProducts(filters = {}) {
    const {
      page = 1,
      limit = 12,
      category,
      minPrice,
      maxPrice,
      rating,
      search,
      sort = "-createdAt",
      brand,
    } = filters;

    const query = { isActive: true };

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Brand filter
    if (brand) {
      query.brand = brand;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Rating filter
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      productRepository.find(query, {
        select: "-reviews",
        sort,
        skip,
        limit: limitNum,
        lean: true,
      }),
      productRepository.count(query),
    ]);

    return {
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    };
  }

  /**
   * Get Product by ID
   */
  async getProductById(productId) {
    const product = await productRepository.findByIdAndUpdate(
      productId,
      { $inc: { viewCount: 1 } },
      { populate: { path: "seller", select: "firstName lastName profileImage" } }
    );

    if (!product) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_MESSAGES.PRODUCT_NOT_FOUND
      );
    }

    return product;
  }

  /**
   * Create Product (Admin/Seller)
   */
  async createProduct(productData, userId) {
    const product = await productRepository.create({
      ...productData,
      seller: userId,
      images: productData.images || [
        { url: productData.thumbnail, alt: productData.name },
      ],
    });

    return product;
  }

  /**
   * Update Product (Admin/Seller)
   */
  async updateProduct(productId, updateData, userId) {
    const product = await productRepository.findById(productId);

    if (!product) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_MESSAGES.PRODUCT_NOT_FOUND
      );
    }

    // Only seller or admin can update
    if (product.seller?.toString() !== userId && !updateData.isAdmin) {
      throw new ApiError(
        HTTP_STATUS.FORBIDDEN,
        ERROR_MESSAGES.UNAUTHORIZED
      );
    }

    Object.assign(product, updateData);
    await product.save();

    return product;
  }

  /**
   * Delete Product (Admin/Seller)
   */
  async deleteProduct(productId, userId) {
    const product = await productRepository.findById(productId);

    if (!product) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_MESSAGES.PRODUCT_NOT_FOUND
      );
    }

    // Soft delete
    product.isActive = false;
    await product.save();

    return { message: "Product deleted successfully" };
  }

  /**
   * Search Products
   */
  async searchProducts(searchQuery, filters = {}) {
    return this.getAllProducts({
      ...filters,
      search: searchQuery,
    });
  }

  /**
   * Add Product Review
   */
  async addReview(productId, reviewData, userId) {
    const product = await productRepository.findById(productId);

    if (!product) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_MESSAGES.PRODUCT_NOT_FOUND
      );
    }

    // Check if user already reviewed
    const existingReview = product.reviews.find(
      (r) => r.userId.toString() === userId
    );

    if (existingReview) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        "You have already reviewed this product"
      );
    }

    // Fetch user name
    const user = await User.findById(userId);
    const userName = user ? `${user.firstName} ${user.lastName}` : "Anonymous";

    // Add review
    const review = {
      userId,
      userName,
      ...reviewData,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    // Update rating & averageRating
    const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    const avg = Math.round((totalRating / product.reviews.length) * 10) / 10;
    product.rating = avg;
    product.averageRating = avg;

    await product.save();
    return product;
  }

  /**
   * Get Featured Products
   */
  async getFeaturedProducts(limit = 10) {
    return productRepository.find(
      { isFeatured: true, isActive: true },
      {
        limit,
        select: "-reviews",
        sort: "-viewCount",
        lean: true,
      }
    );
  }

  /**
   * Get Products by Category
   */
  async getProductsByCategory(category, limit = 20) {
    return productRepository.find(
      { category, isActive: true },
      {
        limit,
        select: "-reviews",
        sort: "-createdAt",
        lean: true,
      }
    );
  }
}

export default new ProductService();
