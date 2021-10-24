import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api";
import Deck from "./Deck";

/**
 * Home screen: the first screen user sees
 * Displays list of existing decks
 * Includes action btn: Create Deck
 */

const DeckList = () => {
  // Initiate state and setter for deck list
  const [decks, setDecks] = useState([]);

  // Initiate Hook to retrieve specified deck
  const { deckId } = useParams();

  // Initiate Hook to send user appropriate path
  const history = useHistory();

  // Delete handler either deletes deck & reload or sends user home
  const handleDelete = () => {
    const message = "Are you sure you want to delete?";
    const confirmDelete = window.confirm(message);

    if (confirmDelete === true) {
      deleteDeck(deckId) && window.location.reload();
    } else {
      history.push("/");
    }
  };

  // Hook to retrieve all existing decks & set to state
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    listDecks(deckId, signal)
      .then(setDecks)
      .catch((error) => console.log(error));

    return controller.abort();
  }, [deckId, setDecks]);

  // List of decks
  const renderDeckList = decks.map((deck) => {
    return <Deck key={deck.id} deck={deck} handleDelete={handleDelete} />;
  });

  return (
    <div>
      <Link to="/decks/new">
        <button type="button" className="btn btn-secondary btn mb-2">
          + Create Deck
        </button>
      </Link>
      <div>{renderDeckList}</div>
    </div>
  );
};

export default DeckList;
