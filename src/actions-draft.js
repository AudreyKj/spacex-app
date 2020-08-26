import axios from "axios";

export async function getData() {
  try {
    const result = await axios.get(`https://api.spacexdata.com/v4/launches`);

    return {
      type: "getData",
      api_res: result.data
    };
  } catch (e) {
    console.log("e", e);
  }
}

export async function getSuccess(data) {
  return {
    type: "getSuccess",
    success: data
  };
}

export async function getFailures(data) {
  return {
    type: "getFailures",
    failures: data
  };
}

export async function getNoFutureLaunches(data) {
  return {
    type: "getNoFutureLaunches",
    getNoFutureLaunches: data
  };
}

export async function getFutureLaunches(data) {
  return {
    type: "getFutureLaunches",
    getFutureLaunches: data
  };
}
