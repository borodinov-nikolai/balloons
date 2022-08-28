import { createContext, useContext } from "react"

type GlobalContextType = {
  isCaptchaVerified: boolean
  setCaptchaVerified: Function
}

export const GlobalContext = createContext<GlobalContextType>({
  isCaptchaVerified: false,
  setCaptchaVerified: () => {},
})

const useGlobal = () => useContext(GlobalContext)

export default useGlobal
