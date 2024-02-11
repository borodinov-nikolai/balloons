import ListItem from "components/List/ListItem"
import { ReleaseType } from "types/general"
import { CSSProperties } from "react"

type ReleaseItemType = {
  release: ReleaseType
  styles?: CSSProperties
}

function ReleaseItem({ release, styles }: ReleaseItemType) {
  const { img, name, link, artistName, user } = release
  const year = new Date(release.date).getFullYear()
  const releaseType = release.type === "single" ? "Сингл" : "Альбом"

  return (
    <ListItem
      img={img}
      title={name}
      subTitle={artistName ? artistName : release.user?.name}
      description={`${year} ${releaseType}`}
      link={`/${link}`}
      style={styles}
      user={user}
    />
  )
}

export default ReleaseItem
