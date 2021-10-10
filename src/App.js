import React from "react";
import { Route, Switch } from "react-router-dom";
import AddCard from "./components/AddCard";
import CreateDeck from "./components/CreateDeck";
import DeckList from "./components/DeckList";
import EditCard from "./components/EditCard";
import EditDeck from "./components/EditDeck";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import StudyDeck from "./components/StudyDeck";
import ViewDeck from "./components/ViewDeck";

// Flashcard app w/routes to different screens
const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default App;
