import ListItem from "components/List/ListItem"
import { ReleaseType } from "types/general"

type ReleaseItemType = {
  release: ReleaseType
}

function ReleaseItem({ release }: ReleaseItemType) {
  const { img, name, link, artistName } = release
  const year = new Date(release.date).getFullYear()
  const releaseType = release.type === "single" ? "Сингл" : "Альбом"

  return (
    <ListItem
      img={img}
      title={name}
      subTitle={artistName ? artistName : release.user?.name}
      description={`${year} ${releaseType}`}
      link={`/${link}`}
    />
  )
}

export default ReleaseItem
