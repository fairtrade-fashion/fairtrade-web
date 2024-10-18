import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { addToCart } from "@/redux/slices/cart.slice";
import { useFetchProductIdQuery } from "./product.api/product.api";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: productData,
    isLoading,
    isError,
  } = useFetchProductIdQuery(id as string);
  console.log("Fetching product with ID:", id);

  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-gray-800 border-solid"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Error or Product not found
  if (isError || !productData) {
    console.log("Error fetching product data:", isError);
    return <div className="text-center mt-20">Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color");
      return;
    }

    dispatch(
      addToCart({
        id: productData.id,
        name: productData.name,
        image: productData.images[0].url,
        selectedSize,
        selectedColor,
        amount: productData.price,
        quantity: 1,
        description: productData.description,
        content: "",
      })
    );
    toast.success("Item added to cart!");
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg">
            <img
              className="w-full rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
              src={productData.images[0].url}
              alt={productData.images[0].url}
            />
          </div>
          <div className="flex space-x-4">
            <img
              className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:opacity-80"
              src={productData.images[0].url} // Update to use different URLs if available
              alt="Thumbnail 1"
            />
            <img
              className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:opacity-80"
              src={
                productData.images[1]?.url ||
                productData.images[0].url
              } // Fallback to the first image if not available
              alt="Thumbnail 2"
            />
            <img
              className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:opacity-80"
              src={
                productData.images[2]?.url ||
                productData.images[0].url
              } // Fallback to the first image if not available
              alt="Thumbnail 3"
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {productData.name}
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            {productData.description}
          </p>
          <div className="flex items-center mt-4">
            <span className="text-2xl font-semibold text-black">
              ₦{productData.price}
            </span>
          </div>

          {/* Size Selection */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Select Size</h2>
            <div className="flex space-x-4 mt-2">
              {productData.sizes.map((size) => (
                <button
                  key={size.size_id} // Use size_id for the key
                  className={`py-2 px-4 border capitalize rounded-lg ${
                    selectedSize === size.name
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                  onClick={() => setSelectedSize(size.name)}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Select Color</h2>
            <div className="flex space-x-4 mt-2">
              {productData.colors.map((color) => (
                <button
                  key={color.color_id} // Use color_id for the key
                  className={`py-2 px-4 border capitalize rounded-lg ${
                    selectedColor === color.name
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                  onClick={() => setSelectedColor(color.name)}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-6">
            <button
              className="bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-gray-800 transition-colors"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-bold text-gray-800">Product Details</h2>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>
                <strong>Description:</strong> {productData.description}
              </li>
              <li>
                <strong>Available Stock Quantity:</strong>{" "}
                {productData.stock}
              </li>
              <li className="capitalize">
                <strong>Available Colors: </strong>
                {productData.colors.map((color) => color.name).join(", ")}
              </li>

              <li className="capitalize">
                <strong>Available Size: </strong>
                {productData.sizes.map((size) => size.name).join(", ")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
