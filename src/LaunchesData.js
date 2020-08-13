import React, { useEffect, useState } from "react";
import axios from "axios";

function LaunchesData() {
  const [data, setData] = useState("");

  /* eslint-disable */
  //eslint disabled to pass empty array to useEffect
  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v4/launches")
      .then(res => {
        console.log("res.data", res.data);
        setData(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <section className="launchesData">
      <div className="search">
        <form className="searchApps">
          <label>
            search launches:
            <input type="text" name="launches" />
          </label>
        </form>
      </div>
      <div className="result">
        {data &&
          data.map(launch => (
            <div className="launch" key={launch.id}>
              <div className="details">
                <span className="details"> NAME: {launch.name} </span>
                <span className="details">
                  STATUS:
                  {launch.success ? "launch was successful" : "launch failed"}
                </span>
                <span className="details"> DETAILS: {launch.details} </span>
                <a className="details" href={launch.links.article}>
                  LINK TO ARTICLE
                </a>
              </div>
              <img
                className="ship-image"
                src={launch.links.patch.small}
                alt="ship-image"
              />
            </div>
          ))}
      </div>
    </section>
  );
}

export default LaunchesData;
