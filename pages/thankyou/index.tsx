import Link from 'next/link'

export default function ThankYou(){
  return (
    <section className='h-screen flex flex-col items-center justify-center'>
      <h1 className='h-fit text-5xl text-center pointer-events-none select-none font-bold'>Thank you</h1>
      <h3 className='h-fit mt-2 text-sm text-center pointer-events-none select-none text skew-x-[-8deg]'>I'll reach you as soon as I read your message</h3>
      <Link className='mt-16 text-sm' href='/'>Back</Link>
    </section>
  )
}
