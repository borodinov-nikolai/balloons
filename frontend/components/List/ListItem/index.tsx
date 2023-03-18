import Image from "next/image"
import { ListItemType } from "components/List/types"
import styles from "../List.module.scss"
import { Grid, Typography } from "@mui/material"
import LinkWrapper from "components/LinkWrapper"
import { ReactElement } from "react"
import Link from "next/link"
import { getMediaUrl } from "lib/media"

function ListItem({
  img,
  title,
  link,
  subTitle,
  description,
  placeholder,
  style,
}: ListItemType) {
  const placeholderUrl = placeholder ? placeholder : "/assets/placeholder.png"

  return (
    <LinkWrapper
      condition={!!link}
      wrapper={
        !!link
          ? (children: ReactElement) => (
              <Grid style={style} className={styles.item_container}>
                <Link href={link || ""}>{children}</Link>
              </Grid>
            )
          : (children: ReactElement) => (
              <Grid style={style} className={styles.item_container}>
                {children}
              </Grid>
            )
      }
    >
      <Grid className={`${styles.item_img_container} square_img_container`}>
        <Image
          src={img?.url ? getMediaUrl(img) : placeholderUrl}
          alt="list img"
          className="square_img"
          fill
        />
      </Grid>

      {title && (
        <Typography title={title} variant="h5" className={styles.title}>
          {title}
        </Typography>
      )}

      {subTitle && (
        <Typography title={subTitle} className={styles.sub_title}>
          {subTitle}
        </Typography>
      )}

      {description && (
        <Typography title={description} className={styles.description}>
          {description}
        </Typography>
      )}
    </LinkWrapper>
  )
}

export default ListItem
