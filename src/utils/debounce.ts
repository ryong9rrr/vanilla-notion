type Fn = (...args: any[]) => void

export default async function debounce<T extends Fn>(cb: T, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null
  return function <U>(this: U, ...args: Parameters<typeof cb>) {
    const context = this
    if (typeof timer === 'number') {
      clearTimeout(timer)
    }
    timer = setTimeout(async () => {
      await cb.apply(context, args)
    }, delay)
  }
}
