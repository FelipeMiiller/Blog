import React from "react"

interface Props {
  description: string
}

const PostDescription: React.FC<Props> = ({ description }) => {
  return (
    <div className="prose max-w-none text-muted-foreground marker:text-accent-foreground">
      <p>{description}</p>
    </div>
  )
}

export default PostDescription
