import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import BreadCrumbs from "../Breadcrumbs";
import CardForm from "../CardForm";

/**
 * Add card screen is displayed at '/decks/:deckId/cards/new'
 * Allows user to add new card to an existing deck using form
 * Shares the same form component w/Edit card screen
 */

const AddCard = () => {
  // initialize deck + setter to hold card
  const [deck, setDeck] = useState({ name: "" });
  // initialize deck + setter to hold front of card
  const [front, setFront] = useState("");
  // initialize deck + setter to hold front of card
  const [back, setBack] = useState("");

  // retrieves deck w/specified `deckId`
  const { deckId } = useParams();
  const history = useHistory(); // create history obj

  // use readDeck() to get deck & set to state
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId)
      .then(setDeck)
      .catch((error) => console.log(error));

    return abortController.abort();
  }, [deckId, setDeck]);

  // func to handle 'save' of form to add new card
  const handleSubmit = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    const signal = abortController.signal;

    await createCard(deckId, { front, back }, signal);
    setFront("");
    setBack("");
  };

  // func to handle 'done' of form to add new card
  const handleDone = () => {
    history.goBack();
  };

  return (
    <div>
      <BreadCrumbs crumbs={[deck.name, "Add Card"]} />
      <h2>{deck.name}: Add Card</h2>
      <CardForm
        handleSubmit={handleSubmit}
        handleExit={handleDone}
        front={front}
        setFront={setFront}
        back={back}
        setBack={setBack}
        buttonTextOne={"Done"}
        buttonTextTwo={"Save"}
      />
    </div>
  );
};

export default AddCard;
