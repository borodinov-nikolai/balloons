import React from "react"
import Slider, { Settings } from "react-slick"
import { Grid } from "@mui/material"
import ReleaseSliderMainSlide from "components/ReleaseSlider/ReleaseSliderMainSlide"
import ReleaseSliderSlide from "components/ReleaseSlider/ReleaseSliderSlide"
import styles from "./ReleaseSlider.module.scss"

const slidesData = [
  <ReleaseSliderMainSlide key="0" />,
  <ReleaseSliderSlide key="1" bg="/assets/slide1-bg.png" />,
  <ReleaseSliderSlide key="2" bg="/assets/slide2-bg.png" />,
  <ReleaseSliderSlide key="3" bg="/assets/slide1-bg.png" />,
]

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
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
  prevArrow: <PrevArrow />, //ToDo сделать неактивными кнопки, если двигаться некуда
  nextArrow: <NextArrow />,
  centerMode: true,
  customPaging: (i: number) => (
    <div className={styles.paginationItem}>0{i + 1}</div>
  ),
}

const ReleaseSlider = () => {
  return (
    <Grid className={`${styles.releaseSlider} block_first-on-page`}>
      <Slider {...settings}>{slidesData}</Slider>

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
