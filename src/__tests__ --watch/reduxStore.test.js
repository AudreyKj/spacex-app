import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

function fetchUsersRequest() {
  return {
    type: "FETCH_USERS_REQUEST"
  };
}

function fetchUsers() {
  return dispatch => {
    return fetch("https://api.spacexdata.com/v4/launches").then(() =>
      dispatch(fetchUsersRequest())
    );
  };
}

it("redux fetches data", () => {
  const store = mockStore({
    myState: [
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

  return store.dispatch(fetchUsers()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual(fetchUsersRequest());
  });
});
