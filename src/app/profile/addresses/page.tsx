import { redirect } from "next/navigation";
import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import Link from "next/link";

const AddressesPage = async () => {
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
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#fffaf2] p-4 sm:p-6">
      <div className="mx-auto max-w-4xl">

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#7a3d16]">
              Saved Addresses
            </h1>

            <p className="mt-1 text-sm text-[#7a2e0e]">
              Manage your delivery addresses
            </p>
          </div>

          <Link
            href="/profile/addresses/add"
            className="rounded-full bg-[#7a2e0e] px-5 py-3 text-sm font-semibold text-white"
          >
            Add Address
          </Link>
        </div>

        {user.addresses.length === 0 ? (
          <div className="rounded-3xl border border-[#f3c58f] bg-white p-10 text-center">
            <p className="text-[#7a2e0e]">
              No saved addresses yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {user.addresses.map((address) => (
              <div
                key={address.id}
                className="rounded-3xl border border-[#f3c58f] bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-[#7a3d16]">
                    {address.name}
                  </h2>

                  {address.isDefault && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                      Default
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm text-[#7a2e0e]">
                  {address.addressLine}
                </p>

                <p className="text-sm text-[#7a2e0e]">
                  {address.city}, {address.state}
                </p>

                <p className="text-sm text-[#7a2e0e]">
                  {address.postalCode}
                </p>

                <p className="mt-2 text-sm text-[#7a2e0e]">
                  Phone: {address.phone}
                </p>

                <div className="mt-4">
                  <Link
                    href={`/profile/addresses/${address.id}/edit`}
                    className="text-sm font-semibold text-[#7a2e0e] underline"
                  >
                    Edit Address
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AddressesPage;