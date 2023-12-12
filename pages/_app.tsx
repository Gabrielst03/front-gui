import '../styles/globals.css'
import 'tailwindcss/tailwind.css';
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import React from 'react'
import { Windmill } from '@roketid/windmill-react-ui'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  // suppress useLayoutEffect warnings when running outside a browser
  if (!process.browser) React.useLayoutEffect = React.useEffect;

  return (

    <Windmill usePreferences={true}>
        <ToastContainer theme='dark'/>
        <Component {...pageProps} />
    </Windmill>
  )
}
export default MyApp
