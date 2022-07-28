import { UserType } from "types/auth"
import ListItem from "components/List/ListItem"

type ArtistsItemType = {
  artist: UserType
}

function ArtistItem(props: ArtistsItemType) {
  const {
    artist: { avatar, name, slug },
  } = props

  return <ListItem img={avatar?.url} title={name} link={`/artist/${slug}`} />
}

export default ArtistItem
