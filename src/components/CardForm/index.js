import React from "react";

/**
 * Card form to edit or create card
 * Required for Edit & Create card screens to share same form component
 */

const CardForm = ({
  handleSubmit,
  handleExit,
  front,
  setFront,
  back,
  setBack,
  buttonTextOne,
  buttonTextTwo,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Front</label>
        <textarea
          className="form-control"
          type="textarea"
          name="front"
          value={front}
          placeholder={"Front side of card"}
          onChange={(e) => {
            setFront(e.target.value);
          }}
          required
        />
        <label className="mx-1 my-1">Back</label>
        <textarea
          className="form-control"
          name="back"
          value={back}
          placeholder="Back side of card"
          type="textarea"
          onChange={(e) => {
            setBack(e.target.value);
          }}
          required
        />
        <div className="buttons my-2">
          <button
            type="button"
            className="btn btn-secondary mx-1"
            onClick={handleExit}
          >
            {buttonTextOne}
          </button>
          <button type="submit" className="btn btn-primary">
            {buttonTextTwo}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CardForm;
