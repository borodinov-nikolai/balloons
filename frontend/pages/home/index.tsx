import type { NextPage } from "next"
import ReleaseSlider from "components/ReleaseSlider"
import withStandardLayout from "hoc/withStandardLayout"
import Suggestion from "components/Suggestion"
import FeedbackForm from "components/FeedbackForm"

const Home: NextPage = () => {
  return (
    <>
      <ReleaseSlider />
      {/*<NewsBlock />*/}
      <Suggestion />
      {/*<Catalog />*/}
      <FeedbackForm />
    </>
  )
}

export default withStandardLayout(Home)
