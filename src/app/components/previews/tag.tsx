import Link from "next/link"
import { slug } from "github-slugger"

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 text-base font-medium  text-primary hover:text-primary/80"
    >
      {text.split(" ").join("-")}
    </Link>
  )
}

export default Tag
