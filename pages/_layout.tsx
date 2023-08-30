import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ClientDataContextProvider } from './../DataContext'
import KeywordsCloud from './components/KeywordsCloud'

export default function Layout ({children}){
  const [theme, setTheme] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    setTheme(stored ? JSON.parse(stored) : theme)
  }, [])

  const switchTheme = () => {
    setTheme(!theme)
    localStorage.setItem('theme', JSON.stringify(!theme))
  }

  return (
    <main className={theme?'dark':''}>
      <header className='fixed inset-0 flex flex-col md:left-[50%] px-4 z-10 pointer-events-none'>
        <nav className='flex justify-between md:justify-start pt-6 md:pt-24 pointer-events-auto'>
          <ul className='flex gap-2 text-sm'>
            <li><Link href='/blog'>Blog</Link></li>
            <li><Link href='/'>Portfolio</Link></li>
            <li><Link href='/about'>About</Link></li>
          </ul>
          <div className='flex ml-4'>
            <span onClick={switchTheme} className='text-2xl leading-5 md:text-base cursor-pointer'>{theme?'◑':'◐'}</span>
          </div>
        </nav>
        <article className='md:h-screen mt-auto md:mt-16 pb-8 md:px-0 backdrop-blur-sm md:backdrop-blur-none pt-6 pointer-events-auto'>
          <img className='rounded-[10rem] h-24 mx-auto dn' src="https://avatars.githubusercontent.com/u/84170516?v=4" alt="" />
          <span className='block w-fit mx-auto md:mx-0'>
            <h3 className='text-base text-end mx-auto md:mx-0 md:ml-auto w-fit font-bold md:translate-y-3'>Hello, my name is</h3>
            <h1 className='text-4xl md:text-7xl family-unna leading-[1] w-fit font-bold text-center md:text-start cursor-default'>Cristian Juarez</h1>
          </span>
          <h2 className='text-sm mt-4 md:mt-0 tracking-wide md:tracking-wider max-w-lg md:text-base'>Let’s craft stellar software solutions with pleasing UI & UX and clever backend design</h2>
          <div className='flex flex-row gap-4 mt-8 text-base'>
            <Link className='rounded-3xl rounded-bl-none mx-0 text-xs px-12 py-2 md:text-base md:px-8 md:py-2 cta' href='/contact'>Let's talk</Link>
            <Link className='rounded-3xl mx-0 text-xs px-12 py-2 md:text-base md:px-8 md:py-2 cta-2' href='/CV_Cristian-Juarez.pdf'>CV Resume</Link>
          </div>
          <KeywordsCloud/>
        </article>
      </header>
      <ClientDataContextProvider>
        {children}
      </ClientDataContextProvider>
    </main>
  )
}
