export const ID_NAME = {
  modalOverlay: "modal-overlay",
  modalWrapper: "modal-wrapper",
  modalContents: "modal-contents",
  modalInput: "modal-input",
};

export const template = (state) => {
  const { isView } = state;

  return `
    <div style="display:${isView ? "block" : "none"}">
      <div id="${ID_NAME.modalOverlay}">
        <div id="${ID_NAME.modalWrapper}">
          <div id="${ID_NAME.modalContents}">
            <input id="${
              ID_NAME.modalInput
            }" type="text" name="title" placeholder="제목을 입력하세요" />
          </div>
        </div>
      </div>
    </div>
  `;
};
