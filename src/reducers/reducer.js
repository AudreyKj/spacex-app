const initialState = {
  loading: false,
  data: [],
  error: ""
};
const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";
const FETCH_DATA_FAIL = "FETCH_DATA_FAIL";
const FETCH_FUTURE = "FETCH_FUTURE";
const FETCH_NO_FUTURE = "FETCH_NO_FUTURE";
const BEFORE_2010 = "BEFORE_2010";
const AFTER_2010 = "AFTER_2010";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        data: action.payload
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        success: action.payload
      };
    case FETCH_DATA_FAIL:
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
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
