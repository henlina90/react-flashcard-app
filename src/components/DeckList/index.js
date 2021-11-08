// * HOME SCREEN DISPLAYS DECK LIST * //

import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api";
import Deck from "./Deck";

const DeckList = () => {
  // useState Hook for deck list
  const [decks, setDecks] = useState([]);
  const { deckId } = useParams();
  // use Hook to send user home
  const history = useHistory();

  // Delete handler either deletes deck & reload OR sends user home
  const handleDelete = (deckId) => {
    const message = "Are you sure you want to delete?";
    const deleteDeckPrompt = window.confirm(message);

    if (deleteDeckPrompt) {
      deleteDeck(deckId) && window.location.reload();
    } else {
      history.push("/");
    }
  };

  // useEffect Hook to retrieve all existing decks
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    listDecks(deckId, signal)
      .then(setDecks)
      .catch((error) => console.log(error));

    return controller.abort();
  }, [deckId, setDecks]);

  const listOfDecks = decks.map((deck) => {
    return <Deck key={deck.id} deck={deck} handleDelete={handleDelete} />;
  });

  return (
    <div>
      <Link to="/decks/new">
        <button type="button" className="btn btn-secondary btn mb-2">
          + Create Deck
        </button>
      </Link>
      <div>{listOfDecks}</div>
    </div>
  );
};

export default DeckList;
