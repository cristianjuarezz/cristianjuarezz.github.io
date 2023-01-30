import Link from 'next/link'

export default function Blog(props: {}){
  return (
    <section className='h-screen flex flex-col items-center justify-center'>
      <h1 className='h-fit text-5xl text-center pointer-events-none select-none font-bold'>Coming soon</h1>
      <h3 className='h-fit mt-2 text-sm text-center pointer-events-none select-none text skew-x-[-8deg]'>I am still working over here, keep out!</h3>
      <Link className='mt-16 text-sm' href='/'>Back</Link>
    </section>
  )
}
