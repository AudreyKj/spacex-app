import React, { useEffect, useState } from "react";
import axios from "axios";
import Timestamp from "react-timestamp";

function LaunchesData() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [history, setHistory] = useState(false);
  const [reset, setReset] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [successSelected, setSuccessSelected] = useState(false);
  const [failuresSelected, setFailuresSelected] = useState(false);
  const [futureLaunchesSelected, setFutureLaunchesSelected] = useState(false);
  const [noFutureLaunchesSelected, setFutureNoLaunchesSelected] = useState(
    false
  );
  const [before2010Selected, setBefore2010Selected] = useState(false);
  const [after2010Selected, setAfter2010Selected] = useState(false);

  /* eslint-disable */
  //eslint disabled to pass empty array to useEffect
  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v4/launches")
      .then(res => {
        console.log("res.data", res.data);
        //throw new Error();
        setLoading(false);
        setHistory(res.data);
        setData(res.data);
      })
      .catch(error => {
        setLoading(false);
        setError(true);
        console.log(error);
      });
  }, []);

  //filtering
  const getSuccess = () => {
    console.log("history", history);
    setReset(true);
    const successes = data.filter(elem => elem.success);
    console.log("successes", successes);
    setData(successes);
    setSuccessSelected(true);
  };

  const getFailures = () => {
    setReset(true);

    const failures = data.filter(elem => elem.success === false);
    console.log("failures", failures);
    setData(failures);
    setFailuresSelected(true);
  };

  const getNoFutureLaunches = () => {
    setReset(true);

    const noFutureLaunches = data.filter(elem => elem.upcoming === false);

    console.log("noFutureLaunches", noFutureLaunches);
    setData(noFutureLaunches);
    setFutureNoLaunchesSelected(true);
  };

  const getFutureLaunches = () => {
    setReset(true);

    const futureLaunches = data.filter(elem => elem.upcoming);

    console.log("futureLaunches", futureLaunches);
    setData(futureLaunches);
    setFutureLaunchesSelected(true);
  };

  console.log("searchValue", searchValue);

  //search in spacecraft's name, date, details
  const getSearchedResults = e => {
    e.preventDefault();

    if (!searchValue || searchValue.length === 0 || searchValue.length === 1) {
      return;
    }

    setReset(true);
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

  const getBefore2010 = () => {
    setReset(true);
    const res = [];
    data.filter(elem => {
      const date = elem.date_local;

      let year = date.split("-")[0];
      year = year.slice(0, -1);

      if (year.includes("200")) {
        res.push(elem);
      }
    });

    console.log("res - before 2010", res);
    setData(res);
    setBefore2010Selected(true);
  };

  const getAfter2010 = () => {
    const res = [];
    setReset(true);
    data.filter(elem => {
      const date = elem.date_local;

      let year = date.split("-")[0];
      year = year.slice(0, -1);

      if (year.includes("201") || year.includes("202")) {
        res.push(elem);
      }
    });

    console.log("res - after 2010", res);
    setData(res);
    setAfter2010Selected(true);
  };

  //reset results
  const resetResults = () => {
    setData(history);
    setReset(false);
    setFailuresSelected(false);
    setSuccessSelected(false);
    setFutureLaunchesSelected(false);
    setFutureNoLaunchesSelected(false);
    setBefore2010Selected(false);
    setAfter2010Selected(false);
    setSearchValue("");
  };

  return (
    <section className="launchesData">
      {loading && (
        <span className="loading" data-testid="loading">
          Loading...
        </span>
      )}

      {error && (
        <span className="error">
          Error in retrieving the data: please try again later!
        </span>
      )}
      {data && (
        <div className="search-filter">
          <div className="search">
            <form className="search">
              <label>
                search:
                <input
                  type="text"
                  name="launches"
                  className="search-feature"
                  data-testid="search"
                  value={searchValue}
                  onChange={({ target }) => {
                    setSearchValue(target.value);
                  }}
                />
              </label>
              <button className="searchValue" onClick={getSearchedResults}>
                SEARCH
              </button>
            </form>
          </div>
          <div className="filtering">
            filters:
            <button
              className={
                successSelected ? "success filter selected" : "success filter"
              }
              onClick={getSuccess}
            >
              successes
            </button>
            <button
              className={failuresSelected ? "filter selected" : "filter"}
              onClick={getFailures}
            >
              failures
            </button>
            <button
              className={
                futureLaunchesSelected
                  ? "upcoming filter selected"
                  : "upcoming filter"
              }
              onClick={getFutureLaunches}
            >
              future launches
            </button>
            <button
              className={
                noFutureLaunchesSelected ? "filter selected" : "filter"
              }
              onClick={getNoFutureLaunches}
            >
              no future launches
            </button>
            <button
              className={
                before2010Selected
                  ? "before2010 filter selected"
                  : "before2010 filter"
              }
              onClick={getBefore2010}
            >
              before 2010
            </button>
            <button
              className={after2010Selected ? "filter selected" : "filter"}
              onClick={getAfter2010}
            >
              after 2010
            </button>
            {reset && (
              <button className="reset" onClick={resetResults}>
                reset
              </button>
            )}
          </div>
        </div>
      )}

      <div className="result" data-testid="result">
        {data &&
          data.map(launch => (
            <div
              className="launch"
              key={launch.id + Math.random()}
              data-testid="launch"
            >
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
                    : "Launch classified as failure"}
                </span>

                <span className="details">
                  {launch.upcoming
                    ? "Upcoming launches planned"
                    : "No upcoming launches planned"}
                </span>
                <span className="details info"> {launch.details} </span>

                {launch.links ? (
                  <a className="details" href={launch.links.article}>
                    Link to article
                  </a>
                ) : (
                  "No article available"
                )}
              </div>
              <img
                className="ship-image"
                src={
                  launch.links && launch.links.patch.small
                    ? launch.links.patch.small
                    : "image-default.jpg"
                }
                alt="ship-image"
              />
            </div>
          ))}
      </div>
    </section>
  );
}

export default LaunchesData;
