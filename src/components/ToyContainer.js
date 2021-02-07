import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toysList, removeToy, incrementToyLikes}) {

  const toysListMapped = toysList.map(toy => {
    return (<ToyCard 
    toy={toy}
    key={toy.id}
    removeToy={removeToy}
    incrementToyLikes={incrementToyLikes}
    />
    )
  })

  return (
    <div id="toy-collection">{toysListMapped}</div>
  );
}

export default ToyContainer;
