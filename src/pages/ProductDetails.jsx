import { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import { useGetProductByIdQuery } from "../features/products/productsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";

function ProductDetails() {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const favoriteItems = useSelector(
    (state) => state.wishlist.wishlistItems || [],
  );
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );

  if (error)
    return (
      <h1 className="text-center mt-10 text-red-500 text-xl font-semibold font-sans">
        Something went Wrong
      </h1>
    );
  const isFavorite = favoriteItems.some((item) => item.id === product?.id);

  const roundedRating = Math.round(product.rating || 4);

  const handleToggleFavorite = () => {
    dispatch(toggleWishlist(product));
  };
  return (
    <div
      className="max-w-6xl mx-auto px-4 py-12 min-h-screen"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="flex flex-col md:flex-row gap-12">
        {/* Gallary */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          {/*  Main image */}
          <div className="relative aspect-4/5 w-full rounded-3xl overflow-hidden bg-[#F3F4F6]">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />
            {/* fav btn */}
            <button
              onClick={handleToggleFavorite}
              style={{ background: "var(--bg-card)" }}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center  rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 group/btn"
              aria-label="Add to wishlist"
            >
              {/* <Heart className="w-5 h-5 text-slate-400 group-hover/btn:text-red-500 group-hover/btn:fill-red-500 transition-colors duration-300" /> */}
              <Heart
                className={`w-5 h-5 transition-colors duration-300 ${
                  isFavorite
                    ? "text-red-500 fill-red-500"
                    : "text-slate-400 group-hover/btn:text-red-500 group-hover/btn:fill-red-500"
                }`}
              />
            </button>
          </div>

          {/*  Thumbnails */}
          <div className="flex gap-3">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                  selectedImage === index
                    ? "border-blue-600 scale-105"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* info*/}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-5">
          {/* category*/}
          <p
            style={{ color: "var(--text-secondary)" }}
            className="text-xs font-bold tracking-wider uppercase "
          >
            {product.category} Edition
          </p>

          <h1
            style={{ color: "var(--text-primary)" }}
            className="text-3xl font-bold leading-snug "
          >
            {product.title}
          </h1>

          {/* rate */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < roundedRating
                      ? "text-[#2563EB] fill-[#2563EB]"
                      : "text-gray-200 fill-transparent"
                  }`}
                />
              ))}
            </div>
            <span
              style={{ color: "var(--text-secondary)" }}
              className="text-sm font-semibold "
            >
              ({product.stock * 2 - 8 || 42} reviews)
            </span>
          </div>

          {/* price */}
          <p className="text-4xl font-bold text-[#2563EB] font-sans">
            ${product.price?.toFixed(2)}
          </p>

          {/* discription */}
          <p
            style={{ color: "var(--text-secondary)" }}
            className="text-sm leading-relaxed "
          >
            {product.description}
          </p>

          {/* stock */}
          <p
            style={{ color: "var(--text-secondary)" }}
            className="text-sm font-medium"
          >
            Stock:{" "}
            <span className="text-green-500 font-bold">
              {product.stock} available
            </span>
          </p>

          {/* quantity */}
          <div className="flex items-center gap-4">
            <span
              style={{ color: "var(--text-primary)" }}
              className="text-sm font-semibold"
            >
              Quantity:
            </span>
            <div
              style={{
                borderColor: "var(--border-color)",
                background: "var(--bg-card)",
              }}
              className="flex items-center gap-3 border rounded-2xl px-4 py-2"
            >
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{ color: "var(--text-secondary)" }}
                className="hover:text-blue-600 transition-colors active:scale-95"
              >
                <Minus size={16} />
              </button>
              <span
                style={{ color: "var(--text-primary)" }}
                className="w-6 text-center font-bold"
              >
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                style={{ color: "var(--text-secondary)" }}
                className="hover:text-blue-600 transition-colors active:scale-95"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-2">
            <button
              onClick={() => dispatch(addToCart({ ...product, quantity }))}
              className="flex-1 flex items-center justify-center cursor-pointer gap-2 py-4 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-2xl text-base shadow-lg shadow-blue-500/30 transition-all active:scale-95"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button
              onClick={handleToggleFavorite}
              style={{
                borderColor: isFavorite ? "#ef4444" : "var(--border-color)",
                background: isFavorite ? "#fef2f2" : "var(--bg-card)",
              }}
              className="w-14 h-14 flex items-center justify-center border rounded-2xl transition-all active:scale-95 group/btn"
            >
              {/* <Heart className="w-5 h-5 text-slate-400 cursor-pointer group-hover/btn:text-red-500 group-hover/btn:fill-red-500 transition-colors duration-300" /> */}
              <Heart
                className={`w-5 h-5 cursor-pointer transition-colors duration-300 ${
                  isFavorite
                    ? "text-red-500 fill-red-500"
                    : "text-slate-400 group-hover/btn:text-red-500 group-hover/btn:fill-red-500"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
