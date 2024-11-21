import { Caveat, Poppins, Roboto } from "next/font/google"

export const caveat = Caveat({
  weight: ["400", "500", "700", "600"],
  subsets: ["latin"],
  style: "normal",
  variable: "--font-caveat",
  display: "swap",
})

export const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700", "900"],
})

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  adjustFontFallback: false,
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})
