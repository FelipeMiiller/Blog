export const getPathnameTitle = (pathname: string) => {
  const pathname1 = pathname

  const title = pathname1.split("/")[pathname1.split("/").length - 1]

  return title === "blog" ? "All Posts" : title[0].toUpperCase() + title.slice(1)
}
