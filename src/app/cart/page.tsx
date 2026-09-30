"use client"

import  { useEffect } from 'react'
import Image from 'next/image'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCartStore } from '@/utils/store';

const CartPage = () => {

  const { products, totalItems, totalPrice, removeFromCart, updateQuantity } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  return (
    <div
      className='min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-9rem)] flex items-center justify-center px-4 py-6 text-[#7a2e0e]'
      
    >
      <div className='w-full max-w-300 rounded-[3rem]  p-6 shadow-[0_24px_80px_rgba(122,46,14,0.16)] backdrop-blur-sm md:p-8 bg-[#feebcf]/30'>
        <div className='mb-8 text-center '>
          <p className='inline-flex  gap-2  rounded-full border border-[#f3c58f] bg-[#fff1d8] px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#7a2e0e] w-fit'>Cart </p>
          <h1 className='text-3xl font-bold text-[#7a2e0e] sm:text-4xl underline'>Order Summary</h1>
        </div>

        <div className='grid gap-6 lg:grid-cols-[1.5fr_0.9fr] lg:items-start'>
          
            
            <div className='max-h-[60vh] space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-[#fff2e6] scrollbar-thumb-[#fbcf91]'>
              {products.length === 0 ? (
                <div className='rounded-4xl bg-white p-8 text-center text-[#7a2e0e]'>
                  Your cart is empty. 
                </div>
              ) : (
                products.map(item => (
                  <article
                    className='flex flex-col gap-4 rounded-4xl border border-[#f3c58f] bg-white p-4 shadow-[0_12px_35px_rgba(122,46,14,0.12)] sm:flex-row sm:items-center'
                    key={`${item.id}-${item.optionTitle ?? 'default'}`}
                  >
                    {item.img && (
                      <div className='shrink-0 overflow-hidden rounded-3xl bg-[#fff7eb] p-2'>
                        <Image src={item.img} alt={item.title} height={100} width={100} />
                      </div>
                    )}
                    <div className='flex-1'>
                      <h3 className='text-lg font-bold text-[#4a2d1c]'>{item.title}</h3>
                      <p className='text-sm text-[#7a2e0e]'>{item.optionTitle}</p>
                      <p className='mt-2 text-base font-semibold text-[#7a2e0e]'>₹{item.price}</p>
                    </div>
                    <div className='flex w-fit  items-center justify-between gap-3 rounded-full border border-[#f7d5aa] p-3 text-[#4a2d1c] sm:w-auto'>
                      <button
                        className='h-9 w-9 rounded-full bg-[#f7d5aa] text-xl font-bold transition hover:bg-[#f6c18d]'
                        onClick={() => updateQuantity(item, -1)}
                      >
                        -
                      </button>
                      <span className='font-bold'>{item.quantity}</span>
                      <button
                        className='h-9 w-9 rounded-full bg-[#f7d5aa] text-xl font-bold transition hover:bg-[#f6c18d]'
                        onClick={() => item.quantity < 10 && updateQuantity(item, 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className='ml-auto text-xl text-[#c2410c] transition hover:text-[#9a3412] sm:ml-0'
                      onClick={() => removeFromCart(item)}
                      aria-label={`Remove ${item.title}`}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </article>
                ))
              )}
            </div>
        
          <aside className='sticky top-6 rounded-4xl border border-[#fab86d] bg-white p-7 shadow-[0_12px_35px_rgba(122,46,14,0.12)]'>
            <h2 className='mb-6 text-2xl font-bold text-[#4a2d1c] underline'>Summary</h2>
            <div className='space-y-4 text-[#7a2e0e]'>
              <div className='flex items-center justify-between'>
                <span>Subtotal ({totalItems} items)</span>
                <span className='font-semibold'>₹{totalPrice}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>Service Cost</span>
                <span>₹0</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>Delivery cost</span>
                <span className='text-green-500 font-semibold'>FREE!</span>
              </div>
            </div>
            <hr className='my-6 border-[#f3c58f]' />
            <div className='flex items-center justify-between text-lg font-bold text-[#4a2d1c]'>
              <span>Total (incl. GST)</span>
              <span>₹{totalPrice}</span>
            </div>
            <button className='mt-8 w-full rounded-full bg-[#f97316] px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-[#ea580c]'>
              Checkout
            </button>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default CartPage