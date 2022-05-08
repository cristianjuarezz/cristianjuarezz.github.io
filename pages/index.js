import styles from '../styles/Home.module.sass'
import Image from 'next/image'
import Header from './components/Header/Header'

export default function Home() {
	return (
		<main role="main" className="grad">
			<Header/>
			<section className={styles.container}>
				<article className={styles.hero}>
					<h1>Cristian Juarez</h1>
					<h2>Software Developer</h2>
					<div className="line"></div>
					<h6>Coming soon.</h6>
				</article>
			</section>
		</main>
	)
}
