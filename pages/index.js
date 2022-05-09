import styles from '../styles/Home.module.sass'
import Image from 'next/image'
import Header from './components/Header/Header'
import Social from './components/Social/Social'
import Bow from './components/Figures/Bow'

export default function Home() {
	return (
		<main role="main" className="grad">
			<Header/>
			<section className={styles.container}>
				<article className={styles.hero}>
					<h1>Cristian Juarez</h1>
					<h2>Software Developer</h2>
					<div className="line"></div>
					<div className="bow">
						<a href="https://github.com/cristianjuarezz" target="_blank"><Bow/></a>
					</div>
					<span className={styles.quote}>I build software solutions from <b>websites</b> to mobile <b>apps</b> with pleasing <b>UI/UX</b> and clever <b>backend</b> design.</span>
					<Social/>
					<h6></h6>
				</article>
			</section>
		</main>
	)
}
