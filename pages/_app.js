import { Open_Sans } from '@next/font/google'
import '@/styles/globals.scss'

const openSans = Open_Sans({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin']
})

export default function App({ Component, pageProps }) {
  return (
    <div className={openSans.className}>
      <Component {...pageProps} />
    </div>
  )
}
