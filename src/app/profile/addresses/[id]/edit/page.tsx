import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import EditAddressForm from "./EditAddressForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const EditAddressPage = async ({ params }: Props) => {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const { id } = await params;

  const address = await prisma.address.findUnique({
    where: {
      id,
    },
  });

  if (!address) {
    notFound();
  }

  // Make sure the address belongs to the logged-in user
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
    },
  });

  if (!user || address.userId !== user.id) {
    redirect("/profile/addresses");
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
            Edit Address
          </h1>

          <p className="mt-1 text-sm text-[#7a2e0e]">
            Update your delivery address
          </p>
        </div>

        <EditAddressForm
          address={{
            id: address.id,
            name: address.name,
            phone: address.phone,
            addressLine: address.addressLine,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            isDefault: address.isDefault,
          }}
        />

      </div>
    </div>
  );
};

export default EditAddressPage;