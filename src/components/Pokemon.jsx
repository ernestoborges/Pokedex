import React from "react";

function Pokemon(props) {
  let url =
    "https://projectpokemon.org/images/normal-sprite/" + props.Name + ".gif";
  const notSeen = "/images/not-seen.png";
  return (
    <img
      src={url}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = notSeen;
      }}
      alt={props.Name}
    />
  );
}

export default Pokemon;
