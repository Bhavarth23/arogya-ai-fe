// src/utils/axiosConfig.js
import axios from "axios";

// Your function name is already setupAxios, so we will keep it.
export const setupAxios = () => {
  console.log("Attempting to set up Axios headers and interceptors...");
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    console.log("SUCCESS: Axios header set with token from localStorage.");
  } else {
    delete axios.defaults.headers.common["Authorization"];
    console.log("INFO: No access token found in localStorage.");
  }

  // --- THIS IS THE NEW, UPGRADED PART ---
  // Add a response interceptor to handle 401 errors globally
  axios.interceptors.response.use(
    // If the response is successful (status 2xx), just return it
    (response) => response,

    // If the response has an error
    (error) => {
      // Check if the error is specifically a 401 Unauthorized error
      if (error.response && error.response.status === 401) {
        console.error(
          "AXIOS INTERCEPTOR: Caught 401 Unauthorized error. Session may be expired."
        );

        // 1. Clear any invalid tokens from storage
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // 2. Clear the default axios header
        delete axios.defaults.headers.common["Authorization"];

        // 3. Force a redirect to the login page.
        // A full page reload is best to ensure all application state is cleared.
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
          alert("Your session has expired. Please log in again.");
        }
      }

      // For all other errors, just return the error promise
      return Promise.reject(error);
    }
  );
};
