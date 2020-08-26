const initialState = {
  loading: false,
  users: [],
  error: ""
};
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
const FETCH_USERS_FAIL = "FETCH_USERS_FAIL";
const FETCH_FUTURE = "FETCH_FUTURE";
const FETCH_NO_FUTURE = "FETCH_NO_FUTURE";
const BEFORE_2010 = "BEFORE_2010";
const AFTER_2010 = "AFTER_2010";

const reducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        users: action.payload
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        success: action.payload
      };
    case FETCH_USERS_FAIL:
      return {
        ...state,
        fail: action.payload
      };
    case FETCH_FUTURE:
      return {
        ...state,
        future: action.payload
      };
    case FETCH_NO_FUTURE:
      return {
        ...state,
        nofuture: action.payload
      };
    case BEFORE_2010:
      return {
        ...state,
        before2010: action.payload
      };
    case AFTER_2010:
      return {
        ...state,
        after2010: action.payload
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        error: action.payload
      };
  }
};

export default reducer;
