import { NextResponse } from 'next/server';
import { getAuthSession } from '@/utils/auth';
import { prisma } from '@/utils/connect';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { isAdmin: true, id: true } });

  if (!user?.isAdmin) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const status = typeof body?.status === 'string' ? body.status.trim() : '';
  const paymentStatus = typeof body?.paymentStatus === 'string' ? body.paymentStatus.trim() : '';

  if (!status) {
    return NextResponse.json({ message: 'Status is required' }, { status: 400 });
  }

  try {
    const order = await prisma.order.update({
      where: { id },
      data: {
        status,
        paymentStatus: paymentStatus || undefined,
      },
    });

    await prisma.adminAction.create({
      data: {
        adminId: user.id,
        action: 'update',
        entityType: 'order',
        entityId: order.id,
        description: `Admin updated order ${order.id} to ${status}`,
      },
    });

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Unable to update order.' }, { status: 500 });
  }
}
