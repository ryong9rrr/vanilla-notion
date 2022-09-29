import { isCalledByNew, isValidTypeOfObject } from "../core/validate.js";
import { TYPE_EDITOR_STATE } from "../types/state.js";
import { ID_NAME, template } from "./Editor.template.js";

export default function Editor({ $target, onEditing }) {
  isCalledByNew(new.target, "Editor");
  const $container = document.createElement("div");

  $container.addEventListener("keyup", (e) => {
    const { id, value } = e.target;
    if (id === ID_NAME.title) this.state.title = value;
    if (id === ID_NAME.content) this.state.content = value;
    onEditing(this.state.id, {
      title: this.state.title,
      content: this.state.content,
    });
  });

  this.state = null;
  this.setState = (nextState) => {
    this.state = isValidTypeOfObject(nextState, TYPE_EDITOR_STATE);
    this.render();
  };

  this.render = () => {
    if (!this.state) return;
    $container.innerHTML = template(this.state);
    $target.appendChild($container);
  };

  this.render();
}
