import { useEffect, useState } from "react"
import App, { AppContext, AppProps } from "next/app"
import Head from "next/head"
import { getMediaUrl } from "lib/media"
import { API } from "lib/api"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { ThemeProvider } from "@mui/material/styles"
import { AuthProvider } from "context/AuthProvider"
import ruLocale from "date-fns/locale/ru"
import Loader from "components/Loader"
import theme from "styles/theme"
import "styles/globals.scss"
import { useRouter } from "next/router"
import { StyledEngineProvider } from "@mui/material"
import { GlobalContext } from "context"

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { global } = pageProps
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [isCaptchaVerified, setCaptchaVerified] = useState<boolean>(false)

  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.pathname ? setLoading(true) : setLoading(false)
    }
    const handleComplete = (url: string) => setLoading(false)

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)
  }, [loading, router])

  return loading ? (
    <Loader />
  ) : (
    <GlobalContext.Provider
      value={{
        ...global,
        setCaptchaVerified,
        isCaptchaVerified,
      }}
    >
      <Head>
        <link rel="shortcut icon" href={getMediaUrl(global?.favicon)} />
      </Head>
      <StyledEngineProvider injectFirst>
        <LocalizationProvider
          adapterLocale={ruLocale}
          dateAdapter={AdapterDateFns}
        >
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </StyledEngineProvider>
    </GlobalContext.Provider>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx: AppContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const { data: global } = await API.get("/global", {
    params: {
      populate: {
        favicon: "*",
        defaultSeo: { populate: "*" },
      },
    },
  })
  // Pass the data to our page via props
  return {
    ...appProps,
    pageProps: { global },
  }
}

export default MyApp
