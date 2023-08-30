import { Transition } from "@headlessui/react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Projects(){
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0)
  const [isShowing, setIsShowing] = useState(false)
  const [projects, setProjects] = useState<any[]>([])

  const switchProject = (index: number) => {
    setSelectedProjectIndex(index)
    setIsShowing(true)
  }

  async function fetchProjects(){
    const newProjects = await fetch('https://primrose-backend.vercel.app/api/notion/projects')
      .then(res => res.json())
      .then(projects => projects['newProjects'])
      .catch(err => console.log(err))

    if(!isShowing) setProjects(newProjects?.reverse())

    /*setTimeout(() => {
      fetchProjects()
    }, 20000)*/
  }

  useEffect(()=>{
    fetchProjects()
  },[])

  return (!projects || projects?.length == 0)?<h1 className="text-center font-bold">Waiting for projects...</h1>:(
    <>
      <h2 className='text-center md:hidden font-bold md:text-2xl mb-8 md:mb-12 cursor-default'>{(!isShowing)?"Take a look at my works":projects[selectedProjectIndex]?.name}</h2>
      <Transition
          show={!isShowing}
          enter="transition duration-[300ms] delay-[300ms]"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition duration-[300ms] ease-in-out"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
        <div className="grid grid-cols-3 px-12 gap-2 md:gap-6">
          {
            projects?.map((project: any, index: any) => 
              <div key={index} className='project relative rounded-[100rem] hover:rounded-bl-none hover:scale-125 aspect-square overflow-hidden'>
                <Image fill draggable='false' className='object-cover cursor-pointer h-full' onClick={() => switchProject(index)} src={project.img} alt={project.alt} />
              </div>
            )
          }
        </div>
        </Transition>
        <Transition
          show={isShowing}
          enter="transition duration-[300ms] delay-[300ms]"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transition duration-[300ms] ease-in-out"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="px-6 md:px-20 mb-60 md:mb-14"
        >
          <article className='grid grid-cols-1 gap-6'>
            <div className='flex-col items-start'>
              <h3 className='text-base mb-4 font-bold'>{projects[selectedProjectIndex]?.alt}</h3>
              <Image draggable='false' width={600} height={400} className='object-contain w-fit h-auto rounded-2xl rounded-bl-none mb-8' src={projects[selectedProjectIndex]?.img} alt={projects[selectedProjectIndex]?.alt}/>
              <p className='text-sm text-justify tracking-wide mb-12'>{projects[selectedProjectIndex]?.description}</p>
              <div className="flex flex-row gap-4 flex-wrap">
                <Link className="cta rounded-3xl rounded-bl-none px-8 py-2 text-sm" href={projects[selectedProjectIndex]?.source} target='_blank'>Live Project</Link>
                <Link className="cta-2 rounded-3xl rounded-bl-none px-8 py-2 text-sm" href={projects[selectedProjectIndex]?.code} target='_blank'>Source Code</Link>
                <Link className="cta-2 rounded-3xl rounded-bl-none px-8 py-2 text-sm md:ml-auto" href='' onClick={() => setIsShowing(false)}>Back</Link>
              </div>
            </div>
          </article>
        </Transition>
    </>
  )
}
