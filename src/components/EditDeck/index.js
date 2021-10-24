import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";
import BreadCrumbs from "../Breadcrumbs";

/**
 * Edit deck screen is displayed at '/decks/:deckId/edit'
 * Allows user to modify info on an existing deck using form
 */

const EditDeck = () => {
  // Initiate state and setter for deck name & description
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");

  // Initiate Hook for specified deck
  const { deckId } = useParams();
  // Initiate Hook to navigate user to appropriate path
  const history = useHistory();

  // Hook to retrieve deck & set to state
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

  // Submit handler to update deck and send user to deck screen
  const handleSubmit = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    const signal = abortController.signal;

    const response = await updateDeck(
      { id: deckId, name: deckName, description: deckDescription },
      signal
    );

    history.push(`/decks/${response.id}`);
  };

  // Send user to previous screen when action cancels
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
