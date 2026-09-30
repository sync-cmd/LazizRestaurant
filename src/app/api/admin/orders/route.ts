import { NextResponse } from 'next/server';
import { getAuthSession } from '@/utils/auth';
import { prisma } from '@/utils/connect';

export async function GET() {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { isAdmin: true } });

  if (!user?.isAdmin) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });

  return NextResponse.json(orders, { status: 200 });
}
