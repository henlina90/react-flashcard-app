import React from "react";
import { Link } from "react-router-dom";

const Deck = ({ deck, handleDelete }) => {
  return (
    <div className="card mb-1" key={deck.id}>
      <div className="card-body">
        <h5 className="d-inline-block card-title">{deck.name}</h5>
        <h6 className="d-inline-block card-subtitle text-muted float-right margin-top">
          {deck.cards.length} cards
        </h6>
        <p className="card-text">{deck.description}</p>
        <Link to={`/decks/${deck.id}`}>
          <button type="button" className="btn btn-secondary mr-2">
            View
          </button>
        </Link>
        <Link to={`/decks/${deck.id}/study`}>
          <button type="button" className="btn btn-primary mr-2">
            Study
          </button>
        </Link>
        <button
          className="btn btn-danger float-right margin-bottom"
          onClick={() => handleDelete(deck.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Deck;
