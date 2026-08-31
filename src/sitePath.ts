export function sitePath(path = '/') {
  const relativePath = path.replace(/^\/+/, '')

  return `${import.meta.env.BASE_URL}${relativePath}`
}
