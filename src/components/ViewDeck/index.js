import React, { useEffect, useState } from "react";
import { deleteDeck, readDeck } from "../../utils/api";
import { useHistory, useParams, Link } from "react-router-dom";
import Card from "../Card";
import BreadCrumbs from "../Breadcrumbs";

/**
 * View deck screen is displayed at '/decks/:deckId'
 * Displays all of the info about a deck & cards
 * Includes 'Edit', 'Study', 'Add Cards' & 'Delete' btns
 */

const ViewDeck = () => {
  // Initiate state and setter for cards
  const [cards, setCards] = useState([]);
  // Initiate state and setter for deck details
  const [deck, setDeck] = useState({ id: "", name: "", description: "" });

  // Initiate Hook to retrieve specified deck
  const { deckId } = useParams();
  // Initiate Hook to navigate user to appropriate screen
  const history = useHistory();

  // Delete handler allows user to confirm action & send user home
  const handleDelete = (id) => {
    const message = "Are you sure you want to delete?";
    const confirmDelete = window.confirm(message);
    if (confirmDelete) {
      deleteDeck(deckId);
      history.push("/");
    }
  };

  // Hook to retrieve deck & set to state
  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId)
      .then(setDeck)
      .catch((error) => console.log(error));

    return abortController.abort();
  }, [deckId, setDeck]);

  // Hook to retrieve deck cards & set to state
  useEffect(() => {
    const abortController = new AbortController();

    if (deck.cards) {
      setCards(deck.cards);
    }

    return abortController.abort();
  }, [deckId, setCards, deck]);

  return (
    <div className="mb-2">
      <BreadCrumbs crumbs={[deck.name]} />
      <h3>{deck.name}</h3>
      <p>{deck.description}</p>
      <Link to={`/decks/${deckId}/edit`}>
        <button className="btn btn-secondary mr-2">Edit</button>
      </Link>
      <Link to={`/decks/${deckId}/study`}>
        <button className="btn btn-secondary mr-2">Study</button>
      </Link>
      <Link to={`/decks/${deckId}/cards/new`}>
        <button className="btn btn-secondary mr-2">Add Cards</button>
      </Link>
      <button
        className="btn btn-danger float-right margin-bottom"
        onClick={handleDelete}
      >
        Delete
      </button>
      <br />
      <br />
      <h4>Cards</h4>
      <ul className="list-group">
        {cards.length &&
          cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              deckId={deckId}
              handleDelete={handleDelete}
            />
          ))}
      </ul>
    </div>
  );
};

export default ViewDeck;
