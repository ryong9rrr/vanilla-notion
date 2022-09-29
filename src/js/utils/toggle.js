import { hasClassName } from "./constant.js";

export const attachToggleEventHandler = ($container) => {
  if (!($container instanceof HTMLElement))
    throw new Error("$container가 HTMLElement가 아니에요.");

  const $toggleButtons = $container.getElementsByClassName("caret");
  for (const $button of $toggleButtons) {
    $button.addEventListener("click", (e) => spreadToggle(e.target));
  }
};

export const spreadToggle = ($parentElement) => {
  if (!($parentElement instanceof HTMLElement))
    throw new Error("인자가 HTMLElement가 아니에요.");
  const $parent = $parentElement.parentElement.closest("ul");
  const $children = $parent.children;
  for (const $child of $children) {
    if (hasClassName($child, "nested")) {
      $child.classList.toggle("active");
      $parentElement.classList.toggle("caret-down");
    }
    $parentElement.classList.toggle("caret-down");
  }
};
