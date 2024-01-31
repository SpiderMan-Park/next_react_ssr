import type { AppProps, AppContext } from 'next/app'
import './global.scss'
import { Layout } from '@/components/layout'
import axios from 'axios';
import App from 'next/app';
import { LOCALDOMAIN } from '@/utils';
import { UserAgentProvider } from '@/stores/userAgent';
import { ThemeContextProvider } from '@/stores/theme';
const NextApp = function (data: any) {
  const { Component, pageProps, navbarData, footerData } = data;

  return (
    <ThemeContextProvider>
      <UserAgentProvider>
        <Layout navbarData={navbarData} footerData={footerData} >
          <Component {...pageProps} />
        </Layout>
      </UserAgentProvider>
    </ThemeContextProvider>
  )
}

NextApp.getInitialProps = async (context: AppContext): Promise<AppProps> => {
  const pageProps = await App.getInitialProps(context)
  const { data = {} } = await axios.get(`${LOCALDOMAIN}/api/layout`)

  return {
    ...pageProps,
    ...data
  }
}


export default NextApp
