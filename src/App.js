import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LaunchesData from "./LaunchesData.js";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              SpaceX - search & find launches
            </Typography>
          </Toolbar>
        </AppBar>
      </header>
      <LaunchesData />
    </div>
  );
}

export default App;
