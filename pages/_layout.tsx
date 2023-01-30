import { useState } from 'react'
import Link from 'next/link'

export default function Layout ({children}){
  const [theme, setTheme] = useState(false)

  return (
    <main className={theme?'dark':''}>
      <header>
        <nav className='z-50'>
          <div className='flex gap-4'>
            <Link className='font-bold' href='/'>Cristian.js</Link>
            <span onClick={()=>setTheme(!theme)} className='cursor-pointer'>{theme?'◑':'◐'}</span>
          </div>
          <ul>
            <li><Link href='/blog'>Blog</Link></li>
            <li><Link href='/#portfolio'>Portfolio</Link></li>
            <li><Link href='/#contact'>Contact</Link></li>
          </ul>
        </nav>
      </header>
      {children}
    </main>
  )
}
