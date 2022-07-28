import { createContext } from "react"
import App, { AppContext, AppProps } from "next/app"
import Head from "next/head"
import { getStrapiMedia } from "lib/media"
import { API } from "lib/api"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { ThemeProvider } from "@mui/material/styles"
import { AuthProvider, useAuth } from "context/AuthProvider"
import ruLocale from "date-fns/locale/ru"
import Loader from "components/Loader"
import theme from "styles/theme"
import "styles/globals.scss"
import getQueryStr from "lib/queryStr"

export const GlobalContext = createContext({})

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { global } = pageProps
  const { loading } = useAuth()

  return (
    <>
      <Head>
        <link rel="shortcut icon" href={getStrapiMedia(global?.favicon)} />
      </Head>

      <GlobalContext.Provider value={global}>
        <LocalizationProvider
          adapterLocale={ruLocale}
          dateAdapter={AdapterDateFns}
        >
          <ThemeProvider theme={theme}>
            <AuthProvider>
              {loading ? <Loader /> : <Component {...pageProps} />}
            </AuthProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </GlobalContext.Provider>
    </>
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
  const { data: globals } = await API.get(
    getQueryStr("/global", {
      populate: {
        favicon: "*",
        defaultSeo: { populate: "*" },
      },
    })
  )
  // Pass the data to our page via props
  return {
    ...appProps,
    pageProps: { global: globals?.data?.attributes },
  }
}

export default MyApp