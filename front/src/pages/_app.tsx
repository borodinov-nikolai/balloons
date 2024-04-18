import type { AppProps } from "next/app"
import '../public/styles/globals.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
