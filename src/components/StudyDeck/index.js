import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";
import BreadCrumbs from "../Breadcrumbs";

/**
 * Study deck screen is displayed at '/decks/:deckId/study'
 * Displays front & back of deck cards one at a time
 * Each card includes btns 'Flip' or 'Next'
 */

const StudyDeck = () => {
  // initialize state + setter to hold deck
  const [deck, setDeck] = useState({ name: "", cards: [] });
  // initialize state + setter to hold card
  const [selectedCard, setSelectedCard] = useState({ front: "", back: "" });
  // initialize state + setter to hold flipped card
  const [isFlipped, setIsFlipped] = useState(false);
  // initialize state + setter to hold selected index card
  const [selectedIndex, setSelectedIndex] = useState(0);

  // retrieves deck w/specified `deckId`
  const { deckId } = useParams();
  const history = useHistory(); // create history obj

  // use readDeck() to get deck being studied & set to state
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId)
      .then(setDeck)
      .catch((error) => console.log(error));

    return abortController.abort();
  }, [deckId, setDeck]);

  // get deck cards at indx & set to state
  useEffect(() => {
    if (deck.cards.length > 0) {
      setSelectedCard(deck.cards[selectedIndex]);
    }
  }, [deck, selectedIndex]);

  // display msg if deck includes 2 cards or less & btn to add cards to deck
  if (deck.cards.length <= 2) {
    return (
      <div>
        <BreadCrumbs crumbs={[deck.name, "Study"]} />
        <h2>{deck.name} : Study</h2>
        <h4>Not enough cards</h4>
        <p>
          You need at least 3 cards to study. There are {deck.cards.length}{" "}
          cards in this deck.
        </p>
        <Link to={`/decks/${deckId}/cards/new`}>
          <button className="btn btn-primary mr-2">+ add cards</button>
        </Link>
      </div>
    );
  }

  // front of the card
  const frontCard = (
    <div className="card-body">
      <h5 className="card-title">
        card {selectedIndex + 1} of {deck.cards.length}
      </h5>
      <p className="card-text">{selectedCard.front}</p>
      <button
        type="button"
        className="btn btn-secondary mr-2"
        onClick={(e) => {
          setIsFlipped(true);
        }}
      >
        Flip
      </button>
    </div>
  );

  // back of the card
  const backCard = (
    <div className="card-body">
      <h5 className="card-title">
        card {selectedIndex + 1} of {deck.cards.length}
      </h5>
      <p className="card-text">{selectedCard.back}</p>
      <button
        type="button"
        className="btn btn-secondary mr-2"
        onClick={(e) => {
          if (selectedIndex + 1 !== deck.cards.length) {
            setSelectedIndex(selectedIndex + 1);
            setSelectedCard(deck.cards[selectedIndex + 1]);
            setIsFlipped(false);
          } else {
            let response = window.confirm(
              "Restart cards? \n Click 'cancel' to return to the home page."
            );
            if (response) {
              setSelectedIndex(0);
              setIsFlipped(false);
            } else {
              history.push("/");
            }
          }
        }}
      >
        Next
      </button>
    </div>
  );

  return (
    <>
      <BreadCrumbs crumbs={[deck.name, "Study"]} />
      <h2>Study: {deck.name}</h2>
      <div className="card w-60">{isFlipped ? backCard : frontCard}</div>
    </>
  );
};

export default StudyDeck;
