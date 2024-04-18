import { INews } from "@/types/news"
import styles from "./News.module.scss"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import { staticUrl } from "@/constants/imageUrl"



interface IProps {
  news: INews
}

const News: FC<IProps> = ({news})=>  {
  return (
    <div className={styles.News}>
      <div className="container">
        <div className={styles.Inner}>
          {news?.data.map(({attributes, id}) => {
            const {image, title} = attributes
            return (
              <Link
                href={`/news/${id}`}
                className={styles.NewsItem}
                key={id}
              >
                {image && (
                  <Image
                    className={styles.NewsImage}
                    src={staticUrl + image.data.attributes.url}
                    alt={title}
                    width={400}
                    height={400}
                  />
                )}
                <h4 className={styles.NewsTitle}>{title}</h4>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}


export default News