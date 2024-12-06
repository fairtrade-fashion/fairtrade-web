import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { addToCart } from "@/redux/slices/cart.slice";
import { useFetchProductIdQuery } from "./product.api/product.api";
import {
  useAddItemToCartMutation,
  useGetOrCreateCartQuery,
} from "../cart/cart_api/cart.api";
import { ProfileRoot } from "@/models/response/profile.model";
import { formatCurrency } from "@/components/common/helpers";
import { Loader } from "@/components/common/loader";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Get user token or user info from localStorage or Redux
  const token = localStorage.getItem("access_token") || "";
  const userId = useSelector((state: ProfileRoot) => state.userId);

  const { data: cart } = useGetOrCreateCartQuery(userId);
  const [addItemToCart] = useAddItemToCartMutation();
  const {
    data: productData,
    isLoading,
    isError,
  } = useFetchProductIdQuery(id as string);

  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Redirect to login if no token is found
  useEffect(() => {
    if (!token) {
      navigate("/login"); // Navigate to login page if not logged in
    }
  }, [token, navigate]);

  if (isLoading) {
    return <Loader />;
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
        cartId: "",
        productId: "",
        price: 0,
        product: {
          id: "",
          name: "",
          description: "",
          price: 0,
          sku: "",
          stock: 0,
          categoryId: "",
          createdAt: "",
          updatedAt: "",
          averageRating: null,
          images: ""
        },
      })
    );

    addItemToCart({
      cartId: cart?.id || "",
      productId: productData?.id,
      quantity: 1,
    });
    toast.success("Item added to cart!");
  };

  return (
    <div className="container mx-auto pt-10 p-4">
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
              src={productData.images[0].url}
              alt="Thumbnail 1"
            />
            <img
              className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:opacity-80"
              src={productData.images[1]?.url || productData.images[0].url}
              alt="Thumbnail 2"
            />
            <img
              className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:opacity-80"
              src={productData.images[2]?.url || productData.images[0].url}
              alt="Thumbnail 3"
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl capitalize font-bold text-gray-800">
            {productData.name}
          </h1>
          <p className="text-xl capitalize text-gray-600 mt-2">
            {productData.description}
          </p>
          <div className="flex items-center mt-4">
            <span className="text-2xl font-semibold text-black">
              {formatCurrency(productData.price)}
            </span>
          </div>

          {/* Size Selection */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Select Size</h2>
            <div className="flex space-x-4 mt-2">
              {productData.sizes.map((sizeStock) => (
                <button
                  key={sizeStock.id}
                  className={`py-2 px-4 border capitalize rounded-lg ${
                    selectedSize === sizeStock.size.name
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                  onClick={() => setSelectedSize(sizeStock.size.name)}
                >
                  {sizeStock.size.name}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Select Color</h2>
            <div className="flex space-x-4 mt-2">
              {productData.colors.map((colorStock) => (
                <button
                  key={colorStock.id}
                  className={`py-2 px-4 border capitalize rounded-lg ${
                    selectedColor === colorStock.color.name
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                  onClick={() => setSelectedColor(colorStock.color.name)}
                >
                  {colorStock.color.name}
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
                <strong>Description:</strong>
                <span className="capitalize">{productData.description}</span>
              </li>
              <li>
                <strong>Available Stock Quantity:</strong> {productData.stock}
              </li>
              <li className="capitalize">
                <strong>Available Colors: </strong>
                {productData.colors
                  .map((colorStock) => colorStock.color.name)
                  .join(", ")}
              </li>

              <li className="capitalize">
                <strong>Available Size: </strong>
                {productData.sizes
                  .map((sizeStock) => sizeStock.size.name)
                  .join(", ")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
