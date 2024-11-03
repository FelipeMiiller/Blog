import { Poppins as FontPoppins } from "next/font/google"
import localFont from "next/font/local"

export const caveat = localFont({
  src: "./caveat-v18-latin-regular.woff2",
  weight: "700",
  style: "normal",
  variable: "--font-caveat",
  display: "swap",
})

export const roboto = localFont({
  src: "./roboto-mono-v23-latin-regular.woff2",
  variable: "--font-roboto",
  weight: "700",
  display: "swap",
})

export const poppins = FontPoppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})
