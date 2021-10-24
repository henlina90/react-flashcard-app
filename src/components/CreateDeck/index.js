import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { createDeck } from "../../utils/api";
import BreadCrumbs from "../Breadcrumbs";

/**
 * Create deck screen is displayed at 'decks/new'
 * The Home screen has a 'Create Deck' btn
 * Allows user to create new deck using form
 */

const CreateDeck = () => {
  // Use custom Hook to create deck
  const [values, handleChange] = useForm({ name: "", description: "" });

  // Initiate Hook to navigate user to appropriate screen
  const history = useHistory();

  // Submit handler create deck & sends user to deck screen
  const handleSubmit = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    const signal = abortController.signal;

    const res = await createDeck(values, signal);
    history.push(`/decks/${res.id}`);
  };

  // Sends user to home screen when form is canceld
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
