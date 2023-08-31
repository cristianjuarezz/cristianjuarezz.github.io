import React from 'react'
import Head from 'next/head'

export default function Blog() {
  return (
    <>
      <Head>
        <title>𝐂𝐫𝐢𝐬𝐭𝐢𝐚𝐧 • Blog</title>
      </Head>
      <section className='pt-28 overflow-hidden md:overflow-visible'>
        <img draggable='false' className='rounded-[10rem] h-36 md:h-48 mx-auto mb-6' src="https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2Farchive%2F2c8056831d56bcc55248e05ef38ba83da5a435e9" alt="" />
        <h1 className="text-center font-bold">Here I share tech related topics</h1>
        <div className='keep-out rounded-[10rem] mx-10 md:mx-36'>
          <h3 className='text-sm md:text-base text-center font-bold italic'>Keep out, I'm still working over here!</h3>
        </div>
      </section>
    </>
  )
}
