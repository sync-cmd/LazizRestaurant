'use server';

import { redirect } from 'next/navigation';
import { getAuthSession } from '@/utils/auth';
import { prisma } from '@/utils/connect';
import { revalidatePath } from 'next/cache';

export const updateProduct = async (
  productId: string,
  stock: number,
  isAvailable: boolean
) => {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    redirect('/login');
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
    redirect('/');
  }

  if (!Number.isInteger(stock) || stock < 0) {
    throw new Error('Invalid stock value');
  }

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      stock,
      isAvailable,
    },
  });

  revalidatePath('/dashboard/products');
  revalidatePath('/dashboard');
};

