function normalizeWWW(url: string): string {
  return url.replace(/^(https?:\/\/)(www\.)?/, (match, protocol, www) => {
    // If "www." is present, remove it; otherwise, add "www."
    return www ? `${protocol}` : `${protocol}www.`
  })
}

export { normalizeWWW }
