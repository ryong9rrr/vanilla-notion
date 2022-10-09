export const pad = (string: string): string => {
  return string.length > 15 ? `${string.slice(0, 13)}...` : string
}
