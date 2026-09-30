import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";

export async function PUT(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const data: {
      name?: string;
      image?: string;
    } = {};

    if (body.name !== undefined) {
      const name = body.name?.trim();

      if (!name) {
        return NextResponse.json(
          { message: "Name is required" },
          { status: 400 }
        );
      }

      data.name = name;
    }

    if (body.image !== undefined) {
      data.image = body.image?.trim() || "";
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { message: "Nothing to update" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Profile update error:", error);

    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}