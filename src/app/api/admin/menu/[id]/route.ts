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
    const menuItem = await prisma.menuItem.update({
      where: { id },
      data: {
        title: typeof body?.title === 'string' ? body.title.trim() : undefined,
        description: typeof body?.description === 'string' ? body.description : undefined,
        url: typeof body?.url === 'string' ? body.url : undefined,
        isActive: body?.isActive === undefined ? undefined : Boolean(body.isActive),
        order: body?.order === undefined ? undefined : Number(body.order),
        catSlug: body?.catSlug === undefined ? undefined : body.catSlug,
      },
    });

    await prisma.adminAction.create({ data: { adminId: user.id, action: 'update', entityType: 'menu', entityId: menuItem.id, description: `Admin updated menu item ${menuItem.title}` } });

    return NextResponse.json(menuItem, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Unable to update menu item.' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { isAdmin: true, id: true } });

  if (!user?.isAdmin) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;

  try {
    const menuItem = await prisma.menuItem.delete({ where: { id } });
    await prisma.adminAction.create({ data: { adminId: user.id, action: 'delete', entityType: 'menu', entityId: menuItem.id, description: `Admin deleted menu item ${menuItem.title}` } });
    return NextResponse.json({ message: 'Menu item deleted' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Unable to delete menu item.' }, { status: 500 });
  }
}
