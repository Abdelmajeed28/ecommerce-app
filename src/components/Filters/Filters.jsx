function Filters({ selectedCategory, onCategoryChange, sortBy, onSortChange }) {
  const categories = ["all", "electronics", "fashion", "home", "sports"];
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center gap-5 py-6">
        <div className="flex flex-wrap justify-center gap-3 py-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
            px-5 py-2 rounded-full font-medium transition-all duration-300
            border
            ${
              selectedCategory === category
                ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-105"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600"
            }
          `}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="
          px-4 py-2 rounded-lg border border-gray-300
          bg-white text-gray-700 font-medium
          focus:outline-none focus:ring-2 focus:ring-blue-500
          cursor-pointer
        "
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </>
  );
}

export default Filters;
