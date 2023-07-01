import { useState } from "react"
import Slider, { Settings } from "react-slick"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material"
import styles from "./Suggestion.module.scss"
import { SuggestionType } from "components/Suggestion/types"
import useWindowSize from "hooks/size.hooks"
import suggestionLines from "./../../public/assets/suggestion_lines.svg"

const listData: SuggestionType[] = [
  {
    id: 1,
    classes: `${styles.slider__item} ${styles.slider__item_1}`,
    bgColor: "linear-gradient(90deg, #3479FF 0%, #343CFF 100%)",
    img: "assets/suggestion-slider__img-1.svg",
    title: "Создание страницы релиза",
    text: "Мы предлагаем сервис по созданию страницы релиза",
    fullText: `Вы – артист (солист, музыкальный коллектив, студийный проект) или уполномоченный представитель? Мы предлагаем вам средство для удобного и оперативного представления аудитории ваших композиций – Страницы Релизов. На каждую страницу вы сможете загрузить обложку и добавить любое количество прямых ссылок на соответствующий сингл, альбом или видеоклип, который опубликован на цифровых площадках и электронных витринах в сети Интернет. Созданная страница будет автоматически доступна по уникальному короткому веб-адресу и адаптирована для отображения на всех видах устройств (компьютер, телефон, планшет).
Вам останется лишь опубликовать на своих ресурсах этот короткий адрес, а вашей аудитории – выбрать предпочитаемый музыкальный сервис одним кликом из открывшегося списка, чтобы прослушать, посмотреть или скачать новый релиз.
Базовая версия услуги Страницы Релизов предоставляется зарегистрированным пользователям абсолютно бесплатно.
Артисты, воспользовавшиеся услугой Страницы Релизов, в качестве дополнительного средства продвижения, будут представлены на сайте Link Music в Каталоге Исполнителей – этот раздел посещают организаторы концертов, фестивалей, заказчики корпоративных и частных мероприятий, представители СМИ. Не упускайте возможность напомнить о себе на профессиональном ресурсе.
Link Music: Музыкальные Связи в Цифровом Мире
Включайтесь!
`,
  },
  {
    id: 2,
    classes: `${styles.slider__item} ${styles.slider__item_2}`,
    bgColor: "linear-gradient(77.81deg, #DA1AA4 -19.28%, #FF6534 100%)",
    img: "assets/suggestion-slider__img-2.png",
    title: "Дистрибуция",
    text:
      "Размещаем, сихнхронизируем и монетезируем музыкальный контент на всех цифровых витринах " +
      "(Apple Music, iTunes, Spotify, Boom, YouTube Music, Яндекс.Музыка, и т.д.)",
    fullText: `У вас есть музыкальный материал, который вы собираетесь опубликовать с целью получать доход? Попробуйте наш сервис Цифровая Дистрибуция с размещением и последующей монетизацией релизов на десятках цифровых площадок и электронных витрин в России и за рубежом.
Профессионально и оперативно выполняем выгрузку синглов, альбомов и видеоклипов – они становятся доступны миллионам пользователей разных стран мира в назначенную вами дату релиза.
Чтобы «держать руку на пульсе» происходящего, в вашем распоряжении будет личный кабинет с подробной статистикой по прослушиваниям/загрузкам. Вы сможете видеть, в каких городах ваше творчество обрело поклонников и нашло наибольший отклик – это поможет планировать дальнейшую активность, рекламные кампании, промо-мероприятия и гастрольные туры. Детальная информация об объемах прослушиваний на всех площадках и начисленных суммах вознаграждения (роялти) предоставляется в отчетах, которые формируются по итогам каждого календарного квартала по мере поступления данных от цифровых сервисов. Расчеты за монетизацию осуществляются в соответствии с условиями договора, заключаемого с вами как правообладателем при намерении воспользоваться сервисом Цифровая Дистрибуция.
Как бонус к распространению по цифровым площадкам, ваши релизы получат приоритетное размещение на первых страницах в каталоге Link Music и будут анонсированы в социальных сетях лейбла, в т.ч. среди других профессионалов шоу-бизнеса. При этом наши специалисты по артистам и репертуару систематически изучают поступающий музыкальный материал в поисках новых талантливых исполнителей для предложения делового сотрудничества на постоянной основе.
Link Music: Музыкальные Связи в Цифровом Мире
Включайтесь!`,
  },
  {
    id: 3,
    classes: `${styles.slider__item} ${styles.slider__item_3}`,
    bgColor: "linear-gradient(90deg, #3479FF 0%, #343CFF 100%)",
    img: "assets/suggestion-slider__img-3.png",
    title: "Продвижение",
    text: "Находим, аккумулируем и развиваем целевую аудиторию исполнителей",
    fullText: `Чувствуете потребность в общении со своей аудиторией,  но не очень представляете, кто в неё входит? Хотите сформировать или расширить сообщество? Мы можем помочь, предлагаем сервис Продвижение (альтернативное название – Соцразвитие). В рамках этой услуги мы вместе с артистом находим, аккумулируем и развиваем его сообщество.
В эпоху гаджетов и соцсетей формирование сетевого сообщества и эффективное взаимодействие с ним зачастую обеспечивает даже больший вклад в успех публичной персоны, чем прямая реклама и методы коммуникации «сверху вниз» через традиционные СМИ. Публику интересует не только официально выпускаемый артистом «продукт», но и возможность неформальной коммуникации, которая, помимо музыкальной тематики, может охватывать самые разные аспекты человеческой деятельности и повседневной жизни. Другими словами – то, что создает настроение, вызывает отклик и формирует приверженность той или иной персоне. Не менее важным фактором на конкурентном рынке является регулярность общения с сообществом, когда артист постепенно занимает и расширяет свое место в жизни поклонников, а не появляется внезапно «из ниоткуда», исчезая надолго «в никуда». Во всяком случае, это особенно важно для артистов, пока не входящих в число общепризнанных суперзвёзд.
Наш многолетний опыт работы в музыкальной отрасли позволяет предложить вам такую консалтинговую услугу, в результате которой вы сможете получить «портрет» своей целевой аудитории и рекомендации по тем или иным формам и способам создания креативного контента для привлечения, удержания и расширения круга поклонников в социальных сообществах. В зависимости от доступных ресурсов, существуют различные способы достичь желаемых целей – как с использованием бесплатных средств, так и с привлечением дополнительных услуг на коммерческой основе.
Хорошо развитая социальная база в сети, помимо прочего, это дополнительный эффективный и добровольный канал распространения информации об артисте, постоянно подогретый интерес к релизам (рост прослушиваний и просмотров, рост доходов от монетизации) и почти готовая зрительская аудитория для предстоящих концертов.
Link Music: Музыкальные Связи в Цифровом Мире
Включайтесь!`,
  },
  {
    id: 4,
    classes: `${styles.slider__item} ${styles.slider__item_4}`,
    bgColor: "linear-gradient(77.81deg, #EE38BB -19.28%, #F7BA44 100%)",
    img: "assets/suggestion-slider__img-4.svg",
    title: "Организация мероприятий",
    text:
      "Организуем концерты, частные и корпоративные события с участием популярынх " +
      "российских и зарубежных исполнителей",
    fullText: `Грядёт праздник, и вам нужны звёзды? Хотите пригласить любимого артиста в торжественную дату? Это проще, чем может показаться! В компании Link Music работают профессионалы шоу-бизнеса с колоссальным опытом организации мероприятий любого масштаба, которые знают всех и умеют договариваться. Остается только загадать, чтобы назначенная дата в графике выбранного артиста была свободной!
Поэтому с гордостью можем предложить вам полный комплекс услуг по организации выступлений звезд российской и мировой сцены – от первого контакта и до отбытия с концертной площадки. За плечами наших сотрудников десятки лет проведения концертных (публичных, корпоративных, частных и совсем приватных) мероприятий как в России, так и за рубежом. Теперь мы работаем в одной компании, складывая и преумножая свои компетенции в сфере организации развлечений.
Прямые контакты с артистами и их менеджментом, отсутствие лишних участников в процессе переговоров и последующей координации, отлаженная работа команды, ответственный подход и внимание к деталям – всё это гарантирует взаимопонимание между всеми сторонами процесса и адекватную рыночную цену работы артистов на вашем мероприятии.
Вы можете обратиться к нам с заявкой в любое время, и мы сообщим предварительный ответ в кратчайшие сроки. Доверьте эту работу тем, кто знает, как её выполнить, и позвольте себе отдохнуть. Пусть праздник не вызовет неоправданных затрат и подарит только положительные эмоции!
Link Music: Самые Музыкальные Связи в Цифровом Мире
Включайтесь!`,
  },
  {
    id: 5,
    classes: `${styles.slider__item} ${styles.slider__item_5}`,
    bgColor: "linear-gradient(77.81deg, #DA1AA4 -19.28%, #FF6534 100%)",
    img: "assets/suggestion-slider__img-5.svg",
    title: "Менеджмент",
    text:
      "Оказываем полный комплекс услуг по сопровождению деятельности исполнения, " +
      "а так же юридическую, бухгалтерскую, административно-организационную поддержку",
    fullText: `Артист должен заниматься творчеством, а не рутиной. Музыкант вправе не иметь юридического образования и может не знать, как ведётся бухучёт. Певец может не хотеть вести нудные переговоры и оформлять сотни бумаг… Но как без этого жить? Там согласуй, тут подпиши, здесь рассчитай, этому ответь, тому обеспечь… А сколько известно случаев, когда документ, подписанный без должного понимания, приводил потом к неприятностям или финансовым потерям!
Мы, в компании Link Music, уверены, что каждый должен заниматься своим делом – и тогда жизнь наладится! Во всяком случае, она точно станет лучше.
Именно исходя из этого принципа, мы предлагаем вам воспользоваться профессиональным Менеджментом Артистов – полным спектром услуг по сопровождению деятельности творческих персон. Вы занимаетесь своей основной деятельностью, а мы надежно «обеспечиваем тылы» – организацию необходимого документооборота, решение юридических и административных вопросов, ведение бухгалтерского и/или налогового учёта. Наши представители всегда на связи, с готовностью оказать оперативное содействие в решении поставленных вами задач. Мы не игнорируем телефонные звонки от клиентов, не пропускаем сообщения в мессенджерах и письма в почтовом ящике.
Приоритетной целью для нас является постоянное развитие и популяризация артистов, которые нам доверяют. Предлагаем развиваться вместе!
Link Music: Музыкальные Связи в Цифровом Мире
Присоединяйтесь!`,
  },
]

