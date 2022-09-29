import { SideBar, Modal } from "./components/index.js";
import { NotFound, ContentPage } from "./pages/index.js";
import {
  editDocument,
  getAllDocument,
  getDocument,
  postNewDocument,
  removeDocument,
} from "./core/api.js";
import { isNumber } from "./utils/constant.js";
import { isCalledByNew, isValidTypeOfObject } from "./core/validate.js";
import { push, redirect } from "./core/router.js";
import { TYPE_APP_STATE } from "./types/state.js";
import { README, template } from "./App.template.js";

export default function App({ $target, initialState }) {
  isCalledByNew(new.target, "App");

  $target.innerHTML = template;

  const $modalContainer = $target.querySelector("#notion-modal-container");
  const $sideBarContainer = $target.querySelector("#notion-sidebar-container");
  const $contentContainer = $target.querySelector("#notion-content-container");

  this.state = isValidTypeOfObject(initialState, TYPE_APP_STATE);

  this.setState = (nextState) => {
    this.state = isValidTypeOfObject(nextState, TYPE_APP_STATE);
    this.route();
  };

  const modal = new Modal({
    $target: $modalContainer,
    onSubmit: async (newPostObj) => {
      const newDocument = await postNewDocument({ ...newPostObj });
      sideBar.setState({
        username: this.state.username,
        documents: await getAllDocument(),
      });
      push(`/document/${newDocument.id}`);
    },
  });

  const openModal = (documentId) => {
    modal.setState({
      isView: true,
      parentId: documentId,
    });
  };

  const sideBar = new SideBar({
    $target: $sideBarContainer,
    initialState: {
      username: this.state.username,
      documents: this.state.documents,
    },
    onAdd: async (parentDocumentId, title) => {
      if (parentDocumentId === null) {
        if (window.confirm(`새로운 페이지를 생성할까요?`)) {
          openModal(null);
        }
      } else {
        if (window.confirm(`${title} 페이지 아래에 하위페이지를 추가할까요?`)) {
          openModal(parentDocumentId);
        }
      }
    },
    onRemove: async (documentId, title) => {
      if (window.confirm(`${title} 페이지를 삭제할까요?`)) {
        history.replaceState(null, null, "/");
        await removeDocument(documentId);
        sideBar.setState({
          username: this.state.username,
          documents: await getAllDocument(),
        });

        if (this.state.path.indexOf("/document/") === 0) {
          const [, , prevDocumentId] = this.state.path.split("/");
          if (documentId === prevDocumentId) redirect();
        }
      }
    },
  });

  let debounceTimer = null;
  const contentPage = new ContentPage({
    $target: $contentContainer,
    onEditing: (documentId, requestBodyObj) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      debounceTimer = setTimeout(async () => {
        await editDocument(documentId, requestBodyObj);
        sideBar.setState({
          username: this.state.username,
          documents: await getAllDocument(),
        });
      }, 2000);
    },
  });

  this.route = async () => {
    const { path } = this.state;
    try {
      if (path === "/") {
        $contentContainer.innerHTML = README;
      } else if (path.indexOf("/document/") === 0) {
        $contentContainer.innerHTML = ``;
        const [, , documentId] = path.split("/");
        if (!isNumber(documentId)) throw new Error();
        const loadedContent = await getDocument(documentId);
        contentPage.setState(loadedContent);
      } else {
        new NotFound({ $target });
      }
    } catch (e) {
      console.error(
        `예상치 못한 오류가 발생하여 홈으로 리다이렉트 됩니다. 오류메시지 : ${e.message}`
      );
      redirect();
    }
  };

  this.route();
}
