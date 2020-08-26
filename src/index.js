import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import reducer from "./reducers/reducer.js";
//import { fetchUsers } from "./action.js";

const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
  console.log(store.getState());
});

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
const FETCH_USERS_FAIL = "FETCH_USERS_FAIL";
const FETCH_FUTURE = "FETCH_FUTURE";
const FETCH_NO_FUTURE = "FETCH_NO_FUTURE";
const BEFORE_2010 = "BEFORE_2010";
const AFTER_2010 = "AFTER_2010";

const fetchUsersRequest = users => {
  return {
    type: FETCH_USERS_REQUEST,
    payload: users
  };
};

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  };
};

const fetchUsersFail = users => {
  return {
    type: FETCH_USERS_FAIL,
    payload: users
  };
};

const fetchFuture = launches => {
  return {
    type: FETCH_FUTURE,
    payload: launches
  };
};

const fetchNoFuture = launches => {
  return {
    type: FETCH_NO_FUTURE,
    payload: launches
  };
};

const before2010 = launches => {
  return {
    type: BEFORE_2010,
    payload: launches
  };
};

const after2010 = launches => {
  return {
    type: AFTER_2010,
    payload: launches
  };
};

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  };
};

const fetchUsers = () => {
  return function(dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://api.spacexdata.com/v4/launches")
      .then(response => {
        // response.data is the users
        const res = response.data;
        dispatch(fetchUsersRequest(res));
        const usersSuccess = response.data.filter(elem => elem.success);
        dispatch(fetchUsersSuccess(usersSuccess));
        const usersFailures = response.data.filter(
          elem => elem.success === false
        );
        dispatch(fetchUsersFail(usersFailures));
        const futureLaunches = response.data.filter(elem => elem.upcoming);
        dispatch(fetchFuture(futureLaunches));
        const noFutureLaunches = response.data.filter(elem => !elem.upcoming);
        dispatch(fetchNoFuture(noFutureLaunches));
        const bef2010 = [];
        response.data.map(elem => {
          const date = elem.date_local;

          let year = date.split("-")[0];
          year = year.slice(0, -1);

          if (year.includes("200")) {
            bef2010.push(elem);
          }
        });
        dispatch(before2010(bef2010));
        const af2010 = [];

        response.data.map(elem => {
          const date = elem.date_local;

          let year = date.split("-")[0];
          year = year.slice(0, -1);

          if (year.includes("201") || year.includes("202")) {
            af2010.push(elem);
          }
        });

        console.log("after2010", af2010);

        dispatch(after2010(af2010));
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

store.dispatch(fetchUsers());

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
