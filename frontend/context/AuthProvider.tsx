import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import {
  AuthContextType,
  loginFormType,
  signUpFormType,
  UserType,
} from "types/auth"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { CreateProfileFormType, UpdateProfileFormType } from "types/general"
import { API } from "lib/api"

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: false,
  error: "",
  login: () => {},
  logout: () => {},
  signUp: () => {},
  createProfile: () => {},
  updateProfile: () => {},
})

type AuthProviderProps = { children: ReactNode }

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadUserFromCookies() {
      setLoading(true)
      const token = Cookies.get("token")
      if (token) {
        console.log("Got a token in the cookies, let's see if it is valid")
        API.defaults.headers.common.Authorization = `Bearer ${token}`
        const { data } = await API.get("users/me")

        if (data) setUser(data)
        else {
          setUser(null)
          API.defaults.headers.common.Authorization = ""
          setLoading(false)
          await router.push("/login")
        }
      }
      setLoading(false)
    }

    loadUserFromCookies()
  }, [router])

  const login = async (form: loginFormType) => {
    setLoading(true)

    const {
      data: { jwt, user },
    } = await API.post("auth/local", form)

    if (jwt) {
      Cookies.set("token", jwt, { expires: 60 })
      API.defaults.headers.common.Authorization = `Bearer ${jwt}`
      setUser(user)
    }

    setLoading(false)
  }

  const logout = async (redirect: string = "/") => {
    setLoading(true)
    Cookies.remove("token")
    setUser(null)
    API.defaults.headers.common.Authorization = ""
    setLoading(false)
    await router.push(redirect)
  }

  const signUp = async (form: signUpFormType) => {
    setLoading(true)

    const {
      data: { jwt, user },
    } = await API.post("auth/local/register", form)

    // if (data?.createUser.message) {
    //   setError("Ошибка регистрации")
    // }
    //
    // if (data?.createUser) {
    //   await login({
    //     email: form.email,
    //     password: form.password,
    //   })
    // }
  }

  const createProfile = async (form: CreateProfileFormType) => {
    // const { data } = await updateProfileMutation({
    //   variables: {
    //     userId: user?.id,
    //     form: {
    //       ...form,
    //       avatar: { upload: form.avatar?.item(0) },
    //     },
    //   },
    // })
  }

  const updateProfile = async (form: UpdateProfileFormType) => {
    // const { data } = await updateProfileMutation({
    //   variables: {
    //     userId: user?.id,
    //     form: {
    //       ...form,
    //       avatar: { upload: form.avatar?.item(0) },
    //     },
    //   },
    // })
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user?.id,
        user,
        loading,
        error,
        login,
        logout,
        signUp,
        createProfile,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
