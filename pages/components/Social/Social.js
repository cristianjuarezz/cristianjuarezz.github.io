import Image from 'next/image'
import styles from '../../../styles/Social.module.sass'

export default function Social(){
	return (
		<div className={styles.social}>
			<a href="https://www.linkedin.com/in/cristian-juarez-dev" target="_blank" rel="noreferrer noopener"><Image src="/social/LinkedIn.png" alt=""/></a>
			<a href="https://github.com/cristianjuarezz" target="_blank" rel="noreferrer noopener"><Image src="/social/GitHub.png" alt=""/></a>
			<a href="https://t.me/MrSatoshiDev" target="_blank" rel="noreferrer noopener"><Image src="/social/Telegram.png" alt=""/></a>
		</div>
	)
}
