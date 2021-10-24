import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteCard } from "../../utils/api";

/**
 * Cards of deck are displayed at View deck screen
 * Each card inclds action btns: Edit, Delete
 */

const Card = ({ card, deckId }) => {
  // Initiate hook to navigate user to appropriate screen
  const history = useHistory();

  // Delete handler either deletes deck then reload or sends user home
  const handleDelete = async () => {
    const message = "Are you sure you want to delete?";
    const confirmDelete = window.confirm(message);

    if (confirmDelete === true) {
      (await deleteCard(card.id)) && window.location.reload();
    } else {
      history.push("/");
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-body container d-flex justify-content-between">
          <div className="left-text col-6">
            <p className="card-text">{card.front}</p>
          </div>
          <div className="right-text col-6">
            <p className="card-text">{card.back}</p>
            <div className="buttons">
              <Link to={`${deckId}/cards/${card.id}/edit`}>
                <button
                  type="button"
                  className="btn btn-secondary float-right mr-2"
                >
                  Edit
                </button>
              </Link>
              <button
                className="btn btn-danger float-right mr-2"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