function PrevArrow(props: any) {
  const { onClick } = props
  return (
    <button
      className={`${styles.sliderButton} ${styles.slider_button_prev}`}
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
      className={`${styles.sliderButton} ${styles.slider_button_next}`}
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

function ExpandSlideIcon() {
  return (
    <svg
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1L8 8L15 1" stroke="white" strokeWidth="1.8" />
    </svg>
  )
}

const settings: Settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 768,
      settings: "unslick",
    },
  ],
}

const settingsModal: Settings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
  centerMode: true,
  focusOnSelect: true,
  draggable: false,
  swipe: false,
}

function Suggestion() {
  let isMobile = useMediaQuery("(max-width: 767px)")
  const [openModal, toggleModal] = useState<boolean>(false)
  const [openTabIndex, changeTab] = useState<number>(0)
  const [modalState, changeModalState] = useState<
    (SuggestionType & { slideIndex?: number; text?: string }) | null
  >(null)
  const size = useWindowSize()
  return (
    <div className={`${styles.blockSuggestion} block`}>
      <span key="services-anchor" id="services" className="block__anchor" />

      <Grid container className="content">
        <Grid className={styles.text_part}>
          <Typography variant="h2">Мы предлагаем</Typography>

          <div className={styles.column__text}>
            Комплекс удобных услуг для вашей музыкальной деятельности. Узнайте
            подробности в карточках.
          </div>

          <Button fullWidth href={"#contacts"} className={styles.column__btn}>
            Связаться с нами
          </Button>

          <div className="vector__bg vector__bg_5">
            <svg
              width="255"
              height="561"
              viewBox="0 0 255 561"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-66.6936 45.5329C-66.6936 45.5329 40.3833 46.7252 65.5697 153.914C90.2061 258.749 170.746 237.835 204.338 288.65C237.93 339.465 216.915 428.647 125.396 433.246C43.754 437.351 44.5393 486.845 26.5769 514.34C8.61455 541.834 -32.283 558.762 -32.283 558.762"
                stroke="url(#paint0_linear_599_66)"
                stroke-width="3"
                stroke-miterlimit="10"
              />
              <path
                d="M-31.3175 458.86C-31.3175 458.86 46.7981 393.529 116.271 390.313C185.743 387.097 183.282 336.333 171.312 318.401C146.475 281.215 57.7118 291.715 38.2644 227.304C23.663 178.892 43.4493 105.516 -40.4189 86.4733"
                stroke="url(#paint1_linear_599_66)"
                stroke-width="3"
                stroke-miterlimit="10"
              />
              <path
                d="M-26.0389 405.799C-26.0389 405.799 80.2193 395.48 57.6974 349.621C31.9118 297.071 -1.0826 304.892 15.4785 228.033C21.4144 200.725 3.51523 99.2704 -53.6451 132.48"
                stroke="url(#paint2_linear_599_66)"
                stroke-width="3"
                stroke-miterlimit="10"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_599_66"
                  x1="6.52285"
                  y1="30.1515"
                  x2="111.24"
                  y2="528.611"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#3434FF" />
                  <stop offset="1" stop-color="#FF6534" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_599_66"
                  x1="5.77549"
                  y1="76.7687"
                  x2="81.085"
                  y2="435.247"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#3434FF" />
                  <stop offset="1" stop-color="#FF6534" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_599_66"
                  x1="-36.5022"
                  y1="126.077"
                  x2="20.4708"
                  y2="397.272"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#3434FF" />
                  <stop offset="1" stop-color="#FF6534" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </Grid>

        <Slider {...settings} className={styles.column__slider}>
          {!isMobile &&
            listData.map(
              (
                { classes, img, title, text, id, fullText, bgColor },
                slideIndex
              ) => {
                return (
                  <div key={id}>
                    <Grid
                      className={classes}
                      style={{ background: bgColor }}
                      onClick={() => {
                        changeModalState({
                          title,
                          img,
                          fullText,
                          text,
                          id,
                          bgColor,
                          slideIndex,
                        })
                        toggleModal((openModal) => !openModal)
                      }}
                    >
                      <div className={styles.slider__img}>
                        <img src={img} alt="" />
                      </div>
                      <div className={styles.slider__summary}>
                        <div className={styles.slider__title}>{title}</div>
                      </div>
                      <div className={styles.slider__text}>{text}</div>

                      <span className={styles.slider__effect} />
                    </Grid>
                  </div>
                )
              }
            )}

          {isMobile &&
            listData.map(
              (
                { classes, img, title, text, id, fullText, bgColor },
                slideIndex
              ) => {
                return (
                  <Accordion
                    key={id}
                    expanded={id === openTabIndex}
                    className={classes}
                    style={{ background: bgColor }}
                    onChange={() => {
                      changeTab(id)
                    }}
                  >
                    <AccordionSummary
                      className={styles.slider__summary}
                      expandIcon={<ExpandSlideIcon />}
                    >
                      <Typography variant="h5">{title}</Typography>
                    </AccordionSummary>

                    <AccordionDetails className={styles.slider__details}>
                      <div className={styles.slider__img}>
                        <img src={img} alt="" />
                      </div>
                      <Typography>{text}</Typography>
                      <Button
                        onClick={() => {
                          changeModalState({
                            title,
                            img,
                            fullText,
                            text,
                            id,
                            bgColor,
                            slideIndex,
                          })
                          toggleModal((openModal) => !openModal)
                        }}
                      >
                        Подробнее
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                )
              }
            )}
        </Slider>
      </Grid>

      <div className="vector__bg vector__bg_5 vector__bg_5_2">
        <svg
          width="392"
          height={size.width > 1024 ? "700" : "650"}
          viewBox="0 0 392 561"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M70.3064 45.5329C70.3064 45.5329 177.383 46.7252 202.57 153.914C227.206 258.749 307.746 237.835 341.338 288.65C374.93 339.465 353.915 428.647 262.396 433.246C180.754 437.351 181.539 486.845 163.577 514.34C145.615 541.834 104.717 558.762 104.717 558.762"
            stroke="url(#paint4_linear_599:66)"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M105.683 458.86C105.683 458.86 183.798 393.529 253.271 390.313C322.743 387.097 320.282 336.333 308.312 318.401C283.475 281.215 194.712 291.715 175.264 227.304C160.663 178.892 180.449 105.516 96.5811 86.4733"
            stroke="url(#paint5_linear_599:66)"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M110.961 405.799C110.961 405.799 217.219 395.48 194.697 349.621C168.912 297.071 135.917 304.892 152.478 228.033C158.414 200.725 140.515 99.2704 83.3549 132.48"
            stroke="url(#paint6_linear_599:66)"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <defs>
            <linearGradient
              id="paint4_linear_599:66"
              x1="143.523"
              y1="30.1515"
              x2="248.24"
              y2="528.611"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3434FF" />
              <stop offset="1" stopColor="#FF6534" />
            </linearGradient>
            <linearGradient
              id="paint5_linear_599:66"
              x1="142.775"
              y1="76.7687"
              x2="218.085"
              y2="435.247"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3434FF" />
              <stop offset="1" stopColor="#FF6534" />
            </linearGradient>
            <linearGradient
              id="paint6_linear_599:66"
              x1="100.498"
              y1="126.077"
              x2="157.471"
              y2="397.272"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3434FF" />
              <stop offset="1" stopColor="#FF6534" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <Modal
        open={openModal}
        className={`block_suggestion ${styles.modal}`}
        style={{ background: modalState?.bgColor }}
      >
        <div>
          <Slider
            className={styles.modal__slider}
            {...settingsModal}
            initialSlide={modalState?.slideIndex}
          >
            {listData.map(({ img, title, id, fullText, text, bgColor }) => {
              return (
                <div
                  key={id}
                  style={{ width: "45vw", height: "100%" }}
                  onClick={() => {
                    changeModalState({
                      title,
                      img,
                      fullText,
                      text,
                      id,
                      bgColor,
                    })
                  }}
                >
                  <div
                    className={styles.modal__slide}
                    style={{ background: bgColor }}
                  >
                    <div className={styles.modal__slide_img}>
                      <img src={img} alt="" />
                    </div>
                    <div className={styles.modal__slide_title}>{title}</div>
                  </div>
                </div>
              )
            })}
          </Slider>

          <div className={styles.modal__content}>
            <div className={styles.modal__header}>
              {openModal && (
                <h3 className={styles.modal__title}>{modalState?.title}</h3>
              )}
              {openModal && (
                <div className={styles.modal__contentImg}>
                  <img
                    style={{ maxHeight: "10rem" }}
                    src={modalState?.img}
                    alt=""
                  />
                </div>
              )}
            </div>

            {openModal && (
              <div className={styles.modal__description}>
                {modalState?.fullText.split("\n").map((textPart) => {
                  return <div key={textPart}>{textPart}</div>
                })}
              </div>
            )}

            <a
              href={"/#contacts"}
              className={`${styles.modal__contactsBtn} tl_btn`}
              onClick={() => {
                toggleModal(!openModal)
              }}
            >
              Связаться с нами
            </a>

            <button
              className={styles.modal__close}
              onClick={() => {
                toggleModal(!openModal)
              }}
            >
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1.78125"
                  y="3.05176e-05"
                  width="20.1133"
                  height="2.51416"
                  transform="rotate(45 1.78125 3.05176e-05)"
                  fill="white"
                />
                <rect
                  x="16"
                  y="1.77777"
                  width="20.1133"
                  height="2.51416"
                  transform="rotate(135 16 1.77777)"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Suggestion
