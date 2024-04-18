import Image from "next/image"
import styles from "./SelectedNews.module.scss"
import { IOneNews } from "@/types/news"
import { FC } from "react"
import { staticUrl } from "@/constants/imageUrl"


interface IProps {
  selectedNews: IOneNews
}

const SelectedNews:FC<IProps> = ({selectedNews})=> {
  const {image, title, content} = selectedNews.data.attributes


  return (
    <div className={styles.SelectedNews}>
      <div className="container">
       {selectedNews.data && <div className={styles.Inner}>

            <Image
              src={staticUrl + image.data.attributes.url}
              alt={title}
              width={800}
              height={800}
              className={styles.Image}
            />
      
          <h2 className={styles.Title}>{title}</h2>
          <p className={styles.Content}>{content}</p>
        </div>}
      </div>
    </div>
  )
}

export default SelectedNews