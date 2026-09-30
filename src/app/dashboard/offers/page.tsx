import { redirect } from "next/navigation"
import { getAuthSession } from "@/utils/auth"
import { prisma } from "@/utils/connect"
import OfferForm from "./components/OfferForm"

const OffersPage = async () => {
  const session = await getAuthSession()

  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      isAdmin: true,
    },
  })

  if (!user?.isAdmin) {
    redirect("/")
  }

  const offers = await prisma.offer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="min-h-screen bg-[#fffaf2] px-4 py-6 text-[#4a2d1c] sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 rounded-3xl border border-[#f3c58f] bg-white p-5 shadow-[0_12px_40px_rgba(122,46,14,0.08)] sm:mb-8 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#7a3d16] sm:text-4xl underline">
                Promotion Management
              </h1>
            </div>

            <div className="flex h-14 w-fit items-center gap-3 rounded-2xl bg-[#fff8ed] px-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7a3d16] font-bold text-white">
                {offers.length}
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-[#a16c4d]">
                  Total
                </p>

                <p className="text-sm font-bold text-[#7a3d16]">
                  Offers
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Create Offer */}
        <div className="mb-8">
          <OfferForm />
        </div>

        {/* Existing Offers */}
        <div>
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-[#7a3d16]">
              Existing Offers
            </h2>

            <p className="mt-1 text-sm text-[#8a6049]">
              Edit, activate, or remove your promotional offers.
            </p>
          </div>

          {offers.length > 0 ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {offers.map((offer) => (
                <OfferForm
                  key={offer.id}
                  offer={offer}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#d8a15d] bg-white p-12 text-center">
              <div className="text-4xl">🍔</div>

              <h3 className="mt-4 text-xl font-bold text-[#7a3d16]">
                No offers yet
              </h3>

              <p className="mt-2 text-sm text-[#8a6049]">
                Create your first special offer using the form above.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OffersPage