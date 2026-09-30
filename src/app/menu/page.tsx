import React from 'react'
import Link from 'next/link'
import { MenuType } from '@/types/types'

const getData = async () => {
  const res = await fetch('http://localhost:3000/api/categories', {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed!')
  }

  return res.json()
}

const MenuPage = async () => {
  const menu: MenuType = await getData()

  return (
    <div
      className="min-h-[calc(100vh-6rem)] overflow-hidden px-4 py-8 sm:px-6 md:px-10 lg:px-16 xl:px-24"
     
    >
      {/* Page Header */}
      <div className="mx-auto mb-8 max-w-7xl text-center sm:mb-10 lg:mb-12">
        <h2 className="text-3xl font-bold uppercase tracking-wide text-[#7a2e0e] sm:text-4xl lg:text-5xl">
          Menu
        </h2>

        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#f97316]" />

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#7a2e0e]/80 sm:text-base">
          Explore our delicious selection and find something perfect for you.
        </p>
      </div>

      {/* Categories */}
<div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {menu.map((category) => (
    <Link
      href={`/menu/${category.slug}`}
      key={category.id}
      className="group overflow-hidden rounded-2xl border-2 border-[#d8a15d] bg-[#fff8ed] shadow-[0_8px_25px_rgba(91,55,30,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c47a32] hover:shadow-[0_14px_35px_rgba(91,55,30,0.18)]"
    >
      {/* Image */}
      <div
        className="relative h-52 bg-cover bg-center sm:h-56"
        style={{
          backgroundImage: `url(${category.img})`,
        }}
      >
        {/* Soft image overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#3d2417]/55 via-transparent to-transparent" />

        {/* Category label */}
        <div className="absolute bottom-4 left-4">
          <span className="rounded-full border border-[#f8dfbd] bg-[#fff8ed]/95 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#7a3d16] shadow-sm">
            {category.title}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6">
        <h1 className="text-xl font-bold uppercase tracking-wide text-[#6b3519]">
          {category.title}
        </h1>

        <div className="mt-2 h-0.5 w-10 rounded-full bg-[#d98b3a] transition-all duration-300 group-hover:w-16" />

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#795548]">
          {category.desc}
        </p>

        {/* Explore */}
        <div className="mt-5 flex items-center justify-between border-t border-[#ead2b3] pt-4">
          <span className="text-sm font-semibold text-[#9a5525]">
            Discover
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8a15d] text-[#9a5525] transition-all duration-300 group-hover:bg-[#9a5525] group-hover:text-white">
            →
          </span>
        </div>
      </div>
    </Link>
  ))}
</div>
    </div>
  )
}

export default MenuPage