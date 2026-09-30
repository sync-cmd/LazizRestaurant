import { redirect } from "next/navigation"
import { getAuthSession } from "@/utils/auth"
import { prisma } from "@/utils/connect"
import MenuManager from "./components/MenuManager"

const MenuPage = async () => {
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

  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      title: true,
      desc: true,
      img: true,
      slug: true,
    },
  })

  return (
    <div className="min-h-screen bg-[#fffaf2] px-4 py-6 text-[#4a2d1c] sm:px-6 lg:px-8 lg:py-10">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8 rounded-3xl border border-[#f3c58f] bg-white p-5 shadow-[0_12px_40px_rgba(122,46,14,0.08)] sm:p-7">

          
          <h1 className="mt-1 text-3xl font-bold text-[#7a3d16] sm:text-4xl underline">
            Menu Management
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8a6049]">
            Create and manage the categories that appear on your public menu.
          </p>

        </div>

        <MenuManager categories={categories} />

      </div>
    </div>
  )
}

export default MenuPage