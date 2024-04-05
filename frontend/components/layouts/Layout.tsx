import localFont from "next/font/local"
import Header from "components/modules/Header/Header"

const moreSugar = localFont({
  src: "../../public/fonts/MoreSugar-Regular.woff2",
  variable: "--more-sugar",
})

const publicSans = localFont({
  src: [
    {
      path: "../../public/fonts/PublicSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/PublicSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--public-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`${moreSugar.variable} ${publicSans.variable} font-sans`}>
      <Header />
      <main>{children}</main>
    </div>
  )
}
