"use client";

import { useMemo, useState } from "react";
import ProductActions from "./ProductActions";

type Product = {
  id: string;
  title: string;
  price: number;
  stock: number;
  isAvailable: boolean;
  category: {
    title: string;
  };
};

type ProductManagementProps = {
  products: Product[];
};

const ITEMS_PER_PAGE = 8;

const ProductManagement = ({ products }: ProductManagementProps) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);


  // STATISTICS


  const totalProducts = products.length;

  const availableProducts = products.filter(
    (product) => product.isAvailable
  ).length;

  const hiddenProducts = products.filter(
    (product) => !product.isAvailable
  ).length;

  const lowStockProducts = products.filter(
    (product) => product.stock <= 5
  ).length;


  // CATEGORIES


  const categories = useMemo(() => {
    return Array.from(
      new Set(products.map((product) => product.category.title))
    ).sort();
  }, [products]);


  // SEARCH + FILTERS


  const filteredProducts = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return products.filter((product) => {
      const matchesSearch =
        !searchText ||
        product.title.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "all" ||
        product.category.title === category;

      const matchesAvailability =
        availability === "all" ||
        (availability === "available" && product.isAvailable) ||
        (availability === "hidden" && !product.isAvailable);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAvailability
      );
    });
  }, [products, search, category, availability]);


  // PAGINATION


  const totalPages = Math.ceil(
    filteredProducts.length / ITEMS_PER_PAGE
  );

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  // Reset to page 1 whenever search/filter changes
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleAvailabilityChange = (value: string) => {
    setAvailability(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setAvailability("all");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">

    
      {/* STATISTICS */}
    

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-[#f3c58f] bg-[#fff7ea] p-5 shadow-sm">
          <p className="text-sm text-[#7a2e0e]">
            Total Products
          </p>

          <p className="mt-2 text-3xl font-semibold text-[#7a3d16]">
            {totalProducts}
          </p>
        </div>

        <div className="rounded-3xl border border-[#f3c58f] bg-[#fff7ea] p-5 shadow-sm">
          <p className="text-sm text-[#7a2e0e]">
            Available Products
          </p>

          <p className="mt-2 text-3xl font-semibold text-green-700">
            {availableProducts}
          </p>
        </div>

        <div className="rounded-3xl border border-[#f3c58f] bg-[#fff7ea] p-5 shadow-sm">
          <p className="text-sm text-[#7a2e0e]">
            Hidden Products
          </p>

          <p className="mt-2 text-3xl font-semibold text-red-600">
            {hiddenProducts}
          </p>
        </div>

        <div className="rounded-3xl border border-[#f3c58f] bg-[#fff7ea] p-5 shadow-sm">
          <p className="text-sm text-[#7a2e0e]">
            Low Stock
          </p>

          <p className="mt-2 text-3xl font-semibold text-orange-600">
            {lowStockProducts}
          </p>
        </div>

      </div>

    
      {/* SEARCH + FILTERS */}
    

      <div className="flex flex-col gap-3 lg:flex-row">

        {/* Search */}
        <input
          type="text"
          placeholder="Search product by name..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="flex-1 rounded-full border border-[#f3c58f] bg-white px-5 py-3 text-sm text-[#4a2d1c] outline-none placeholder:text-[#a87552] focus:ring-2 focus:ring-[#f7c3a1]"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="rounded-full border border-[#f3c58f] bg-white px-5 py-3 text-sm text-[#7a2e0e] outline-none focus:ring-2 focus:ring-[#f7c3a1]"
        >
          <option value="all">
            All Categories
          </option>

          {categories.map((categoryName) => (
            <option
              key={categoryName}
              value={categoryName}
            >
              {categoryName}
            </option>
          ))}
        </select>

        {/* Availability */}
        <select
          value={availability}
          onChange={(e) =>
            handleAvailabilityChange(e.target.value)
          }
          className="rounded-full border border-[#f3c58f] bg-white px-5 py-3 text-sm text-[#7a2e0e] outline-none focus:ring-2 focus:ring-[#f7c3a1]"
        >
          <option value="all">
            All Products
          </option>

          <option value="available">
            Available
          </option>

          <option value="hidden">
            Hidden
          </option>
        </select>

      </div>

    
      {/* RESULT COUNT */}
    

      <div className="flex items-center justify-between">

        <p className="text-sm text-[#7a2e0e]">
          Showing{" "}
          {filteredProducts.length === 0
            ? 0
            : (currentPage - 1) * ITEMS_PER_PAGE + 1}
          {" - "}
          {Math.min(
            currentPage * ITEMS_PER_PAGE,
            filteredProducts.length
          )}{" "}
          of {filteredProducts.length} products
        </p>

        {(search ||
          category !== "all" ||
          availability !== "all") && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-medium text-[#7a2e0e] underline"
          >
            Clear filters
          </button>
        )}

      </div>

    
      {/* TABLE */}
    

      <div className="overflow-x-auto">

        <table className="min-w-full border-separate border-spacing-y-3">

          <thead>
            <tr className="text-left text-sm text-[#7a2e0e]">

              <th className="px-3 py-2">
                Name
              </th>

              <th className="px-3 py-2">
                Category
              </th>

              <th className="px-3 py-2">
                Price
              </th>

              <th className="px-3 py-2">
                Stock
              </th>

              <th className="px-3 py-2">
                Status
              </th>

              <th className="px-3 py-2">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {paginatedProducts.length > 0 ? (

              paginatedProducts.map((product) => (

                <tr
                  key={product.id}
                  className="rounded-2xl border border-[#f3c58f] bg-[#fffaf2]"
                >

                  {/* Name */}
                  <td className="px-3 py-3 font-medium text-[#4a2d1c]">
                    {product.title}
                  </td>

                  {/* Category */}
                  <td className="px-3 py-3 text-[#7a2e0e]">
                    {product.category.title}
                  </td>

                  {/* Price */}
                  <td className="px-3 py-3 text-[#4a2d1c]">
                    ₹{Number(product.price).toFixed(2)}
                  </td>

                  {/* Stock */}
                  <td
                    className={`px-3 py-3 font-medium ${
                      product.stock <= 5
                        ? "text-red-600"
                        : "text-[#4a2d1c]"
                    }`}
                  >
                    {product.stock}
                  </td>

                  {/* Status */}
                  <td className="px-3 py-3">

                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        product.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.isAvailable
                        ? "Available"
                        : "Unavailable"}
                    </span>

                  </td>

                  {/* Actions */}
                  <td className="px-3 py-3">

                    <ProductActions
                      id={product.id}
                      stock={product.stock}
                      isAvailable={product.isAvailable}
                    />

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={6}
                  className="px-3 py-10 text-center text-sm text-[#7a2e0e]"
                >
                  No products found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* PAGINATION */}
    

      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#f3c58f] pt-5 sm:flex-row">

          {/* Page information */}
          <p className="text-sm text-[#7a2e0e]">
            Page {currentPage} of {totalPages}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-2">

            {/* Previous */}
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.max(page - 1, 1))
              }
              disabled={currentPage === 1}
              className="rounded-full border border-[#f3c58f] bg-white px-4 py-2 text-sm font-medium text-[#7a2e0e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (

                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 w-9 rounded-full text-sm font-medium ${
                    currentPage === page
                      ? "bg-[#7a2e0e] text-white"
                      : "border border-[#f3c58f] bg-white text-[#7a2e0e]"
                  }`}
                >
                  {page}
                </button>

              ))}

            </div>

            {/* Next */}
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(page + 1, totalPages)
                )
              }
              disabled={currentPage === totalPages}
              className="rounded-full border border-[#f3c58f] bg-white px-4 py-2 text-sm font-medium text-[#7a2e0e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default ProductManagement;