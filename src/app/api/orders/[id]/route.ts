import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";


// CHANGE THE STATUS OF AN ORDER
export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  try {
    const body = await req.json();
    const status = typeof body === "string" ? body : body?.status;

    if (typeof status !== "string" || !status.trim()) {
      return new NextResponse(
        JSON.stringify({ message: "Status is required" }),
        { status: 400 }
      );
    }

    await prisma.order.update({
      where: {
        id: id,
      },
      data: { status: status.trim() },
    });
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated!" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};