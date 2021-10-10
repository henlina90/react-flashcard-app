import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../../utils/api";
import BreadCrumbs from "../Breadcrumbs";
import CardForm from "../CardForm";

/**
 * Edit card screen is displayed at '/decks/:deckId/cards/:cardId/edit'
 * allows user to modify info on card
 * form is pre-filled w/info for existing card
 */

const EditCard = () => {
  // initialize state + setter to hold deck name
  const [deckName, setDeckName] = useState("");
  // initialize state + setter to hold front of card
  const [front, setFront] = useState("");
  // initialize state + setter to hold back of card
  const [back, setBack] = useState("");

  // retrieves deck w/specified `deckId`
  const { deckId, cardId } = useParams();
  const history = useHistory(); // create history obj

  // use readDeck() to get deck of card to edit & set to state
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId)
      .then(async (data) => {
        setDeckName(data.name);

        // use readCard() to get card to edit & set to state
        const card = await readCard(cardId);
        const { back, front } = card;
        setFront(front);
        setBack(back);
      })
      .catch((error) => console.log(error));

    return () => abortController.abort();
  }, [deckId, cardId]);

  // use updateCard() & func to handle submission of form to update card
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

  // func to handle 'cancel' of form to update card
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
