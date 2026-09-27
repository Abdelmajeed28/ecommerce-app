import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import { useGetProductsQuery } from "../features/products/productsApiSlice";
import SearchBar from "../components/SearchBar/SearchBar";
import Filters from "../components/Filters/Filters";
import Pagination from "../components/Pagination/Pagination";

const PRODUCTS_PER_PAGE = 12;

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "all";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  // لو المستخدم جاي من صفحة Home بفلتر فئة معينة، نطبقه هنا
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    setCurrentPage(1);
  }, [categoryFromUrl]);

  // لما اليوزر يغير الفئة يدوي من هنا، نحدث الـ URL كمان (عشان الـ link قابل للمشاركة)
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (category === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  // أي تغيير في البحث أو الترتيب يرجعنا لصفحة 1 (منطقي إننا نبدأ من الأول)
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  const { data, error, isLoading } = useGetProductsQuery({
    category: selectedCategory,
    search: searchTerm,
    page: currentPage,
    limit: PRODUCTS_PER_PAGE,
    sort: sortBy,
  });

  if (isLoading)
    return (
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto mt-20"></div>
    );

  if (error)
    return (
      <h1 className="text-center mt-10 text-red-500 text-xl font-semibold font-sans">
        Something went Wrong
      </h1>
    );

  return (
    <div
      className="max-w-6xl mx-auto px-4 py-8 min-h-screen"
      style={{ background: "var(--bg-primary)" }}
    >
      <SearchBar onSearch={setSearchTerm} />
      <Filters
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <ProductGrid products={data?.products || []} />
      <Pagination
        currentPage={data?.currentPage || 1}
        totalPages={data?.totalPages || 1}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Products;
