import { NextComponentType } from "next"
import { useAuth } from "context/AuthProvider"
import { useRouter } from "next/router"
import Loader from "components/Loader"
import { useEffect } from "react"

function withPrivateRoute<T>(Component: NextComponentType<T>) {
  const PrivateRoute = (props: T) => {
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

// import { NextComponentType, NextPageContext } from "next";
// import { UserType } from "types/auth";
// import Router from "next/router";
//
// const login = "/login?redirected=true"; // Define your login route address.
//
// const checkUserAuthentication = () => {
//   return { user: null };
// };
//
// function withPrivateRoute(
//   WrappedComponent: NextComponentType<NextPageContext & UserType>
// ) {
//   const hocComponent: NextComponentType = ({ ...props }) => (
//     <WrappedComponent {...props} />
//   );
//
//   hocComponent.getInitialProps = async (
//     context: NextPageContext & UserType
//   ) => {
//     const userAuth = await checkUserAuthentication();
//
//     // Are you an authorized user or not?
//     if (!userAuth?.user) {
//       // Handle server-side and client-side rendering.
//       if (context.res) {
//         context.res?.writeHead(302, { Location: login });
//         context.res?.end();
//       } else {
//         Router.push(login);
//       }
//     } else if (WrappedComponent.getInitialProps) {
//       const wrappedProps = await WrappedComponent.getInitialProps({
//         ...context,
//         ...userAuth,
//       });
//       return { ...wrappedProps, ...userAuth };
//     }
//
//     return { ...userAuth };
//   };
//
//   return hocComponent;
// }
//
// export default withPrivateRoute;
