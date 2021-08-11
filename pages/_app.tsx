import React from 'react'
import type { AppProps } from 'next/app'
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
export default MyApp
