import Image from "next/image"
import { ListItemType } from "components/List/types"
import styles from "../List.module.scss"
import { Grid, Typography } from "@mui/material"
import LinkWrapper from "components/LinkWrapper"
import { ReactElement } from "react"
import Link from "next/link"
import { getMediaUrl } from "lib/media"

function ListItem(props: ListItemType) {
  const { img, title, link, subTitle, description, placeholder } = props
  const placeholderUrl = placeholder ? placeholder : "/assets/placeholder.png"

  return (
    <LinkWrapper
      condition={!!link}
      wrapper={(children: ReactElement) => (
        <Link href={link || ""}>{children}</Link>
      )}
    >
      <Grid container direction="column" className={styles.item}>
        <Grid className={styles.item_img}>
          <Image
            src={img?.url ? getMediaUrl(img) : placeholderUrl}
            alt="list img"
            width={img?.width || 300}
            height={img?.height || 300}
          />
        </Grid>

        {title && (
          <Typography variant="h5" className={styles.title}>
            {title}
          </Typography>
        )}

        {subTitle && <Typography>{subTitle}</Typography>}

        {description && <Typography>{description}</Typography>}
      </Grid>
    </LinkWrapper>
  )
}

export default ListItem
