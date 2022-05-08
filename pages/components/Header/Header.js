import styles from '../../../styles/Header.module.sass'
import Head from 'next/head'
import Navigation from './Navigation/Navigation.js';

export default function Header (){
	return (
		<header className={styles.container}>
			<Head>
				<title>We are Majin</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			</Head>
		</header>
	);
};
