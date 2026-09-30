import { NextResponse } from 'next/server'
import { prisma } from '@/utils/connect'

export async function GET() {
  try {
    const offer = await prisma.offer.findFirst({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(offer)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to fetch offer' },
      { status: 500 }
    )
  }
}