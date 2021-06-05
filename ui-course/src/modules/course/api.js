import axios from "axios";

export const COURSES_API = "http://localhost:5000/api/courses"; // TODO: read from env variable

async function getCourses({ keyword, cancelToken }) {
  console.log("api:course:getCourses::start", { keyword, cancelToken });
  try {
    // fetch: api
    const params = {};
    if (keyword) params["title"] = keyword;
    const resp = await axios.get(COURSES_API, { params, cancelToken });

    const data = resp.data.map(({ _id, ...item }) => ({ id: _id, ...item }));

    // return: data
    return { data, error: null };
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log("Old Request canceled", err.message);
      // return: data
      return { data: null, error: null };
    }

    const error = {
      message: err.message,
      status: err.response && err.response.status,
    };
    console.error("api:course:getCourses::error", err.message);
    // return: error
    return { data: null, error };
  }
}

const api = { getCourses };
export default api;
