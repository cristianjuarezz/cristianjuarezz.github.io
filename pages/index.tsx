import Projects from './components/Projects'
import Head from 'next/head'
//import LadyJustice from './components/LadyJustice'

export default function Home() {

  return (
    <>
      <Head>
        <title>𝐂𝐫𝐢𝐬𝐭𝐢𝐚𝐧 • Portfolio</title>
      </Head>
      <section className='hero pt-28 overflow-hidden md:overflow-visible'>
        <img draggable='false' className='dn rounded-[10rem] h-28 md:h-36 aspect-square md:h-48 mx-auto mb-6 overflow-hidden relative' src="https://avatars.githubusercontent.com/u/84170516?v=4" alt="" />
        <img draggable='false' className='dn rounded-[10rem] h-48 md:mt-8 mx-auto invert' src="https://github-readme-streak-stats.herokuapp.com?user=cristianjuarezz&theme=transparent&hide_border=true&mode=weekly&background=00000000&ring=000000&border=000000&stroke=000000&fire=000000&currStreakNum=000000&sideNums=000000&currStreakLabel=000000&sideLabels=000000&dates=000000&excludeDaysLabel=000000)" alt="" />
        <Projects/>
      </section>
    </>
  )
}
