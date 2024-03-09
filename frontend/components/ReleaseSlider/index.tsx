import React, { useEffect, useState } from "react"
import Slider, { Settings } from "react-slick"
import { Grid } from "@mui/material"
import ReleaseSliderMainSlide from "components/ReleaseSlider/ReleaseSliderMainSlide"
import styles from "./ReleaseSlider.module.scss"
import { API } from "lib/api"
import { SliderType } from "types/general"
import ReleaseSliderSlide from "components/ReleaseSlider/ReleaseSliderSlide"

function PrevArrow(props: any) {
  const { onClick } = props
  return (
    <button
      className={`${styles.button} ${styles.button_prev}`}
      onClick={onClick}
    />
  )
}

function NextArrow(props: any) {
  const { onClick } = props
  return (
    <button
      className={`${styles.button} ${styles.button_next}`}
      onClick={onClick}
    />
  )
}

const settings: Settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  variableWidth: true,
  autoplay: false,
  autoplaySpeed: 5000,
  prevArrow: <PrevArrow />, //ToDo сделать неактивными кнопки, если двигаться некуда
  nextArrow: <NextArrow />,
  centerMode: true,
  customPaging: (i: number) => (
    <div className={styles.paginationItem}>{`0${i + 1}`}</div>
  ),
}

const ReleaseSlider = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [sliders, setSliders] = useState<SliderType[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const {
          data: { data, meta },
        } = await API.get("/sliders", {
          params: {
            populate: "*",
            "sort[order]": "desc",
            "sort[createdAt]": "desc",
          },
        })

        setSliders(data)
        setError("")
      } catch (e) {
        setError("Что-то пошло не так, перезагрузите страницу")
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <Grid className={`${styles.releaseSlider} block_first-on-page`}>
      <Slider {...settings}>
        <ReleaseSliderMainSlide key="0" />
        {sliders.map((slide) => (
          <ReleaseSliderSlide
            key={slide.id}
            img={slide.img}
            imgLaptop={slide.imgLaptop}
            imgTablet={slide.imgTablet}
            imgMobile={slide.imgMobile}
            textMain={slide.textMain}
            link={slide?.link}
            description={slide?.description}
            buttonText={slide?.buttonText}
          />
        ))}
      </Slider>

      <svg className={styles.vinylRecord__center} viewBox="0 0 290 290">
        <linearGradient id="grad">
          <stop id="stop1" offset="0%" stopColor="#3434FF" />
          <stop id="stop2" offset="97.85%" stopColor="#FF6534" />
        </linearGradient>
        <path
          d="M145,145 m-125,0 a125,125 0 1,1 250,0 a125,125 0 1,1 -250,0"
          fillOpacity="0"
          id="tophalf"
        />
        <circle cx="145" cy="145" r="113" fill="#fff" />
        <text fill="url(#grad)">
          <textPath xlinkHref="#tophalf" startOffset="2%">
            Стань частью Link Music -
          </textPath>
          <textPath xlinkHref="#tophalf" startOffset="52%">
            Стань частью Link Music -
          </textPath>
        </text>
      </svg>
    </Grid>
  )
}

export default ReleaseSlider
