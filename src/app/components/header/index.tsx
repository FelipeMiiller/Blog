import { homeConfig } from "@/config/site"

import { MainNav } from "./main-nav"

export function Header({ titlePre = "Home" }: { titlePre?: string }) {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b-2 ">
      <div className="container flex h-16 items-center space-x-4 justify-between sm:space-x-0">
        <MainNav items={homeConfig.mainNav} titlePre={titlePre} />
      </div>
    </header>
  )
}
