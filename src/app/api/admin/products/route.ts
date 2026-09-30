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

  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: { select: { title: true } } },
  });

  return NextResponse.json(products, { status: 200 });
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
  const desc = typeof body?.desc === 'string' ? body.desc.trim() : '';
  const price = Number(body?.price);
  const discountPrice = body?.discountPrice === '' || body?.discountPrice == null ? null : Number(body?.discountPrice);
  const catSlug = typeof body?.catSlug === 'string' ? body.catSlug.trim() : '';
  const stock = Number(body?.stock ?? 0);
  const isAvailable = body?.isAvailable !== false;
  const sku = typeof body?.sku === 'string' && body.sku.trim() ? body.sku.trim() : null;
  const tags = Array.isArray(body?.tags) ? body.tags.filter((tag: unknown): tag is string => typeof tag === 'string') : [];

  if (!title || !desc || !catSlug || Number.isNaN(price)) {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }

  try {
    const product = await prisma.product.create({
      data: {
        title,
        desc,
        price,
        discountPrice,
        catSlug,
        stock,
        isAvailable,
        sku,
        tags,
        options: Array.isArray(body?.options) ? body.options : [],
      },
    });

    await prisma.adminAction.create({
      data: {
        adminId: user.id,
        action: 'create',
        entityType: 'product',
        entityId: product.id,
        description: `Admin created product ${product.title}`,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Unable to create product.' }, { status: 500 });
  }
}
