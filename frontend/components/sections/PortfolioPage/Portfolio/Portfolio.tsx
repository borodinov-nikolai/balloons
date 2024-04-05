"use client"
import styles from "./Portfolio.module.scss"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getAllWorks } from "api/portfolio"
import { getAllCategories } from "api/categories"
import { ICategory } from "types/categories"
import { IWork } from "types/portfolio"
import { getMediaUrl } from "utils/getMediaUrl"

export default function Portfolio() {
  const [works, setWorks] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAllCategories({
          url: `/api/categories?populate=*`,
        })

        setCategories(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAllWorks({
          url: `/api/works?populate=*`,
        })

        setWorks(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const hash = window.location.hash
    const hashValue = hash.substring(1)

    setSelectedCategory(hashValue)
  }, [categories])

  const handleSelectCategory = (slug: string) => {
    setSelectedCategory(slug)
    window.history.pushState(null, "", `#${slug}`)
  }

  return (
    <section className={styles.Portfolio}>
      <div className="container">
        <div className={styles.Inner}>
          <h2 className={styles.Title}>Примеры наших работ</h2>
          <hr />
          <div className={styles.Main}>
            <ul className={styles.Sort}>
              {categories?.map((category: ICategory) => {
                return (
                  <li key={category.id}>
                    <button
                      onClick={() => handleSelectCategory(category.slug)}
                      className={`category-button button ${selectedCategory === category.slug ? "category-button--active" : ""}`}
                      style={{ margin: 0 }}
                    >
                      {category.name}
                    </button>
                  </li>
                )
              })}
            </ul>
            <div className={styles.Grid}>
              {works ? (
                works
                  .filter((work: any) => {
                    return work.category.slug === selectedCategory
                  })
                  .map((work: IWork) => {
                    return (
                      <div className={styles.PortfolioItem} key={work.id}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${work.image.url}`}
                          alt="Balloon"
                          width={300}
                          height={400}
                        />
                      </div>
                    )
                  })
              ) : (
                <>Работ пока нет</>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
