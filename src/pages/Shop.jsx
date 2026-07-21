import { useState } from "react";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import { useGetProductsQuery } from "../features/products/productsApiSlice";
import SearchBar from "../components/SearchBar/SearchBar";

function Shop() {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  if (isLoading)
    return (
      // <h1 className="text-center mt-10 text-xl font-semibold">Loading...</h1>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    );
  if (error)
    return (
      <h1 className="text-center mt-10 text-red-500 text-xl font-semibold font-sans">
        Something went Wrong
      </h1>
    );
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}

export default Shop;
