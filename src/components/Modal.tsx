interface ModalProps {
  modalShown: boolean;
  hideModal: () => void;
  children: JSX.Element | JSX.Element[];
}

function Modal(props: ModalProps) {
  return (
    <div
      className="w3-modal"
      style={{ display: props.modalShown ? "block" : "none" }}
    >
      <div className="w3-modal-content">
        <div className="w3-container">
          <div className="w3-container w3-margin">
            <span
              className="w3-button w3-display-topright w3-hover-none"
              onClick={() => props.hideModal()}
            >
              &times;
            </span>
          </div>
          <div className="w3-margin-top w3-margin-bottom">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
