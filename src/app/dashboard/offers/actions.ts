"use server"

import { revalidatePath } from "next/cache"
import { getAuthSession } from "@/utils/auth"
import { prisma } from "@/utils/connect"

const checkAdmin = async () => {
  const session = await getAuthSession()

  if (!session?.user?.email) {
    throw new Error("Unauthorized")
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      isAdmin: true,
    },
  })

  if (!user?.isAdmin) {
    throw new Error("Forbidden")
  }
}

export const createOffer = async (formData: FormData) => {
  await checkAdmin()

  const badge = String(formData.get("badge") || "Limited Time")
  const title = String(formData.get("title") || "")
  const description = String(formData.get("description") || "")
  const buttonText = String(formData.get("buttonText") || "Order Now")
  const image = String(formData.get("image") || "/offerFood.png")
  const endDate = new Date(String(formData.get("endDate")))
  const isActive = formData.get("isActive") === "on"

  if (!title || !description) {
    throw new Error("Title and description are required")
  }

  if (isNaN(endDate.getTime())) {
    throw new Error("Invalid end date")
  }

  // Only one offer can be active
  if (isActive) {
    await prisma.offer.updateMany({
      where: {
        isActive: true,
      },
      data: {
        isActive: false,
      },
    })
  }

  await prisma.offer.create({
    data: {
      badge,
      title,
      description,
      buttonText,
      image,
      endDate,
      isActive,
    },
  })

  revalidatePath("/dashboard/offers")
  revalidatePath("/")
}

export const updateOffer = async (formData: FormData) => {
  await checkAdmin()

  const id = String(formData.get("id") || "")
  const badge = String(formData.get("badge") || "Limited Time")
  const title = String(formData.get("title") || "")
  const description = String(formData.get("description") || "")
  const buttonText = String(formData.get("buttonText") || "Order Now")
  const image = String(formData.get("image") || "/offerFood.png")
  const endDate = new Date(String(formData.get("endDate")))
  const isActive = formData.get("isActive") === "on"

  if (!id) {
    throw new Error("Offer ID is required")
  }

  if (!title || !description) {
    throw new Error("Title and description are required")
  }

  if (isNaN(endDate.getTime())) {
    throw new Error("Invalid end date")
  }

  // Deactivate other offers if this one becomes active
  if (isActive) {
    await prisma.offer.updateMany({
      where: {
        isActive: true,
        NOT: {
          id,
        },
      },
      data: {
        isActive: false,
      },
    })
  }

  await prisma.offer.update({
    where: {
      id,
    },
    data: {
      badge,
      title,
      description,
      buttonText,
      image,
      endDate,
      isActive,
    },
  })

  revalidatePath("/dashboard/offers")
  revalidatePath("/")
}

export const deleteOffer = async (formData: FormData) => {
  await checkAdmin()

  const id = String(formData.get("id") || "")

  if (!id) {
    throw new Error("Offer ID is required")
  }

  await prisma.offer.delete({
    where: {
      id,
    },
  })

  revalidatePath("/dashboard/offers")
  revalidatePath("/")
}