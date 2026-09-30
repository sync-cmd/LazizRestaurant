import { redirect } from 'next/navigation';
import { getAuthSession } from '@/utils/auth';
import { prisma } from '@/utils/connect';
import Link from 'next/link';
import OrdersTable from './components/OrdersTable';

const OrdersPage = async () => {
  const session = await getAuthSession();

  // Check login
  if (!session?.user?.email) {
    redirect('/login');
  }

  // Check admin
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      isAdmin: true,
    },
  });

  if (!user?.isAdmin) {
    redirect('/');
  }

  // Get orders
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      userEmail: true,
      products: true,
      price: true,
      status: true,
      paymentStatus: true,
      createdAt: true,
    },
  });

  // Convert Prisma Decimal to number
  const normalizedOrders = orders.map((order) => ({
    ...order,
    price: Number(order.price),
  }));

  // Statistics
  const totalOrders = normalizedOrders.length;

  const pendingOrders = normalizedOrders.filter(
    (order) => order.status === 'Pending'
  ).length;

  const completedOrders = normalizedOrders.filter(
    (order) => order.status === 'Delivered'
  ).length;

  const cancelledOrders = normalizedOrders.filter(
    (order) => order.status === 'Cancelled'
  ).length;

  

  return (
    <div className="min-h-screen bg-[#fffaf2] p-4 text-[#4a2d1c] sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl rounded-4xl border border-[#f3c58f] bg-white/90 p-4 shadow-[0_24px_80px_rgba(122,46,14,0.12)] sm:p-6 lg:p-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#7a3d16] underline">
              Order management
            </h1>

            
          </div>

          <Link
            href="/orders"
            className="rounded-full bg-[#7a2e0e] px-5 py-3 text-sm font-semibold text-white"
          >
            Manage Orders
          </Link>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Orders */}
          <div className="rounded-3xl border border-[#f3c58f] bg-[#fff7ea] p-5 shadow-sm">
            <p className="text-sm text-[#7a2e0e]">
              Total Orders
            </p>

            <p className="mt-2 text-3xl font-semibold text-[#7a3d16]">
              {totalOrders}
            </p>
          </div>

          {/* Pending */}
          <div className="rounded-3xl border border-[#f3c58f] bg-[#fff7ea] p-5 shadow-sm">
            <p className="text-sm text-[#7a2e0e]">
              Pending Orders
            </p>

            <p className="mt-2 text-3xl font-semibold text-[#7a3d16]">
              {pendingOrders}
            </p>
          </div>

          {/* Delivered */}
          <div className="rounded-3xl border border-[#f3c58f] bg-[#fff7ea] p-5 shadow-sm">
            <p className="text-sm text-[#7a2e0e]">
              Delivered
            </p>

            <p className="mt-2 text-3xl font-semibold text-[#7a3d16]">
              {completedOrders}
            </p>
          </div>

          {/* Cancelled */}
          <div className="rounded-3xl border border-[#f3c58f] bg-[#fff7ea] p-5 shadow-sm">
            <p className="text-sm text-[#7a2e0e]">
              Cancelled
            </p>

            <p className="mt-2 text-3xl font-semibold text-[#7a3d16]">
              {cancelledOrders}
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <OrdersTable orders={normalizedOrders} />

      </div>
    </div>
  );
};

export default OrdersPage;