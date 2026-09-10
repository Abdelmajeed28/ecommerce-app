import ProductCard from "../ProductCard/ProductCard";

function ProductGrid({ products }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6  items-start rounded"
      style={{ background: "var(--bg-card)" }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
