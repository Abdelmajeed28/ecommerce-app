import { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import { useGetProductByIdQuery } from "../features/products/productsApiSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

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

  const roundedRating = Math.round(product.rating || 4);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen">
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
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 group/btn"
              aria-label="Add to wishlist"
            >
              <Heart className="w-5 h-5 text-slate-400 group-hover/btn:text-red-500 group-hover/btn:fill-red-500 transition-colors duration-300" />
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
          <p className="text-xs font-bold text-gray-400 tracking-wider uppercase font-sans">
            {product.category} Edition
          </p>

          <h1 className="text-3xl font-bold text-[#1F2937] leading-snug font-sans">
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
            <span className="text-gray-400 text-sm font-semibold font-sans">
              ({product.stock * 2 - 8 || 42} reviews)
            </span>
          </div>

          {/* price */}
          <p className="text-4xl font-bold text-[#2563EB] font-sans">
            ${product.price?.toFixed(2)}
          </p>

          {/* discription */}
          <p className="text-gray-500 text-sm leading-relaxed font-sans">
            {product.description}
          </p>

          {/* stock */}
          <p className="text-sm font-medium text-gray-500">
            Stock:{" "}
            <span className="text-green-500 font-bold">
              {product.stock} available
            </span>
          </p>

          {/* quantity */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-600 font-sans">
              Quantity:
            </span>
            <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-2 bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-gray-500 hover:text-blue-600 transition-colors active:scale-95"
              >
                <Minus size={16} />
              </button>
              <span className="w-6 text-center font-bold text-[#1F2937]">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                className="text-gray-500 hover:text-blue-600 transition-colors active:scale-95"
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
            <button className="w-14 h-14 flex items-center justify-center border border-gray-200 rounded-2xl hover:border-red-400 transition-all active:scale-95 group/btn">
              <Heart className="w-5 h-5 text-slate-400 cursor-pointer group-hover/btn:text-red-500 group-hover/btn:fill-red-500 transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
