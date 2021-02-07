import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toysList, setToysList] = useState([]);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => {
        setToysList(data);
      });
  }, []);

  function addNewToy(toyObj) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toyObj),
    })
      .then((response) => response.json())
      .then((newToy) => {
        const newToysList = [...toysList, newToy];
        setToysList(newToysList);
      });
  }

  function removeToy(toyId) {
    fetch(`http://localhost:3001/toys/${toyId}`, {
      method: "DELETE", 
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      });

    const updatedToysList = toysList.filter(toy => toy.id !== toyId);
    setToysList(updatedToysList)
  };

  function incrementToyLikes(toyId) {
    const updatedToysList = toysList.map(toy => {
      if (toy.id === toyId) {
        return {
          ...toy, 
          likes: toy.likes + 1, 
        }
      } else {
        return toy;
      }
    });
    setToysList(updatedToysList)
  };

  return (
    <>
      <Header />
      {showForm ? <ToyForm addNewToy={addNewToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toysList={toysList} removeToy={removeToy} incrementToyLikes={incrementToyLikes}/>
    </>
  );
}

export default App;
