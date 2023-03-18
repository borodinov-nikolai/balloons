import { FC, ReactNode } from "react"
import * as React from "react"

type LinkWrapperType = {
  condition: boolean
  wrapper: Function
  children?: ReactNode
}

const LinkWrapper: FC<LinkWrapperType> = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children

export default LinkWrapper
