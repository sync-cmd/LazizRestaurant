import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect"

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        title: true,
        desc: true,
        img: true,
        slug: true,
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        message: "Failed to fetch categories",
      },
      {
        status: 500,
      }
    )
  }
}