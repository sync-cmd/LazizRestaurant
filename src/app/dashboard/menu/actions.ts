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

export const createCategory = async (formData: FormData) => {
  await checkAdmin()

  const title = String(formData.get("title") || "").trim()
  const slug = String(formData.get("slug") || "").trim()
  const desc = String(formData.get("desc") || "").trim()
  const img = String(formData.get("img") || "").trim()

  if (!title || !slug || !desc || !img) {
    throw new Error("All fields are required")
  }

  await prisma.category.create({
    data: {
      title,
      slug,
      desc,
      img,
    },
  })

  revalidatePath("/dashboard/menu")
  revalidatePath("/menu")
  revalidatePath("/api/categories")
}

export const updateCategory = async (formData: FormData) => {
  await checkAdmin()

  const id = String(formData.get("id") || "")
  const title = String(formData.get("title") || "").trim()
  const slug = String(formData.get("slug") || "").trim()
  const desc = String(formData.get("desc") || "").trim()
  const img = String(formData.get("img") || "").trim()

  if (!id) {
    throw new Error("Category ID is required")
  }

  if (!title || !slug || !desc || !img) {
    throw new Error("All fields are required")
  }

  await prisma.category.update({
    where: {
      id,
    },
    data: {
      title,
      slug,
      desc,
      img,
    },
  })

  revalidatePath("/dashboard/menu")
  revalidatePath("/menu")
  revalidatePath("/api/categories")
}

export const deleteCategory = async (formData: FormData) => {
  await checkAdmin()

  const id = String(formData.get("id") || "")

  if (!id) {
    throw new Error("Category ID is required")
  }

  const category = await prisma.category.findUnique({
    where: {
      id,
    },
    select: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  })

  if (!category) {
    throw new Error("Category not found")
  }

  if (category._count.products > 0) {
    throw new Error(
      "This category contains products. Remove or move those products before deleting the category."
    )
  }

  await prisma.category.delete({
    where: {
      id,
    },
  })

  revalidatePath("/dashboard/menu")
  revalidatePath("/menu")
  revalidatePath("/api/categories")
}