import ListItem from "components/List/ListItem"
import { ReleaseType } from "types/general"

type ReleaseItemType = {
  release: ReleaseType
}

function ReleaseItem(props: ReleaseItemType) {
  const {
    release: { img, name, link, artistName },
  } = props

  return (
    <ListItem img={img} title={name} subTitle={artistName} link={`/${link}`} />
  )
}

export default ReleaseItem
