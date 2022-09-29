export const hasClassName = (HtmlDomElement: Element, className: string) => {
  return HtmlDomElement.classList.contains(className)
}

export const attachToggleEventHandler = ($container: HTMLElement) => {
  const $toggleButtons = $container.getElementsByClassName(
    'caret'
  ) as HTMLCollectionOf<HTMLButtonElement>
  for (const $button of Array.from($toggleButtons)) {
    $button.addEventListener('click', (e: Event) => spreadToggle(e.target as HTMLElement))
  }
}

export const spreadToggle = ($parentElement: HTMLElement) => {
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
