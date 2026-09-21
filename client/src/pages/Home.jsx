import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination as SwiperPagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import {
  useGetProductsQuery,
  useGetCategoriesWithImageQuery,
} from "../features/products/productsApiSlice";

function Home() {
  const navigate = useNavigate();

  // بنجيب أول 4 منتجات بس عشان السلايدر (limit صغير، مش كل المنتجات)
  const { data: heroData, isLoading: heroLoading } = useGetProductsQuery({
    page: 1,
    limit: 4,
  });

  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesWithImageQuery();

  return (
    <div style={{ background: "var(--bg-primary)" }} className="min-h-screen">
      {/* Hero Slider */}
      {!heroLoading && heroData?.products?.length > 0 && (
        <Swiper
          modules={[Autoplay, SwiperPagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="w-full h-[400px] md:h-[500px]"
        >
          {heroData.products.map((product) => (
            <SwiperSlide key={product.id}>
              <div
                onClick={() => navigate(`/product/${product.id}`)}
                className="cursor-pointer w-full h-full bg-cover bg-center flex items-center"
                style={{ backgroundImage: `url(${product.image})` }}
              >
                <div className="bg-black/40 w-full h-full flex flex-col justify-center items-center text-center px-4">
                  <h1 className="text-white text-3xl md:text-5xl font-bold mb-3">
                    {product.title}
                  </h1>
                  <p className="text-white text-lg md:text-xl">
                    ${product.price?.toFixed(2)}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2
          style={{ color: "var(--text-primary)" }}
          className="text-2xl md:text-3xl font-bold mb-8 text-center"
        >
          Shop by Category
        </h2>

        {categoriesLoading ? (
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto"></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                onClick={() => navigate(`/products?category=${category.name}`)}
                className="cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h3 className="text-white text-lg md:text-xl font-bold capitalize">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
