import { useContext, useState } from 'react'
import { ClientDataContext } from './../../DataContext'
import Head from 'next/head'

export default function Projects(){
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
        <title>𝐂𝐫𝐢𝐬𝐭𝐢𝐚𝐧 • Contact</title>
      </Head>
      <section className='pt-28 pb-6 px-6 md:px-24'>
        <div className='flex gap-10'>
          <form className='flex flex-col w-full gap-4' onSubmit={submitter} action='' method="POST">
            <input type="text" name="_honey" className='hidden'/>
            <h3 className='font-semibold text-xl mb-8'>Let's get in contact!</h3>
            <input type="text" name="name" placeholder='Luke Skywalker' required/>
            <input type="email" name="email" placeholder='lukeskywalker@jedi.com' required/>
            <textarea className='p-8 text-justify' name="message" placeholder='May the force be with you!' minLength={30} autoCapitalize='sentences' cols={30} rows={5} required></textarea>
            <button className={(hasContacted)?'hidden':'cta'} type="submit">Let's do it!</button>
            <span className={(!hasContacted)?'hidden':'pointer-events-none select-none text-sm font-light'}>A little bird delivered the message..</span>
          </form>
          <img src="https://cdn.pixabay.com/photo/2022/07/10/23/09/lady-justice-7313894_640.png" alt="" className='bg-transparent mix-blend-overlay w-40 object-contain invert pointer-events-none select-none absolute right-0 md:relative z-[-1] opacity-20 md:opacity-100'/>
        </div>
      </section>
    </>
  )
}
