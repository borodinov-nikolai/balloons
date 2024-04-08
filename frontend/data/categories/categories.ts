import { ICategory } from "types/categories"
import birthdaysImage from "./images/birthdaysImage.png"
import surprisesImage from "./images/surprisesImage.png"
import anniversaryImage from "./images/anniversaryImage.png"
import partyImage from "./images/partyImage.png"
import dischargeImage from "./images/dischargeImage.png"
import photoSessionImage from "./images/photoSessionImage.png"

export const categories: ICategory[] = [
  {
    id: 1,
    image: birthdaysImage,
    name: "Дни рождения",
    slug: "birthdays",
  },
  {
    id: 2,
    image: surprisesImage,
    name: "Сюрпризы",
    slug: "surprises",
  },
  {
    id: 3,
    image: anniversaryImage,
    name: "Юбилей",
    slug: "anniversary",
  },
  {
    id: 4,
    image: partyImage,
    name: "Девичник",
    slug: "party",
  },
  {
    id: 5,
    image: dischargeImage,
    name: "Выписка из роддома",
    slug: "discharge",
  },
  {
    id: 6,
    image: photoSessionImage,
    name: "Фотосессии",
    slug: "photo-sessions",
  },
]
