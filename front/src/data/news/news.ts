import { INews } from "types/news"
import newsImage from "./images/newsImage.jpg"

export const news: INews[] = [
  {
    id: 1,
    image: newsImage,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    content:
      "Это первая новость про шары в Уфе на сегодня. Вторая будет чуть позже",
  },
  {
    id: 2,
    image: newsImage,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    content:
      "Это уже вторая новость про шары в Уфе на сегодня. Третьей уже не будет",
  },
]
