"use client";

import { OrderType } from "@/types/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

const ORDER_STATUSES = [
  "Order Placed",
  "Order Accepted ",
  "Food Processing",
  "Ready for Pickup",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("/api/orders").then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load orders");
        }

        return res.json();
      }),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: string;
    }) => {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const message = await res.text().catch(() => "");
        throw new Error(message || "Failed to update order status");
      }

      return res.json();
    },

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      toast.success("The order status has been changed!");
    },

    onError(err: Error) {
      toast.error(
        err.message || "Something went wrong updating the status"
      );
    },
  });

  const handleUpdate = (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();

    const form = e.currentTarget;
    const select = form.elements.namedItem("status") as HTMLSelectElement;

    const selectedStatus = select.value;

    mutation.mutate({
      id,
      status: selectedStatus,
    });
  };

  if (isLoading || status === "loading") {
    return "Loading...";
  }

  if (error) {
    return "Something went wrong loading orders.";
  }

  return (
    <div className="min-h-[calc(100vh-6rem)] items-center justify-center p-4 md:min-h-[calc(100vh-9rem)] lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="items-center justify-center text-center underline">
            <th className="hidden md:table-cell">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:table-cell">Products</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody className="items-center justify-center text-center">
          {data.map((item: OrderType) => (
            <tr
              className="bg-[#ffe9cc] text-sm md:text-base"
              key={item.id}
            >
              <td className="hidden px-1 py-6 md:table-cell">
                {item.id}
              </td>

              <td className="px-1 py-6">
                {item.createdAt.toString().slice(0, 10)}
              </td>

              <td className="px-1 py-6">
                ₹{Number(item.price).toFixed(2)}
              </td>

              <td className="hidden px-1 py-6 md:table-cell">
                {item.products[0]?.title}
              </td>

              {session?.user.isAdmin ? (
                <td className="px-1 py-6">
                  <form
                    className="flex items-center justify-center gap-2"
                    onSubmit={(e) => handleUpdate(e, item.id)}
                  >
                    <select
                      name="status"
                      defaultValue={item.status}
                      className="rounded-md border border-[#f3c58f] bg-white p-2 text-sm text-[#7a2e0e] outline-none focus:ring-2 focus:ring-[#f7c3a1]"
                      disabled={mutation.isPending}
                    >
                      {ORDER_STATUSES.map((orderStatus) => (
                        <option
                          key={orderStatus}
                          value={orderStatus}
                        >
                          {orderStatus}
                        </option>
                      ))}
                    </select>

                    <button
                      type="submit"
                      className="rounded-full bg-[#f7c3a1] p-3 text-xl disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={mutation.isPending}
                      title="Update status"
                    >
                      <MdEdit />
                    </button>
                  </form>
                </td>
              ) : (
                <td className="px-1 py-6">
                  {item.status}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
