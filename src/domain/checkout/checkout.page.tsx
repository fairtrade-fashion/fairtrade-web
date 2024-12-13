import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

import {
  useCreateShippingAddressMutation,
  useGetShippingAddressesQuery,
} from "./api/shipping_address.api";
import { useInitiatePaymentMutation } from "./api/payment.api";

import { toast } from "sonner";
import { useGetOrCreateCartQuery } from "../cart/cart_api/cart.api";

const CheckoutPage: React.FC = () => {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
  });

  // Fetch cart data from server
  const { data: cartData, isLoading: isLoadingCart } =
    useGetOrCreateCartQuery("");

  const {
    data: shippingAddresses,
    isLoading: isLoadingAddresses,
    isError: isAddressError,
  } = useGetShippingAddressesQuery();

  const [createShippingAddress, { isLoading: isAddingAddress }] =
    useCreateShippingAddressMutation();

  const [initiatePayment, { isLoading: isPaymentLoading }] =
    useInitiatePaymentMutation();

  const calculateSubtotal = () => {
    return (cartData?.items || []).reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );
  };

  const calculateVAT = () => {
    return calculateSubtotal() * 0.075;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateVAT();
  };

  const handleAddressSelection = (id: string) => {
    setSelectedAddressId(id);
  };

  const handleNewAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createShippingAddress(newAddress).unwrap();
      setSelectedAddressId(result.id);
      setShowNewAddressForm(false);
      toast.success("Address added", {
        description: "Your new shipping address has been added successfully.",
      });
    } catch (error) {
      console.error("Failed to create new address:", error);
      toast.error("Error", {
        description: "Failed to add new address. Please try again.",
      });
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.info("No address selected", {
        description:
          "Please select a shipping address before placing your order.",
      });
      return;
    }
    try {
      const result = await initiatePayment(selectedAddressId).unwrap();
      if (result && typeof result === "string") {
        window.location.href = result;
      } else {
        throw new Error("Invalid payment URL received");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to initiate payment:", error);

      if (typeof error.data === "string" && error.data.startsWith("http")) {
        window.location.href = error.data;
      } else {
        toast("Payment Error", {
          description: "Failed to initiate payment. Please try again.",
        });
      }
    }
  };

  if (isLoadingCart) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-gray-500">Loading cart details...</p>
        </div>
      </div>
    );
  }

  const cartItems = cartData?.items || [];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Shipping Addresses */}
          <div className="space-y-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Checkout</h2>

            {/* Existing Shipping Addresses */}
            <Card>
              <CardHeader>
                <CardTitle>Select Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingAddresses ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span className="ml-2">Loading addresses...</span>
                  </div>
                ) : isAddressError ? (
                  <p className="text-red-500">Error loading addresses</p>
                ) : (
                  <RadioGroup
                    value={selectedAddressId || ""}
                    onValueChange={handleAddressSelection}
                    className="space-y-4"
                  >
                    {shippingAddresses?.map((address) => (
                      <div
                        key={address.id}
                        className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <RadioGroupItem value={address.id} id={address.id} />
                        <Label
                          htmlFor={address.id}
                          className="flex-grow cursor-pointer"
                        >
                          <div className="font-medium">{address.fullName}</div>
                          <div className="text-sm text-gray-500">
                            {address.streetAddress}, {address.city},{" "}
                            {address.state}, {address.country},{" "}
                            {address.zipCode}
                          </div>
                          {address.phoneNumber && (
                            <div className="text-sm text-gray-500">
                              {address.phoneNumber}
                            </div>
                          )}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
                <Button
                  onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                  className="mt-4"
                  variant="outline"
                >
                  {showNewAddressForm ? "Hide Address Form" : "Add New Address"}
                </Button>
              </CardContent>
            </Card>

            {/* New Address Form */}
            {showNewAddressForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNewAddressSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={newAddress.fullName}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              fullName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          value={newAddress.phoneNumber}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              phoneNumber: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="streetAddress">Street Address</Label>
                      <Input
                        id="streetAddress"
                        value={newAddress.streetAddress}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            streetAddress: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={newAddress.city}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              city: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={newAddress.state}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              state: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input
                          id="zipCode"
                          value={newAddress.zipCode}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              zipCode: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={newAddress.country}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              country: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isAddingAddress}
                    >
                      {isAddingAddress ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding Address...
                        </>
                      ) : (
                        "Add Address"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            <Card>
              <CardHeader>
                <CardTitle>Review Your Cart</CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.length > 0 ? (
                  <>
                    <ul className="divide-y divide-gray-200 space-y-4">
                      {cartItems.map((item) => (
                        <li key={item.id} className="flex justify-between py-4">
                          <div>
                            <div className="flex gap-4">
                              <img
                                src={item.product.images[0].url}
                                alt={item.product.name}
                                className="w-20 h-20 rounded object-cover"
                              />
                              <div>
                                <p className="font-medium text-gray-900">
                                  {item.product.name}
                                </p>
                                <p className="text-sm capitalize text-gray-600">
                                  {item.selectedSize} / {item.selectedColor}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Quantity: {item.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-900">
                            ₦
                            {(
                              item.quantity * item.product.price
                            ).toLocaleString()}
                          </p>
                        </li>
                      ))}
                    </ul>

                    {/* Subtotal, VAT, and Total */}
                    <div className="mt-6 space-y-2">
                      <div className="flex justify-between">
                        <p className="text-gray-600">Subtotal</p>
                        <p className="font-medium text-gray-900">
                          ₦{calculateSubtotal().toLocaleString()}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-gray-600">VAT (7.5%)</p>
                        <p className="font-medium text-gray-900">
                          ₦{calculateVAT().toLocaleString()}
                        </p>
                      </div>
                      <div className="flex justify-between text-lg font-semibold">
                        <p>Total</p>
                        <p>₦{calculateTotal().toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <div className="mt-6">
                      <Button
                        onClick={handlePlaceOrder}
                        className="w-full"
                        size="lg"
                        disabled={isPaymentLoading || !selectedAddressId}
                      >
                        {isPaymentLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Place Order"
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Your cart is empty</p>
                    <Button
                      onClick={() => (window.location.href = "/")}
                      className="mt-4"
                      variant="outline"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
