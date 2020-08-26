import React from "react";

function Info() {
  return (
    <div className="info-container">
      <p className="info-component">
        SpaceX designs, manufactures and launches advanced rockets and
        spacecraft. <br />
        <br /> This web app displays data about the company's launches using
        the&nbsp;
        <a
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/r-spacex/SpaceX-API"
        >
          Open Source REST API spaceX
        </a>
        : it allow users to search and filter information as well as seeing data
        visualizations. <br />
        <br />
        This web app was just made for fun and informative purposes and is not
        affiliated to spaceX in any way. <br />
        <br /> see on&nbsp;
        <a
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/AudreyKj/spacex-app"
        >
          GitHub
        </a>
      </p>
    </div>
  );
}

export default Info;
