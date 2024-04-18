import styles from "./Portfolio.module.scss"
import { FC} from "react"
import { ICategory } from "@/types/category"
import { useRouter } from "next/router"
import { IGallery } from "@/types/gallery"
import { staticUrl } from "@/constants/imageUrl"
import { Image } from "antd"




interface IProps {
  categories: ICategory
  gallery: IGallery
}


const Portfolio: FC<IProps> = ({categories, gallery})=>  {
  const router = useRouter()

  
  const handleSelectCategory = (slug: string) => {
    router.push(`?category=${slug}`)
  }


  return (
    <section className={styles.Portfolio}>
      <div className="container">
        <div className={styles.Inner}>
          <h2 className={styles.Title}>Примеры наших работ</h2>
          <hr />
          <div className={styles.Main}>
            <ul className={styles.Sort}>
              {categories?.data.map(({attributes, id}) => {
                const {name, slug} = attributes
                return (
                  <li key={id}>
                    <button
                      onClick={() => handleSelectCategory(slug)}
                      className={`category-button button ${router.query.category === slug ? "category-button--active" : ""}`}
                      style={{ margin: 0 }}
                    >
                      {name}
                    </button>
                  </li>
                )
              })}
            </ul>
            <div className={styles.Grid}>
              {gallery?.data[0]?.attributes?.Images?.data?.map(({attributes, id}) => {
                const {url} = attributes
                    return (
                      <div className={styles.PortfolioItem} key={id}>
                        <Image
                          src={staticUrl+url}
                          alt="Balloon"
                          width={300}
                          height={400}
                        />
                      </div>
                    )
                  })
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default Portfolio