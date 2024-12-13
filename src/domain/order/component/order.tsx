import React from "react";
import OrderCard from "./order.card";
import { useFetchOrderQuery } from "../api/order.api";
import { Loader } from "@/components/common/loader";
import { EmptyResource } from "@/components/common/error";

const OrderPage: React.FC = () => {
  const { data, isLoading, isError } = useFetchOrderQuery();

  if (isLoading) {
    return (
      <section className="container py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <Loader />
          Loading order...
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="container py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <EmptyResource resourceName="Order" />
        </div>
      </section>
    );
  }

  const orders = data?.map((order) => ({
    id: order.id,
    date: new Date(order.createdAt).toLocaleDateString(),
    price: `₦${order.total.toLocaleString()}`,
    status: {
      label: order.status,
      color:
        order.status === "CANCELLED"
          ? "bg-primary-100 text-red-500 bg-red-100 dark:text-red-200"
          : order.status === "PROCESSING"
          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
          : order.status === "PENDING"
          ? "bg-yellow-100 text-orange-400 bg-orange-100 dark:text-orange-300"
          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      icon: (
        <svg
          className="mr-1 h-3 w-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={
              order.status === "Pre-order"
                ? "M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"
                : "M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
            }
          />
        </svg>
      ),
    },
  }));

  return (
    <section className="container py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              My orders
            </h2>
          </div>
          <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders?.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderPage;