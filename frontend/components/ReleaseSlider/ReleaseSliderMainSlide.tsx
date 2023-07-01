import { Box, Button, Grid } from "@mui/material"
import styles from "./ReleaseSlider.module.scss"
import Link from "next/link"
import useWindowSize from "hooks/size.hooks"

const ReleaseSliderMainSlide = () => {
  const size = useWindowSize()
  return (
    <Grid className={`block ${styles.slide} ${styles.slideMain}`}>
      <Grid className={styles.mainSlideBgImg}>
        <svg
          width={size.width > 1023 ? "926" : "1200"}
          height="487"
          viewBox="0 0 926 487"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M925 47C925 47 786.323 110.094 810.979 266.178C838.622 441.144 678.425 516.347 569.057 472.992C459.688 429.637 467.237 268.957 259.334 264.014C46.7649 258.967 2 56.8698 2 56.8698"
            stroke="url(#paint0_linear_1242:5)"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M764 1C764 1 704.057 134.143 725.531 266.626C747.006 399.109 650.228 414.601 611.64 399.109C531.616 366.956 516.24 195.151 386.973 183.978C289.82 175.61 159.189 242.091 90 91.2517"
            stroke="url(#paint1_linear_1242:5)"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M699.898 59.3233C699.898 59.3233 721.541 195.419 625.921 171.087C516.359 143.247 518.04 77.8531 379.346 139.604C330.087 161.642 131.224 168.089 171.297 47"
            stroke="url(#paint2_linear_1242:5)"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1242:5"
              x1="463.5"
              y1="47"
              x2="463.5"
              y2="485"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#204CEC" />
              <stop offset="1" stopColor="#FD6436" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1242:5"
              x1="427"
              y1="1"
              x2="427"
              y2="404"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#204CEC" />
              <stop offset="1" stopColor="#FD6436" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_1242:5"
              x1="434"
              y1="47"
              x2="637.809"
              y2="377.248"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#204CEC" />
              <stop offset="1" stopColor="#FD6436" />
            </linearGradient>
          </defs>
        </svg>
      </Grid>
      {size.width > 1024 ? (
        <Grid className="vector__bg vector__bg_7">
          <svg
            width="307"
            height="539"
            viewBox="0 0 307 539"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-160.999 107.167C-160.999 107.167 -65.9568 142.812 -4.10619 57.7256C65.2256 -37.656 176.107 2.42985 207.234 74.3709C238.361 146.312 159.172 218.387 254.808 318.676C352.594 421.214 278.56 537.434 278.56 537.434"
              stroke="#204CEC"
              stroke-width="3"
              stroke-miterlimit="10"
            />
            <path
              d="M-107.657 204.846C-107.657 204.846 -16.596 170.354 35.737 97.7551C88.0699 25.1565 141.039 63.517 151.943 89.0294C174.542 141.949 100.791 230.21 156.518 296.473C198.414 346.261 291.398 376.553 252.925 480.321"
              stroke="#204CEC"
              stroke-width="3"
              stroke-miterlimit="10"
            />
            <path
              d="M-49.1871 207.357C-49.1871 207.357 4.8076 132.969 38.381 189.496C76.8689 254.245 45.2329 284.297 139.702 320.515C173.304 333.328 270.036 423.979 194.043 462.212"
              stroke="#204CEC"
              stroke-width="3"
              stroke-miterlimit="10"
            />
          </svg>
        </Grid>
      ) : (
        <Box sx={{ position: "absolute", left: 0, top: 30 }}>
          <svg
            width="144"
            height="342"
            viewBox="0 0 144 342"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-25.9984 0.999993C-25.9984 0.999993 30.2303 75.8052 87.9075 91.9853C152.563 110.122 153.112 177.264 120.861 208.127C88.61 238.99 34.4472 210.976 -0.168503 281.897C-35.5593 354.41 -112.273 337.888 -112.273 337.888"
              stroke="#204CEC"
              stroke-width="3"
              stroke-miterlimit="10"
            />
            <path
              d="M-11.1505 65.8197C-11.1505 65.8197 25.2953 107.613 74.4205 121.184C123.546 134.754 113.55 170.632 102.086 181.505C78.3034 204.049 16.5748 182.143 -7.7738 225.017C-26.0634 257.245 -23.8292 312.892 -86.8535 312.892"
              stroke="#204CEC"
              stroke-width="3"
              stroke-miterlimit="10"
            />
            <path
              d="M-0.914736 97.5368C-0.914736 97.5368 49.4947 111.64 25.9592 140.758C-0.99444 174.128 -23.3041 163.185 -23.9399 220.798C-24.1289 241.277 -53.3814 310.874 -88.8412 277.867"
              stroke="#204CEC"
              stroke-width="3"
              stroke-miterlimit="10"
            />
          </svg>
        </Box>
      )}

      <Grid className="vector__bg vector__bg_8">
        <svg
          width="530"
          height="732"
          viewBox="0 0 530 732"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M439.086 71.9201C439.086 71.9201 301.349 67.8329 263.339 204.329C226.16 337.828 123.703 306.71 77.8451 370.282C31.9868 433.854 54.3268 549.624 171.756 560.341C276.512 569.904 272.904 633.5 294.556 669.794C316.208 706.088 367.904 730 367.904 730"
            stroke="#FC6338"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M371.906 601.5C371.906 601.5 274.898 513.4 185.742 505.619C96.5859 497.838 102.416 432.697 118.747 410.268C152.633 363.761 266.209 381.92 294.595 300.124C315.909 238.645 294.32 143.263 403.154 123.18"
            stroke="#FC6338"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M367.904 533C367.904 533 231.824 514.155 263.189 456.374C299.101 390.161 341.113 401.949 323.854 302.258C317.655 266.834 345.994 137.329 417.745 183.029"
            stroke="#FC6338"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
        </svg>
      </Grid>

      <Grid className={styles.slideContent}>
        <Grid className={styles.imgWrapperColorNotes}>
          <svg
            width="90"
            height="58"
            viewBox="0 0 90 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M46.1091 36.6871C47.5191 35.1903 48.0065 33.2536 47.4873 31.2147L47.3343 30.615L39.3694 16.7753C33.4049 6.41063 31.349 2.88137 31.1813 2.72102C31.0039 2.55093 30.811 2.43291 30.6094 2.3684C30.3636 2.35838 30.1118 2.42396 29.8662 2.56577C29.6964 2.66381 29.156 3.08755 28.6658 3.50712C26.4966 5.36308 13.8561 16.555 13.6651 16.7883C13.3691 17.1501 13.1906 17.7071 13.2215 18.1711L13.2473 18.5641C13.2473 18.5641 25.6907 40.2805 25.7218 40.5882C25.7689 41.0558 25.6019 41.6216 25.3253 41.9309C25.1942 42.0775 24.6387 42.5939 24.0909 43.0786C21.5547 45.3238 20.7305 46.3619 20.3511 47.7904C20.136 48.6016 20.162 49.5241 20.4238 50.3573C20.6745 51.153 21.3363 52.1785 21.9306 52.6908C22.5525 53.2273 23.2608 53.5828 24.0146 53.7488C24.6671 53.8438 25.3486 53.8015 26.0334 53.6136C27.5485 53.1988 29.79 51.3933 30.6197 49.9205C30.9661 49.305 31.2657 48.2594 31.3077 47.5181C31.3243 47.2254 31.2866 46.6749 31.2243 46.2965C31.0049 44.9695 19.8067 25.5438 19.7181 25.2686C19.5675 24.8029 19.669 24.3387 19.9918 24.0152C20.2823 23.7239 32.4656 12.9679 32.8216 12.6885C33.1353 12.4424 33.5231 12.3687 33.8271 12.4887C33.965 12.486 34.0976 12.5129 34.2144 12.5719C34.4247 12.6781 34.6268 13.0119 38.1927 19.1501C42.2976 26.215 42.2098 26.0446 42.0921 26.7079C42.0066 27.1906 41.7372 27.5134 40.5042 28.6154C38.6284 30.2925 38.0205 30.9261 37.4396 31.8059C36.7138 32.9048 36.4697 33.7906 36.5679 34.9712C36.6371 35.8068 36.8055 36.3657 37.1837 37.0187C37.8604 38.1857 38.7812 38.8713 40.1857 39.2522C40.3147 39.2871 40.4397 39.3172 40.5621 39.3429C41.2141 39.4381 41.7935 39.388 42.4453 39.192C43.4285 38.8963 45.1124 37.7449 46.1091 36.6871V36.6871Z"
              stroke="url(#paint0_linear_1242:3)"
              strokeWidth="2.5"
              strokeMiterlimit="10"
            />
            <path
              d="M80.3851 45.9856C81.7196 45.9058 82.8136 45.2066 83.4768 44.0104L83.6718 43.6583L86.0722 33.5586C87.8701 25.995 88.4705 23.4083 88.4626 23.2577C88.4545 23.0981 88.4159 22.9563 88.3492 22.8359C88.2374 22.7216 88.089 22.6404 87.9095 22.598C87.7855 22.5687 87.3408 22.5283 86.9218 22.5083C85.068 22.4196 74.0971 22.0809 73.9027 22.1061C73.6014 22.1454 73.2686 22.3294 73.0763 22.5627L72.9134 22.7602C72.9134 22.7602 69.121 38.5838 68.9985 38.7433C68.8123 38.9856 68.4811 39.1789 68.2123 39.2019C68.0849 39.2129 67.5919 39.2096 67.1166 39.1948C64.9155 39.1267 64.0627 39.2505 63.2464 39.7573C62.783 40.0453 62.3841 40.4935 62.1365 41.0044C61.9004 41.4927 61.7565 42.273 61.8093 42.7804C61.8644 43.3115 62.0412 43.7955 62.3239 44.21C62.5903 44.5459 62.9316 44.8297 63.3394 45.046C64.2413 45.5251 66.1069 45.67 67.1561 45.3429C67.5944 45.206 68.2022 44.8448 68.5526 44.5127C68.6909 44.3816 68.9185 44.1043 69.0577 43.8975C69.5455 43.1717 72.9059 28.9872 72.9867 28.8175C73.123 28.5299 73.378 28.3555 73.6749 28.3463C73.9423 28.338 84.5025 28.6793 84.7955 28.7057C85.0536 28.7291 85.27 28.8671 85.3604 29.0594C85.4269 29.1196 85.4776 29.1914 85.5066 29.2714C85.5587 29.4154 85.5056 29.6635 84.4567 34.1578C83.2498 39.3309 83.2842 39.2112 82.9328 39.4725C82.6772 39.6628 82.4058 39.6955 81.3311 39.6674C79.6958 39.6248 79.1257 39.6536 78.4586 39.811C77.6252 40.0075 77.1149 40.3178 76.635 40.9203C76.2953 41.3465 76.1258 41.6861 76.0137 42.1637C75.8137 43.0176 75.9438 43.7525 76.4387 44.5589C76.4841 44.6329 76.5298 44.7028 76.5763 44.7696C76.8424 45.1053 77.1389 45.3399 77.5347 45.5377C78.1318 45.836 79.4419 46.0419 80.3851 45.9856V45.9856Z"
              stroke="url(#paint1_linear_1242:3)"
              strokeWidth="2.5"
              strokeMiterlimit="10"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1242:3"
                x1="12.61"
                y1="37.0314"
                x2="41.4561"
                y2="20.377"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3434FF" />
                <stop offset="1" stopColor="#FF6534" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1242:3"
                x1="64.3794"
                y1="31.2151"
                x2="85.4541"
                y2="36.1932"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3434FF" />
                <stop offset="1" stopColor="#FF6534" />
              </linearGradient>
            </defs>
          </svg>
        </Grid>

        <Grid className={styles.slideCharacter}>
          <img
            src={"/assets/main-character.png"}
            alt=""
            className={styles.slideCharacterImg}
          />
          <img
            src={"/assets/music-services1.png"}
            alt=""
            className="music-services music-services_1"
          />
          <img
            src={"/assets/music-services2.png"}
            alt=""
            className="music-services music-services_2"
          />
          <img
            src={"/assets/music-services3.png"}
            alt=""
            className="music-services music-services_3"
          />
          <img
            src={"/assets/music-services4.svg"}
            alt=""
            className="music-services music-services_4"
          />
          <img
            src={"/assets/music-services5.svg"}
            alt=""
            className="music-services music-services_5"
          />
          <img
            src={"/assets/music-services6.png"}
            alt=""
            className="music-services music-services_6"
          />
        </Grid>

        <Grid className={styles.slideHalfCircle}>
          <img
            src={"/assets/main-character.png"}
            alt=""
            className={styles.slideCharacterImg}
          />
          <div className={styles.slideTitle}>
            Расскажи <br /> всем о релизе
          </div>
          <Grid className={styles.imgWrapperNotes}>
            <img src={"/assets/notes.svg"} alt="" />
          </Grid>
        </Grid>

        <div className={`${styles.slideTitle} ${styles.slideTitle_main}`}>
          Расскажи <br /> всем о релизе
        </div>
        <Grid
          container
          direction="column"
          className={`${styles.slideSubtitle} ${styles.slideSubtitle_main}`}
        >
          <Grid style={{ marginBottom: "2rem" }}>
            Создай уникальную страницу своего <br /> музыкального релиза
          </Grid>
          <Link href="/release/new">
            <Button
              className={`${styles.slideButton} ${styles.slideButtonMain}`}
            >
              Создать релиз
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ReleaseSliderMainSlide
