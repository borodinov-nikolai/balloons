import { PlatformLinkType } from "types/general"
import { Grid } from "@mui/material"

type ReleaseLinkIconProps = {
  type: PlatformLinkType["type"]
  size?: "small" | "standard" | "large"
  style: object
}

type Sizes = {
  [key: string]: number
}
const releaseIcons = {
  appleMusic: "/assets/icons/appleMusic.jpg",
  vkMusic: "/assets/icons/vkMusic.jpg",
  iTunes: "/assets/icons/iTunes.jpg",
  yandexMusic: "/assets/icons/yandexMusic.jpg",
  zvuk: "/assets/icons/zvuk.jpg",
  spotify: "/assets/icons/spotify.jpg",
  youTubeMusic: "/assets/icons/youTubeMusic.jpg",
  ok: "/assets/icons/ok.jpg",
  tikTok: "/assets/icons/tikTok.jpg",
  amazonMusic: "/assets/icons/amazonMusic.jpg",
  mtsMusic: "/assets/icons/mtsMusic.jpg",
  deezer: "/assets/icons/deezer.jpg",
  soundCloud: "/assets/icons/soundCloud.jpg",
  beatport: "/assets/icons/beatport.jpg",
  beelineMusic: "/assets/icons/beelineMusic.jpg",
  tidal: "/assets/icons/tidal.jpg",
  triller: "/assets/icons/triller.jpg",
  huaweiMusic: "/assets/icons/huaweiMusic.jpg",
  shazam: "/assets/icons/shazam.jpg",
}

const ReleaseLinkIcon = ({
  type,
  size = "small",
  style,
}: ReleaseLinkIconProps) => {
  const sizes: Sizes = {
    small: 32,
    standard: 48,
    large: 64,
  }

  return (
    <Grid
      style={{
        padding: ".2rem",
        width: sizes[size],
        height: sizes[size],
        ...style,
      }}
    >
      <img
        src={releaseIcons[type]}
        width={sizes[size]}
        height={sizes[size]}
        alt={type}
      />
    </Grid>
  )
}

export default ReleaseLinkIcon
