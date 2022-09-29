export const isNumber = (value) => !Number.isNaN(Number(value));

export const hasClassName = (HtmlDomElement, className) => {
  if (!(HtmlDomElement instanceof HTMLElement))
    throw new Error("dom 객체가 아니에요.");
  if (!(typeof className === "string"))
    throw new Error("className이 문자열이 아니에요.");

  return HtmlDomElement.classList.contains(className);
};
