"use client"
import { useMediaQuery } from "hooks/useMediaQuery"
import styles from "./Categories.module.scss"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getAllCategories } from "api/categories"
import Contacts from "components/modules/Contacts/Contacts"
import { getMediaUrl } from "utils/getMediaUrl"
import { ICategory } from "types/categories"

export default function Categories() {
  const isMedia420 = useMediaQuery(420)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAllCategories({
          url: `/api/categories?populate=*`,
        })

        setCategories(data.data)
        console.log(data.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <section className={styles.Categories}>
      <div className="container">
        <div className={styles.Inner}>
          <p className={styles.AboutUs}>
            Погрузитесь в мир удивительных идей с нашими работами, где шарики
            становятся не просто элементом декора, а источником вдохновения,
            улыбок и ярких эмоций. От элегантных композиций до креативных
            ансамблей – каждая наша работа призвана внести яркость и радость в
            ваш повседневный мир. Давайте создадим вместе моменты волшебства с
            нашими уникальными шариковыми идеями! Наши гелиевые шары изготовлены
            из высококачественных материалов, обеспечивая долговечность и
            яркость цветов. Мы также предлагаем услуги доставки по Уфе, чтобы
            сделать ваше планирование еще более удобным.
          </p>
          <ul className={styles.List}>
            {categories ? (
              categories
                //@ts-ignore
                ?.sort((a, b) => a.id - b.id)
                .map((category: ICategory) => {
                  return (
                    <li className={styles.ListItem} key={category.slug}>
                      {category.image ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${category.image.url}`}
                          alt={category.name}
                          // width={157}
                          // height={236}
                        />
                      ) : (
                        <></>
                      )}

                      <Link
                        href={`/balloons#${category.slug}`}
                        className="category-button button"
                      >
                        {category.name}
                      </Link>
                    </li>
                  )
                })
            ) : (
              <></>
            )}
          </ul>
          <div className={styles.Contacts} id="contacts">
            {!isMedia420 ? (
              <>
                <span>
                  Напишите нам в WhatsApp:
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      marginLeft: "3px",
                    }}
                  >
                    <a
                      href="https://wa.me/79659338808"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +7 965 933 88 08
                    </a>
                    <a
                      href="https://wa.me/79378441600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +7 937 844 16 00
                    </a>
                  </div>
                </span>
                <span>
                  Следите за обновлениями в Instagram
                  <a
                    href="http://instagram.com/AirBalloonUfa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-[2px]"
                  >
                    @AirBalloonUfa
                  </a>
                </span>
              </>
            ) : (
              <Contacts />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
