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

  const menuItems = await prisma.menuItem.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(menuItems, { status: 200 });
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
  if (!title) {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }

  try {
    const menuItem = await prisma.menuItem.create({
      data: {
        title,
        description: typeof body?.description === 'string' ? body.description : null,
        url: typeof body?.url === 'string' ? body.url : null,
        isActive: body?.isActive !== false,
        order: Number(body?.order ?? 0),
        catSlug: typeof body?.catSlug === 'string' ? body.catSlug : null,
      },
    });

    await prisma.adminAction.create({ data: { adminId: user.id, action: 'create', entityType: 'menu', entityId: menuItem.id, description: `Admin created menu item ${menuItem.title}` } });

    return NextResponse.json(menuItem, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Unable to create menu item.' }, { status: 500 });
  }
}
