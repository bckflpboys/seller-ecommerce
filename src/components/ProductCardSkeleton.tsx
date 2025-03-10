const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-200" />
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        
        {/* Price skeleton */}
        <div className="h-5 bg-gray-200 rounded w-1/4" />
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
        
        {/* Button skeleton */}
        <div className="h-10 bg-gray-200 rounded mt-4" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
