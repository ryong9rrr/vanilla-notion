import { isCalledByNew, isValidTypeOfObject } from "../core/validate.js";
import { TYPE_MODAL_STATE } from "../types/state.js";
import { ID_NAME, template } from "./Modal.template.js";

const attachEventHandler = ({ $target, closeModal }) => {
  $target.addEventListener("click", closeModal);
  $target.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
    }
  });
};

export default function Modal({
  $target,
  initialState = {
    isView: false,
    parentId: null,
  },
  onSubmit,
}) {
  isCalledByNew(new.target, "Modal");
  const $container = document.createElement("div");
  $target.appendChild($container);

  const closeModal = (e) => {
    if (e.target.id !== ID_NAME.modalWrapper) return;
    const $input = $container.querySelector(`#${ID_NAME.modalInput}`);
    const title = $input.value;
    if (typeof title === "string" && title !== "") {
      onSubmit({
        title,
        parent: this.state.parentId,
      });
    }
    this.setState({
      ...this.state,
      isView: false,
    });
  };

  attachEventHandler({ $target: $container, closeModal });

  this.state = isValidTypeOfObject(initialState, TYPE_MODAL_STATE);

  this.setState = (nextState) => {
    this.state = isValidTypeOfObject(nextState, TYPE_MODAL_STATE);
    this.render();
  };

  this.render = () => {
    const { isView } = this.state;
    $container.innerHTML = template(this.state);
    if (isView) $container.querySelector("input[name=title]").focus();
  };

  this.render();
}
