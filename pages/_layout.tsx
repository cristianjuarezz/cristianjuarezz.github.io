import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ClientDataContextProvider } from '../DataContext'

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
      <header>
        <nav className='z-50'>
          <div className='flex gap-4'>
            <Link className='font-bold' href='/'>Cristian.js</Link>
            <span onClick={switchTheme} className='cursor-pointer'>{theme?'◑':'◐'}</span>
          </div>
          <ul>
            <li><Link href='/blog'>Blog</Link></li>
            <li><Link href='/#portfolio'>Portfolio</Link></li>
            <li><Link href='/#contact'>Contact</Link></li>
          </ul>
        </nav>
      </header>
      <ClientDataContextProvider>
        {children}
      </ClientDataContextProvider>
    </main>
  )
}
