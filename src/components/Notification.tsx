import React from 'react'
import { TbTruckDelivery } from 'react-icons/tb'

const Notification = () => {
  return (
    <div className="flex h-12 w-full cursor-pointer items-center justify-center whitespace-nowrap bg-[#7a2e0e] px-3 text-center text-[10px] text-[#fff7eb] sm:px-4 sm:text-[11px] md:text-xs lg:text-sm">
  <TbTruckDelivery className="mr-2 shrink-0 text-base sm:text-lg" />
  <span>Free Delivery for all orders over ₹299. Order your food now!</span>
</div>
  )
}

export default Notification