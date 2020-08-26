import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Link, NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LaunchesData from "./LaunchesData.js";
import DataViz from "./DataViz.js";
import Info from "./info.js";
import "./App.scss";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function App() {
  /* eslint-disable */
  //eslint disabled to pass empty array to useEffect
  useEffect(() => {
    if (location.pathname === "/") {
      location.pathname = "/search";
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <AppBar className="headbar" position="static" elevation={0}>
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
                  borderBottom: "1px solid black"
                }}
              >
                search
              </Button>

              <Button
                component={NavLink}
                to="/visualize"
                color="inherit"
                activeStyle={{
                  borderBottom: "1px solid black"
                }}
              >
                visualize
              </Button>

              <Button
                component={NavLink}
                to="/info"
                color="inherit"
                activeStyle={{
                  borderBottom: "1px solid black"
                }}
              >
                get info
              </Button>
            </div>
          </Toolbar>
        </AppBar>

        <Route path="/search" component={LaunchesData}></Route>
        <Route path="/visualize" render={props => <DataViz />}></Route>
        <Route path="/info" component={Info}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
