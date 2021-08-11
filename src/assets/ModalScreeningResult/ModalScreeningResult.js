import React from "react";
import "./ModalScreeningResult.css";

const ModalScreeningResult = ({ setOpenModal, title, suggestion, labelInput, symptom, screeningStatus }) => {
  return (
    <div className="modalScreeningResult-background">
      <div className="modalScreeningResult-container">
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
            value={suggestion}
            placeholder={labelInput}
            disabled
          />
        </div>
        <div className="footer">
          <ul className="detail">
            <li>Symptom: {symptom}</li>
            <li>Status: {screeningStatus}</li>
          </ul>
          <button
            id="cancel-button"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalScreeningResult;
