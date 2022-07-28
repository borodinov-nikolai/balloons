import type { NextPage } from "next"
import ReleaseSlider from "components/ReleaseSlider"
import withStandardLayout from "hoc/withStandardLayout"
import Suggestion from "components/Suggestion"

const Home: NextPage = () => {
  return (
    <>
      <ReleaseSlider />
      {/*<NewsBlock />*/}
      <Suggestion />
      {/*<Catalog />*/}
      {/*<Form />*/}
    </>
  )
}

export default withStandardLayout(Home)
