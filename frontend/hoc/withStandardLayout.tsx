import { NextPage } from "next"
import Header from "components/Header"
import Footer from "components/Footer"

// eslint-disable-next-line react/display-name
const withStandardLayout = (PageComponent: NextPage) => (pageProps: any) => {
  const { global } = pageProps
  return (
    <div className="wrapper">
      <Header />
      <PageComponent {...pageProps} />
      <Footer
        links={{
          vk: global.vk,
          odnoklassniki: global.odnoklassniki,
          youtube: global.youtube,
          rutube: global.rutube,
          telegram: global.telegram,
          facebook: global.facebook,
          instagram: global.instagram,
        }}
      />
    </div>
  )
}

export default withStandardLayout
