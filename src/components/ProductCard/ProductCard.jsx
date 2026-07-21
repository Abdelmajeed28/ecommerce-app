import { Heart, Star } from "lucide-react";

function ProductCard({ product }) {
  const roundedRating = Math.round(product.rating || 4);
  return (
    <div className="group flex flex-col  w-full max-w-[320px] mx-auto bg-transparent cursor-pointer">
      <div className="relative aspect-4/5 w-full rounded-3xl overflow-hidden bg-[#F3F4F6] transition-all duration-300">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {/* fav icon */}
        <button
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 group/btn"
          aria-label="Add to wishlist"
        >
          <Heart className="w-5 h-5 text-slate-400 group-hover/btn:text-red-500 group-hover/btn:fill-red-500 transition-colors duration-300" />
        </button>
        {/* Add to Cart */}
        <button className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] py-4 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-2xl text-base shadow-lg shadow-blue-500/30 transition-all active:scale-95 text-center">
          Add to Cart
        </button>
      </div>
      {/*product details*/}
      <div className="mt-4 px-2">
        {/* rate by star */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${
                  index < roundedRating
                    ? "text-[#2563EB] fill-[#2563EB]"
                    : "text-gray-200 fill-transparent"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-400 text-sm font-semibold font-sans">
            ({product.stock * 2 - 8 || 42})
          </span>
        </div>

        <h3 className="text-xl font-semibold text-[#1F2937] leading-snug line-clamp-1 font-sans">
          {product.title}
        </h3>

        <p className="text-xs font-bold text-gray-400 tracking-wider uppercase mt-1.5 font-sans">
          {product.category} Edition
        </p>

        <p className="text-[26px] font-bold text-[#2563EB] mt-2 font-sans">
          ${product.price?.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
