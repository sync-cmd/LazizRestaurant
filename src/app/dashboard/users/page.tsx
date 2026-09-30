import { redirect } from 'next/navigation';
import { getAuthSession } from '@/utils/auth';
import { prisma } from '@/utils/connect';

import UserManagement from "./components/UserManagement";

const UsersPage = async () => {
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

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      isAdmin: true,
      createdAt: true,
    },
  });

  return (
    <div className="min-h-screen bg-[#fffaf2] p-4 text-[#4a2d1c] sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl rounded-4xl border border-[#f3c58f] bg-white/90 p-4 shadow-[0_24px_80px_rgba(122,46,14,0.12)] sm:p-6 lg:p-8">

        <div className="mb-6">

          <h1 className="text-3xl font-semibold text-[#7a3d16] underline">
            User management
          </h1>

        </div>

        <UserManagement
          users={users.map((user) => ({
            ...user,
            createdAt: user.createdAt.toISOString(),
          }))}
        />

      </div>
    </div>
  );
};

export default UsersPage;