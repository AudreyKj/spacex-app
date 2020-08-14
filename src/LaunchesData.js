import React, { useEffect, useState } from "react";
import axios from "axios";
import Timestamp from "react-timestamp";

function LaunchesData() {
  const [data, setData] = useState([]);
  const [history, setHistory] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  /* eslint-disable */
  //eslint disabled to pass empty array to useEffect
  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v4/launches")
      .then(res => {
        console.log("res.data", res.data);
        setHistory(res.data);
        setData(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  //search for info
  const getSearchedResults = e => {
    e.preventDefault();

    const res = [];

    const results = history.filter(elem => {
      const name = elem.name;
      if (name.split(" ").includes(searchValue)) {
        res.push(elem);
      }

      const date = elem.date_local;

      if (date.split("-").includes(searchValue)) {
        res.push(elem);
      }

      if (elem.details) {
        const details = elem.details;
        if (details.split(" ").includes(searchValue)) {
          res.push(elem);
        }
      }
    });

    console.log("res", res);
    setData(res);
  };

  return (
    <section className="launchesData">
      <div className="search-filter">
        <div className="search">
          <form className="searchApps">
            <label>
              search:
              <input
                type="text"
                name="launches"
                value={searchValue}
                onChange={({ target }) => {
                  setSearchValue(target.value);
                }}
              />
            </label>
            <button onClick={getSearchedResults}> SEARCH </button>
          </form>
        </div>
      </div>

      <div className="result">
        {data &&
          data.map(launch => (
            <div className="launch" key={launch.id + Math.random()}>
              <div className="details">
                <span className="details name"> {launch.name} </span>
                <span className="details">
                  Launch on&nbsp;
                  <Timestamp
                    date={launch.date_unix}
                    options={{ includeDay: false, twentyFourHour: false }}
                  />
                </span>
                <span className="details">
                  {launch.success
                    ? "Launch was successful"
                    : "Launch failed or did not occur yet"}
                </span>
                <span className="details">
                  {launch.upcoming
                    ? "Upcoming launches planned"
                    : "No upcoming launches planned"}
                </span>
                <span className="details info"> {launch.details} </span>

                {launch.links.article ? (
                  <a className="details" href={launch.links.article}>
                    Link to article
                  </a>
                ) : (
                  ""
                )}
              </div>
              <img
                className="ship-image"
                src={launch.links.patch.small || "image-default.jpg"}
                alt="ship-image"
              />
            </div>
          ))}
      </div>
    </section>
  );
}

export default LaunchesData;
