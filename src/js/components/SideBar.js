import { push } from "../core/router.js";
import { isCalledByNew, isValidTypeOfObject } from "../core/validate.js";
import { TYPE_SIDEBAR_STATE } from "../types/state.js";
import { hasClassName } from "../utils/constant.js";
import { attachToggleEventHandler } from "../utils/toggle.js";
import { CLASS_NAME, template } from "./SideBar.template.js";

const clickedSideBarHeader = () => push("/");

const clickedSideBarList = (target) => {
  const $li = target.closest("li");
  if ($li) {
    const { documentId } = $li.dataset;
    push(`/document/${documentId}`);
  }
};

const clickedRootDocumentAddButton = (onAdd) => onAdd(null);

const clickedChildDocumentAddButton = (target, onAdd) => {
  const $li = target.closest("li");
  if ($li) {
    const { documentId } = $li.dataset;
    const title = $li.querySelector(`.${CLASS_NAME.title}`).textContent;
    onAdd(documentId, title);
  }
};

const clickedRemoveButton = (target, onRemove) => {
  const $li = target.closest("li");
  if ($li) {
    const { documentId } = $li.dataset;
    const title = $li.querySelector(`.${CLASS_NAME.title}`).textContent;
    onRemove(documentId, title);
  }
};

const attachClickEventHander = (e, { onAdd, onRemove }) => {
  const { target } = e;
  if (target.id === "sidebar-header") return clickedSideBarHeader();

  if (target.id === "root-add-button")
    return clickedRootDocumentAddButton(onAdd);

  if (hasClassName(target, CLASS_NAME.title)) return clickedSideBarList(target);

  if (hasClassName(target, CLASS_NAME.addButton))
    return clickedChildDocumentAddButton(target, onAdd);

  if (hasClassName(target, CLASS_NAME.removeButton))
    return clickedRemoveButton(target, onRemove);
};

export default function SideBar({ $target, initialState, onAdd, onRemove }) {
  isCalledByNew(new.target, "SideBar");
  const $container = document.createElement("div");
  $target.appendChild($container);
  $container.addEventListener("click", (e) =>
    attachClickEventHander(e, { onAdd, onRemove })
  );

  this.state = isValidTypeOfObject(initialState, TYPE_SIDEBAR_STATE);

  this.setState = (nextState) => {
    this.state = isValidTypeOfObject(nextState, TYPE_SIDEBAR_STATE);
    this.render();
  };

  this.render = () => {
    $container.innerHTML = template(this.state);
    attachToggleEventHandler($container);
  };

  this.render();
}
