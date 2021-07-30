import React from 'react'
import type { AppProps } from 'next/app'
//  Global Styles
import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}
export default MyApp
