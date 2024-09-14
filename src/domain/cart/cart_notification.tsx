import { RootState } from "@/config/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const CartNotification: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.products.cart);
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    if (cartItems.length > 0) {
      setVisible(true);
      setTimeout(() => setVisible(false), 3000); // Hide after 3 seconds
    }
  }, [cartItems]);

  return visible ? (
    <div className="fixed bottom-5 right-5 p-4 bg-gray-800 text-white rounded">
      Item added to cart!
    </div>
  ) : null;
};

export default CartNotification;
