import React from "react";

function StatsOption(props) {
  const stats = props.data.stats;
  const hp = stats[0].base_stat,
    atq = stats[1].base_stat,
    def = stats[2].base_stat,
    spatq = stats[3].base_stat,
    spdef = stats[4].base_stat,
    speed = stats[5].base_stat;
  return (
    <div>
      <div className="screen-header">
        <div className="status-icon"></div>
        <div className="status-title">
          <p>BASE STATS</p>
        </div>
      </div>
      <div className="screen-body">
        <div className="status-img-container overflow-hidden">
          <div className="stats-graph-container">
            <span className="graph-legend legend-hp">HP</span>
            <span className="graph-legend legend-atk">ATK</span>
            <span className="graph-legend legend-def">DEF</span>
            <span className="graph-legend legend-spatk">SP.ATK</span>
            <span className="graph-legend legend-spdef">SP.DEF</span>
            <span className="graph-legend legend-speed">SPEED</span>
            <div className="graph-background">
              <div className="graph-background-box">
                <div className="cross-line">
                  <div className="line-1"></div>
                </div>
                <div className="cross-line">
                  <div className="line-2"></div>
                </div>
                <div className="cross-line">
                  <div className="line-3"></div>
                </div>
              </div>
            </div>
            <div className="graph-background-border"></div>
            <div
              className="graph"
              style={{
                clipPath:
                  "polygon(" +
                  (45 + (-20 * spatq) / 255) +
                  "% " +
                  (40 + (-40 * spatq) / 255) +
                  "%, " +
                  (55 + (20 * hp) / 255) +
                  "% " +
                  (40 + (-40 * hp) / 255) +
                  "%, " +
                  (60 + (40 * atq) / 255) +
                  "% " +
                  (50 + 0) +
                  "%, " +
                  (55 + (20 * def) / 255) +
                  "% " +
                  (60 + (40 * def) / 255) +
                  "%, " +
                  (45 + (-20 * speed) / 255) +
                  "% " +
                  (60 + (40 * speed) / 255) +
                  "%, " +
                  (40 + (-40 * spdef) / 255) +
                  "% " +
                  (50 + 0) +
                  "%)"
              }}
            ></div>
          </div>
        </div>
        <div className="menu-container">
          <div className="status-list-container">
            <ul>
              <li>
                <p>HP:</p>
                <p>{hp}</p>
              </li>
              <li>
                <p>ATK:</p>
                <p>{atq}</p>
              </li>
              <li>
                <p>DEF:</p>
                <p>{def}</p>
              </li>
              <li>
                <p>SP.ATK:</p>
                <p>{spatq}</p>
              </li>
              <li>
                <p>SP.DEF:</p>
                <p>{spdef}</p>
              </li>
              <li>
                <p>SPEED:</p>
                <p>{speed}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="screen-footer"></div>
    </div>
  );
}

export default StatsOption;
