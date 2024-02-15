import Image from "next/image"
import { ListItemType } from "components/List/types"
import styles from "../List.module.scss"
import { Grid, Typography } from "@mui/material"
import LinkWrapper from "components/LinkWrapper"
import { ReactElement } from "react"
import Link from "next/link"
import { getMediaUrl } from "lib/media"
import useWindowSize from "hooks/size.hooks"

function ListItem({
  img,
  title,
  link,
  subTitle,
  description,
  placeholder,
  style,
  user,
}: ListItemType) {
  const placeholderUrl = placeholder ? placeholder : "/assets/placeholder.png"
  const size = useWindowSize()
  return (
    <div
      style={{
        width: size.width > 768 ? "25%" : "100%",
      }}
    >
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
        <Grid
          className={`${styles.item_img_container} ${styles.item_img_container__artist} square_img_container`}
        >
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
          <Link href={`/artist/${user?.slug}`}>
            <Typography title={subTitle} className={styles.sub_title}>
              {subTitle}
            </Typography>
          </Link>
        )}

        {description && (
          <Typography title={description} className={styles.description}>
            {description}
          </Typography>
        )}
      </LinkWrapper>
    </div>
  )
}

export default ListItem
