import RootLayout from "components/layouts/Layout"
import Categories from "components/sections/MainPage/Categories/Categories"
import Hero from "components/sections/MainPage/Hero/Hero"

export default function Home() {
  return (
    <RootLayout>
      <Hero />
      <Categories />
    </RootLayout>
  )
}
