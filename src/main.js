import App from "./js/App.js";
import { getAllDocument } from "./js/core/api.js";
import { changeRoute } from "./js/core/router.js";

const $target = document.querySelector("#root");

const app = new App({
  $target,
  initialState: {
    username: "상윤",
    path: window.location.pathname,
    documents: await getAllDocument(),
  },
});

const route = () =>
  app.setState({
    ...app.state,
    path: window.location.pathname,
  });

changeRoute(route);

window.addEventListener("popstate", route);
