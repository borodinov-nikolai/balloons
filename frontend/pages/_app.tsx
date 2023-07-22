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
import { usePathname } from "next/navigation"
import axios from "axios"

declare const window: any

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { global } = pageProps
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const pathname = usePathname()
  const [href, setHref] = useState(router.pathname)

  useEffect(() => {
    if (router.pathname == `/[release]`) {
      window.ym(94315322, "hit", window.location.pathname)
      /*  const getData = async () => {
        const res = await axios
          .get(
            "https://api-metrika.yandex.net/stat/v1/data?dimensions=ym:s:searchEngineName&metrics=ym:s:visits,ym:s:users&filters=ym:s:trafficSourceName=='Переходыизпоисковыхсистем'ANDym:pv:URL=@'help'&id=94315322",
            {
              headers: {
                Authorization:
                  "Bearer y0_AgAEA7qkbq8fAAowRQAAAADn2xuj326ugKWkSRmnGsBEA7S3W6eIfp0",
              },
            }
          )
          .catch((e) => {
            console.log(e)
          })
        await console.log(res)
        await console.log("rere")
      }
      getData() */
    }
  })

  /*   axios
    .get(
      "https://api-metrika.yandex.net/stat/v1/data?dimensions=ym:s:searchEngineName&metrics=ym:s:visits,ym:s:users&filters=ym:s:trafficSourceName=='Переходы из поисковых систем' AND ym:pv:URL=@'help'&id=94315322",
      {
        headers: {
          Authorization:
            "Bearer y0_AgAEA7qkbq8fAAowRQAAAADn2xuj326ugKWkSRmnGsBEA7S3W6eIfp0",
        },
      }
    )
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.log(e)
    }) */

  useEffect(() => {
    const handleStart = (url: string) => {
      url.split("?")[0] !== pathname ? setLoading(true) : setLoading(false)
    }
    const handleComplete = (url: string) => setLoading(false)

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)
  }, [loading, router.pathname])

  return loading ? (
    <Loader />
  ) : (
    <StyledEngineProvider injectFirst>
      <Head>
        <link rel="shortcut icon" href={getMediaUrl(global?.favicon)} />
      </Head>
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
  const {
    data: { data: global },
  } = await API.get("/global", {
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
