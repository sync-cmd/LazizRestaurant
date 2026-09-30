import { redirect } from "next/navigation";
import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import Link from "next/link";
import ProductManagement from "./components/ProductManagement";

const ProductsPage = async () => {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      isAdmin: true,
    },
  });

  if (!user?.isAdmin) {
    redirect("/");
  }

  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: {
        select: {
          title: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-[#fffaf2] p-4 text-[#4a2d1c] sm:p-6 lg:p-8">

      <div className="mx-auto max-w-7xl rounded-4xl border border-[#f3c58f] bg-white/90 p-4 shadow-[0_24px_80px_rgba(122,46,14,0.12)] sm:p-6 lg:p-8">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-3xl font-semibold text-[#7a3d16] underline">
              Product management
            </h1>
          </div>

          <Link
            href="/add"
            className="rounded-full bg-[#7a2e0e] px-5 py-3 text-sm font-semibold text-white"
          >
            Add Product
          </Link>

        </div>

        <ProductManagement
          products={products.map((product) => ({
            id: product.id,
            title: product.title,
            price: Number(product.price),
            stock: product.stock,
            isAvailable: product.isAvailable,
            category: {
              title: product.category.title,
            },
          }))}
        />

      </div>

    </div>
  );
};

export default ProductsPage;