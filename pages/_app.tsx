import React from 'react'
import type { AppProps } from 'next/app'
// Providers
import { appWithTranslation } from 'next-i18next'
// Context provider
import { ContextProvider } from '@contextProvider/states'
//  Global Styles
import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}
export default appWithTranslation(MyApp)
