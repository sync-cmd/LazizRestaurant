import Link from 'next/link'
import Image from 'next/image'
import {  FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FiYoutube } from 'react-icons/fi'
import { LiaFacebook } from 'react-icons/lia'
import { IoCall } from 'react-icons/io5'

const Footer = () => {
  return (
    <footer
      className='border-t border-[#f0d3ae] px-4 py-8 text-[#7a3d16] md:px-6 lg:px-8'
      style={{
        backgroundImage: `url(/footerBG.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
      }}
    >

          <div className=' relative mx-auto lg:ms-13  md:items-left md:flex justify-start lg:justify-center xl:justify-center'>
            <Link href='/'><Image
                        src="/laziz.png"
                        alt=""
                        width={200}
                        height={200}
                        className="-ms-1"
                      /></Link>
          </div>
            <div className='mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-start md:justify-between'>
        <div className='max-w-sm relative text-left'>

          <h3 className='mt-4 text-lg font-semibold uppercase'>Address</h3>
          <p className='mt-2 leading-7'>
            28A, Patliputra Colony Road, <br />
            behind Atal Park, Patna, <br />
            Bihar - 800013.
          </p>
        </div>

        <div className='max-w-sm text-left'>
          <h3 className='text-lg font-semibold uppercase mt-4 '>Open Hours</h3>
          <p className='mt-2 leading-7'>
            Monday - Saturday <br />
            10:00 AM - 10:00 PM
          </p>
          <div className='mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#7a2e0e] px-3 py-1.5 text-white shadow-sm'>
           <IoCall />
            <span className='text-sm font-semibold'>8235112934</span>
          </div>
        </div>

        <div className='max-w-sm text-left  '>
          <h3 className='text-lg font-semibold uppercase mt-4'>Find Us on</h3>
          <div className='mt-3 flex gap-4 text-2xl text-center justify-center'>
            <a href='https://facebook.com' target='_blank' rel='noreferrer'>
              <LiaFacebook />
            </a>
            <a href='https://instagram.com' target='_blank' rel='noreferrer'>
              <FaInstagram />
            </a>
            <a href='https://twitter.com' target='_blank' rel='noreferrer'>
              <FaXTwitter />
            </a>
            <a href='https://youtube.com' target='_blank' rel='noreferrer'>
              <FiYoutube />

            </a>
          </div>
        </div>
      </div>

      <div className='mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-[#f0d3ae] pt-4 text-sm text-[#7a3d16]/80 sm:flex-row sm:items-center sm:justify-between'>
        <p>© 2026 | All rights reserved.</p>
        <div className='flex flex-wrap gap-4'>
          <Link href='/privacy_policy' className='transition hover:text-[#f97316]'>Privacy Policy</Link>
          <Link href='/terms' className='transition hover:text-[#f97316]'>Terms</Link>
          <Link href='/contact' className='transition hover:text-[#f97316]'>Contact</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer