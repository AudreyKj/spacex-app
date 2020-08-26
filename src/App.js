import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  NavLink,
  Switch,
  Redirect,
  useHistory
} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LaunchesData from "./LaunchesData.js";
import DataViz from "./DataViz.js";
import Info from "./info.js";
import "./App.scss";

function App() {
  const history = useHistory();
  /* eslint-disable */
  useEffect(() => {
    history.push("/");
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

        <Switch>
          <Route exact path="/">
            <Redirect to="/search" />
          </Route>
          <Route path="/search" component={LaunchesData}></Route>
          <Route path="/visualize" component={DataViz}></Route>
          <Route path="/info" component={Info}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
