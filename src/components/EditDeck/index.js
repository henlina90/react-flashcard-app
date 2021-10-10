import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";
import BreadCrumbs from "../Breadcrumbs";

/**
 * Edit deck screen is displayed at '/decks/:deckId/edit'
 * Allows user to modify info on an existing deck
 * Includes pre-filled form w/info for existing deck to edit
 */

const EditDeck = () => {
  // initialize state + setter to hold deck name
  const [deckName, setDeckName] = useState("");
  // initialize state + setter to hold deck description
  const [deckDescription, setDeckDescription] = useState("");

  // retrieves deck w/specified `deckId`
  const { deckId } = useParams();
  const history = useHistory(); // create history obj

  // use readDeck() to get deck & set states
  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId)
      .then((data) => {
        setDeckName(data.name);
        setDeckDescription(data.description);
      })
      .catch((error) => console.log(error));

    return abortController.abort();
  }, [deckId]);

  // func to handle submission of form to update deck
  const handleSubmit = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    const signal = abortController.signal;

    // response either shows true or false per user input
    const response = await updateDeck(
      { id: deckId, name: deckName, description: deckDescription },
      signal
    );
    history.push(`/decks/${response.id}`);
  };

  // func to handle 'cancel' of form to update deck
  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div>
      <BreadCrumbs crumbs={[deckName, "Edit Deck"]} />
      <h2>Edit Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={deckName}
            placeholder={"Enter Deck Name"}
            onChange={(e) => setDeckName(e.target.value)}
            required
          />
          <label className="mx-1 my-1">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={deckDescription}
            placeholder="Brief Description of the deck"
            type="textarea"
            onChange={(e) => setDeckDescription(e.target.value)}
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

export default EditDeck;
