import styles from "./SocialLinks.module.scss"
import { Grid } from "@mui/material"
import { UserSocialLinksType } from "types/general"

type SocialLinksProps = {
  color: "darkGray" | "white" | "lightGray"
  links: UserSocialLinksType
  sx?: object
}
const getIconStyle = (color: SocialLinksProps["color"]): string => {
  if (color === "white") return styles.link_white
  if (color === "darkGray") return styles.link_dark_gray
  if (color === "lightGray") return styles.link_light_gray
  return ""
}

function SocialLinks({ color, links, sx }: SocialLinksProps) {
  const linkItemStyle = `${styles.link_item} ${getIconStyle(color)}`
  const socialLinks = []

  if (links.vk)
    socialLinks.push(
      <a
        key={1}
        href={links.vk}
        className={`${styles.links_vk_bw} ${linkItemStyle}`}
        target="_blank"
        rel="noreferrer"
      />
    )
  if (links.odnoklassniki)
    socialLinks.push(
      <a
        key={2}
        href={links.odnoklassniki}
        className={`${styles.links_odnoklassniki_bw} ${linkItemStyle}`}
        target="_blank"
        rel="noreferrer"
      />
    )
  if (links.youtube)
    socialLinks.push(
      <a
        key={3}
        href={links.youtube}
        className={`${styles.links_youtube_bw} ${linkItemStyle}`}
        target="_blank"
        rel="noreferrer"
      />
    )
  if (links.rutube)
    socialLinks.push(
      <a
        key={4}
        href={links.rutube}
        className={`${styles.links_rutube_bw} ${linkItemStyle}`}
        target="_blank"
        rel="noreferrer"
      />
    )
  if (links.facebook)
    socialLinks.push(
      <a
        key={6}
        href={links.facebook}
        className={`${styles.links_facebook_bw} ${linkItemStyle}`}
        target="_blank"
        rel="noreferrer"
      />
    )
  if (links.instagram)
    socialLinks.push(
      <a
        key={7}
        href={links.instagram}
        className={`${styles.links_instagram_bw} ${linkItemStyle}`}
        target="_blank"
        rel="noreferrer"
      />
    )
  if (links.telegram)
    socialLinks.push(
      <a
        key={5}
        href={links.telegram}
        className={`${styles.links_telegram_bw} ${linkItemStyle}`}
        target="_blank"
        rel="noreferrer"
      />
    )

  return (
    <Grid
      container
      className={styles.links}
      style={{ alignItems: "center" }}
      sx={sx}
    >
      {socialLinks}
    </Grid>
  )
}

export default SocialLinks
