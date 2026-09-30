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

  try {
    const offer = await prisma.offer.update({
      where: { id },
      data: {
        title: typeof body?.title === 'string' ? body.title.trim() : undefined,
        description: typeof body?.description === 'string' ? body.description : undefined,
        discount: body?.discount === undefined ? undefined : Number(body.discount),
        startDate: body?.startDate ? new Date(body.startDate) : undefined,
        endDate: body?.endDate ? new Date(body.endDate) : undefined,
        isActive: body?.isActive === undefined ? undefined : Boolean(body.isActive),
        code: body?.code === undefined ? undefined : body.code,
      },
    });

    await prisma.adminAction.create({ data: { adminId: user.id, action: 'update', entityType: 'offer', entityId: offer.id, description: `Admin updated offer ${offer.title}` } });

    return NextResponse.json(offer, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Unable to update offer.' }, { status: 500 });
  }
}
