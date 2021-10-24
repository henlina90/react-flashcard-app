import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import BreadCrumbs from "../Breadcrumbs";
import CardForm from "../CardForm";

/**
 * Add card screen is displayed at '/decks/:deckId/cards/new'
 * Allows user to add new card to an existing deck using form
 * Requirements: shares the same form component w/Edit card screen
 */

const AddCard = () => {
  // Initiate state and setter for deck (name)
  const [deck, setDeck] = useState({ name: "" });
  // Initiate state and setter for card (front, back)
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  // Initiate Hook to retrieve deck by id
  const { deckId } = useParams();
  // Initiate Hook to navigate user to appropriate path
  const history = useHistory();

  // Hook to retrieve deck of card & set to state
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId)
      .then(setDeck)
      .catch((error) => console.log(error));

    return abortController.abort();
  }, [deckId, setDeck]);

  // Submit handler: create card (front, back)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    const signal = abortController.signal;

    await createCard(deckId, { front, back }, signal);
    setFront("");
    setBack("");
  };

  // Sends user to previous screen when done
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
