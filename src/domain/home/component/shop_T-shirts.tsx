// import { setProduct } from "@/redux/slices/product.slice";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { ProductData } from "@/models/response/product.model";
// import { card } from "@/lib/product";

// export default function ShopTshirts() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleBuyNow = (product: ProductData) => {
//     dispatch(setProduct(product));
//     navigate(`/product/${product.id}`);
//   };
//   return (
//     <section className="bg-gray-50">
//       <h1 className="text-center text-3xl font-semibold text-gray-800 mt-16">
//         Shop T-Shirts
//       </h1>
//       <div className="grid my-5 pb-2 px-2 md:px-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 w-full">
//         {card.map((item) => (
//           <div
//             key={item.id}
//             className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border  w-auto"
//           >
//             <div className="relative mx-2 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border ">
//               <img
//                 src={item.images[0]?.url}
//                 alt="shirt"
//                 className="object-cover w-full h-52 lg:h-96 hover:bg-white hover:blur-xs hover:opacity-80"
//               />
//             </div>
//             <div className="items-center p-2 text-center justify-center gap-4 md:mb-2">
//               <p className="text-sm md:text-base antialiased font-bold capitalize leading-relaxed text-gray-900">
//                 {item.name}
//               </p>
//               <p className="text-sm md:text-base antialiased font-medium leading-relaxed md:0 text-gray-500">
//                 ₦{item.price}
//               </p>
//             </div>
//             <button
//               onClick={() => handleBuyNow(item)}
//               className="align-middle bg-gray-600 hover:bg-gray-800 ease-in-out duration-300 text-white font-bold text-center uppercase transition-all text-xs py-2 md:py-3  w-full text-blue-gray-900"
//               type="button"
//             >
//               BUY NOW
//             </button>
//           </div>
//         ))}
//       </div>
//       <div className="items-center justify-center text-center">
//         <Link to={"/category/accessories"}>
//           <button className="px-5 py-3 font-semibold rounded-lg text-xl border-[3px] border-gray-800 hover:bg-gray-800 hover:text-white text-gray-800 bg-gradient-to-r from-white via-white to-white bg-[size:_100%] hover:from-gray-600 hover:to-black hover:bg-[position:_100%_100%] ease-in-out transition-all duration-700">
//             View More
//           </button>
//         </Link>
//       </div>
//     </section>
//   );
// }


import { Link, useNavigate } from "react-router-dom";
import { useFetchCategoryProductsQuery } from "@/domain/categories/categories.api/category.api";
import { Loader } from "@/components/common/loader";
import { EmptyResource } from "@/components/common/error";

export default function ShopTshirts() {
  const navigate = useNavigate();

  // Hardcoded ID for the "T-Shirt" category
  const categoryId = "270d3130-64fe-4187-ba49-5dd1cc70d24c";
  const categoryName = "T-shirt";
  const { data, isLoading, isError } = useFetchCategoryProductsQuery({
    id: categoryId,
  });

  const handleBuyNow = (productId: string) => {
    navigate(`/product/${productId}`);
  };
  return (
    <section className="bg-gray-50">
      <div className="w-full">
        <h1 className="text-center text-3xl font-semibold text-gray-800 mt-16">
          Shop T-Shirt
        </h1>

        {/* Handle Loading and Error States */}
        {isLoading && (
          <p className="text-center mt-4">
            <Loader />
            Loading T-shirts...
          </p>
        )}
        {isError && <EmptyResource resourceName="T-shirt" />}

        {/* Products Grid */}
        {!isLoading && !isError && (
          <div className="grid my-5 pb-2 px-2 md:px-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 w-full">
            {data?.products?.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border w-auto"
              >
                <div className="relative mx-2 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border">
                  <img
                    src={item.images[0]?.url}
                    alt={item.name}
                    className="object-cover w-full h-52 lg:h-96 hover:bg-white hover:blur-xs hover:opacity-80"
                  />
                </div>
                <div className="items-center p-2 text-center justify-center gap-4 md:mb-2">
                  <p className="text-sm md:text-base antialiased font-bold capitalize leading-relaxed text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-sm md:text-base antialiased font-medium leading-relaxed md:0 text-gray-500">
                    ₦{item.price}
                  </p>
                </div>
                <button
                  onClick={() => handleBuyNow(item.id)}
                  className="align-middle bg-gray-600 hover:bg-gray-800 ease-in-out duration-300 text-white font-bold text-center uppercase transition-all text-xs py-2 md:py-3 w-full text-blue-gray-900"
                  type="button"
                >
                  BUY NOW
                </button>
              </div>
            ))}
          </div>
        )}

        {/* View More Button */}
        <div className="items-center justify-center text-center">
          <Link to={`/category/${categoryName}/${categoryId}`}>
            <button className="px-5 py-3 font-semibold rounded-lg text-xl border-[3px] border-gray-800 hover:bg-gray-800 hover:text-white text-gray-800 bg-gradient-to-r from-white via-white to-white bg-[size:_100%] hover:from-gray-600 hover:to-black hover:bg-[position:_100%_100%] ease-in-out transition-all duration-700">
              View More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
