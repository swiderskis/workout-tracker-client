interface ModalProps {
  showModal: boolean;
  hideModal: () => void;
  children: JSX.Element | JSX.Element[];
}

function Modal(props: ModalProps) {
  return (
    <div
      className="w3-modal"
      style={{ display: props.showModal ? "block" : "none" }}
    >
      <div className="w3-modal-content">
        <div className="w3-container">
          <span
            className="w3-button w3-display-topright w3-hover-none"
            onClick={() => props.hideModal()}
          >
            &times;
          </span>
          <div className="w3-container w3-margin">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
