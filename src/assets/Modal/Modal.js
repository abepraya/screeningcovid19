import React from "react";
import "./Modal.css";

const Modal = ({ setOpenModal, saveData, title, setSuggestion, labelInput }) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="title-close-button">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <i className="material-icons">clear</i>
          </button>
        </div>
        <div className="title">
          <h5>{title}</h5>
        </div>
        <div className="body">
          <textarea
            type="textarea"
            cols={25}
            rows={5}
            className="form-control"
            onChange={(e)=>setSuggestion(e.target.value)}
            placeholder={labelInput}
          />
        </div>
        <div className="footer">
          <button
            id="cancel-button"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            CANCEL
          </button>
          <button onClick={saveData}>CONTINUE</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
