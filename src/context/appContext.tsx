import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { AppCookies } from '../util/cookies'
import { COOKIES } from './../util/constants'

type AppContextData = {
  isOpen: boolean
  isFixed: boolean
  open: () => void
  close: () => void
  toggleFixedSidebar: () => void
}

type AppContextProviderProps = {
  children: ReactNode
  sidebarState?: boolean
}

const AppContext = createContext({} as AppContextData)

export const AppProvider: React.FC<any> = ({
  children,
  sidebarState = false,
}: AppContextProviderProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false)
  const [isFixed, setIsFixed] = useState(sidebarState)

  useEffect(() => {
    const isFixedCookie = AppCookies.get(COOKIES.sidebarState)

    if (isFixedCookie === 'true') open()
    setIsFixed(isFixedCookie === 'true')
  }, [])

  const toggleFixedSidebar = () => {
    setIsFixed(!isFixed)
    AppCookies.set(COOKIES.sidebarState, String(!isFixed))

    if (!isFixed === true) {
      open()
    } else {
      close()
    }
  } 

  const open = () => {
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  const appConfig = {
    isOpen,
    isFixed,
    open,
    close,
    toggleFixedSidebar,
  }

  return <AppContext.Provider value={appConfig}>{children}</AppContext.Provider>
}

export const useApp = (): AppContextData => {
  return useContext(AppContext)
}
