import { useState } from "react";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import { useGetProductsQuery } from "../features/products/productsApiSlice";
import SearchBar from "../components/SearchBar/SearchBar";
import Filters from "../components/Filters/Filters";

function Shop() {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  if (isLoading)
    return (
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    );
  if (error)
    return (
      <h1 className="text-center mt-10 text-red-500 text-xl font-semibold font-sans">
        Something went Wrong
      </h1>
    );
  // const filteredProducts = products.filter((product) =>
  //   product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  // );
  const filteredProducts = [...products]
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") {
        return a.price - b.price;
      }
      if (sortBy === "price-high") {
        return b.price - a.price;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <Filters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}

export default Shop;
