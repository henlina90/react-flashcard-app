import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../../utils/api";
import BreadCrumbs from "../Breadcrumbs";
import CardForm from "../CardForm";

/**
 * Edit card screen is displayed at '/decks/:deckId/cards/:cardId/edit'
 * Allows user to modify info on card using form
 */

const EditCard = () => {
  // Initiate state and setter for deck name
  const [deckName, setDeckName] = useState("");

  // Initiate state and setter for cards (front, back)
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  // Initiate Hook to retrieve specified deck cards
  const { deckId, cardId } = useParams();

  // Initiate Hook to navigate user to appropriate screen
  const history = useHistory();

  // Hook to retrieve card of deck & set to state
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId)
      .then(async (data) => {
        setDeckName(data.name);

        const card = await readCard(cardId);
        const { back, front } = card;
        setFront(front);
        setBack(back);
      })
      .catch((error) => console.log(error));

    return () => abortController.abort();
  }, [deckId, cardId]);

  // Submit handler to update card and send user to previous screen
  const handleSubmit = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    const signal = abortController.signal;

    await updateCard(
      { id: cardId, front, back, deckId: parseInt(deckId) },
      signal
    );

    history.goBack();
  };

  // Send user to previous screen when user cancels
  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div>
      <BreadCrumbs crumbs={[deckName, `Edit Card ${cardId}`]} />
      <h2>Edit Card</h2>
      <CardForm
        handleSubmit={handleSubmit}
        handleExit={handleCancel}
        front={front}
        setFront={setFront}
        back={back}
        setBack={setBack}
        buttonTextOne={"Cancel"}
        buttonTextTwo={"Submit"}
      />
    </div>
  );
};

export default EditCard;
