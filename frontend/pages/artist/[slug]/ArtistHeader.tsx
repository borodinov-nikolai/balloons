import { Button, Grid, Typography } from "@mui/material"

import styles from "pages/artist/Artist.module.scss"
import SocialLinks from "components/SocialLinks"
import Link from "next/link"
import { UserType } from "types/auth"
import { getMediaUrl } from "lib/media"
import getUserSocialLinks from "lib/getUserSocialLinks"

type ArtistHeaderProps = {
  user?: UserType
  isCurrentUser: boolean
}

function ArtistHeader({ user, isCurrentUser }: ArtistHeaderProps) {
  return (
    <Grid className="content content_full-screen">
      <svg
        className="vector__bg_right-small"
        width="149"
        height="313"
        viewBox="0 0 149 313"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M178.877 25.3372C178.877 25.3372 119.293 26.0007 105.278 85.6469C91.5691 143.983 46.7518 132.345 28.0592 160.622C9.36651 188.898 21.0609 238.524 71.9876 241.084C117.418 243.368 116.981 270.909 126.976 286.209C136.971 301.509 159.729 310.928 159.729 310.928"
          stroke="url(#paint0_linear_850:5785)"
          strokeWidth="3"
          strokeMiterlimit="10"
        />
        <path
          d="M159.191 255.337C159.191 255.337 115.723 218.983 77.0642 217.193C38.4055 215.404 39.7754 187.156 46.4362 177.177C60.2569 156.485 109.65 162.328 120.472 126.486C128.597 99.5463 117.586 58.7156 164.256 48.1189"
          stroke="url(#paint1_linear_850:5785)"
          strokeWidth="3"
          strokeMiterlimit="10"
        />
        <path
          d="M156.252 225.811C156.252 225.811 97.1241 220.069 109.657 194.55C124.005 165.308 142.365 169.66 133.15 126.891C129.847 111.695 139.807 55.2399 171.614 73.72"
          stroke="url(#paint2_linear_850:5785)"
          strokeWidth="3"
          strokeMiterlimit="10"
        />
        <defs>
          <linearGradient
            id="paint0_linear_850:5785"
            x1="138.135"
            y1="16.7781"
            x2="79.8647"
            y2="294.15"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3434FF" />
            <stop offset="1" stopColor="#FF6534" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_850:5785"
            x1="138.55"
            y1="42.7187"
            x2="96.6436"
            y2="242.197"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3434FF" />
            <stop offset="1" stopColor="#FF6534" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_850:5785"
            x1="162.075"
            y1="70.1564"
            x2="130.372"
            y2="221.065"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3434FF" />
            <stop offset="1" stopColor="#FF6534" />
          </linearGradient>
        </defs>
      </svg>

      <Grid className={styles.header}>
        <Grid
          className={styles.header_bg}
          style={{
            backgroundImage: `url(${getMediaUrl(user?.avatar)})`,
          }}
        />
      </Grid>

      <Grid container className={`${styles.header_content} content`}>
        <Grid className={styles.header_avatar}>
          <img src={getMediaUrl(user?.avatar)} alt="" />
        </Grid>

        <Grid className={styles.header_user_block}>
          <Typography className={styles.header_user_title} variant="h2">
            {user?.name}
          </Typography>
          <Typography style={{ width: "70%" }}>{user?.description}</Typography>

          <SocialLinks links={getUserSocialLinks(user)} />

          {isCurrentUser && (
            <Link href="/artist/edit">
              <Button color="secondary">Редактировать</Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ArtistHeader
