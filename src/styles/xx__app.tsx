// import 'bootstrap/dist/css/bootstrap.css'
import { AppProvider, AuthProvider, SWRConfigurationProvider } from '@context'
import { GlobalStyle, theme, ToastContainerStyled } from '@styles'
// import { ToastContainerStyled } from '../styles/ToastContainerStyled'
import { COOKIES, toastTimeDefault, TOAST_CONTAINER } from '@utils'
import ServerCookie from 'next-cookies'
import App, { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import './../assets/scss/vtech.scss'

type MyAppProps = AppProps & {
  sidebarState?: string
}

const MyApp = ({ Component, pageProps, sidebarState }: MyAppProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <meta name="description" content="Consultoria VTech" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="icon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="icon-32x32.png" type="image/png" sizes="32x32" />
        <link
          rel="icon"
          href="icon-144x144.png"
          type="image/png"
          sizes="144x144"
        />
        <link
          rel="icon"
          href="icon-192x192.png"
          type="image/png"
          sizes="192x192"
        />
        <link
          rel="icon"
          href="icon-256x256.png"
          type="image/png"
          sizes="256x256"
        />
        <link
          rel="icon"
          href="icon-384x384.png"
          type="image/png"
          sizes="384x384"
        />
        <link
          rel="icon"
          href="icon-512x512.png"
          type="image/png"
          sizes="512x512"
        />

        {/* Android */}
        <link rel="shortcut icon" sizes="196x196" href="icon-192x192.png" />

        <meta name="theme-color" content="#3f0f65" />
      </Head>
      <ThemeProvider theme={theme}>
        <SWRConfigurationProvider>
          <AuthProvider>
            <AppProvider sidebarState={sidebarState}>
              <Component {...pageProps} />

              <GlobalStyle />
            </AppProvider>
          </AuthProvider>
        </SWRConfigurationProvider>
        <ToastContainerStyled
          position="top-center"
          autoClose={toastTimeDefault}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          enableMultiContainer
          role="alert"
          containerId={TOAST_CONTAINER.app}
        />
      </ThemeProvider>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  try {
    const sidebarState: string = ServerCookie(appContext.ctx)[
      COOKIES.sidebarState
    ]
    const state = sidebarState === 'true'
    return { ...appProps, sidebarState: state }
  } catch (e) {
    return { ...appProps, sidebarState: false }
  }
}

export default MyApp
