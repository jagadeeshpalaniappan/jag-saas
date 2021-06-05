import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../components/Input";
import CourseList from "../components/CourseList";
import LoadingAlert from "../components/LoadingAlert";
import ErrorAlert from "../components/ErrorAlert";
import courseApi from "../api";
import courseCache from "../cache";

function getAxiosSrcToken({ axioSrc, setAxioSrc }) {
  console.debug(`prevAxiosSrc: ${axioSrc}`);

  // if: existing request in-progress, cancel the previous request
  if (axioSrc) axioSrc.cancel("Cancel the Previous Request");

  // create: new axioSrc
  const newAxiosSrc = axios.CancelToken.source();
  setAxioSrc(newAxiosSrc);

  console.debug(`newAxiosSrc: ${newAxiosSrc}`);

  return newAxiosSrc;
}

async function getCoursesAndUpdateState({
  keyword = "",
  axioSrc,
  setAxioSrc,
  setLoading,
  setCourses,
  setError,
}) {
  console.debug("getCoursesAndUpdateState:start");
  setLoading(true);
  setError(null);

  // cache: check
  // Assumming: Courses doesnt change often,
  // Reading from in-memory cache to avoid unnecessary backend calls and improve performance
  const cacheData = courseCache.get(keyword);
  if (cacheData) {
    // cache: available
    setCourses(cacheData);
  } else {
    // cache: not-available
    // fetch: req
    const cancelToken = getAxiosSrcToken({ axioSrc, setAxioSrc }).token;
    const resp = await courseApi.getCourses({ keyword, cancelToken });

    // fetch: res
    if (resp.error) setError(resp.error);
    else {
      setCourses(resp.data);
      courseCache.set(keyword, resp.data);
    }
  }

  setLoading(false);
  console.debug("getCoursesAndUpdateState:end");
}

function CourseListContainer() {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [axioSrc, setAxioSrc] = useState(null);
  const [value, setVal] = useState(null);

  const onChange = (keyword) => {
    console.log({ keyword });
    getCoursesAndUpdateState({
      keyword,
      axioSrc,
      setAxioSrc,
      setLoading,
      setCourses,
      setError,
    });
  };

  useEffect(() => {
    getCoursesAndUpdateState({
      setAxioSrc,
      setLoading,
      setCourses,
      setError,
    });
  }, []);

  return (
    <div className="my-2">
      <Input
        onChange={onChange}
        debounceTime={500}
        placeholder="Search Courses"
        value={value}
      />
      {loading && <LoadingAlert text="Loading Courses..." />}
      {error && <ErrorAlert text="Error fetching courses." />}
      {courses && <CourseList courses={courses} />}
    </div>
  );
}

export default CourseListContainer;
