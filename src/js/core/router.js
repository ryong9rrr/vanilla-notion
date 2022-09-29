const ROUTE_CHANGE_EVENT_NAME = "route-change";

export const changeRoute = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail;
    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};

export const push = (nextUrl) => {
  if (!typeof nextUrl === "string") throw new Error("url이 문자열이 아니에요.");
  window.dispatchEvent(
    new CustomEvent("route-change", {
      detail: { nextUrl },
    })
  );
};

export const redirect = () => {
  window.dispatchEvent(
    new CustomEvent("route-change", {
      detail: { nextUrl: "/" },
    })
  );
};
