import dynamic from 'next/dynamic'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Transition } from '@headlessui/react'

export default function Home({projects}) {
  const LadyJustice = dynamic(() => import('./components/LadyJustice'))
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0)
  const [isShowing, setIsShowing] = useState(false)
  const [hasContacted, setHasContacted] = useState(false)
  const router = useRouter()
  const { detect } = require('detect-browser')
  const browser = detect()
  const timeOfVisit = (new Date).toString()

  const switchProject = (index: number) => {
    router.push('/#portfolio')
    setSelectedProjectIndex(index)
    setIsShowing(true)
  }

  const gpu = () => {
    const canvas = document.createElement('canvas');
    let gl: any = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    let debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    let vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
    let renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)

    return vendor+':::'+renderer
  }

  const submitter = async (event: any) => {
    event.preventDefault()
    setHasContacted(true)
    let {target} = event

    await fetch('https://formsubmit.co/cristianjuarezdev@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _captcha: "false",
        _template: "table",
        _subject: "New submission sent at: " + (new Date()).toString(),
        name: target[1].value,
        email: target[2].value,
        message: target[3].value,
        timeOfVisit: timeOfVisit,
        timeOfSubmission: (new Date()).toString(),
        referrer: document.referrer,
        browser: JSON.stringify(browser),
        userAgent: window.navigator.userAgent,
        screenDimensions: screen.width+'x'+screen.height,
        cores: navigator.hardwareConcurrency,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent).toString,
        gpu: gpu(),
        language: window.navigator.language,
        cookie: document.cookie,
      })
    }).then(()=>{router.push('/thankyou')})
  }

  return (
    <>
      <Head>
        <title>Cristian Juarez - Home</title>
        <meta name="description" content="Cristian is a web developer from Argentina"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <section className='hero md:grid-cols-2 relative md:max-h-screen'>
       <article className='min-h-[60vh] md:min-h-screen'>
          <h1 className='md:text-[2.75rem] text-center md:text-start font-semibold whitespace-nowrap'>Hello, my name is Cristian</h1>
          <h5 className='md:text-[1rem] text-center md:text-start'>Let’s craft stellar software solutions with pleasing<br/>UI/UX and clever backend design</h5>
          <Link className='cta rounded-3xl md:rounded-bl-none mx-auto md:mx-0 w-full text-xs px-8 py-2 md:text-base md:px-8 md:py-2' href='#contact'>Contact</Link>
          <img className='md:block absolute bottom-60 inset-x-0 unahur w-[50vw] mx-auto md:mx-0 md:w-[12rem] md:left-[var(--p-inline)] md:bottom-12 invert' src="/UNAHUR-logo.png" alt="Student at UNAHUR"/>
        </article>
        <article className='backdrop-grayscale-100 z-[-5] relative flex align-center justify-center max-h-[40vh] md:static md:max-h-screen'>
          <LadyJustice/>
          <img className='absolute filter-badge bottom-8 md:w-[30vw] md:blur-bg md:right-[var(--p-inline)] md:bottom-[1rem]' src="https://streak-stats.demolab.com?user=cristianjuarezz&theme=vue&hide_border=true&date_format=M%20j%5B%2C%20Y%5D&background=ffffff00&ring=FF5B83&fire=FF5B83&dates=ffffff66&currStreakLabel=FF5B83&sideLabels=FF5B83" width="100%" alt="activity graph"/>
        </article>
      </section>
      <section id='portfolio' className='pt-24 min-h-screen relative blur-bg'>
        <h2 className='text-center font-semibold text-xl md:text-3xl mb-12'>{(!isShowing)?"These are some of my works":projects[selectedProjectIndex]?.name}</h2>
        <h4 className='text-6xl md:text-[14rem] font-black opacity-10 absolute top-12 md:top-4 left-16 z-[-1]'>Projects</h4>
        <Transition
          show={!isShowing}
          enter="transition duration-[300ms] delay-[300ms]"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition duration-[300ms] ease-in-out"
          leaveFrom="opacity-100 scale-100 "
          leaveTo="opacity-0 scale-95"
          className="flex items-center justify-between flex-wrap gap-10 md:content-center md:min-h-[60vh]"
        >
          {
            projects.map((project: any, index: any) => {
              return <div key={index} className='w-[80vw] mx-auto md:w-auto md:h-3/6 basis-auto md:basis-[20vw]'><img draggable='false' className='object-cover md:object-fill' onClick={() => switchProject(index)} src={project.img} alt={project.alt} /></div>
            })
          }
        </Transition>
        <Transition
          show={isShowing}
          enter="transition duration-[300ms] delay-[300ms]"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="duration-[300ms] transition ease-in-out"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="px-[6vw] pt-40 absolute inset-0 flex flex-col"
        >
          <article className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Image draggable='false' width={600} height={400} className='object-contain mb-10 w-fit h-auto rounded-2xl' src={projects[selectedProjectIndex]?.img} alt={projects[selectedProjectIndex]?.alt}/>
            <div className='flex-col items-start'>
              <h3 className='text-base mb-4 font-medium'>{projects[selectedProjectIndex]?.alt}</h3>
              <p className='text-sm mb-5 text-justify'>{projects[selectedProjectIndex]?.description}</p>
              <Link href={projects[selectedProjectIndex]?.source} target='_blank'>Live Project</Link>
              <Link href={projects[selectedProjectIndex]?.code} target='_blank'>Source Code</Link>
            </div>
          </article>
          <hr className='mt-10 mb-2'/>
          <h6 className='text-center cursor-pointer' onClick={() => setIsShowing(false)}>Back</h6> </Transition>
      </section>  
      <section className='pt-20 min-h-screen relative'>
        <h2 className='text-center font-semibold text-xl md:text-3xl mb-12'>A designer, maker and problem solver</h2>
        <h4 className='text-6xl md:text-[14rem] font-black opacity-10 absolute top-12 md:top-4 left-16 z-[-1]'>About me</h4>
        <div className='flex sm:flex-col justify-evenly'>
          <p className='text-justify md:text-4xl md:pl-28 font-black opacity-80 cursor-default'>
            I'm a computer science student at <Link className='black underline' href='https://unahur.edu.ar' target='_blank'>UNAHUR</Link>, who enjoys software development focused on the front-end and data science projects
            I also like sharing a little bit of my life, mainly related to the stuff that I have learned over the years in my blog.<br/><br/>
            If you have a good opportunity that matches my skills and experience then don't hesitate to contact me.<br/>
          </p>
        </div>
      </section>
      <section id='contact' className='pt-20 min-h-screen relative'>
        <h2 className='text-center font-semibold text-xl md:text-3xl mb-12'>Let's get in contact soon!</h2>
        <h4 className='text-6xl md:text-[14rem] font-black opacity-10 absolute top-12 md:top-4 left-16 z-[-1]'>Let's talk</h4>
        <div className='grid grid-cols-auto md:grid-cols-2 gap-10'>
          <div className=''>
            <h3 className='font-semibold text-2xl mb-8'>You can find me here</h3>
            <p>Amet velit velit dicta est accusamus adipisci. Temporibus explicabo itaque doloremque maiores soluta Nam corrupti vitae qui rerum molestiae nisi omnis. Optio vero obcaecati cupiditate hic quidem! Beatae consequatur quaerat</p>
            <ul className='flex gap-6 mt-8'>
              <li><Link href='https://www.linkedin.com/in/cristian-juarez-dev' target='_blank'>LinkedIn</Link></li>
              <li><Link href='https://github.com/cristianjuarezz' target='_blank'>Github</Link></li>
              <li><Link href='https://t.me/MrSatoshiDev' target='_blank'>Telegram</Link></li>
            </ul>
          </div>
          <form onSubmit={submitter} action="https://formsubmit.co/cristianjuarezdev@gmail.com" method="POST">
            <input type="text" name="_honey" className='hidden'/>
            <h3 className='font-semibold text-2xl mb-8'>Send me a message!</h3>
            <input type="text" name="name" placeholder='John Doe' required/><br/>
            <input type="email" name="email" placeholder='johndoe@somewhere.com' required/><br/>
            <textarea className='p-8 text-justify' name="message" placeholder='Hey there!' minLength={30} autoCapitalize='sentences' cols={30} rows={6} required></textarea>
            
            <button className={(hasContacted)?'hidden':'cta'} type="submit">Deliver your message!</button>
            <span className={(!hasContacted)?'hidden':'pointer-events-none select-none'}>Your message is flying to my postmail ~</span>
          </form>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch("https://api.notion.com/v1/databases/2f777e3d6360452dae7d1645b1dd4057/query", {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer secret_WoVxiKBB2B1NuOOLb9bXetALJfRYGdFEInGxZk03thA',
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
  
  return { props: {projects}, revalidate: 60 }
}
