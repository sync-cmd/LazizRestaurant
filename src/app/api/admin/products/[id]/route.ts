import { NextResponse } from 'next/server';
import { getAuthSession } from '@/utils/auth';
import { prisma } from '@/utils/connect';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
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
    const product = await prisma.product.update({
      where: { id },
      data: {
        title: typeof body?.title === 'string' ? body.title.trim() : undefined,
        desc: typeof body?.desc === 'string' ? body.desc.trim() : undefined,
        price: body?.price === undefined ? undefined : Number(body.price),
        discountPrice: body?.discountPrice === undefined || body?.discountPrice === '' ? undefined : Number(body.discountPrice),
        stock: body?.stock === undefined ? undefined : Number(body.stock),
        isAvailable: body?.isAvailable === undefined ? undefined : Boolean(body.isAvailable),
        catSlug: typeof body?.catSlug === 'string' ? body.catSlug.trim() : undefined,
      },
    });

    await prisma.adminAction.create({
      data: {
        adminId: user.id,
        action: 'update',
        entityType: 'product',
        entityId: product.id,
        description: `Admin updated product ${product.title}`,
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Unable to update product.' }, { status: 500 });
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
    const product = await prisma.product.delete({ where: { id } });

    await prisma.adminAction.create({
      data: {
        adminId: user.id,
        action: 'delete',
        entityType: 'product',
        entityId: product.id,
        description: `Admin deleted product ${product.title}`,
      },
    });

    return NextResponse.json({ message: 'Product deleted' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Unable to delete product.' }, { status: 500 });
  }
}
