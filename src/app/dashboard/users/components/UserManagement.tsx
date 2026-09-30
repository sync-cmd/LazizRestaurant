"use client";

import { useMemo, useState } from "react";
import UserActions from "./UserActions";

type User = {
  id: string;
  name: string | null;
  email: string | null;
  isAdmin: boolean;
  createdAt: string;
};

type UserManagementProps = {
  users: User[];
};

const UserManagement = ({ users }: UserManagementProps) => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");

  const totalUsers = users.length;
  const totalAdmins = users.filter((user) => user.isAdmin).length;
  const totalCustomers = users.filter((user) => !user.isAdmin).length;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        user.name?.toLowerCase().includes(searchText) ||
        user.email?.toLowerCase().includes(searchText);

      const matchesRole =
        role === "all" ||
        (role === "admin" && user.isAdmin) ||
        (role === "customer" && !user.isAdmin);

      return matchesSearch && matchesRole;
    });
  }, [users, search, role]);

  return (
    <div className="space-y-6">

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">

        <div className="rounded-3xl border border-[#f3c58f] bg-[#fff7ea] p-5 shadow-sm">
          <p className="text-sm text-[#7a2e0e]">
            Total Users
          </p>

          <p className="mt-2 text-3xl font-semibold text-[#7a3d16]">
            {totalUsers}
          </p>
        </div>

        <div className="rounded-3xl border border-[#f3c58f] bg-[#fff7ea] p-5 shadow-sm">
          <p className="text-sm text-[#7a2e0e]">
            Customers
          </p>

          <p className="mt-2 text-3xl font-semibold text-[#7a3d16]">
            {totalCustomers}
          </p>
        </div>

        <div className="rounded-3xl border border-[#f3c58f] bg-[#fff7ea] p-5 shadow-sm">
          <p className="text-sm text-[#7a2e0e]">
            Admins
          </p>

          <p className="mt-2 text-3xl font-semibold text-[#7a3d16]">
            {totalAdmins}
          </p>
        </div>

      </div>

      {/* Search + Filter */}
      <div className="flex flex-col gap-3 sm:flex-row">

        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-[#f3c58f] bg-white px-5 py-3 text-sm text-[#4a2d1c] outline-none placeholder:text-[#a87552] focus:ring-2 focus:ring-[#f7c3a1]"
          />
        </div>

        {/* Role Filter */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-full border border-[#f3c58f] bg-white px-5 py-3 text-sm text-[#7a2e0e] outline-none focus:ring-2 focus:ring-[#f7c3a1]"
        >
          <option value="all">All Users</option>
          <option value="customer">Customers</option>
          <option value="admin">Admins</option>
        </select>

      </div>

      {/* Result count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#7a2e0e]">
          Showing {filteredUsers.length} of {totalUsers} users
        </p>

        {(search || role !== "all") && (
          <button
            onClick={() => {
              setSearch("");
              setRole("all");
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
                Name
              </th>

              <th className="px-3 py-2">
                Email
              </th>

              <th className="px-3 py-2">
                Role
              </th>

              <th className="px-3 py-2">
                Joined
              </th>

              <th className="px-3 py-2">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((item) => (
                <tr
                  key={item.id}
                  className="rounded-2xl border border-[#f3c58f] bg-[#fffaf2]"
                >
                  <td className="px-3 py-3 font-medium text-[#4a2d1c]">
                    {item.name || "Unnamed user"}
                  </td>

                  <td className="px-3 py-3 text-[#7a2e0e]">
                    {item.email || "No email"}
                  </td>

                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        item.isAdmin
                          ? "bg-[#f7c3a1] text-[#7a2e0e]"
                          : "bg-[#fff7ea] text-[#7a2e0e]"
                      }`}
                    >
                      {item.isAdmin ? "Admin" : "Customer"}
                    </span>
                  </td>

                  <td className="px-3 py-3 text-[#7a2e0e]">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-3 py-3">
                    <UserActions
                      id={item.id}
                      name={item.name}
                      email={item.email}
                      isAdmin={item.isAdmin}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-10 text-center text-sm text-[#7a2e0e]"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default UserManagement;