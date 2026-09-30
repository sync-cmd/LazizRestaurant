import { redirect } from 'next/navigation';
import { getAuthSession } from '@/utils/auth';
import { prisma } from '@/utils/connect';
import DashboardOverview from './components/DashboardOverview';
import AdminSidebar from './components/AdminSidebar'

const DashboardPage = async () => {
    const session = await getAuthSession();

    if (!session?.user?.email) {
        redirect('/login');
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { isAdmin: true },
    });

    if (!user?.isAdmin) {
        redirect('/');
    }

    const [users, products, orders, offers, menuItems, recentActions] = await Promise.all([
        prisma.user.count(),
        prisma.product.count(),
        prisma.order.findMany({
            select: { id: true, status: true, price: true, createdAt: true, userEmail: true },
            orderBy: { createdAt: 'desc' },
            take: 8,
        }),
        prisma.offer.count({ where: { isActive: true } }),
        prisma.menuItem.count({ where: { isActive: true } }),
        prisma.adminAction.findMany({
            orderBy: { createdAt: 'desc' },
            take: 8,
            include: { admin: { select: { name: true, email: true } } },
        }),
    ]);

    const normalizedOrders = orders.map((order) => ({ ...order, price: Number(order.price) }));
    const pendingOrders = normalizedOrders.filter((order) => order.status === 'Pending').length;
    const completedOrders = normalizedOrders.filter((order) => order.status === 'Delivered').length;
    const cancelledOrders = normalizedOrders.filter((order) => order.status === 'Cancelled').length;
    const totalRevenue = normalizedOrders.reduce((sum, order) => sum + order.price, 0);

    const lowStockProducts = await prisma.product.findMany({
        where: { stock: { lte: 5 } },
        orderBy: { stock: 'asc' },
        take: 10,
        select: { id: true, title: true, stock: true, price: true },
    });

    return (
        <div className='min-h-screen bg-[#fffaf2] text-[#4a2d1c]'>
            <div className='mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-6'>
                <AdminSidebar />
                <main className='flex-1 rounded-4xl border border-[#f3c58f] bg-white/90 p-4 shadow-[0_24px_80px_rgba(122,46,14,0.12)] backdrop-blur-sm sm:p-6 lg:p-8'>
                    <DashboardOverview
                        stats={{
                            totalUsers: users,
                            totalProducts: products,
                            totalOrders: normalizedOrders.length,
                            pendingOrders,
                            completedOrders,
                            cancelledOrders,
                            totalRevenue,
                            activeOffers: offers,
                            activeMenuItems: menuItems,
                            lowStockProducts: lowStockProducts.map((product) => ({ ...product, price: Number(product.price) })),
                        }}
                        recentOrders={normalizedOrders}
                        recentActions={recentActions}
                    />
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
