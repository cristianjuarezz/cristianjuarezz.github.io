const variance = Array.from({length:10}, (_,i) => i + Math.random())

export default function KeywordsCloud(){
  const keywords = [
    'CI/CD',
    'SQL',
    'MongoDB',
    'SASS',
    'React',
    'NextJS',
    'Sequelize',
    'Python'
  ]

  function clampedAngle(index: number){
    return (index < 6)? index : index + 4
  }

  return (
    <div className="relative select-none ml-[18vh] z-[-10] blur-[4px] md:blur-0 opacity-60 md:opacity-100 translate-y-[-22vh] md:translate-y-0 md:mt-24">
    {
      keywords.map((keyword, index) => {
        const keywordAngle = (clampedAngle(index) * 32) + "deg"
        return <span style={{transform:"rotateZ("+keywordAngle+")", animationDelay:index*3+variance[index]+"s"}} className="keyword" key={index}><h5 style={{transform:"rotateZ(-"+keywordAngle+")"}} className="family-unna font-bold text-xl">{keyword}</h5></span>
      })
    }
    </div>
  )
}
