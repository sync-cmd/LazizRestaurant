"use server";

import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { revalidatePath } from "next/cache";

/* =========================================================
   UPDATE PROFILE
========================================================= */

type ProfileData = {
  name: string;
  image?: string | null;
};

export async function updateProfile(data: ProfileData) {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const name = data.name.trim();

  if (!name) {
    throw new Error("Name is required");
  }

  await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      name,
      ...(data.image !== undefined
        ? {
            image: data.image,
          }
        : {}),
    },
  });

  revalidatePath("/profile");
  revalidatePath("/profile/edit");
  revalidatePath("/profile/image");
}

/* =========================================================
   ADD ADDRESS
========================================================= */

type AddressData = {
  name: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
};

export async function addAddress(data: AddressData) {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  /* Make every other address non-default */
  if (data.isDefault) {
    await prisma.address.updateMany({
      where: {
        userId: user.id,
      },
      data: {
        isDefault: false,
      },
    });
  }

  await prisma.address.create({
    data: {
      userId: user.id,
      name: data.name.trim(),
      phone: data.phone.trim(),
      addressLine: data.addressLine.trim(),
      city: data.city.trim(),
      state: data.state.trim(),
      postalCode: data.postalCode.trim(),
      isDefault: data.isDefault,
    },
  });

  revalidatePath("/profile");
  revalidatePath("/profile/addresses");
}

/* =========================================================
   UPDATE ADDRESS
========================================================= */

export async function updateAddress(
  addressId: string,
  data: AddressData
) {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  /* Make sure this address belongs to the logged-in user */
  const address = await prisma.address.findUnique({
    where: {
      id: addressId,
    },
  });

  if (!address || address.userId !== user.id) {
    throw new Error("Address not found");
  }

  /* If this address becomes default,
     remove default from other addresses */
  if (data.isDefault) {
    await prisma.address.updateMany({
      where: {
        userId: user.id,
        id: {
          not: addressId,
        },
      },
      data: {
        isDefault: false,
      },
    });
  }

  await prisma.address.update({
    where: {
      id: addressId,
    },
    data: {
      name: data.name.trim(),
      phone: data.phone.trim(),
      addressLine: data.addressLine.trim(),
      city: data.city.trim(),
      state: data.state.trim(),
      postalCode: data.postalCode.trim(),
      isDefault: data.isDefault,
    },
  });

  revalidatePath("/profile");
  revalidatePath("/profile/addresses");
  revalidatePath(`/profile/addresses/${addressId}`);
}

/* =========================================================
   DELETE ADDRESS
========================================================= */

export async function deleteAddress(addressId: string) {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  /* Make sure this address belongs to the logged-in user */
  const address = await prisma.address.findUnique({
    where: {
      id: addressId,
    },
  });

  if (!address || address.userId !== user.id) {
    throw new Error("Address not found");
  }

  await prisma.address.delete({
    where: {
      id: addressId,
    },
  });

  revalidatePath("/profile");
  revalidatePath("/profile/addresses");
}

/* =========================================================
   SET DEFAULT ADDRESS
========================================================= */

export async function setDefaultAddress(addressId: string) {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const address = await prisma.address.findUnique({
    where: {
      id: addressId,
    },
  });

  if (!address || address.userId !== user.id) {
    throw new Error("Address not found");
  }

  /* Remove default from all addresses */
  await prisma.address.updateMany({
    where: {
      userId: user.id,
    },
    data: {
      isDefault: false,
    },
  });

  /* Make selected address default */
  await prisma.address.update({
    where: {
      id: addressId,
    },
    data: {
      isDefault: true,
    },
  });

  revalidatePath("/profile");
  revalidatePath("/profile/addresses");
}