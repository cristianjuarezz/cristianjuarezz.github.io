import '../styles/globals.sass'
import Layout from './_layout'
import type { AppProps } from 'next/app'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const variants = {
    hidden: { opacity: 0, x: 0, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 0 },
  }

  return (
    <AnimatePresence>
      <Layout>
        <motion.div key={useRouter().route} transition={{duration: 0.3}} variants={variants} initial='hidden' animate='enter'>
            <Component {...pageProps}/>
        </motion.div>
      </Layout>
    </AnimatePresence>
  )
}
