"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { AiOutlineHeart, AiOutlineInstagram } from 'react-icons/ai'

const galleryItems = [
    { src: '/gallery/a1.jpg', alt: 'Warm dining ambience', category: 'Ambience' },
    { src: '/gallery/f1.jpg', alt: 'Signature biryani dish', category: 'Food' },
    { src: '/gallery/bs1.jpg', alt: 'Chef cooking with spices', category: 'Behind the Scenes' },
    { src: '/gallery/a2.jpg', alt: 'Cozy restaurant corner', category: 'Ambience' },
    { src: '/gallery/f2.jpg', alt: 'Refreshing drinks served chilled', category: 'Food' },
    { src: '/gallery/c1.jpg', alt: 'Friends enjoying a meal together', category: 'Happy Customers' },
    { src: '/gallery/f5.jpg', alt: 'LAZIZ restaurant entrance', category: 'Food' },
    { src: '/gallery/f4.jpg', alt: 'Decadent dessert on a plate', category: 'Food' },
    { src: '/gallery/c3.jpg', alt: 'Friends enjoying a meal together', category: 'Happy Customers' },
    { src: '/gallery/a3.jpg', alt: 'Cozy restaurant corner', category: 'Ambience' },
    { src: '/gallery/bs2.jpg', alt: 'Chef cooking with spices', category: 'Behind the Scenes' },
    { src: '/gallery/c2.jpg', alt: 'Friends enjoying a meal together', category: 'Happy Customers' },



]

const categories = ['All', 'Ambience', 'Food', 'Behind the Scenes', 'Happy Customers']

const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState('All')

    const filteredItems =
        activeCategory === 'All'
            ? galleryItems
            : galleryItems.filter((item) => item.category === activeCategory)

    return (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#f97316] sm:text-sm inline-flex  gap-2  rounded-full border border-[#f3c58f] bg-[#fff1d8] px-4 py-2  w-fit">
                            Gallery
                        </div>
                <h2 className="mt-4 text-4xl font-semibold text-[#7a2e0e] sm:text-5xl">
                    A Feast for the Eyes
                </h2>
                 <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-[#f97316]" />
                {/* <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#7a2e0e] sm:text-lg">
                    From our kitchen to your table — explore moments, flavors, and experiences that make LAZIZ special.
                </p> */}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-[#4a2d1c]">
                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className={`rounded-full px-5 py-2 transition ${activeCategory === category
                                ? 'bg-[#3d2a0d] text-white shadow-sm'
                                : 'bg-[#f8efdf] text-[#7a2e0e] hover:bg-[#f4d29d]'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
                {filteredItems.map((item) => (
                    <div key={item.src} className="group relative overflow-hidden rounded-4xl border border-[#f0d3ae] bg-[#fffaf2] shadow-[0_16px_40px_rgba(122,61,22,0.08)]">
                        
                        <div className="relative h-72 w-full">
                            <Image src={item.src} alt={item.alt} fill className="object-cover transition duration-700 group-hover:scale-105" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#e2c1a0] bg-[#fff2e6] px-4 py-2 text-sm font-semibold text-[#7a2e0e] shadow-sm">
                    <AiOutlineInstagram className="text-lg" />
                    Follow us on Instagram — @laziz.kitchen
                </div>
            </div>
        </section>
    )
}

export default Gallery
