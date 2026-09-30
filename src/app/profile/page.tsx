import { redirect } from "next/navigation";
import Link from "next/link";
import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { RiBox3Line } from "react-icons/ri";
import { LuMapPinned } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
import { BsCart4 } from "react-icons/bs";

const ProfilePage = async () => {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      addresses: {
        orderBy: {
          createdAt: "desc",
        },
      },
      Order: {
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#fffaf2] px-4 py-8 text-[#4a2d1c] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Profile Header */}
        <div className="rounded-3xl border border-[#f3c58f] bg-white p-6 shadow-[0_20px_60px_rgba(122,46,14,0.10)]">
          <div className="flex flex-col items-center gap-5 sm:flex-row">

            {/* Profile Image */}
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-[#f3c58f] bg-[#fff7ea]">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "Profile"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-4xl font-semibold text-[#7a2e0e]">
                  {(user.name || user.email || "U")
                    .charAt(0)
                    .toUpperCase()}
                </span>
              )}
            </div>

            {/* User Information */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-semibold text-[#7a3d16]">
                {user.name || "User"}
              </h1>

              <p className="mt-1 text-sm text-[#7a2e0e]">
                {user.email}
              </p>

              <p className="mt-2 text-sm text-[#a87552]">
                Member since{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Edit */}
            <Link
              href="/profile/edit"
              className="rounded-full bg-[#7a2e0e] px-5 py-3 text-sm font-semibold text-white"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Shortcuts */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Orders */}
          <Link
            href="/orders"
            className="rounded-3xl border border-[#f3c58f] bg-white p-5 transition hover:-translate-y-1"
          >
            <div className="text-4xl"><RiBox3Line /></div>

            <h2 className="mt-3 font-semibold text-[#7a3d16]">
              Order History
            </h2>

            <p className="mt-1 text-sm text-[#7a2e0e]">
              View your previous orders
            </p>
          </Link>

          {/* Addresses */}
          <Link
            href="/profile/addresses"
            className="rounded-3xl border border-[#f3c58f] bg-white p-5 transition hover:-translate-y-1"
          >
            <div className="text-4xl"><LuMapPinned /></div>

            <h2 className="mt-3 font-semibold text-[#7a3d16]">
              Saved Addresses
            </h2>

            <p className="mt-1 text-sm text-[#7a2e0e]">
              Manage your delivery addresses
            </p>
          </Link>

          {/* Cart shortcut */}
          <Link
            href="/cart"
            className="rounded-3xl border border-[#f3c58f] bg-white p-5 transition hover:-translate-y-1"
          >
            <div className="text-4xl"><BsCart4 /></div>

            <h2 className="mt-3 font-semibold text-[#7a3d16]">
              Cart
            </h2>

            <p className="mt-1 text-sm text-[#7a2e0e]">
              View items in your cart
            </p>
          </Link>

          {/* Logout */}
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="h-full w-full rounded-3xl border border-[#f3c58f] bg-white p-5 text-left transition hover:-translate-y-1"
            >
              <div className="text-4xl"><TbLogout /></div>

              <h2 className="mt-3 font-semibold text-[#7a3d16]">
                Logout
              </h2>

              <p className="mt-1 text-sm text-[#7a2e0e]">
                Sign out of your account
              </p>
            </button>
          </form>
        </div>

        {/* Recent Orders */}
        <div className="mt-6 rounded-3xl border border-[#f3c58f] bg-white p-6">

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#7a3d16]">
              Recent Orders
            </h2>

            <Link
              href="/orders"
              className="text-sm font-semibold text-[#7a2e0e] underline"
            >
              View All
            </Link>
          </div>

          {user.Order.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#7a2e0e]">
              You haven't placed any orders yet.
            </p>
          ) : (
            <div className="space-y-3">
              {user.Order.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col justify-between gap-3 rounded-2xl bg-[#fff7ea] p-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="font-medium text-[#4a2d1c]">
                      Order #{order.id.slice(-8)}
                    </p>

                    <p className="text-sm text-[#7a2e0e]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="rounded-full bg-white px-3 py-1 text-sm text-[#7a2e0e]">
                      {order.status}
                    </span>

                    <span className="font-semibold text-[#7a3d16]">
                      ₹{Number(order.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Saved Addresses */}
        <div className="mt-6 rounded-3xl border border-[#f3c58f] bg-white p-6">

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#7a3d16]">
              Saved Addresses
            </h2>

            <Link
              href="/profile/addresses"
              className="text-sm font-semibold text-[#7a2e0e] underline"
            >
              Manage
            </Link>
          </div>

          {user.addresses.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#7a2e0e]">
              No saved addresses.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {user.addresses.map((address) => (
                <div
                  key={address.id}
                  className="rounded-2xl bg-[#fff7ea] p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-[#7a3d16]">
                      {address.name}
                    </h3>

                    {address.isDefault && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                        Default
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm text-[#7a2e0e]">
                    {address.addressLine}
                  </p>

                  <p className="text-sm text-[#7a2e0e]">
                    {address.city}, {address.state} -{" "}
                    {address.postalCode}
                  </p>

                  <p className="mt-1 text-sm text-[#7a2e0e]">
                    Phone: {address.phone}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;