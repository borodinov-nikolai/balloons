import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <title>AirBalloonsUfa - гелиевые шары с доставкой в Уфе</title>
        <meta
          name="description"
          content="Добро пожаловать в магазин гелиевых шаров в Уфе! У нас вы найдете широкий ассортимент красочных и качественных гелиевых шаров для любого праздника и мероприятия. Мы предлагаем шары различных форм, размеров и цветов по доступным ценам в Уфе. Независимо от того, ищете ли вы шары для детского дня рождения, свадьбы, корпоративного мероприятия или другого события, у нас есть идеальный выбор для вас."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
                ym(96942800, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true
                });
              `,
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/96942800"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </Html>
  )
}
