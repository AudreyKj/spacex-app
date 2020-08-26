import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { render } from "@testing-library/react";

it("App renders correctly", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
