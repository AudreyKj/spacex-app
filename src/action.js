import axios from "axios";

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
