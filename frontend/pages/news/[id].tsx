import RootLayout from "components/layouts/Layout"
import SelectedNews from "components/sections/NewsPage/SelectedNews/SelectedNews"
import { useRouter } from "next/router"

export default function SelectedNewsPage() {
  const router = useRouter()
  console.log(typeof router.query.id)
  return (
    <RootLayout>
      <SelectedNews selectedId={router.query.id} />
    </RootLayout>
  )
}
