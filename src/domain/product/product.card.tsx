// import { AppDispatch } from "@/app/store";
// import { addToCart, Product } from "@/config/slices/product.slice";
// import React from "react";
// import { useDispatch } from "react-redux";


// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const dispatch = useDispatch<AppDispatch>();

//   const handleAddToCart = () => {
//     dispatch(addToCart(product));
//   };

//   return (
//     <div className="shadow-md p-4">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="w-full h-auto rounded-lg"
//       />
//       <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
//       <p>{product.description}</p>
//       <span className="block mt-1 text-gray-600">{product.amount}</span>
//       <button
//         onClick={handleAddToCart}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// };

// export default ProductCard;
