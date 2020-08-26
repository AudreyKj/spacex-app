import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Link, NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LaunchesData from "./LaunchesData.js";
import DataViz from "./DataViz.js";
import "./App.scss";
import { useSelector, useDispatch } from "react-redux";
import { getData, getSuccess } from "./action.js";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  const success = useSelector(
    state => state.result && state.result.filter(elem => elem.success)
  );

  const failures = useSelector(
    state => state.result && state.result.filter(elem => elem.success === false)
  );

  const noFutureLaunches = useSelector(
    state =>
      state.result && state.result.filter(elem => elem.upcoming === false)
  );

  const futureLaunches = useSelector(
    state => state.result && state.result.filter(elem => elem.upcoming)
  );

  console.log("success", success);

  /* eslint-disable */
  //eslint disabled to pass empty array to useEffect
  useEffect(() => {
    if (location.pathname === "/") {
      location.pathname = "/search";
    }
  }, []);

  useEffect(() => {
    (async () => {
      dispatch(getData());
    })();
  }, []);

  return (
    <div className="App">
      <AppBar className="headbar" position="static">
        <Toolbar>
          <Typography variant="h6" className="title">
            SPACEX SPACECRAFTS
          </Typography>

          <div>
            <Button
              component={NavLink}
              to="/search"
              color="inherit"
              activeStyle={{
                borderBottom: "1px solid white"
              }}
            >
              search
            </Button>

            <Button
              component={NavLink}
              to="/visualize"
              color="inherit"
              activeStyle={{
                borderBottom: "1px solid white"
              }}
            >
              visualize
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Route path="/search" component={LaunchesData}></Route>
      <Route
        path="/visualize"
        render={props => (
          <DataViz
            success={success}
            failures={failures}
            noFutureLaunches={noFutureLaunches}
            futureLaunches={futureLaunches}
          />
        )}
      ></Route>
    </div>
  );
}

export default App;
