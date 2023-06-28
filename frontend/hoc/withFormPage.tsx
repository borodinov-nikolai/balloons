import React, { FunctionComponent, useState } from "react"
import styles from "pages/registration/Registration.module.scss"
import useWindowSize from "hooks/size.hooks"

const withFormPage = (FormComponent: FunctionComponent) => (props: any) => {
  const [isCaptchaVerified, setCaptchaVerified] = useState(false)
  const size = useWindowSize()
  return (
    <div className={`wrapper ${styles.formPageWrapper}`}>
      <div className={styles.bgline1}>
        <svg
          width="291"
          height="386"
          viewBox="0 0 291 386"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M235.393 -125C235.393 -125 154.229 -11.4569 245.223 100.968C347.229 226.993 254.53 359.993 147.906 375.731C41.2824 391.47 -26.2619 260.648 -193.493 351.975C-364.475 445.357 -492.483 305.671 -492.483 305.671"
            stroke="#204CEC"
            stroke-width="3"
            stroke-miterlimit="10"
          />
          <path
            d="M86.6784 -88.9167C86.6784 -88.9167 100.083 44.2992 177.879 139.64C255.676 234.98 185.878 291.679 148.114 297.081C69.7873 308.263 -21.1887 178.903 -129.026 229.334C-210.06 267.26 -283.382 379.975 -407.508 291.949"
            stroke="#204CEC"
            stroke-width="3"
            stroke-miterlimit="10"
          />
          <path
            d="M62.5357 -12.1517C62.5357 -12.1517 142.117 86.0325 55.0951 110.506C-44.5975 138.581 -73.2521 85.8693 -154.973 198.448C-183.948 238.516 -338.768 334.728 -362.504 220.194"
            stroke="#204CEC"
            stroke-width="3"
            stroke-miterlimit="10"
          />
        </svg>
      </div>
      <div className={styles.bgline2}>
        <svg
          width="307"
          height="249"
          viewBox="0 0 307 249"
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
            d="M-49.1851 207.357C-49.1851 207.357 4.80956 132.969 38.383 189.496C76.8708 254.245 45.2348 284.297 139.704 320.515C173.306 333.328 270.038 423.979 194.045 462.212"
            stroke="#204CEC"
            stroke-width="3"
            stroke-miterlimit="10"
          />
        </svg>
      </div>

      {size.width > 1100 ? (
        <div className={styles.bgline3}>
          <svg
            width="926"
            height="293"
            viewBox="0 0 926 293"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M925.001 -147C925.001 -147 786.324 -83.9057 810.98 72.1777C838.623 247.144 678.426 322.347 569.058 278.992C459.689 235.637 467.238 74.9568 259.335 70.0144C46.7659 64.9669 2.00098 -137.13 2.00098 -137.13"
              stroke="url(#paint0_linear_0_1)"
              stroke-width="3"
              stroke-miterlimit="10"
            />
            <path
              d="M764.001 -193C764.001 -193 704.058 -59.857 725.532 72.626C747.007 205.109 650.229 220.601 611.641 205.109C531.617 172.956 516.241 1.15056 386.974 -10.0222C289.821 -18.3905 159.19 48.091 90.001 -102.748"
              stroke="url(#paint1_linear_0_1)"
              stroke-width="3"
              stroke-miterlimit="10"
            />
            <defs>
              <linearGradient
                id="paint0_linear_0_1"
                x1="463.501"
                y1="-147"
                x2="463.501"
                y2="291"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#204CEC" />
                <stop offset="1" stop-color="#FD6436" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_0_1"
                x1="427.001"
                y1="-193"
                x2="427.001"
                y2="210"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#204CEC" />
                <stop offset="1" stop-color="#FD6436" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ) : (
        <div className={styles.bgline3M}>
          <svg
            width="657"
            height="338"
            viewBox="0 0 657 338"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M882.565 1.11979C882.565 1.11979 731.127 17.8177 705.875 173.806C677.572 348.666 501.912 370.157 411.519 294.856C321.127 219.554 378.411 69.2421 182.419 -0.292966C-17.974 -71.3835 2.52247 -277.362 2.52247 -277.362"
              stroke="url(#paint0_linear_0_1)"
              stroke-width="3"
              stroke-miterlimit="10"
            />
            <path
              d="M743.941 -92.7974C743.941 -92.7974 645.464 15.0102 624.549 147.583C603.635 280.156 506.852 264.692 475.02 237.938C409.015 182.431 447.988 14.4 328.653 -36.5305C238.956 -74.7808 94.1062 -52.3554 75.4105 -217.25"
              stroke="url(#paint1_linear_0_1)"
              stroke-width="3"
              stroke-miterlimit="10"
            />
            <defs>
              <linearGradient
                id="paint0_linear_0_1"
                x1="444.083"
                y1="-142.81"
                x2="307.482"
                y2="273.344"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#204CEC" />
                <stop offset="1" stop-color="#FD6436" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_0_1"
                x1="423.749"
                y1="-197.899"
                x2="298.064"
                y2="185.001"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#204CEC" />
                <stop offset="1" stop-color="#FD6436" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      <div className={styles.bgline4}>
        <svg
          width="313"
          height="389"
          viewBox="0 0 313 389"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M385.181 1.92009C385.181 1.92009 247.444 -2.16709 209.435 134.329C172.256 267.828 69.7991 236.71 23.9408 300.282C-21.9175 363.854 0.422529 479.624 117.852 490.341C222.607 499.904 219 563.5 240.652 599.794C262.304 636.088 314 660 314 660"
            stroke="#FC6338"
            stroke-width="3"
            stroke-miterlimit="10"
          />
          <path
            d="M318 531.5C318 531.5 220.991 443.4 131.835 435.619C42.6797 427.838 48.5094 362.697 64.8411 340.268C98.727 293.761 212.303 311.92 240.688 230.124C262.003 168.645 240.414 73.263 349.247 53.1804"
            stroke="#FC6338"
            stroke-width="3"
            stroke-miterlimit="10"
          />
          <path
            d="M314 463C314 463 177.92 444.155 209.285 386.374C245.197 320.161 287.209 331.949 269.95 232.258C263.751 196.834 292.09 67.3288 363.841 113.029"
            stroke="#FC6338"
            stroke-width="3"
            stroke-miterlimit="10"
          />
        </svg>
      </div>

      <div className="vector__bg vector__bg_reg1">
        <svg
          width="291"
          height="386"
          viewBox="0 0 291 386"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M235.393 -125C235.393 -125 154.229 -11.4569 245.223 100.968C347.229 226.993 254.53 359.993 147.906 375.731C41.2824 391.47 -26.2619 260.648 -193.493 351.975C-364.475 445.357 -492.483 305.671 -492.483 305.671"
            stroke="#204CEC"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M86.6784 -88.9167C86.6784 -88.9167 100.083 44.2992 177.879 139.64C255.676 234.98 185.878 291.679 148.114 297.081C69.7873 308.263 -21.1887 178.903 -129.026 229.334C-210.06 267.26 -283.382 379.975 -407.508 291.949"
            stroke="#204CEC"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M62.5357 -12.1517C62.5357 -12.1517 142.117 86.0325 55.0951 110.506C-44.5975 138.581 -73.2521 85.8693 -154.973 198.448C-183.948 238.516 -338.768 334.728 -362.504 220.194"
            stroke="#204CEC"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
      <div className="vector__bg vector__bg_reg2">
        <svg
          width="926"
          height="293"
          viewBox="0 0 926 293"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M925.001 -147C925.001 -147 786.324 -83.9057 810.98 72.1777C838.623 247.144 678.426 322.347 569.058 278.992C459.689 235.637 467.238 74.9568 259.335 70.0144C46.7659 64.9669 2.00098 -137.13 2.00098 -137.13"
            stroke="url(#paint0_linear_0:1)"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M764.001 -193C764.001 -193 704.058 -59.857 725.532 72.626C747.007 205.109 650.229 220.601 611.641 205.109C531.617 172.956 516.241 1.15056 386.974 -10.0222C289.821 -18.3905 159.19 48.091 90.001 -102.748"
            stroke="url(#paint1_linear_0:1)"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <defs>
            <linearGradient
              id="paint0_linear_0:1"
              x1="463.501"
              y1="-147"
              x2="463.501"
              y2="291"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#204CEC" />
              <stop offset="1" stopColor="#FD6436" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_0:1"
              x1="427.001"
              y1="-193"
              x2="427.001"
              y2="210"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#204CEC" />
              <stop offset="1" stopColor="#FD6436" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="vector__bg vector__bg_reg3">
        <svg
          width="307"
          height="249"
          viewBox="0 0 307 249"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-160.999 107.167C-160.999 107.167 -65.9568 142.812 -4.10619 57.7256C65.2256 -37.656 176.107 2.42985 207.234 74.3709C238.361 146.312 159.172 218.387 254.808 318.676C352.594 421.214 278.56 537.434 278.56 537.434"
            stroke="#204CEC"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M-107.657 204.846C-107.657 204.846 -16.596 170.354 35.737 97.7551C88.0699 25.1565 141.039 63.517 151.943 89.0294C174.542 141.949 100.791 230.21 156.518 296.473C198.414 346.261 291.398 376.553 252.925 480.321"
            stroke="#204CEC"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M-49.1851 207.357C-49.1851 207.357 4.80956 132.969 38.383 189.496C76.8708 254.245 45.2348 284.297 139.704 320.515C173.306 333.328 270.038 423.979 194.045 462.212"
            stroke="#204CEC"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
      <div className="vector__bg vector__bg_reg4">
        <svg
          width="313"
          height="389"
          viewBox="0 0 313 389"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M385.181 1.92009C385.181 1.92009 247.444 -2.16709 209.435 134.329C172.256 267.828 69.7991 236.71 23.9408 300.282C-21.9175 363.854 0.422529 479.624 117.852 490.341C222.607 499.904 219 563.5 240.652 599.794C262.304 636.088 314 660 314 660"
            stroke="#FC6338"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M318 531.5C318 531.5 220.991 443.4 131.835 435.619C42.6797 427.838 48.5094 362.697 64.8411 340.268C98.727 293.761 212.303 311.92 240.688 230.124C262.003 168.645 240.414 73.263 349.247 53.1804"
            stroke="#FC6338"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M314 463C314 463 177.92 444.155 209.285 386.374C245.197 320.161 287.209 331.949 269.95 232.258C263.751 196.834 292.09 67.3288 363.841 113.029"
            stroke="#FC6338"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
      <div className={styles.vinylRecordReg}>
        <svg
          width="733"
          height="733"
          viewBox="0 0 733 733"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M366.5 125C499.877 125 608 233.123 608 366.5C608 499.877 499.877 608 366.5 608C233.123 608 125 499.877 125 366.5C125 233.123 233.123 125 366.5 125Z"
            stroke="url(#paint0_linear_753:808)"
            strokeWidth="250"
          />
          <defs>
            <linearGradient
              id="paint0_linear_753:808"
              x1="366.5"
              y1="849.399"
              x2="366.5"
              y2="-242.236"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF3B3B" />
              <stop offset="1" stopColor="#FFCD1C" />
            </linearGradient>
          </defs>
        </svg>
        <div className={styles.vinylRecordReg__center}>
          <svg viewBox="0 0 400 400">
            <path
              d="M200,200 m-172,0 a172,172 0 1,1 345,0 a172,172 0 1,1 -345,0"
              fillOpacity="0"
              id="tophalf"
            />
            <text fill="#fff">
              <textPath xlinkHref="#tophalf" startOffset="2%">
                СТАНЬ ЧАСТЬЮ LINK MUSIC -
              </textPath>
              <textPath xlinkHref="#tophalf" startOffset="52%">
                СТАНЬ ЧАСТЬЮ LINK MUSIC -
              </textPath>
            </text>
          </svg>
        </div>
      </div>
      <div className={styles.formPage__notes}>
        <svg
          width="271"
          height="187"
          viewBox="0 0 271 187"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M137.469 128.003C141.863 123.338 143.382 117.302 141.764 110.948L141.287 109.078L116.464 65.9463C97.8753 33.6442 91.4678 22.6451 90.9453 22.1453C90.3923 21.6152 89.7912 21.2474 89.163 21.0463C88.397 21.0151 87.6122 21.2195 86.8467 21.6615C86.3175 21.967 84.6332 23.2876 83.1055 24.5952C76.3451 30.3794 36.9504 65.2597 36.355 65.9867C35.4326 67.1143 34.8763 68.8505 34.9724 70.2965L35.053 71.5212C35.053 71.5212 73.8335 139.202 73.9304 140.161C74.0772 141.618 73.5569 143.381 72.6947 144.345C72.2861 144.802 70.5549 146.412 68.8477 147.922C60.9435 154.92 58.3748 158.155 57.1924 162.607C56.522 165.135 56.6031 168.01 57.4188 170.607C58.2003 173.087 60.2628 176.283 62.115 177.879C64.0532 179.551 66.2606 180.659 68.6099 181.176C70.6435 181.472 72.7672 181.341 74.9016 180.755C79.6234 179.462 86.6091 173.835 89.1951 169.245C90.2745 167.327 91.2083 164.069 91.3391 161.758C91.3909 160.846 91.2736 159.13 91.0792 157.951C90.3956 153.815 55.4956 93.274 55.2196 92.4163C54.7501 90.9648 55.0664 89.5182 56.0724 88.51C56.9779 87.6021 94.948 54.0805 96.0573 53.2097C97.0349 52.4426 98.2435 52.2128 99.191 52.587C99.6208 52.5783 100.034 52.6622 100.398 52.8462C101.054 53.1772 101.684 54.2173 112.797 73.3476C125.59 95.3658 125.316 94.8347 124.949 96.9018C124.683 98.4061 123.843 99.4122 120.001 102.847C114.155 108.074 112.26 110.048 110.45 112.79C108.188 116.215 107.427 118.975 107.733 122.655C107.948 125.259 108.473 127.001 109.652 129.036C111.761 132.673 114.631 134.81 119.008 135.997C119.41 136.106 119.799 136.199 120.181 136.28C122.213 136.576 124.019 136.42 126.05 135.809C129.114 134.888 134.363 131.299 137.469 128.003V128.003Z"
            stroke="white"
            strokeWidth="2.5"
            strokeMiterlimit="10"
          />
          <path
            d="M244.288 156.982C248.447 156.733 251.857 154.554 253.924 150.826L254.531 149.729L262.012 118.252C267.615 94.6798 269.487 86.6185 269.462 86.1491C269.437 85.6518 269.316 85.2097 269.109 84.8345C268.76 84.4783 268.298 84.2252 267.738 84.093C267.352 84.0017 265.966 83.8758 264.66 83.8136C258.882 83.5371 224.691 82.4814 224.085 82.56C223.146 82.6824 222.109 83.256 221.51 83.9831L221.002 84.5986C221.002 84.5986 209.183 133.914 208.801 134.411C208.221 135.166 207.188 135.768 206.351 135.84C205.954 135.874 204.417 135.864 202.936 135.818C196.076 135.606 193.418 135.991 190.874 137.571C189.43 138.469 188.187 139.865 187.415 141.458C186.679 142.98 186.231 145.411 186.395 146.993C186.567 148.648 187.118 150.156 187.999 151.448C188.829 152.495 189.893 153.379 191.164 154.054C193.975 155.547 199.789 155.998 203.059 154.979C204.425 154.552 206.319 153.427 207.411 152.392C207.842 151.983 208.552 151.119 208.985 150.474C210.506 148.212 220.979 104.005 221.23 103.476C221.655 102.58 222.45 102.037 223.375 102.008C224.209 101.982 257.12 103.046 258.033 103.128C258.838 103.201 259.512 103.631 259.794 104.23C260.001 104.418 260.159 104.642 260.249 104.891C260.412 105.34 260.246 106.113 256.977 120.12C253.216 136.242 253.323 135.869 252.228 136.684C251.431 137.277 250.586 137.378 247.236 137.291C242.14 137.158 240.363 137.248 238.284 137.738C235.687 138.351 234.096 139.318 232.601 141.195C231.542 142.524 231.014 143.582 230.664 145.071C230.041 147.732 230.446 150.022 231.989 152.535C232.13 152.766 232.273 152.984 232.418 153.192C233.247 154.238 234.171 154.969 235.405 155.586C237.266 156.516 241.349 157.157 244.288 156.982V156.982Z"
            stroke="white"
            strokeWidth="2.5"
            strokeMiterlimit="10"
          />
          <path
            d="M208.103 33.89C209.707 33.7941 211.021 32.9537 211.819 31.5159L212.053 31.0928L214.938 18.9537C217.099 9.86285 217.821 6.75396 217.811 6.57292C217.801 6.38112 217.755 6.21066 217.675 6.06596C217.54 5.92857 217.362 5.83095 217.146 5.78C216.997 5.74478 216.463 5.69623 215.959 5.67222C213.731 5.56558 200.545 5.15846 200.311 5.18877C199.949 5.23598 199.549 5.45718 199.318 5.7376L199.122 5.97497C199.122 5.97497 194.564 24.9936 194.417 25.1853C194.193 25.4765 193.795 25.7089 193.472 25.7365C193.319 25.7497 192.726 25.7458 192.155 25.728C189.509 25.6461 188.484 25.7949 187.503 26.4041C186.946 26.7502 186.467 27.2889 186.169 27.903C185.885 28.4899 185.712 29.4278 185.776 30.0376C185.842 30.6759 186.055 31.2576 186.394 31.7559C186.715 32.1596 187.125 32.5006 187.615 32.7607C188.699 33.3365 190.941 33.5106 192.202 33.1175C192.729 32.953 193.46 32.5189 193.881 32.1197C194.047 31.9621 194.321 31.6288 194.488 31.3802C195.074 30.5079 199.113 13.4593 199.21 13.2553C199.374 12.9097 199.681 12.7001 200.038 12.689C200.359 12.679 213.051 13.0892 213.403 13.121C213.714 13.1491 213.974 13.3149 214.082 13.5461C214.162 13.6184 214.223 13.7047 214.258 13.8009C214.321 13.974 214.257 14.2721 212.996 19.6739C211.546 25.8916 211.587 25.7476 211.165 26.0618C210.857 26.2905 210.531 26.3298 209.24 26.296C207.274 26.2448 206.589 26.2794 205.787 26.4686C204.785 26.7047 204.172 27.0778 203.595 27.8018C203.187 28.3142 202.983 28.7223 202.848 29.2964C202.608 30.3227 202.764 31.206 203.359 32.1751C203.414 32.2641 203.469 32.3482 203.525 32.4284C203.845 32.8319 204.201 33.1138 204.677 33.3516C205.394 33.7102 206.969 33.9576 208.103 33.89V33.89Z"
            stroke="white"
            strokeWidth="2.5"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
      <img
        src="/assets/music-services4.svg"
        alt=""
        className="music-services music-services_reg1"
      />
      <img
        src="/assets/music-services1.png"
        alt=""
        className="music-services music-services_reg2"
      />
      <img
        src="/assets/music-services5.svg"
        alt=""
        className="music-services music-services_reg3"
      />
      <img
        src="/assets/music-services6.png"
        alt=""
        className="music-services music-services_reg4"
      />

      <FormComponent
        {...props}
        isCaptchaVerified={isCaptchaVerified}
        setCaptchaVerified={setCaptchaVerified}
      />
    </div>
  )
}

export default withFormPage
