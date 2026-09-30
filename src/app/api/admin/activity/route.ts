import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";

export async function GET() {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!session.user.isAdmin) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    const activities = await prisma.adminActivity.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 100,
    });

    return NextResponse.json(activities);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch activity history" },
      { status: 500 }
    );
  }
}