export const $ = (selector: string): HTMLElement => {
  const element = document.querySelector(selector) as HTMLElement | null
  if (!element) {
    throw new Error(`${selector}에 해당하는 DOM Element가 존재하지 않아요.`)
  }
  return element
}
