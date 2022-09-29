import { hasClassName } from './constant'

export const attachToggleEventHandler = ($container: any) => {
  if (!($container instanceof HTMLElement)) throw new Error('$container가 HTMLElement가 아니에요.')

  const $toggleButtons = $container.getElementsByClassName('caret')
  for (const $button of $toggleButtons as any) {
    $button.addEventListener('click', (e: any) => spreadToggle(e.target))
  }
}

export const spreadToggle = ($parentElement: any) => {
  if (!($parentElement instanceof HTMLElement)) throw new Error('인자가 HTMLElement가 아니에요.')
  const $parent = ($parentElement.parentElement as HTMLElement).closest('ul')
  if ($parent) {
    const $children = $parent.children
    for (const $child of Array.from($children)) {
      if (hasClassName($child, 'nested')) {
        $child.classList.toggle('active')
        $parentElement.classList.toggle('caret-down')
      }
      $parentElement.classList.toggle('caret-down')
    }
  }
}
