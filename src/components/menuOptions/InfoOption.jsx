import React from "react";

function InfoOption(props) {
  function prepareString(str) {
    let result;
    result = str.trim().split(/-+/);
    return result.join(" ").toUpperCase();
  }

  const url =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
    props.id +
    ".png";

  const footprint =
    "https://veekun.com/dex/media/pokemon/footprints/" + props.id + ".png";

  const data = props.data;

  return (
    <div>
      <div className="screen-header">
        <div className="status-icon"></div>
        <div className="status-title">
          <p>INFO</p>
        </div>
      </div>
      <div className="screen-body">
        <div className="status-img-container">
          <img className="status-img" src={url} alt="" />
        </div>
        <div className="menu-container info-menu">
          <div className="status-list-container ni-container">
            <ul>
              <li>
                <p>NAME:</p>
                <p>{prepareString(data.name)}</p>
              </li>
              <li>
                <p>ID:</p>
                <p>{data.id}</p>
              </li>
              {data.types.length > 1 ? (
                <li>
                  <p>TYPE:</p>
                  <p
                    className={
                      "type-item type-1 type-" + data.types[0].type.name
                    }
                  >
                    {data.types[0].type.name.toUpperCase()}
                  </p>
                  <p
                    className={
                      "type-item type-2 type-" + data.types[1].type.name
                    }
                  >
                    {data.types[1].type.name.toUpperCase()}
                  </p>
                </li>
              ) : (
                <li>
                  <p>TYPE:</p>
                  <p
                    className={
                      "type-item type-1 type-" + data.types[0].type.name
                    }
                  >
                    {data.types[0].type.name.toUpperCase()}
                  </p>
                </li>
              )}
            </ul>
          </div>
          <div className="shape-data-container">
            <div className="status-list-container wh-container">
              <ul>
                <li>
                  <p>WEIGHT:</p>
                  <p>{data.weight / 10} KG</p>
                </li>
                <li>
                  <p>HEIGHT:</p>
                  <p>{data.height / 10} M&#00;</p>
                </li>
              </ul>
            </div>
            <div className="status-list-container footprint-container">
              <p>FOOTPRINT</p>
              <div className="footprint-wrapper">
                <img className="footprint" src={footprint} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="screen-footer"></div>
    </div>
  );
}

export default InfoOption;
