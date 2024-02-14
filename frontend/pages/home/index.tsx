import type { NextPage } from "next"
import ReleaseSlider from "components/ReleaseSlider"
import withStandardLayout from "hoc/withStandardLayout"
import Suggestion from "components/Suggestion"
import Catalog from "components/Catalog"
import FeedbackForm from "components/FeedbackForm"
import Articles from "components/Articles"
import Videos from "components/Videos"

const Home: NextPage = (pageProps: any) => {
  const {
    global: { releaseCount, artistCount, showCounter },
  } = pageProps

  return (
    <>
      <ReleaseSlider />
      <Articles />
      <Suggestion />
      <Catalog
        artistCount={artistCount}
        releaseCount={releaseCount}
        showCounter={showCounter}
      />
      <Videos />
      <FeedbackForm />
    </>
  )
}

export default withStandardLayout(Home)
