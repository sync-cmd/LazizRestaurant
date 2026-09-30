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

  const offers = await prisma.offer.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(offers, { status: 200 });
}

export async function POST(request: Request) {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { isAdmin: true, id: true } });

  if (!user?.isAdmin) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const title = typeof body?.title === 'string' ? body.title.trim() : '';
  const discount = Number(body?.discount);
  const startDate = body?.startDate ? new Date(body.startDate) : new Date();
  const endDate = body?.endDate ? new Date(body.endDate) : new Date();

  if (!title || Number.isNaN(discount) || Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }

  try {
    const offer = await prisma.offer.create({ data: { title, description: body?.description, discount, startDate, endDate, isActive: body?.isActive !== false, code: body?.code } });
    await prisma.adminAction.create({ data: { adminId: user.id, action: 'create', entityType: 'offer', entityId: offer.id, description: `Admin created offer ${offer.title}` } });
    return NextResponse.json(offer, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Unable to create offer.' }, { status: 500 });
  }
}
