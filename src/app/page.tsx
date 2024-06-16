import { cn } from "@/util/utils"

import { fontCaveat } from "@/styles/fonts"

import { Header, Previews } from "./components"

export default function IndexPage() {
  return (
    <>
      <Header titlePre="Home" />
     
        <div className="divide-y-2 divide-tertiary">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h1
              className={cn(
                "text-3xl font-extrabold leading-9 tracking-tight  sm:text-4xl sm:leading-10 md:text-6xl md:leading-14",
                fontCaveat.className
              )}
            >
              Latest posts
            </h1>
          </div>
          <Previews />
        </div>
      
    </>
  )
}
