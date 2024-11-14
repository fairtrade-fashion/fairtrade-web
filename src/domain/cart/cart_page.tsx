import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/config/store";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "@/redux/slices/cart.slice";
import {
  useGetOrCreateCartQuery,
  useAddItemToCartMutation,
  useRemoveItemFromCartMutation,
} from "./cart_api/cart.api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { StreamLinedCartRoot } from "@/models/response/cartI_items";

const CartPage: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch cart data from server
  const { data: cartData, isLoading: isLoadingCart } =
    useGetOrCreateCartQuery("");
  const [addItemToCart, { isLoading: isAdding }] = useAddItemToCartMutation();
  const [removeCartItem, { isLoading: isRemoving }] =
    useRemoveItemFromCartMutation();

  const streamLinedCartData = cartData as unknown as StreamLinedCartRoot;

  const handleQuantityChange = async (
    id: string,
    selectedSize: string,
    selectedColor: string,
    quantity: number,
    productId: string
  ) => {
    try {
      // First remove the existing item
      await removeCartItem({ id }).unwrap();

      // Then add it back with the new quantity
      await addItemToCart({
        cartId: streamLinedCartData?.items.id as string,
        productId,
        quantity,
      }).unwrap();

      console.log(cartData);

      // Update local state
      dispatch(updateQuantity({ id, selectedSize, selectedColor, quantity }));

      toast("Cart Updated", {
        description: "Item quantity has been updated successfully.",
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to update item quantity. Please try again.",
      });
    }
  };

  const handleRemoveItem = async (
    id: string,
    selectedSize: string,
    selectedColor: string,
    cartId: string,
    productId: string,
    quantity: number,
    price: number,
    name: string,
    image: string,
    amount: number,
    description: string,
    content: string,
    product: {
      id: string;
      name: string;
      description: string;
      price: number;
      sku: string;
      stock: number;
      categoryId: string;
      createdAt: string;
      updatedAt: string;
      averageRating: number | null;
    }
  ) => {
    try {
      await removeCartItem({ id }).unwrap();
      dispatch(
        removeFromCart({
          id,
          selectedSize,
          selectedColor,
          cartId,
          productId,
          quantity,
          price,
          name,
          image,
          amount,
          description,
          content,
          product,
        })
      );
      toast("Item Removed", {
        description: "The item has been removed from your cart.",
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to remove item. Please try again.",
      });
    }
  };

  const handleClearCart = () => {
    // Implement clear cart API call here
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  const calculateSubtotal = () => {
    return (cartData?.items || []).reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  if (isLoadingCart) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          <p className="text-gray-500">Loading cart...</p>
        </div>
      </div>
    );
  }

  const cartItems = cartData?.items || [];
  console.log(cartItems);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            <CardTitle className="text-2xl font-bold">Shopping Cart</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {cartItems.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex items-center gap-4 py-6"
                >
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="capitalize">{item.product.name}</h3>
                        <p className="ml-4">₦{item?.price.toLocaleString()}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 capitalize">
                        Size: {item.selectedSize} | Color: {item.selectedColor}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              item.selectedSize,
                              item.selectedColor,
                              parseInt(e.target.value, 10),
                              item.productId
                            )
                          }
                          className="w-20 text-center"
                          disabled={isAdding || isRemoving}
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() =>
                            handleRemoveItem(
                              item.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.cartId,
                              item.productId,
                              item.quantity,
                              item.price,
                              item.name,
                              item.image,
                              item.amount,
                              item.description,
                              item.content,
                              item.product
                            )
                          }
                          disabled={isRemoving}
                        >
                          {isRemoving ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-12">
              <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg text-gray-500">Your cart is empty</p>
              <Button
                onClick={() => navigate("/")}
                className="mt-4"
                variant="outline"
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </CardContent>
        {cartItems.length > 0 && (
          <CardFooter className="border-t">
            <div className="w-full space-y-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>₦{calculateTotal().toLocaleString()}</p>
              </div>
              <div className="flex justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  className="flex-1"
                >
                  Clear Cart
                </Button>
                <Button onClick={handleCheckout} className="flex-1">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default CartPage;
