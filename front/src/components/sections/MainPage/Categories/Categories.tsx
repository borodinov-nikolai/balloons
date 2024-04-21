import { useMediaQuery } from "@/hooks/useMediaQuery"
import styles from "./Categories.module.scss"
import Image from "next/image"
import Link from "next/link"
// import { categories } from "@/data/categories/categories"
import Contacts from "@/components/modules/Contacts/Contacts"
import { ICategory } from "@/types/category"
import { FC, useEffect, useState } from "react"
import { getAllCategories } from "@/api/queries"
import { staticUrl } from "@/constants/imageUrl"


interface IProps {
  categories?: ICategory
}

 const Categories: FC<IProps> = ({categories})=> {
  const isMedia420 = useMediaQuery(420)
 


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
            {categories?.data?.map(({attributes, id}) => {
              const {name, slug, image} = attributes
              return (
                <li className={styles.ListItem} key={id}>
                 {image && <Image
                    src={staticUrl + image?.data?.attributes?.url}
                    alt={image?.data?.attributes?.name}
                    width={157}
                    height={236}
                  />}
                  <Link
                    href={`/balloons?category=${slug}`}
                    className="category-button button"
                  >
                    {name}
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className={styles.Contacts} id="contacts">
            {!isMedia420 ? (

              <>
              <div className={styles.footerText} >Готовы порадовать себя или своих близких невероятно красивыми воздушными шарами? Напишите нам по указанному номеру телефона, и наши эксперты помогут вам сделать ваше мероприятие незабываемым!</div>
                <span>
                  WhatsApp:
                  <div className="ml-[3px] flex flex-col items-end">
                    <a
                      href="https://wa.me/79659338808"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +7 965 933 88 08
                    </a>
             
                  </div>
                </span>
                <span>
                  {"Следите за обновлениями в Instagram "} 
                  <a
                    href="http://instagram.com/AirBalloonUfa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-[2px]"
                  >
                 AirBalloonUfa
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


export default Categories