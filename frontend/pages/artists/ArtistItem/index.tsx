import { UserType } from "types/auth"
import ListItem from "components/List/ListItem"
import { CSSProperties } from "react"

type ArtistsItemType = {
  artist: UserType
  styles?: CSSProperties
}

function ArtistItem(props: ArtistsItemType) {
  const {
    artist: { avatar, name, slug },
    styles,
  } = props

  console.log("ArtistItem name", name)
  console.log("ArtistItem style", styles)

  return (
    <ListItem
      img={avatar}
      title={name}
      link={`/artist/${slug}`}
      style={styles}
    />
  )
}

export default ArtistItem
