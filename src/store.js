import reducer from "./reducers/reducer.js";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import axios from 'axios';

export const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => {
  store.getState();
});

//actions
const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";
const FETCH_DATA_FAIL = "FETCH_DATA_FAIL";
const FETCH_FUTURE = "FETCH_FUTURE";
const FETCH_NO_FUTURE = "FETCH_NO_FUTURE";
const BEFORE_2010 = "BEFORE_2010";
const AFTER_2010 = "AFTER_2010";

const fetchUsersRequest = data => {
  return {
    type: FETCH_DATA_REQUEST,
    payload: data
  };
};

const fetchUsersSuccess = data => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data
  };
};

const fetchUsersFail = data => {
  return {
    type: FETCH_DATA_FAIL,
    payload: data
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
    type: FETCH_DATA_FAILURE,
    payload: error
  };
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://api.spacexdata.com/v4/launches")
      .then(response => {
        const res = response.data.reverse()
        dispatch(fetchUsersRequest(res));
        const dataSuccess = response.data.filter(elem => elem.success);
        dispatch(fetchUsersSuccess(dataSuccess));
        const dataFailures = response.data.filter(
          elem => elem.success === false
        );
        dispatch(fetchUsersFail(dataFailures));
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

          return bef2010;
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

          return af2010;
        });

        dispatch(after2010(af2010));
      })
      .catch(error => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

store.dispatch(fetchUsers());