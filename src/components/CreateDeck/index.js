import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { createDeck } from "../../utils/api";
import BreadCrumbs from "../Breadcrumbs";

/**
 * Create deck screen is displayed at 'decks/new'
 * The Home screen has a 'Create Deck' btn
 * Allows user to create new deck
 * Includes a form w/ fields to create a new deck
 */

const CreateDeck = () => {
  // used custom hook for form
  const [values, handleChange] = useForm({ name: "", description: "" });

  const history = useHistory(); // create history obj

  // func to handle submission of form to create new deck
  const handleSubmit = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    const signal = abortController.signal;

    const res = await createDeck(values, signal);
    console.log({ here: "here" });
    history.push(`/decks/${res.id}`);
  };

  // func to handle cancellation of form to create new deck
  const handleCancel = () => {
    history.push("/");
  };

  return (
    <div>
      <BreadCrumbs crumbs={["Create Deck"]} />
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={values.name}
            placeholder={"Enter Deck Name"}
            onChange={handleChange}
            required
          />
          <label className="mx-1 my-1">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={values.description}
            placeholder="Brief Description of the deck"
            type="textarea"
            onChange={handleChange}
            required
          />
          <div className="buttons my-2">
            <button
              type="button"
              className="btn btn-secondary mx-1"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateDeck;
