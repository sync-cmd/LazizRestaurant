import { redirect } from "next/navigation";
import Link from "next/link";
import { getAuthSession } from "@/utils/auth";
import AddAddressForm from "./AddAddressForm";

const AddAddressPage = async () => {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#fffaf2] p-4 text-[#4a2d1c] sm:p-6">
      <div className="mx-auto max-w-2xl">

        <div className="mb-6">
          <Link
            href="/profile/addresses"
            className="text-sm text-[#7a2e0e] underline"
          >
            ← Back to addresses
          </Link>

          <h1 className="mt-4 text-3xl font-semibold text-[#7a3d16]">
            Add Address
          </h1>

          <p className="mt-1 text-sm text-[#7a2e0e]">
            Add a new delivery address
          </p>
        </div>

        <AddAddressForm />
      </div>
    </div>
  );
};

export default AddAddressPage;