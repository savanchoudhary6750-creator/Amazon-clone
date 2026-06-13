/**
 * API Response Formatter
 * Standardized response format for all API endpoints
 */
export const sendResponse = (res, statusCode, message, data = null, error = null) => {
  return res.status(statusCode).json({
    success: statusCode < 400,
    statusCode,
    message,
    data,
    error,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Format Pagination
 * Helper to format pagination information
 */
export const formatPagination = (page = 1, limit = 10, total = 0) => {
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, Math.min(parseInt(limit), 100));
  const totalPages = Math.ceil(total / limitNum);

  return {
    page: pageNum,
    limit: limitNum,
    total,
    totalPages,
    hasNextPage: pageNum < totalPages,
    hasPrevPage: pageNum > 1,
  };
};
