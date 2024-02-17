import Slider, { Settings } from "react-slick"
import Counter from "components/Counter"
import ArtistItem from "pages/artists/ArtistItem"
import ReleaseItem from "pages/releases/ReleaseItem"
import { ReleaseType } from "types/general"

import styles from "./Catalog.module.scss"
import { UserType } from "types/auth"
import { useEffect, useState } from "react"
import { API } from "lib/api"

function PrevArrow(props: any) {
  const { onClick } = props
  return (
    <button
      className={`${styles.slider__arrow} ${styles.slider__arrow_prev}`}
      onClick={onClick}
    >
      <svg
        width="14"
        height="21"
        viewBox="0 0 14 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.9766 19.0671L3.47656 10.5671L11.9766 2.06714"
          stroke="#D4AA00"
          strokeWidth="4"
        />
      </svg>
    </button>
  )
}

function NextArrow(props: any) {
  const { onClick } = props
  return (
    <button
      className={`${styles.slider__arrow} ${styles.slider__arrow_next}`}
      onClick={onClick}
    >
      <svg
        width="14"
        height="21"
        viewBox="0 0 14 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.9766 19.0671L3.47656 10.5671L11.9766 2.06714"
          stroke="#D4AA00"
          strokeWidth="4"
        />
      </svg>
    </button>
  )
}

const settings: Settings = {
  dots: false,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 768,
      settings: { arrows: false },
    },
  ],
}

type CatalogProps = {
  artistCount: number
  releaseCount: number
  showCounter: boolean
  isSlider?: boolean
}

function Catalog({
  artistCount,
  releaseCount,
  showCounter,
  isSlider,
}: CatalogProps) {
  const [releases, setReleases] = useState<ReleaseType[]>([])
  const [artists, setArtists] = useState<UserType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const sliderItemStyle = { width: "250px" }

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true)
      try {
        const {
          data: { data },
        } = await API.get("/users", {
          params: {
            populate: { avatar: "*" },
            "filters[name][$null]": "",
            "filters[blocked]": "false",
            "filters[partner]": "true",
            "sort[order]": "desc",
            "sort[createdAt]": "desc",
          },
        })

        setArtists(data)
        setError("")
      } catch (e) {
        setError("Что-то пошло не так, перезагрузите страницу")
      }
      setLoading(false)
    }

    const fetchReleases = async () => {
      setLoading(true)
      try {
        const {
          data: { data },
        } = await API.get("/releases", {
          params: {
            populate: ["img", "user"],
            "filters[name][$null]": "",
            "filters[user][partner]": "true",
            "sort[order]": "desc",
            "sort[createdAt]": "desc",
          },
        })

        setReleases(data)
        setError("")
      } catch (e) {
        setError("Что-то пошло не так, перезагрузите страницу")
      }
      setLoading(false)
    }

    fetchReleases()
    fetchArtists()
  }, [])

  return (
    <div className={`block ${styles.blockCatalog}`}>
      <div className="content">
        <div className={styles.title__part}>
          <h2 className={styles.title}>В нашем каталоге</h2>
          {showCounter && (
            <>
              <div
                className={`${styles.title__numbers} ${styles.title__numbers_first}`}
              >
                <Counter number={releaseCount} />
                <span>Релизов</span>
              </div>
              <div className={styles.title__numbers}>
                <Counter number={artistCount} />
                <span>Артистов</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="content_slider">
        <Slider {...settings} className={`${styles.row} ${styles.row_main}`}>
          {artists.map((it: UserType) => (
            <>
              <ArtistItem
                artist={it}
                key={it.id}
                styles={sliderItemStyle}
                isSlider={isSlider}
              />
            </>
          ))}
        </Slider>
      </div>

      <div className="content_slider">
        <Slider {...settings} className={`${styles.row} ${styles.row_main}`}>
          {releases.map((it: ReleaseType) => (
            <>
              <ReleaseItem
                key={it.id}
                release={it}
                styles={sliderItemStyle}
                isSlider={isSlider}
              />
            </>
          ))}
        </Slider>
      </div>

      {/*<div className="content">*/}
      {/*  <div className={styles.videos}>*/}
      {/*    <div className={styles.videos__item}>*/}
      {/*      <div className={styles.videos__img}>*/}
      {/*        <img src={"/images/catalog-videos__img-1.png"} alt="" />*/}
      {/*        <div className={styles.videos__youtube}>*/}
      {/*          <img src={"/images/youtube.svg"} alt="" />*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className={styles.videos__name}>Небесные розы</div>*/}
      {/*    </div>*/}
      {/*    <div className={styles.videos__item}>*/}
      {/*      <div className={styles.videos__img}>*/}
      {/*        <img src="/images/catalog-videos__img-2.png" alt="" />*/}
      {/*        <div className={styles.videos__youtube}>*/}
      {/*          <img src="/images/youtube.svg" alt="" />*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className={styles.videos__name}>*/}
      {/*        Parasitic Metamorphosis Manifestation*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className={styles.videos__item}>*/}
      {/*      <div className={styles.videos__img}>*/}
      {/*        <img src={"/images/catalog-videos__img-3.png"} alt="" />*/}
      {/*        <div className={styles.videos__youtube}>*/}
      {/*          <img src={"/images/youtube.svg"} alt="" />*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className={styles.videos__name}>Manifestation</div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className="vector__bg vector__bg_1">
        <img src={"/images/vector-bg_catalog-left.svg"} alt="" />
      </div>

      <div className="vector__bg vector__bg_2">
        <svg
          width="531"
          height="732"
          viewBox="0 0 531 732"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M440.592 659.836C440.592 659.836 302.861 664.116 264.66 527.673C227.294 394.227 124.881 425.488 78.9334 361.981C32.986 298.473 55.1636 182.673 172.578 171.79C277.32 162.08 273.623 98.4896 295.224 62.1652C316.825 25.8408 368.487 1.85648 368.487 1.85648"
            stroke="#FC6338"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M372.671 130.351C372.671 130.351 275.787 218.587 186.642 226.493C97.497 234.399 103.418 299.532 119.781 321.937C153.732 368.398 267.283 350.079 295.783 431.835C317.184 493.284 295.729 588.696 404.59 608.626"
            stroke="#FC6338"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M368.765 198.857C368.765 198.857 232.712 217.892 264.158 275.629C300.163 341.792 342.158 329.945 325.039 429.661C318.89 465.093 347.41 594.558 419.097 548.758"
            stroke="#FC6338"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    </div>
  )
}

export default Catalog
