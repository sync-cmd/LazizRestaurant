import Image from 'next/image'
import CountDown from './CountDown'
import { prisma } from '@/utils/connect'
import Link from 'next/link'

const Offer = async () => {
  const offer = await prisma.offer.findFirst({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (!offer) {
    return null
  }

  return (
    <div className="relative flex min-h-[70vh] flex-col overflow-hidden bg-[linear-gradient(135deg,#6f2d14_0%,#b24a19_45%,#e07a2d_100%)] md:flex-row md:justify-between">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(/offer.png)`,
        }}
      />

      {/* Content */}
      <div className="relative flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center md:p-10 lg:p-12">

        <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#f97316] sm:text-sm inline-flex  gap-2  rounded-full border border-[#f3c58f] bg-[#fff1d8] px-4 py-2  w-fit">
          {offer.badge}
        </p>

        <h1 className="text-2xl font-bold leading-tight text-[#7a2e0e] sm:text-3xl xl:text-4xl">
          {offer.title}
        </h1>

        <p className="px-4 text-[#7a2e0e] sm:px-8 xl:text-xl">
          {offer.description}
        </p>

        <CountDown endDate={offer.endDate.toISOString()} />
        <Link href={`./menu/burgers`}>
        <button className="rounded-full bg-[#f97316] px-5 py-2.5 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-[#ea580c]">
          {offer.buttonText}
        </button>
        </Link>
      </div>

      {/* Food Image */}
      <div className="relative mt-10 min-h-[50vh] w-full flex-1 md:mt-0 md:min-h-full">
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          className="object-contain"
        />
      </div>
    </div>
  )
}

export default Offer