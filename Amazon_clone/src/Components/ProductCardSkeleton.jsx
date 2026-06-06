import React from "react";

/**
 * Product Card Skeleton Component
 * Loading placeholder for product cards
 */
const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-amazon overflow-hidden h-full flex flex-col">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-200 animate-pulse flex-shrink-0" />
      
      {/* Content Skeleton */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-3" />
        
        {/* Rating Skeleton */}
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-3 w-24" />
        
        {/* Price Skeleton */}
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-3 w-20" />
        
        {/* Stock Skeleton */}
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-16" />
        
        {/* Button Skeleton */}
        <div className="mt-auto">
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
