import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { ClientDataContext } from '../DataContext'

export default function Home({projects}) {
  const LadyJustice = dynamic(() => import('./components/LadyJustice'))
  const Projects = dynamic(() => import('./components/home/Projects'))
  const [hasContacted, setHasContacted] = useState(false)
  const dataContext = useContext(ClientDataContext)
  
  const submitter = async (event: any) => {
    event.preventDefault()
    setHasContacted(true)
    const {clientData} = dataContext
    const {target} = event
    const formurl = "https://formsubmit.co/c66f6befd22867ac809fdbc79f1745f5"

    const formData = {
      name: target[1].value,
      email: target[2].value,
      message: target[3].value,
      _subject: "New submission sent at: " + (new Date()).toString(),
      timeOfSubmission: (new Date()).toString(),
      ...clientData
    }

    await fetch(formurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData),
    })
  }

  return (
    <>
      <Head>
        <title>𝐂𝐫𝐢𝐬𝐭𝐢𝐚𝐧 • 𝐍𝐞𝐱𝐭𝐉𝐒★𝐒𝐐𝐋</title>
        <meta name="description" content="Cristian is a web developer from Argentina"/>
        <meta name="viewport" content="height=device-height, initial-scale=1"/>
      </Head>
      <section className='hero'>
       <article className='h-screen relative pt-40 md:pt-0 overflow-hidden'>
          <h1 className='md:text-[2.75rem] text-start font-semibold whitespace-nowrap'>Hello, my name is Cristian</h1>
          <h5 className='md:text-[1rem] text-start'>Let’s craft stellar software solutions with pleasing<br/>UI/UX and clever backend design</h5>
          <Link className='cta rounded-3xl rounded-bl-none mx-0 w-full text-xs px-8 py-2 md:text-base md:px-8 md:py-2' href='#contact'>Contact</Link>
          <img className='md:block absolute bottom-12 inset-x-0 unahur w-[50vw] md:w-[12rem] invert' src="/UNAHUR-logo.png" alt="Student at UNAHUR"/>
          <LadyJustice/>
        </article>
      </section>
      <section id='portfolio' className='pt-24 min-h-screen relative blur-bg'>
        <Projects projects={projects}/>
      </section>  
      <section id='contact' className='pt-20 min-h-screen relative'>
        <h2 className='text-center font-semibold text-xl md:text-3xl mb-12'>A designer, maker and problem solver</h2>
        <div className='grid grid-cols-auto md:grid-cols-2 gap-10'>
          <div className=''>
            <h3 className='font-semibold text-xl mb-8'>You can find me here</h3>
            <p className='text-justify font-black opacity-80 cursor-default'>
              I'm a computer science student at <Link className='black underline' href='https://unahur.edu.ar' target='_blank'>UNAHUR</Link>, who enjoys software development focused on the front-end and data science projects.
              I also like sharing a little bit of my life, mainly related to what I have learned over the years in my blog.<br/><br/>
              If you have a good opportunity that matches my skills and experience then don't hesitate to contact me.<br/>
            </p>
            <ul className='flex gap-6 mt-8'>
              <li><Link href='https://www.linkedin.com/in/cristian-juarez-dev' target='_blank'>LinkedIn</Link></li>
              <li><Link href='https://github.com/cristianjuarezz' target='_blank'>Github</Link></li>
              <li><Link href='https://t.me/MrSatoshiDev' target='_blank'>Telegram</Link></li>
            </ul>
          </div>
          <form onSubmit={submitter} action='' method="POST">
            <input type="text" name="_honey" className='hidden'/>
            <h3 className='font-semibold text-xl mb-8'>Let's get in contact!</h3>
            <input type="text" name="name" placeholder='John Doe' required/><br/>
            <input type="email" name="email" placeholder='johndoe@somewhere.com' required/><br/>
            <textarea className='p-8 text-justify' name="message" placeholder='Hey there!' minLength={30} autoCapitalize='sentences' cols={30} rows={5} required></textarea>
            <button className={(hasContacted)?'hidden':'cta'} type="submit">Deliver your message!</button>
            <span className={(!hasContacted)?'hidden':'pointer-events-none select-none'}>Your message is flying to my postmail ~</span>
          </form>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch(process.env.PROJECTS_DB+'', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+process.env.NOTION_TOKEN,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then(data => data.results)

  const projects = data.map( ({properties}) => {
    return {
      name: '' || properties.Name.title[0]?.plain_text,
      description: '' || properties.Description.rich_text[0]?.plain_text,
      source: '' || properties.Source.url,
      code: '' || properties.Code.url,
      img: '' || properties.Image.files[0]?.file.url,
      alt: '' || properties.Caption.rich_text[0]?.plain_text,
    }
  })
  return { props: {projects}, revalidate: 1 }
}
