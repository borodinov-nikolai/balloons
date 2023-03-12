import { FC, ReactElement } from "react"

type LinkWrapperType = {
  condition: boolean
  wrapper: Function
  children: ReactElement
}

const LinkWrapper: FC<LinkWrapperType> = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children

export default LinkWrapper
