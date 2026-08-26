interface Props {
  description: string
  featured?: boolean
}

export default function PostDescription({ description, featured = false }: Props) {
  return (
    <p
      className={
        featured
          ? "max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
          : "max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base"
      }
    >
      {description}
    </p>
  )
}
