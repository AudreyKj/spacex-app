import React from "react";
import ReactDOM from "react-dom";
import LaunchesData from "../LaunchesData.js";
import mockedAxios from "axios";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent
} from "@testing-library/react";

afterEach(cleanup);

it("search feature filters data correctly", async () => {
  mockedAxios.get.mockResolvedValueOnce({
    data: [
      {
        id: "1234566",
        date_local: "2006-03-25T10:30:00+12:00",
        name: "SpaceCraft",
        details: "loss of engine"
      },
      {
        id: "7898877",
        date_local: "2012-03-25T10:30:00+12:00",
        name: "SpaceCraft-3",
        details: "launch started at 2am"
      }
    ]
  });

  const { getByTestId, container } = render(<LaunchesData />);

  const launchesData = await waitForElement(() => getByTestId("result"));

  expect(launchesData.children).toHaveLength(2);
  expect(launchesData).toHaveTextContent("loss of engine");
  expect(mockedAxios.get).toHaveBeenCalledTimes(1);

  const value = "loss";
  const searchInput = container.querySelector("input.search-feature");

  fireEvent.change(searchInput, { target: { value: value } });
  fireEvent.click(container.querySelector("button.searchValue"));

  expect(getByTestId("result")).toHaveTextContent("SpaceCraft");
});
