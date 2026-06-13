import productService from "../services/productService.js";
import { asyncHandler } from "../utils/errors.js";
import { sendResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { validateProduct } from "../validators/index.js";

/**
 * Product Controller
 * Handles product-related endpoints
 */

export const getAllProducts = asyncHandler(async (req, res) => {
  const { products, pagination } = await productService.getAllProducts(
    req.query
  );

  return sendResponse(res, HTTP_STATUS.OK, "Products fetched successfully", {
    products,
    pagination,
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  return sendResponse(res, HTTP_STATUS.OK, "Product fetched successfully", product);
});

export const createProduct = asyncHandler(async (req, res) => {
  // Validate product data
  const validation = validateProduct(req.body);
  if (!validation.isValid) {
    return sendResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      "Validation failed",
      null,
      validation.errors
    );
  }

  const product = await productService.createProduct(req.body, req.user.id);

  return sendResponse(
    res,
    HTTP_STATUS.CREATED,
    "Product created successfully",
    product
  );
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(
    req.params.id,
    req.body,
    req.user.id
  );

  return sendResponse(
    res,
    HTTP_STATUS.OK,
    "Product updated successfully",
    product
  );
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const result = await productService.deleteProduct(req.params.id, req.user.id);

  return sendResponse(res, HTTP_STATUS.OK, result.message);
});

export const searchProducts = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return sendResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      "Search query is required"
    );
  }

  const { products, pagination } = await productService.searchProducts(q, req.query);

  return sendResponse(res, HTTP_STATUS.OK, "Search results", {
    products,
    pagination,
  });
});

export const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return sendResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      "Rating must be between 1 and 5"
    );
  }

  const product = await productService.addReview(
    req.params.id,
    {
      rating,
      comment,
    },
    req.user.id
  );

  return sendResponse(
    res,
    HTTP_STATUS.CREATED,
    "Review added successfully",
    product
  );
});

export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await productService.getFeaturedProducts(req.query.limit);

  return sendResponse(
    res,
    HTTP_STATUS.OK,
    "Featured products fetched",
    { products }
  );
});

export const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  const products = await productService.getProductsByCategory(
    category,
    req.query.limit
  );

  return sendResponse(
    res,
    HTTP_STATUS.OK,
    "Category products fetched",
    { products }
  );
});
