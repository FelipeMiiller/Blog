export default function ContentHeader() {
  return (
    <section
      className="relative overflow-hidden border-b border-border/80 pb-10 pt-2 sm:pb-14 lg:pb-16"
      aria-labelledby="latest-posts-title"
    >
      <div
        className="pointer-events-none absolute -right-12 top-0 size-40 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative max-w-3xl">
        <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          <span className="h-px w-8 bg-primary" aria-hidden="true" />
          Felipe Miiller / Journal
        </p>
        <h1
          id="latest-posts-title"
          className="display-title text-6xl leading-[0.9] text-foreground sm:text-7xl lg:text-8xl"
        >
          Latest posts
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
          Ideias práticas sobre engenharia de software, sistemas e as ferramentas que tornam o trabalho melhor.
        </p>
      </div>
    </section>
  )
}
