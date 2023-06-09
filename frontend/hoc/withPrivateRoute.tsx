import { NextComponentType } from "next"
import { useAuth } from "context/AuthProvider"
import { useRouter } from "next/router"
import Loader from "components/Loader"
import { useEffect } from "react"

function withPrivateRoute(Component: NextComponentType) {
  // @ts-ignore
  const PrivateRoute = (props) => {
    const { isAuthenticated, user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (
        !loading &&
        isAuthenticated &&
        user?.slug &&
        router.pathname === "/artist/new"
      )
        router.push(`/artist/${user.slug}`)

      if (
        !loading &&
        isAuthenticated &&
        !user?.slug &&
        router.pathname !== "/artist/new"
      )
        router.push("/artist/new")

      if (!loading && !isAuthenticated && router.pathname !== "/login")
        router.push("/login")
    }, [isAuthenticated, loading, router, user, user?.name])

    return loading || !user ? <Loader /> : <Component {...props} />
  }

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    PrivateRoute.getInitialProps = Component.getInitialProps
  }

  return PrivateRoute
}

export default withPrivateRoute
