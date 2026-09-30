import Link from "next/link";

type StatCardProps = {
    label: string;
    value: string | number;
    accent?: string;
};

const StatCard = ({ label, value, accent = 'bg-[#fff7ea]' }: StatCardProps) => (
    <div className={`rounded-3xl border border-[#f3c58f] ${accent} p-4 shadow-sm`}>
        <p className='text-sm text-[#7a2e0e]'>{label}</p>
        <p className='mt-2 text-2xl font-semibold text-[#7a3d16]'>{value}</p>
    </div>
);

type DashboardOverviewProps = {
    stats: {
        totalUsers: number;
        totalProducts: number;
        totalOrders: number;
        pendingOrders: number;
        completedOrders: number;
        cancelledOrders: number;
        totalRevenue: number;
        activeOffers: number;
        activeMenuItems: number;
        lowStockProducts: Array<{ id: string; title: string; stock: number; price: number }>;
    };
    recentOrders: Array<{ id: string; status: string; price: number; createdAt: Date; userEmail: string }>;
    recentActions: Array<{ id: string; action: string; description: string; createdAt: Date; admin: { name: string | null; email: string | null } }>;
};

const DashboardOverview = ({ stats, recentOrders, recentActions }: DashboardOverviewProps) => {
    return (
        <div className='space-y-6'>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
                <div>
                    <h1 className='text-3xl font-semibold text-[#7a3d16] underline'>Management dashboard</h1>
                    {/* <p className='text-sm uppercase tracking-[0.35em] text-[#7a2e0e] '>Overview</p> */}
                </div>
            </div>

            <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
                <Link href='/dashboard/users' >
                    <StatCard label='Total Users' value={stats.totalUsers} />
                </Link>
                <Link href='/dashboard/products'>
                    <StatCard label='Total Products' value={stats.totalProducts} />
                </Link>
                <Link href='/dashboard/orders'>
                    <StatCard label='Total Orders' value={stats.totalOrders} />
                </Link>
                <StatCard label='Pending Orders' value={stats.pendingOrders} />
                <StatCard label='Completed Orders' value={stats.completedOrders} />
                <StatCard label='Cancelled Orders' value={stats.cancelledOrders} />
                <StatCard label='Revenue' value={`₹${stats.totalRevenue.toFixed(2)}`} />
                <StatCard label='Active Offers' value={stats.activeOffers} />
                <StatCard label='Active Menu Items' value={stats.activeMenuItems} />
            </div>

            <div className='grid gap-6 xl:grid-cols-[1.3fr_0.7fr]'>
                <div className='rounded-3xl border border-[#f3c58f] bg-[#fffaf2] p-4'>
                    <div className='mb-4 flex items-center justify-between'>
                        <h2 className='text-lg font-semibold text-[#7a3d16]'>Recent Orders</h2>
                        <span className='text-sm text-[#7a2e0e]'>Latest activity</span>
                    </div>
                    <div className='space-y-3 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#fbcf91]'>
                        {recentOrders.map((order) => (
                            <div key={order.id} className='flex flex-col gap-2 rounded-2xl border border-[#f0d3ae] bg-white p-3 sm:flex-row sm:items-center sm:justify-between'>
                                <div>
                                    <p className='font-medium text-[#4a2d1c]'>{order.userEmail}</p>
                                    <p className='text-sm text-[#7a2e0e]'>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <span className='rounded-full bg-[#fff7ea] px-3 py-1 text-sm text-[#7a2e0e]'>{order.status}</span>
                                    <span className='font-semibold text-[#7a3d16]'>₹{Number(order.price).toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='rounded-3xl border  border-[#f3c58f] bg-[#fffaf2] p-4'>
                    <div className='mb-4 flex items-center justify-between '>
                        <h2 className='text-lg font-semibold text-[#7a3d16]'>Low Stock</h2>
                        <span className='text-sm text-[#7a2e0e]'>Needs attention</span>
                    </div>
                    <div className='space-y-3 h-[50vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#fbcf91]'>
                        {stats.lowStockProducts.length > 0 ? (
                            stats.lowStockProducts.map((product) => (
                                <div key={product.id} className='rounded-2xl border border-[#f0d3ae] bg-white p-3'>
                                    <p className='font-medium text-[#4a2d1c]'>{product.title}</p>
                                    <p className='text-sm text-[#7a2e0e]'>Stock: {product.stock} · Price: ₹{Number(product.price).toFixed(2)}</p>
                                </div>
                            ))
                        ) : (
                            <p className='text-sm text-[#7a2e0e]'>All products are well stocked.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className='rounded-3xl border border-[#f3c58f] bg-[#fffaf2] p-4'>
                <div className='mb-4 flex items-center justify-between'>
                    <h2 className='text-lg font-semibold text-[#7a3d16]'>Recent Admin Activity</h2>
                </div>
                <div className='space-y-3'>
                    {recentActions.map((action) => (
                        <div key={action.id} className='flex flex-col gap-2 rounded-2xl border border-[#f0d3ae] bg-white p-3 sm:flex-row sm:items-center sm:justify-between'>
                            <div>
                                <p className='font-medium text-[#4a2d1c]'>{action.description}</p>
                                <p className='text-sm text-[#7a2e0e]'>{action.admin.name || action.admin.email || 'Admin'}</p>
                            </div>
                            <p className='text-sm text-[#7a2e0e]'>{new Date(action.createdAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
