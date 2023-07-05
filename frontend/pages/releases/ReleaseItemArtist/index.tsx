import ListItem from "components/List/ListItem"
import { ReleaseType } from "types/general"
import { CSSProperties } from "react"
import ListItemArtist from "components/List/ListItemArtist"

type ReleaseItemType = {
  release: ReleaseType
  styles?: CSSProperties
}

function ReleaseItemArtist({ release, styles }: ReleaseItemType) {
  const { img, name, link, artistName } = release
  const year = new Date(release.date).getFullYear()
  const releaseType = release.type === "single" ? "Сингл" : "Альбом"

  return (
    <ListItemArtist
      img={img}
      title={name}
      subTitle={artistName ? artistName : release.user?.name}
      description={`${year} ${releaseType}`}
      link={`/${link}`}
      style={styles}
    />
  )
}

export default ReleaseItemArtist
