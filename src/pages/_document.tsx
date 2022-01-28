import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'

export default class InicialDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="pt">
        <Head>
          {/* <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            httpEquiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          /> */}
          {/* <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          /> */}
          {/* <meta name="description" content="Consultoria VTech" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.gstatic.com" /> */}
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;800&family=Lexend:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          /> */}
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="icon"
            href="icon-16x16.png"
            type="image/png"
            sizes="16x16"
          />
          <link
            rel="icon"
            href="icon-32x32.png"
            type="image/png"
            sizes="32x32"
          />
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
          /> */}

          {/* Android */}
          {/* <link rel="shortcut icon" sizes="196x196" href="icon-192x192.png" />
          <meta name="theme-color" content="#3f0f65" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}