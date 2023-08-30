import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Cristian is a web developer from Argentina"/>
        <meta name="author" content="Cristian Juarez"/>
        <meta name="copyright" content="Cristian Juarez"/>
        <meta name="keywords" content="developer, frontend, react, nextjs, argentina, sql, junior"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <body>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  )
}
