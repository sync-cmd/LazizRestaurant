'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getAuthSession } from '@/utils/auth';
import { prisma } from '@/utils/connect';

async function verifyAdmin() {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    redirect('/login');
  }

  const admin = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      isAdmin: true,
    },
  });

  if (!admin?.isAdmin) {
    redirect('/');
  }

  return admin;
}

export async function updateUser(
  userId: string,
  name: string,
  email: string,
  isAdmin: boolean
) {
  const admin = await verifyAdmin();

//   Don't allow an admin to change their own account through this UI.
  if (admin.id === userId) {
    throw new Error('You cannot edit your own account here.');
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail) {
    throw new Error('Email is required.');
  }

  // Check whether another user already has this email.
  const existingUser = await prisma.user.findFirst({
    where: {
      email: cleanEmail,
      NOT: {
        id: userId,
      },
    },
    select: {
      id: true,
    },
  });

  if (existingUser) {
    throw new Error('Another user already has this email.');
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: cleanName || null,
      email: cleanEmail,
      isAdmin,
    },
  });

  revalidatePath('/dashboard/users');
  revalidatePath('/dashboard');
}

export async function deleteUser(userId: string) {
  const admin = await verifyAdmin();

  // Prevent deleting yourself.
  if (admin.id === userId) {
    throw new Error('You cannot delete your own account.');
  }

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  revalidatePath('/dashboard/users');
  revalidatePath('/dashboard');
}