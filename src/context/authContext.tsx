import React, { createContext, ReactElement, useContext } from 'react'
import { AuthToken } from '../services/auth-token'
import Auth from '../services/authentication'
import { UserProviderValues } from '../types/auth'

const AuthContext = createContext<UserProviderValues>(null)

export const AuthProvider: React.FC<any> = ({ children }): ReactElement => {
  const authToken = new AuthToken()

  // const [authToken] = useState<AuthToken>(new AuthToken())

  // const updateAccessToken = useCallback((newAccessToken: string) => {
  //   if (newAccessToken) {
  //     console.log('Aqui veio')
  //     const auth = new AuthToken(newAccessToken)
  //     console.log('new auth', auth)
  //     setAuthToken(auth)
  //   }
  // }, [])

  const dataAuth: UserProviderValues = {
    auth: Auth,
    user: authToken.user,
    token: authToken.authToken,
    isAuthenticad: authToken.isAuthenticated,
  }

  return (
    <AuthContext.Provider value={dataAuth}>{children}</AuthContext.Provider>
  )
}

export const useAuth = (): UserProviderValues => {
  return useContext<UserProviderValues>(AuthContext)
}
