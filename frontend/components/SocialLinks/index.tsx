import styles from "./SocialLinks.module.scss"
import { Grid } from "@mui/material"
import { UserSocialLinksType } from "types/general"

type SocialLinksProps = {
  links: UserSocialLinksType
}

function SocialLinks({ links }: SocialLinksProps) {
  const socialLinks = []
  if (links.vk)
    socialLinks.push(
      <a
        key={1}
        href={links.vk}
        className={`${styles.links_vk_bw} ${styles.link_item}`}
      />
    )
  if (links.odnoklassniki)
    socialLinks.push(
      <a
        key={2}
        href={links.odnoklassniki}
        className={`${styles.links_odnoklassniki_bw} ${styles.link_item}`}
      />
    )
  if (links.youtube)
    socialLinks.push(
      <a
        key={3}
        href={links.youtube}
        className={`${styles.links_youtube_bw} ${styles.link_item}`}
      />
    )
  if (links.rutube)
    socialLinks.push(
      <a
        key={4}
        href={links.rutube}
        className={`${styles.links_rutube_bw} ${styles.link_item}`}
      />
    )
  if (links.telegram)
    socialLinks.push(
      <a
        key={5}
        href={links.telegram}
        className={`${styles.links_telegram_bw} ${styles.link_item}`}
      />
    )
  if (links.facebook)
    socialLinks.push(
      <a
        key={6}
        href={links.facebook}
        className={`${styles.links_facebook_bw} ${styles.link_item}`}
      />
    )
  if (links.instagram)
    socialLinks.push(
      <a
        key={7}
        href={links.instagram}
        className={`${styles.links_instagram_bw} ${styles.link_item}`}
      />
    )

  return (
    <Grid container className={styles.links} justifyContent="center">
      {socialLinks}
    </Grid>
  )
}

export default SocialLinks
