import Link from 'next/link';

const links = [
    { href: '/dashboard/products', label: 'Products' },
    { href: '/dashboard/users', label: 'Users' },
    { href: '/dashboard/orders', label: 'Orders' },
    { href: '/dashboard/offers', label: 'Promotions' },
    { href: '/dashboard/menu', label: 'Menu' },
];

const AdminSidebar = () => {
    return (
        <aside className='sticky h-full w-full rounded-4xl border border-[#f3c58f] bg-[#fff7ea] p-4 shadow-[0_18px_60px_rgba(122,46,14,0.10)] lg:sticky lg:top-6 lg:w-72 lg:p-6'>
            <div className='mb-6'>
                <p className='text-xs uppercase tracking-[0.35em] text-[#7a2e0e]'></p>
                <h2 className='mt-2 text-2xl font-semibold text-[#7a3d16]'>Admin Dashboard</h2>
            </div>
            <nav className='flex flex-col gap-2 '>
                {links.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className='rounded-2xl border border-transparent px-4 py-3 text-xl font-medium text-[#4a2d1c] transition hover:border-[#f3c58f] hover:bg-white'
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default AdminSidebar;
