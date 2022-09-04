import ListItem from "components/List/ListItem"
import { ReleaseType } from "types/general"

type ReleaseItemType = {
  release: ReleaseType
}

function ReleaseItem({ release }: ReleaseItemType) {
  const {
    // @ts-ignore
    attributes: { img, name, link, artistName },
  } = release

  return (
    <ListItem img={img} title={name} subTitle={artistName} link={`/${link}`} />
  )
}

export default ReleaseItem
