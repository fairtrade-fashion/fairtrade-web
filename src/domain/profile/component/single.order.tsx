import React from "react";

interface Order {
  id: string;
  date: string;
  price: string;
  status: {
    label: string;
    color: string;
    icon: JSX.Element;
  };
}

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Order Details</h3>
        <p>
          <strong>Order ID:</strong> {order.id}
        </p>
        <p>
          <strong>Date:</strong> {order.date}
        </p>
        <p>
          <strong>Price:</strong> {order.price}
        </p>
        <p>
          <strong>Status:</strong> {order.status.label}
        </p>
        <div className="mt-6 flex justify-end gap-4">
          <button
            className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
