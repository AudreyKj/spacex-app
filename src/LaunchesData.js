import React, { useEffect, useState } from "react";
import Timestamp from "react-timestamp";
import { useSelector } from "react-redux";
import styled from "styled-components";

//styled components for search
const SearchButton = styled.button`
  margin-left: ${props => (props.resetSearch ? "15px" : "15px")};
  margin-right: ${props => (props.resetSearch ? "15px" : "0")};

  cursor: pointer;
  font-size: 0.9rem;
  background: transparent;
  border: 1px solid black;
  padding: 5px;

  @media (max-width: 400px) {
    button.searchValue {
      margin-top: 15px;
    }
  }
`;

const SearchInput = styled.input`
  margin-left: 5px;
  padding: 5px;
  border: 1px solid black;
  background-color: transparent;
`;

//LaunchesData component
function LaunchesData() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState(false);
  const [reset, setReset] = useState(false);
  const [resetSearch, setResetSearch] = useState(false);
  const [resetResultsOn, setResetResultsOn] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [successSelected, setSuccessSelected] = useState(false);
  const [failuresSelected, setFailuresSelected] = useState(false);
  const [futureLaunchesSelected, setFutureLaunchesSelected] = useState(false);
  const [noFutureLaunchesSelected, setFutureNoLaunchesSelected] = useState(
    false
  );
  const [before2010Selected, setBefore2010Selected] = useState(false);
  const [after2010Selected, setAfter2010Selected] = useState(false);

  //infinite scroll
  const [nextResults, setNextResults] = useState(8);

  //fetching data in redux store
  const info = useSelector(state => state.users);

  //infinite scroll
  useEffect(() => {
    const getScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        fetchNextResults();
      } else {
        return;
      }
    };

    const fetchNextResults = () => {
      const results = [];

      for (let i = nextResults; i < nextResults + 8; i++) {
        if (history[i]) {
          results.push(history[i]);
        }
      }

      setData(prevState => [...prevState.concat(results)]);

      setNextResults(nextResults + 8);
    };

    window.addEventListener("scroll", getScroll);
    return () => window.removeEventListener("scroll", getScroll);
  }, [history, nextResults]);

  //display fetched data
  useEffect(() => {
    if (info) {
      const res = [];

      for (let i = 0; i < 8; i++) {
        if (info[i]) {
          res.push(info[i]);
        }
      }

      setData(res);

      setHistory(info);
      setLoading(false);
    }
  }, [info, resetResultsOn]);

  //filtering
  const getSuccess = () => {
    setReset(true);
    setSuccessSelected(true);

    const successes = history.filter(elem => elem.success);
    setHistory(successes);

    const successRes = [];

    for (let i = 0; i < 8; i++) {
      if (successes[i]) {
        successRes.push(successes[i]);
      }
    }

    setData(successRes);
  };

  const getFailures = () => {
    setReset(true);
    setFailuresSelected(true);

    const failures = history.filter(elem => elem.success === false);
    setHistory(failures);

    const failuresRes = [];

    for (let i = 0; i < 8; i++) {
      if (failures[i]) {
        failuresRes.push(failures[i]);
      }
    }

    setData(failuresRes);
  };

  const getFutureLaunches = () => {
    setReset(true);
    setFutureLaunchesSelected(true);

    const futureLaunches = history.filter(elem => elem.upcoming);
    setHistory(futureLaunches);

    const futureRes = [];

    for (let i = 0; i < 8; i++) {
      if (futureLaunches[i]) {
        futureRes.push(futureLaunches[i]);
      }
    }

    setData(futureRes);
  };

  const getNoFutureLaunches = () => {
    setReset(true);
    setFutureNoLaunchesSelected(true);

    const noFutureLaunches = history.filter(elem => elem.upcoming === false);
    setHistory(noFutureLaunches);

    const noFutureLaunchesRes = [];

    for (let i = 0; i < 8; i++) {
      if (noFutureLaunches[i]) {
        noFutureLaunchesRes.push(noFutureLaunches[i]);
      }
    }

    setData(noFutureLaunchesRes);
  };

  const getBefore2010 = () => {
    setReset(true);
    setBefore2010Selected(true);

    const before2010 = [];

    history.filter(elem => {
      const date = elem.date_local;

      let year = date.split("-")[0];
      year = year.slice(0, -1);

      if (year.includes("200")) {
        before2010.push(elem);
      }

      return before2010;
    });

    setHistory(before2010);

    const before2010Res = [];

    for (let i = 0; i < 8; i++) {
      if (before2010[i]) {
        before2010Res.push(before2010[i]);
      }
    }

    setData(before2010Res);
  };

  const getAfter2010 = () => {
    setReset(true);
    setAfter2010Selected(true);

    const after2010 = [];

    history.filter(elem => {
      const date = elem.date_local;

      let year = date.split("-")[0];
      year = year.slice(0, -1);

      if (year.includes("201") || year.includes("202")) {
        after2010.push(elem);
      }

      return after2010;
    });

    setHistory(after2010);

    const after2010Res = [];

    for (let i = 0; i < 8; i++) {
      if (after2010[i]) {
        after2010Res.push(after2010[i]);
      }
    }

    setData(after2010Res);
  };

  //search
  const getSearchedResults = e => {
    e.preventDefault();

    if (!searchValue || searchValue.length === 0 || searchValue.length === 1) {
      return;
    }

    setResetSearch(true);

    let res = [];

    const regex = RegExp(searchValue, "gi");

    history.map(elem => {
      if (elem.name) {
        let name = elem.name;

        if (regex.test(name)) {
          res.push(elem);
        }
      }

      if (elem.date_local) {
        const date = elem.date_local;

        if (regex.test(date)) {
          res.push(elem);
        }
      }

      if (elem.details) {
        const details = elem.details;

        if (regex.test(details)) {
          res.push(elem);
        }
      }

      return res;
    });

    setData(res);
  };

  //reset results
  const resetResults = () => {
    const res = [];

    for (let i = 0; i < 8; i++) {
      if (info[i]) {
        res.push(info[i]);
      }
    }

    setResetResultsOn(true);
    setReset(false);
    setResetSearch(false);

    setHistory(info);
    setData(res);

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

      {data && (
        <div className="search-filter">
          <div className="search">
            <form className="search">
              <label>
                search:
                <SearchInput
                  type="text"
                  name="launches"
                  data-testid="search"
                  value={searchValue}
                  onChange={({ target }) => {
                    setSearchValue(target.value);
                  }}
                ></SearchInput>
              </label>
              <SearchButton onClick={getSearchedResults}>SEARCH</SearchButton>
              {resetSearch && (
                <SearchButton resetSearch onClick={resetResults}>
                  RESET SEARCH
                </SearchButton>
              )}
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
              data-testid="before2010"
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
                <span className="details name">{launch.name}</span>
                <span className="details">
                  Launch on&nbsp;
                  <Timestamp
                    date={launch.date_unix}
                    options={{ includeDay: false, twentyFourHour: false }}
                  />
                  {console.log(
                    <Timestamp
                      date={launch.date_unix}
                      options={{ includeDay: false, twentyFourHour: false }}
                    />
                  )}
                </span>
                <span className="details">
                  {launch.success === null
                    ? "launch did not happen yet"
                    : launch.succcess === false || !launch.success
                    ? "launch failed"
                    : "launch was successful"}
                </span>
                <span className="details">
                  {launch.upcoming
                    ? "Upcoming launches planned"
                    : "No upcoming launches planned"}
                </span>

                {launch.details ? (
                  <span className="details info"> {launch.details} </span>
                ) : (
                  ""
                )}

                {launch.links && launch.links.article ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="details"
                    href={launch.links.article}
                  >
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
                alt="ship-launch"
              />
            </div>
          ))}
      </div>
    </section>
  );
}

export default LaunchesData;
