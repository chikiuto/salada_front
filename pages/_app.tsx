import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react';

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>saladays</title>
    </Head>

    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  </>
  
}
