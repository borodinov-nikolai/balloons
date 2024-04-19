import styles from "./Portfolio.module.scss"
import { FC, useEffect, useState} from "react"
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
  const [categoriesLoaded, setCategoriesLoaded] = useState<boolean>(false)
router.query



  useEffect(()=> {
    Object.keys(router.query).length === 0 && categories?.data[0]?.attributes?.slug && router.replace(`?category=${categories?.data[0]?.attributes?.slug}`);
    Object.keys(router.query).length !== 0 && setCategoriesLoaded(true)
  }, [router.query])

  
  const handleSelectCategory = (slug: string) => {
    router.replace(`?category=${slug}`)
  }


  return (
    <section className={styles.Portfolio}>
      <div className="container">
        <div className={styles.Inner}>
          <h2 className={styles.Title}>Примеры наших работ</h2>
          <hr />
          <div className={styles.Main}>
            <ul className={styles.Sort}>
              {categoriesLoaded && categories?.data?.map(({attributes, id}) => {
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
                          width={'100%'}
                          height={'100%'}
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