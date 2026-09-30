"use client"

import { ProductType } from '@/types/types';
import { useCartStore } from '@/utils/store';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';



const Price = ({ product }: { product: ProductType }) => {
    const [total, setTotal] = useState(product.price);
    const [quantity, setQuantity] = useState(1);
    const [selected, setSelected] = useState(0);

    const { addToCart } = useCartStore()

    useEffect(() => {
        if (product.options?.length) {
            setTotal(quantity * product.price + product.options[selected].additionalPrice);
        }
    }, [quantity, selected, product])

const handleCart = ()=>{
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: total,
      ...(product.options?.length && {
        optionTitle: product.options[selected].title,
      }),
      quantity: quantity,
    })
    toast.success("The product added to the cart!")
  }

    return (
        <div className=' flex flex-col  gap-4'>
            <h2 className=' text-2xl text-[#f97316] font-bold'>₹{total}</h2>
            {/* options container  */}
            <div className=' flex gap-4'>
                {product.options?.length && product.options?.map((option, index) => (
                    <button key={option.title} className='p-2 ring-1 ring-[#eeb575] rounded-md'
                        style={{
                            background: selected === index ? "#f97316" : "transparent",
                            color: selected === index ? "white" : "#3b1f13"
                        }}
                        onClick={() => setSelected(index)}
                    >{option.title}</button>
                ))}
            </div>
            {/*quantity and add button container  */}
            <div className='flex justify-between items-center gap-2'>
                {/* quantity  */}
                <div className='flex justify-between w-full p-3 ring-1 ring-[#eeb575] '>
                    <span>Quantity</span>
                    <div className=' flex gap-4 items-center '>
                        <button className='text-2xl' onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}>{'-'}</button>
                        <span>{quantity}</span>
                        <button className='text-2xl' onClick={() => setQuantity(prev => (prev < 10 ? prev + 1 : 10))}>{'+'}</button>
                    </div>
                </div>
                {/* cart button  */}
                <button className=' uppercase w-56 bg-[#f97316] text-white p-3 rounded-full shadow-sm hover:bg-[#ea580c] transition' onClick={handleCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default Price