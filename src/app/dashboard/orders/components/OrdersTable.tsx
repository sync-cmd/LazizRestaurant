"use client";

import { useMemo, useState } from "react";

type Order = {
  id: string;
  userEmail: string;
  products: unknown;
  price: number;
  status: string;
  paymentStatus: string;
  createdAt: Date | string;
};

type OrdersTableProps = {
  orders: Order[];
};

const OrdersTable = ({ orders }: OrdersTableProps) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Search
    const searchText = search.toLowerCase().trim();

    if (searchText) {
      result = result.filter((order) => {
        return (
          order.userEmail.toLowerCase().includes(searchText) ||
          order.id.toLowerCase().includes(searchText)
        );
      });
    }

    // Status filter
    if (statusFilter !== "All") {
      result = result.filter(
        (order) => order.status === statusFilter
      );
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();

      const startDate = new Date();

      if (dateFilter === "today") {
        startDate.setHours(0, 0, 0, 0);
      }

      if (dateFilter === "7days") {
        startDate.setDate(now.getDate() - 7);
        startDate.setHours(0, 0, 0, 0);
      }

      if (dateFilter === "30days") {
        startDate.setDate(now.getDate() - 30);
        startDate.setHours(0, 0, 0, 0);
      }

      result = result.filter((order) => {
        return new Date(order.createdAt) >= startDate;
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        );
      }

      if (sortBy === "oldest") {
        return (
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
        );
      }

      if (sortBy === "highest") {
        return b.price - a.price;
      }

      if (sortBy === "lowest") {
        return a.price - b.price;
      }

      return 0;
    });

    return result;
  }, [orders, search, statusFilter, dateFilter, sortBy]);

  return (
    <div className="space-y-5">

      {/* Search + Filters */}

        <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Search */}
          <input
            type="text"
            placeholder="Search customer email or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-[#f3c58f] bg-white px-5 py-3 text-sm text-[#4a2d1c] outline-none placeholder:text-[#a87552] focus:ring-2 focus:ring-[#f7c3a1]"
          />

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-full border border-[#f3c58f] bg-white px-5 py-3 text-sm text-[#7a2e0e] outline-none focus:ring-2 focus:ring-[#f7c3a1]"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Preparing">Preparing</option>
            <option value="Out for Delivery">
              Out for Delivery
            </option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Date */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="rounded-full border border-[#f3c58f] bg-white px-5 py-3 text-sm text-[#7a2e0e] outline-none focus:ring-2 focus:ring-[#f7c3a1]"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-full border border-[#f3c58f] bg-white px-5 py-3 text-sm text-[#7a2e0e] outline-none focus:ring-2 focus:ring-[#f7c3a1]"
          >
            <option value="newest">
              Newest First
            </option>

            <option value="oldest">
              Oldest First
            </option>

            <option value="highest">
              Highest Amount
            </option>

            <option value="lowest">
              Lowest Amount
            </option>
          </select>

        </div>

        {/* Results */}
        <div className="mt-4 flex items-center justify-between">

          <p className="text-sm text-[#7a2e0e]">
            Showing{" "}
            <span className="font-semibold">
              {filteredOrders.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold">
              {orders.length}
            </span>{" "}
            orders
          </p>

          {(search ||
            statusFilter !== "All" ||
            dateFilter !== "all" ||
            sortBy !== "newest") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
                setDateFilter("all");
                setSortBy("newest");
              }}
              className="text-sm font-medium text-[#7a2e0e] underline"
            >
              Clear filters
            </button>
          )}

        </div>
     

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">

          <thead>
            <tr className="text-left text-sm text-[#7a2e0e]">

              <th className="px-3 py-2">
                Customer
              </th>

              <th className="px-3 py-2">
                Items
              </th>

              <th className="px-3 py-2">
                Amount
              </th>

              <th className="px-3 py-2">
                Status
              </th>

              <th className="px-3 py-2">
                Payment
              </th>

              <th className="px-3 py-2">
                Date
              </th>

            </tr>
          </thead>

          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {

                const products = Array.isArray(order.products)
                  ? order.products
                  : [];

                const firstProduct = products[0] as {
                  title?: string;
                } | undefined;

                return (
                  <tr
                    key={order.id}
                    className="rounded-2xl border border-[#f3c58f] bg-[#fffaf2]"
                  >

                    {/* Customer */}
                    <td className="px-3 py-3 font-medium text-[#4a2d1c]">
                      {order.userEmail}
                    </td>

                    {/* Product */}
                    <td className="px-3 py-3 text-[#7a2e0e]">
                      {firstProduct?.title || "No product"}
                    </td>

                    {/* Amount */}
                    <td className="px-3 py-3 text-[#4a2d1c]">
                      ₹{order.price.toFixed(2)}
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3">

                      <span
                        className={`rounded-full px-3 py-1 text-sm ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>

                    </td>

                    {/* Payment */}
                    <td className="px-3 py-3">

                      <span
                        className={`rounded-full px-3 py-1 text-sm ${
                          order.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : order.paymentStatus === "Failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>

                    </td>

                    {/* Date */}
                    <td className="px-3 py-3 text-[#7a2e0e]">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-sm text-[#7a2e0e]"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default OrdersTable;