// import { useFetchCategoryProductsQuery } from "@/domain/categories/categories.api/category";
// import { useNavigate, useParams } from "react-router-dom";

// export default function CategoryProduct() {
//   const { category, categoryId } = useParams<{
//     category: string;
//     categoryId: string;
//   }>();
//   const navigate = useNavigate();

//   const {
//     data: CategoryProducts,
//     isLoading,
//     isError,
//   } = useFetchCategoryProductsQuery(categoryId as string, {
//     skip: !categoryId, // Skip the query if categoryId is undefined
//   });

//   const handleBuyNow = (id: string) => {
//     navigate(`/product/${id}`);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="flex flex-col items-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-gray-800 border-solid"></div>
//           <p className="mt-4 text-lg text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-lg font-medium text-red-600">
//           Failed to load products.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1 className="text-3xl uppercase text-center md:my-5 lg:my-10 font-bold my-5">
//         {category}
//       </h1>
//       <div className="grid grid-cols-1 px-5 md:px-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-5">
//         {CategoryProducts?.products.map((product) => (
//           <div className="group relative block overflow-hidden rounded-lg hover:drop-shadow-md  hover:scale-[1.02] transition-all delay-200">
//             <img
//               src={product.productImages[0].imageUrl}
//               alt={product.name}
//               className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
//             />

//             <div className="relative border border-gray-100 bg-white p-6">
//               <span className="whitespace-nowrap bg-gray-200 px-3 py-1.5 text-xs font-medium">
//                 New Arrival
//               </span>
//               <h3 className="mt-4 text-lg font-medium text-gray-900">
//                 {product.name}
//               </h3>
//               <p className="mt-1.5 text-sm text-gray-700">{product.price}</p>
//               <form className="mt-4">
//                 <button
//                   onClick={() => handleBuyNow(product.product_id)}
//                   className="block w-full rounded bg-gray-700 text-white p-4 text-sm font-medium transition hover:scale-105"
//                 >
//                   Buy Now
//                 </button>
//               </form>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import { EmptyResource } from "@/components/common/error";
import { formatCurrency } from "@/components/common/helpers";
import { Loader } from "@/components/common/loader";
import { useFetchCategoryProductsQuery } from "@/domain/categories/categories.api/category.api";
import { useNavigate, useParams } from "react-router-dom";

interface CategoryProductProps {
  minPrice?: number;
  maxPrice?: number;
  selectedSizes?: string[];
}

export default function CategoryProduct({
  minPrice,
  maxPrice,
  selectedSizes,
}: CategoryProductProps) {
  const { category, id } = useParams<{
    category: string;
    id: string;
  }>();
  const navigate = useNavigate();

  // Fetch products with filters applied
  const {
    data: CategoryProducts,
    isLoading,
    error,
  } = useFetchCategoryProductsQuery(
    {
      id: id as string,
      minPrice,
      maxPrice,
      sizes: selectedSizes,
    },
    {
      skip: !id, // Skip the query if categoryId is undefined
    }
  );
  // console.log("ID:", id);

  const handleBuyNow = (id: string) => {
    navigate(`/product/${id}`);
  };

  if (isLoading) {
  return <Loader />;
}

if (error || !CategoryProducts) {
  return <EmptyResource resourceName="Products" />;
}

  // console.log("Fetched Products:", CategoryProducts);

  return (
    <div>
      <h1 className="text-3xl uppercase text-center md:my-5 lg:my-10 font-bold my-5">
        {category}
      </h1>

      <div className="grid grid-cols-1 px-5 md:px-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-5 mt-10">
        {CategoryProducts?.products.length === 0 && (
          <p>No products found for this category.</p>
        )}

        {CategoryProducts?.products.map((product) => (
          <div
            key={product.id}
            className="group relative block overflow-hidden rounded-lg hover:drop-shadow-md hover:scale-[1.02] transition-all delay-200"
          >
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />

            <div className="relative border border-gray-100 bg-white p-6">
              <span className="whitespace-nowrap bg-gray-200 px-3 py-1.5 text-xs font-medium">
                New Arrival
              </span>
              <h3 className="mt-4 text-lg capitalize font-medium text-gray-900">
                {product.name}
              </h3>
              <p className="mt-1.5 text-sm text-gray-700">
                {formatCurrency(product.price)}
              </p>
              <button
                onClick={() => handleBuyNow(product.id)}
                className="block w-full rounded bg-gray-700 text-white p-4 text-sm font-medium transition hover:scale-105"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
