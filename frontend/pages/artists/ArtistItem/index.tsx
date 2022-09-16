import { UserType } from "types/auth"
import ListItem from "components/List/ListItem"

type ArtistsItemType = {
  artist: UserType
  sx?: object
}

function ArtistItem(props: ArtistsItemType) {
  const {
    artist: { avatar, name, slug },
    sx,
  } = props

  return <ListItem img={avatar} title={name} link={`/artist/${slug}`} sx={sx} />
}

export default ArtistItem
