import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "@/redux/slices/cart.slice";
import { RootState } from "@/config/store";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cart || []);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (
    id: string,
    selectedSize: string,
    selectedColor: string,
    quantity: number
  ) => {
    dispatch(updateQuantity({ id, selectedSize, selectedColor, quantity }));
  };

  const handleRemoveItem = (
    id: string,
    selectedSize: string,
    selectedColor: string
  ) => {
    dispatch(
      removeFromCart({
        id,
        selectedSize,
        selectedColor,
        name: "",
        image: "",
        amount: 0,
        quantity: 0,
        description: "",
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
        },
      })
    );
  };

  const handleClearCart = () => {
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
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.amount,
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <li
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-20 rounded object-cover"
                    />
                    <div>
                      <h3 className="text-lg capitalize font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <dl className="mt-0.5 space-y-px text-sm text-gray-600">
                        <div className="space-x-1">
                          <h1 className="inline">Size:</h1>
                          <p className="inline capitalize">
                            {item.selectedSize}
                          </p>
                        </div>
                        <div className="space-x-1">
                          <h1 className="inline">Color:</h1>
                          <p className="inline capitalize">
                            {item.selectedColor}
                          </p>
                        </div>
                        <div className="space-x-1">
                          <h1 className="inline">Price:</h1>
                          <p className="inline">₦{item.amount}</p>
                        </div>
                      </dl>
                    </div>
                    <div className="flex flex-1 items-center justify-end gap-2">
                      <form>
                        <label
                          htmlFor={`Line${item.id}Qty`}
                          className="sr-only"
                        >
                          Quantity
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          id={`Line${item.id}Qty`}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              item.selectedSize,
                              item.selectedColor,
                              parseInt(e.target.value, 10)
                            )
                          }
                          className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 focus:outline-none"
                        />
                      </form>
                      <button
                        onClick={() =>
                          handleRemoveItem(
                            item.id,
                            item.selectedSize,
                            item.selectedColor
                          )
                        }
                        className="text-gray-600 transition hover:text-red-600"
                      >
                        <span className="sr-only">Remove item</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500">Your cart is empty</p>
              )}
            </ul>

            {cartItems.length > 0 && (
              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">₦{calculateSubtotal()}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₦{calculateTotal()}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <button
                    onClick={handleClearCart}
                    className="inline-block rounded-lg bg-red-500 px-12 py-3 text-sm font-medium text-white shadow transition hover:bg-red-400"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="inline-block rounded-lg bg-gray-900 px-12 py-3 text-sm font-medium text-white shadow transition hover:bg-gray-800"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
