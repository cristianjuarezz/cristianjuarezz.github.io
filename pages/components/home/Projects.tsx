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
    const newProjects = await fetch("https://primrose-backend.vercel.app/api/notion/projects").then(res => res.json()).then(projects=>projects['newProjects'])

    if(!isShowing) setProjects(newProjects)

    setTimeout(() => {
      fetchProjects()
    }, 500)
  }

  useEffect(()=>{
    fetchProjects()
  },[])


  return (projects.length==0)?<h1 className="text-center">Waiting for projects...</h1>:(
    <>
      <h2 className='text-center font-semibold text-xl md:text-3xl mb-12'>{(!isShowing)?"These are some of my works":projects[selectedProjectIndex]?.name}</h2>
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
            projects?.map((project: any, index: any) => {
              return <div key={index} className='w-[80vw] mx-auto md:w-auto md:h-3/6 basis-auto md:basis-[15vw]'><img draggable='false' className='object-cover md:object-fill' onClick={() => switchProject(index)} src={project.img} alt={project.alt} /></div>
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
            <Image draggable='false' width={600} height={400} className='object-contain mb-10 w-fit h-auto rounded-3xl rounded-bl-none' src={projects[selectedProjectIndex]?.img} alt={projects[selectedProjectIndex]?.alt}/>
            <div className='flex-col items-start'>
              <h3 className='text-base mb-4 font-medium'>{projects[selectedProjectIndex]?.alt}</h3>
              <p className='text-sm mb-5 text-justify'>{projects[selectedProjectIndex]?.description}</p>
              <Link href={projects[selectedProjectIndex]?.source} target='_blank'>Live Project</Link>
              <Link href={projects[selectedProjectIndex]?.code} target='_blank'>Source Code</Link>
            </div>
          </article>
          <hr className='mt-10 mb-2'/>
          <h6 className='text-center cursor-pointer' onClick={() => setIsShowing(false)}>Back</h6>
        </Transition>
    </>
  )
}
