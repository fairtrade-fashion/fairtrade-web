import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/config/store";

const CheckoutPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cart || []);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.amount,
      0
    );
  };

  const calculateVAT = () => {
    return calculateSubtotal() * 0.075; // VAT at 7.5%
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateVAT(); // Total includes VAT
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Payment Information */}
          <div className="space-y-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Checkout</h2>

            {/* Delivery Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Delivery Information
              </h3>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Samson John"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="123 Street Name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      placeholder="Lagos"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      placeholder="Lagos State"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Nigeria"
                  />
                </div>

                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="101"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phonenumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                    <span className="text-blue-500 font-semibold">
                      {" "}
                      (Preferably Your WhatsApp Contact.)
                    </span>
                  </label>
                  <input
                    type="number"
                    id="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="+2348033333333"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="example@example.com"
                  />
                </div>
              </form>
            </div>

            {/* Payment Method
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Payment Method
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="credit-card"
                    name="paymentMethod"
                    type="radio"
                    className="h-4 w-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                  />
                  <label
                    htmlFor="credit-card"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Credit Card
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    className="h-4 w-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                  />
                  <label
                    htmlFor="paypal"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    PayPal
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="bank-transfer"
                    name="paymentMethod"
                    type="radio"
                    className="h-4 w-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                  />
                  <label
                    htmlFor="bank-transfer"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Bank Transfer
                  </label>
                </div>
              </div>
            </div> */}
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Review Your Cart
            </h3>

            <ul className="divide-y divide-gray-200 space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <div>
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-20 rounded object-cover"
                      />
                      <p className="font-medium text-gray-900">{item.name}</p>
                    </div>
                    <p className="text-sm capitalize text-gray-600">
                      {item.selectedSize} / {item.selectedColor}
                    </p>
                  </div>
                  <p className="text-gray-900">
                    ₦{item.quantity * item.amount}
                  </p>
                </li>
              ))}
            </ul>

            {/* Subtotal, VAT, and Total */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium text-gray-900">
                  ₦{calculateSubtotal()}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">VAT (7.5%)</p>
                <p className="font-medium text-gray-900">₦{calculateVAT()}</p>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <p>Total</p>
                <p>₦{calculateTotal()}</p>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-gray-500 text-white font-semibold py-3 rounded-lg hover:bg-gray-600 transition"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
