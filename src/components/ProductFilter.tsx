import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface ProductFilterProps {
  categories: string[];
  selectedCategory: string;
  priceRange: [number, number];
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onSortByChange: (sort: string) => void;
}

export default function ProductFilter({
  categories,
  selectedCategory,
  priceRange,
  sortBy,
  onCategoryChange,
  onPriceRangeChange,
  onSortByChange,
}: ProductFilterProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-warm p-6 sticky top-24">
      <div className="flex justify-between items-center md:hidden mb-4">
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="flex items-center space-x-2 text-earth-dark"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span>Filters</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFiltersOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className={`space-y-6 ${isFiltersOpen ? 'block' : 'hidden md:block'}`}>
        {/* Categories */}
        <div>
          <h3 className="font-display text-lg font-bold text-earth-dark mb-4">Categories</h3>
          <div className="space-y-2">
            <button
              onClick={() => onCategoryChange('all')}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-sage text-white'
                  : 'text-gray-600 hover:bg-sage/10'
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-sage text-white'
                    : 'text-gray-600 hover:bg-sage/10'
                }`}
              >
                {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-display text-lg font-bold text-earth-dark mb-4">Price Range</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">R{priceRange[0]}</span>
              <span className="text-gray-600">R{priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full accent-sage"
            />
          </div>
        </div>

        {/* Sort */}
        <div>
          <h3 className="font-display text-lg font-bold text-earth-dark mb-4">Sort By</h3>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="w-full p-2 border border-primary-200 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
          >
            <option value="newest">Newest</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-a-z">Name: A to Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}
