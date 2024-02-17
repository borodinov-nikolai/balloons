import { UserType } from "types/auth"
import ListItem from "components/List/ListItem"
import { CSSProperties } from "react"
import ListItemArtist from "components/List/ListItemArtist"

type ArtistsItemType = {
  artist: UserType
  styles?: CSSProperties
  isSlider?: boolean
}

function ArtistItem(props: ArtistsItemType) {
  const {
    artist: { avatar, name, slug },
    styles,
    isSlider,
  } = props

  return (
    <ListItem
      img={avatar}
      title={name}
      link={`/artist/${slug}`}
      style={styles}
      isSlider={isSlider}
    />
  )
}

export default ArtistItem
