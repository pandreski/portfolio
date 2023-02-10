import { Open_Sans, DM_Serif_Display } from '@next/font/google'
import '@/styles/globals.css'

const openSans = Open_Sans({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-open-sans'
})

const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-dm-serif-display'
})

export default function App({ Component, pageProps }) {
  return (
    <div className={`${openSans.variable} ${dmSerifDisplay.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}
