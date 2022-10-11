import React from "react";

function DescriptionOption(props) {
  function prepareString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const habitat =
    props.specieData.habitat !== null
      ? "https://veekun.com/dex/media/habitats/" +
        props.specieData.habitat.name +
        ".png"
      : "";

  return (
    <div>
      <div className="screen-header">
        <div className="status-icon"></div>
        <div className="status-title">
          <p>DETAIL</p>
        </div>
      </div>
      <div className="screen-body">
        <div className="status-list-container description-container">
          <span>DESCRIPTION</span>
          <div className=" description-wrapper">
            <p>{props.specieData.flavor_text_entries[0].flavor_text}</p>
          </div>
        </div>
        <div className="description-menu">
          <div className="status-list-container abilities-container">
            <ul>
              <li>
                <p>ABILITIES:</p>
                {props.data.abilities.length > 1 ? (
                  <div>
                    <p>{props.data.abilities[0].ability.name.toUpperCase()}</p>
                    <p>{props.data.abilities[1].ability.name.toUpperCase()}</p>
                  </div>
                ) : (
                  <div>
                    <p>{props.data.abilities[0].ability.name.toUpperCase()}</p>
                  </div>
                )}
              </li>
              <li>
                <p>SHAPE:</p>
                <p>{props.specieData.shape.name.toUpperCase()}</p>
              </li>
            </ul>
          </div>
          <div className="status-list-container habitat-container">
            <p>HABITAT</p>
            <div className="habitat-wrapper">
              <p>
                {prepareString(
                  props.specieData.habitat === null
                    ? "???"
                    : props.specieData.habitat.name
                )}
              </p>
              <img
                className="habitat-image"
                src={habitat}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "images/unknown-habitat.png";
                }}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="screen-footer"></div>
    </div>
  );
}

export default DescriptionOption;
