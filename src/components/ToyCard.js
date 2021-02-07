import React from "react";

function ToyCard({ toy, removeToy, incrementToyLikes }) {
  function handleRemoveToy(event) {
    event.preventDefault();
    removeToy(toy.id);
  }

  function handleLike(e) {
    e.preventDefault();

    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({likes: toy.likes + 1}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      });
    incrementToyLikes(toy.id)
  }

  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleRemoveToy}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
