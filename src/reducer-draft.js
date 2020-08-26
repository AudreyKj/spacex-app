export default (state = {}, action) => {
  switch (action.type) {
    case "getData":
      return {
        result: action.api_res
      };
    case "getSuccess":
      return {
        ...state,
        success: state.result.filter(elem => elem.success)
      };
    case "getFailures":
      return {
        ...state,
        failures: state.result.filter(elem => !elem.success)
      };
    case "getNoFutureLaunches":
      return {
        ...state,
        getNoFutureLaunches: state.result.filter(
          elem => elem.upcoming === false
        )
      };
    case "getFutureLaunches":
      return {
        ...state,
        getNoFutureLaunches: state.result.filter(elem => elem.upcoming === true)
      };
    case "getBefore2010":
      return {
        ...state,
        getBefore2010: state.result.filter(elem => {
          const date = elem.date_local;
          const res = [];

          let year = date.split("-")[0];
          year = year.slice(0, -1);

          if (year.includes("200")) {
            res.push(elem);
          }

          return res;
        })
      };
    case "getAfter2010":
      return {
        ...state,
        getAfter2010: state.result.filter(elem => {
          const date = elem.date_local;
          const res = [];

          let year = date.split("-")[0];
          year = year.slice(0, -1);

          if (year.includes("201") || year.includes("202")) {
            res.push(elem);
          }

          return res;
        })
      };
    default:
      return state;
  }
};
