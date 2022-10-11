import React from "react";

function MovesScreen(props) {
  function prepareString(str) {
    let result;
    result = str.trim().split(/-+/);
    return result
      .map((element) => {
        return element.charAt(0).toUpperCase() + element.slice(1);
      })
      .join(" ");
  }

  return (
    <div className="moves-screen-container crt position-relative">
      {props.movesList ? (
        <>
          {" "}
          <div className="moves-title">
            <p className="item-aligner">Lv</p>
            <p>Move</p>
          </div>
          <ul className="pokemon-search-list scrollable">
            {props.movesList.map((item, index) => (
              <li key={index}>
                <p className="item-aligner">
                  {item.version_group_details[0].level_learned_at === 0
                    ? "TM"
                    : item.version_group_details[0].level_learned_at}
                </p>
                <p>
                  {item.move.name.length > 15
                    ? prepareString(item.move.name).substring(0, 15) + "..."
                    : prepareString(item.move.name)}
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        " "
      )}
    </div>
  );
}

export default MovesScreen;
