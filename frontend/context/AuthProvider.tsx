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
import { UpdateProfileFormType } from "types/general"
import { API } from "lib/api"

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: false,
  error: "",
  login: () => {},
  logout: () => {},
  signUp: () => {},
  updateProfile: () => {},
})

type AuthProviderProps = { children: ReactNode }

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadUser() {
      setLoading(true)
      const token = Cookies.get("token")

      if (token) {
        try {
          API.defaults.headers.common.Authorization = `Bearer ${token}`
          const { data } = await API.get("users/me", {
            params: { populate: "*" },
          })
          setUser(data)
        } catch (e: any) {
          setError(e.message)
          setUser(null)
          API.defaults.headers.common.Authorization = ""
        }
      }

      setLoading(false)
    }

    loadUser()
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
      await router.push("/artist/new")
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

    try {
      const {
        data: { jwt, user },
      } = await API.post("auth/local/register", {
        ...form,
        username: form.email,
      })

      if (jwt) {
        Cookies.set("token", jwt, { expires: 60 })
        API.defaults.headers.common.Authorization = `Bearer ${jwt}`
        setUser(user)
        await router.push("/artist/new")
      }
    } catch (e) {
      setError("Ошибка регистрации")
    }
  }

  const updateProfile = async (form: UpdateProfileFormType) => {
    try {
      const { data } = await API.put("users/me", form)
      console.log("data", data)
      if (data.length) {
        const user = data[0]

        if (!user.name && router.pathname !== "/artist/new")
          router.push("/artist/new")

        setUser(user)
      }

      if (!data.length) setError("User not found")
    } catch (e: any) {
      setError(e.message)
      setUser(null)
    }
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
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
