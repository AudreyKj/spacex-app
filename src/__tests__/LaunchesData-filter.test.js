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

it("filtering feature for success, year date, and future launches of spacecrafts", async () => {
  mockedAxios.get.mockResolvedValueOnce({
    data: [
      {
        id: "7898877",
        date_local: "2006-05-25T10:30:00+12:00",
        name: "SpaceCraft-1",
        success: false,
        upcoming: false,
        details: "something happened"
      },
      {
        id: "1234566",
        date_local: "2008-03-25T10:30:00+12:00",
        name: "SpaceCraft",
        success: true,
        upcoming: true,
        details: "loss of engine"
      },
      {
        id: "7898877",
        date_local: "2009-01-25T10:30:00+12:00",
        name: "SpaceCraft-3",
        success: true,
        upcoming: false,
        details: "launch started at 2am..."
      },
      {
        id: "1011123",
        date_local: "2017-04-25T10:30:00+12:00",
        name: "StarSky-4",
        success: true,
        upcoming: true,
        details: "engine went down rapidly..."
      }
    ]
  });

  const { getByTestId, container } = render(<LaunchesData />);

  const launchesData = await waitForElement(() => getByTestId("result"));
  expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  expect(launchesData.children).toHaveLength(4);

  fireEvent.click(container.querySelector("button.before2010"));
  expect(getByTestId("result")).toHaveTextContent("SpaceCraft");
  expect(launchesData.children).toHaveLength(3);

  fireEvent.click(container.querySelector("button.success"));
  expect(launchesData.children).toHaveLength(2);

  fireEvent.click(container.querySelector("button.upcoming"));
  expect(getByTestId("result")).toHaveTextContent("SpaceCraft");
  expect(launchesData.children).toHaveLength(1);
});
